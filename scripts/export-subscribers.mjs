#!/usr/bin/env node

import { chmodSync, existsSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { spawnSync } from "node:child_process";

const DATABASE = "books-and-wine-subscribers";
const DEFAULT_OUTPUT = "subscribers.csv";
const SQL = `
  SELECT
    email,
    datetime(consented_at, 'unixepoch') AS subscribed_at,
    source
  FROM subscribers
  ORDER BY consented_at ASC, email ASC;
`;

function usage() {
  console.log(`Usage: npm run subscribers:export -- [options]

Options:
  -o, --output <file>  Output path (default: ${DEFAULT_OUTPUT})
  --local              Export from the local D1 database instead of production
  --force              Overwrite an existing output file
  -h, --help           Show this help`);
}

function parseArgs(args) {
  const options = {
    output: DEFAULT_OUTPUT,
    local: false,
    force: false,
  };

  for (let index = 0; index < args.length; index += 1) {
    const argument = args[index];

    if (argument === "-h" || argument === "--help") {
      usage();
      process.exit(0);
    }

    if (argument === "--local") {
      options.local = true;
      continue;
    }

    if (argument === "--force") {
      options.force = true;
      continue;
    }

    if (argument === "-o" || argument === "--output") {
      const output = args[index + 1];
      if (!output) {
        throw new Error(`${argument} requires a file path.`);
      }
      options.output = output;
      index += 1;
      continue;
    }

    throw new Error(`Unknown option: ${argument}`);
  }

  return options;
}

function escapeCsv(value) {
  const text = value == null ? "" : String(value);
  return /[",\r\n]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
}

function rowsFromWrangler(payload) {
  if (!Array.isArray(payload)) {
    throw new Error("Cloudflare returned an unexpected response.");
  }

  return payload.flatMap((result) => result?.results ?? result?.result?.results ?? []);
}

function main() {
  const options = parseArgs(process.argv.slice(2));
  const outputPath = resolve(options.output);

  if (existsSync(outputPath) && !options.force) {
    throw new Error(`${outputPath} already exists. Use --force to overwrite it.`);
  }

  const wranglerBin = resolve("node_modules/wrangler/bin/wrangler.js");
  const wranglerArgs = [
    "d1",
    "execute",
    DATABASE,
    options.local ? "--local" : "--remote",
    "--json",
    "--command",
    SQL,
  ];

  const result = spawnSync(process.execPath, [wranglerBin, ...wranglerArgs], {
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
  });

  if (result.status !== 0) {
    const details = result.stderr.trim() || result.stdout.trim();
    const loginHint = options.local
      ? ""
      : "\nIf this is an authentication error, run `npx wrangler login` and try again.";
    throw new Error(`Cloudflare export failed.\n${details}${loginHint}`);
  }

  let payload;
  try {
    payload = JSON.parse(result.stdout);
  } catch {
    throw new Error(`Could not parse Cloudflare's response as JSON.\n${result.stdout.trim()}`);
  }

  const rows = rowsFromWrangler(payload);
  const columns = ["email", "subscribed_at", "source"];
  const csv = [
    columns.join(","),
    ...rows.map((row) => columns.map((column) => escapeCsv(row[column])).join(",")),
  ].join("\n");

  writeFileSync(outputPath, `${csv}\n`, {
    encoding: "utf8",
    flag: options.force ? "w" : "wx",
    mode: 0o600,
  });
  chmodSync(outputPath, 0o600);
  console.log(`Exported ${rows.length} subscriber${rows.length === 1 ? "" : "s"} to ${outputPath}`);
}

try {
  main();
} catch (error) {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
}
