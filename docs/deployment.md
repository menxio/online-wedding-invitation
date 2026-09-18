# Deployment

The intended target is Vercel with Supabase for persistence and administrator authentication.

## Setup

1. Create a non-production Supabase project.
2. Authenticate and link this repository to it:

   ```bash
   npx supabase login
   npx supabase link --project-ref YOUR_PROJECT_REF
   ```

3. Copy `.env.example` to `.env.local`. Configure the project URL, publishable key, server-only secret key, and one independent rate-limit pepper of at least 32 random characters. Keep every value local and never paste secrets into chat or an issue.
4. For local development, the application uses Cloudflare's official always-pass Turnstile test keys when Turnstile variables are absent. Before deployment, create a Managed Turnstile widget restricted to the final hostname and configure `NEXT_PUBLIC_TURNSTILE_SITE_KEY` plus the server-only `TURNSTILE_SECRET_KEY`. Production deliberately fails closed when these keys are missing.
5. Review the remote migration plan, then apply it only to the intended staging project:

   ```bash
   npx supabase db push --linked --dry-run
   npx supabase db push --linked
   npx supabase test db --linked
   ```

6. In Supabase Authentication settings, disable public user sign-ups. Create only the coordinator account, then assign `app_metadata.role = rsvp_admin` as described in `docs/rsvp-security.md`.
7. Run the local application and verify `/rsvp`, `/admin`, submission, Turnstile failure/retry, deadline behavior, filters, export, no-store headers, and responsive layouts against staging.
8. Only after staging passes, add the same environment variables to the deployment host and deploy.

Never expose `SUPABASE_SECRET_KEY` or `RSVP_RATE_LIMIT_PEPPER` in a `NEXT_PUBLIC_` variable. Never commit `.env.local` or CSV exports. Restrict access to deployment and database logs.

The shared RSVP URL is operationally private, not technically authenticated. The couple should distribute it only to selected guests. Anyone who obtains the URL can submit a name, subject to validation, rate limiting, and the deadline.

Docker Desktop or Podman is required for `npx supabase start` and fully local database tests. It is not required for the linked staging commands above.
