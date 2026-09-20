# Books & Wine

A coming-soon site for a digital journal about books, wine, and the conversations that connect them.

The site is hosted on Cloudflare Workers with static assets. Email signups are
stored in Cloudflare D1 through the `DB` binding. The `subscribers` table records
the normalized email address, consent timestamp, and signup source. Duplicate
addresses are ignored.

## Development

```bash
npm install
npm run db:migrate:local
npm run dev
```

The site uses React, TypeScript, Vite, Cloudflare Workers, and D1.

## Cloudflare setup

Create the production D1 database and apply its migration before the first
deployment:

```bash
npx wrangler d1 create books-and-wine-subscribers
npm run db:migrate:remote
npm run deploy
```

Cloudflare can also connect directly to the GitHub repository and deploy the
`main` branch automatically.

## Export subscribers

Export all production subscribers to `subscribers.csv`:

```bash
npm run subscribers:export
```

Use a different output path, or replace an existing export:

```bash
npm run subscribers:export -- --output exports/subscribers.csv
npm run subscribers:export -- --force
```

Run `npx wrangler login` first if the Cloudflare CLI asks you to authenticate.
The default `subscribers.csv` file is ignored by Git because it contains email
addresses.
