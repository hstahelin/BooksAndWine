const MAX_BODY_BYTES = 2_048;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function json(body: { message?: string; error?: string }, status = 200) {
  return Response.json(body, {
    status,
    headers: {
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff",
    },
  });
}

async function readBoundedText(request: Request): Promise<string | null> {
  if (!request.body) return "";

  const reader = request.body.getReader();
  const decoder = new TextDecoder();
  let bytesRead = 0;
  let text = "";

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      bytesRead += value.byteLength;
      if (bytesRead > MAX_BODY_BYTES) {
        await reader.cancel();
        return null;
      }

      text += decoder.decode(value, { stream: true });
    }

    return text + decoder.decode();
  } finally {
    reader.releaseLock();
  }
}

async function subscribe(request: Request, env: Env): Promise<Response> {
  if (request.method !== "POST") {
    return json({ error: "Method not allowed." }, 405);
  }

  const contentType = request.headers.get("content-type") ?? "";
  if (!contentType.toLowerCase().startsWith("application/json")) {
    return json({ error: "Please submit a valid email address." }, 415);
  }

  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (contentLength > MAX_BODY_BYTES) {
    return json({ error: "That request is too large." }, 413);
  }

  const body = await readBoundedText(request);
  if (body === null) {
    return json({ error: "That request is too large." }, 413);
  }

  let payload: unknown;
  try {
    payload = JSON.parse(body);
  } catch {
    return json({ error: "Please enter a valid email address." }, 400);
  }

  const email =
    typeof payload === "object" &&
    payload !== null &&
    "email" in payload &&
    typeof payload.email === "string"
      ? payload.email.trim().toLowerCase()
      : "";

  if (!email || email.length > 254 || !EMAIL_PATTERN.test(email)) {
    return json({ error: "Please enter a valid email address." }, 400);
  }

  try {
    await env.DB.prepare(
      `INSERT INTO subscribers (email, source)
       VALUES (?1, 'coming-soon')
       ON CONFLICT(email) DO NOTHING`,
    )
      .bind(email)
      .run();

    return json({ message: "You’re on the list. We’ll be in touch." });
  } catch (error) {
    console.error(
      JSON.stringify({
        message: "subscriber signup failed",
        error: error instanceof Error ? error.message : String(error),
      }),
    );
    return json(
      { error: "We couldn’t save your email. Please try again shortly." },
      503,
    );
  }
}

export default {
  async fetch(request, env): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === "/api/subscribe") {
      return subscribe(request, env);
    }

    return json({ error: "Not found." }, 404);
  },
} satisfies ExportedHandler<Env>;
