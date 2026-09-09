# Online Wedding Invitation

A production-oriented, mobile-first wedding invitation template built with Next.js, TypeScript, and Tailwind CSS. One clone represents one wedding; wedding facts, theme tokens, section order, and optional sections are configuration-driven.

## Current status

Checkpoint 2 (foundation). The application intentionally displays explicit placeholders. Visual invitation sections and RSVP infrastructure are deferred to their approval checkpoints.

## Local development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Quality commands

```bash
npm run lint
npm run typecheck
npm test
npm run build
```

## Configuration

- Wedding facts: `src/config/wedding.ts`
- Theme tokens: `src/config/theme.ts`
- Section order/toggles: `src/config/sections.ts`
- Media: `public/wedding/`

Do not replace placeholders with unapproved facts. See [the content guide](docs/content-guide.md) and [architecture notes](docs/architecture.md).
