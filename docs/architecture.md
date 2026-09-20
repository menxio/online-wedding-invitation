# Architecture

## Product boundary

This repository represents one wedding and is designed to be cloned. It is not a multi-tenant platform and has no CMS, billing, public registration, page builder, guest directory, or invitation-management system.

## Application boundaries

- `src/app`: routing, metadata, server mutations, and global styles
- `src/components`: visual and layout components
- `src/config`: parsed wedding, theme, and section configuration
- `src/lib`: business, data-access, security, and formatting logic
- `public/wedding`: wedding-owned media
- `tests`: unit and component tests
- `supabase/migrations`: RSVP schema, constraints, RLS, and restricted functions

Configuration is parsed by Zod as the application loads. Static wedding content remains in `src/config`; dynamic RSVP responses remain in Supabase. Visual components consume typed configuration and do not own wedding facts.

## Rendering principles

- Prefer Server Components and static rendering for the invitation.
- Use Client Components only for interaction such as countdown, invitation opening, music, gallery controls, RSVP form state, and admin filtering.
- Keep mutation and authorization rules out of visual components.
- Keep privileged credentials in server-only modules and environment variables.

## RSVP boundaries

`/rsvp` is the only public RSVP destination. It submits `{ guestName, attendance, company, turnstileToken }` to a protected server route. The browser never inserts into Supabase directly. The route validates a bounded request, rejects unknown fields and the honeypot, verifies Turnstile, checks same-origin signals, consumes database-backed rate limits, and calls a restricted atomic PostgreSQL function. The displayed October 5 reply-by date is advisory; late responses remain accepted.

Each response row represents exactly one seat. Names are not unique and are not treated as identity. There are no guest accounts, codes, tokens, imported invitees, additional-attendee fields, or edit flow.

Administrators authenticate with Supabase Auth and require `app_metadata.role = rsvp_admin`. RLS independently permits response reads only for that role. See `docs/rsvp-security.md`.
