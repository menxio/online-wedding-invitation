# Online Wedding Invitation

A production-oriented, mobile-first wedding invitation template built with Next.js, TypeScript, and Tailwind CSS. One clone represents one wedding; wedding facts, theme tokens, section order, and optional sections are configuration-driven.

## Current status

Visual foundation and approved wedding-content integration are complete. Unapproved sections remain disabled or explicitly pending. Private household RSVP requirements are configured, but Supabase migrations, server operations, RLS policies, and RSVP tests have not been implemented yet.

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
