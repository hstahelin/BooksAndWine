# Books & Wine

A coming-soon site for a digital journal about books, wine, and the conversations that connect them.

Email signups are stored in Cloudflare D1 through the `DB` binding. The `subscribers` table records the normalized email address, consent timestamp, and signup source. Duplicate addresses are ignored.

## Development

```bash
npm install
npm run dev
```

The site uses Next.js, React, TypeScript, Tailwind CSS, and the Vinext build toolchain for Cloudflare-compatible deployment.
