# Online Wedding Invitation

A production-oriented, mobile-first wedding invitation for Michael and Marris, built with Next.js, TypeScript, Tailwind CSS, and Supabase. The repository can be cloned for another wedding; static wedding facts, theme tokens, section order, and optional sections remain configuration-driven.

## Current status

The invitation and shared-link RSVP are complete in source. Guests use the same `/rsvp` URL, enter a full name, and accept or decline one reserved seat. Supabase stores responses, enforces the deadline, provides database-backed rate limiting and RLS, and supports an authenticated coordinator dashboard with a safe CSV export.

There is no authoritative guest list or guest authentication in the application. The couple controls RSVP access by sending the shared URL only to selected guests. As a result, the application cannot prove that a submitted name belongs to an invited person, and administrators reconcile duplicate or questionable responses manually.

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

Do not replace placeholders with unapproved facts. See the [content guide](docs/content-guide.md), [architecture notes](docs/architecture.md), and [RSVP security guide](docs/rsvp-security.md).

## RSVP setup

Copy `.env.example` to `.env.local`, configure Supabase, apply the migration, and create an authorized admin as described in [the deployment guide](docs/deployment.md). Never commit `.env.local`, real credentials, or exported RSVP data.
