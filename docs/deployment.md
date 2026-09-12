# Deployment

The intended target is Vercel with Supabase for persistence and administrator authentication.

## Setup

1. Create a Supabase project and copy `.env.example` to `.env.local`.
2. Configure the project URL, publishable key, service-role key, and one independent rate-limit pepper of at least 32 random characters.
3. Apply `supabase/migrations/202609120001_shared_link_rsvp.sql` with `supabase db push` or the Supabase SQL editor.
4. If using the Supabase CLI, run `supabase test db` to execute `supabase/tests/rsvp_rls.test.sql`.
5. Create the coordinator in Supabase Auth and assign `app_metadata.role = rsvp_admin` as described in `docs/rsvp-security.md`.
6. Add the same environment variables to the deployment host and deploy.
7. Run the quality commands and verify `/rsvp`, `/admin`, submission, deadline behavior, filters, export, no-store headers, and responsive layouts.

Never expose `SUPABASE_SERVICE_ROLE_KEY` or `RSVP_RATE_LIMIT_PEPPER` in a `NEXT_PUBLIC_` variable. Never commit `.env.local` or CSV exports. Restrict access to deployment and database logs.

The shared RSVP URL is operationally private, not technically authenticated. The couple should distribute it only to selected guests. Anyone who obtains the URL can submit a name, subject to validation, rate limiting, and the deadline.
