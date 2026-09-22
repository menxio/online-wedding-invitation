# Shared-link RSVP security and operations

## Product model

The couple manually sends the same `/rsvp` URL to selected guests. A guest enters a full name, selects their wedding role, and chooses either “Joyfully accepts” or “Regretfully declines.” Every accepted submission creates one response representing exactly one reserved seat. There are no added attendees, response edits, guest accounts, codes, or unique links.

The wedding is adults-only except for children in the wedding entourage. Because the application has no authoritative guest list, that policy is controlled through link distribution rather than falsely enforced through website identity checks.

## Accepted limitation

Because RSVP access is controlled by distribution of a shared URL and there is no authoritative guest list or guest authentication, the application cannot prove that a submitted guest name belongs to an invited person. The system instead focuses on protecting the RSVP database, preventing enumeration, limiting abuse, validating submissions, and preventing guests from adding additional attendees.

Names are deliberately not unique. Duplicate names may be different people or repeated submissions; coordinators reconcile them manually.

## Security model

- The browser sends a small strict payload to `POST /api/rsvp/submit`; it never writes to Supabase directly.
- The route limits the streamed body to 4 KiB, strictly validates with Zod, rejects unknown fields and a populated honeypot, and checks same-origin browser signals.
- Cloudflare Turnstile Managed mode adds a low-friction human verification. Its single-use token is validated server-side and scoped to the RSVP action before database work occurs.
- PostgreSQL-backed limits allow 10 submissions per minute, 30 per ten minutes, and 100 per day for each HMAC-digested request address. This accommodates shared family/office networks while containing sustained abuse; raw addresses are not stored.
- October 5 is an advisory reply-by date shown in the invitation copy. The route and database intentionally continue accepting late responses.
- Guest-facing errors are generic. Responses never reveal existing names, totals, internal IDs, SQL errors, or rate-limit details.
- RLS is enabled on all RSVP tables. `anon` has no table grants. Authenticated reads require the protected `rsvp_admin` application-metadata role.
- The elevated Supabase secret key exists only in a `server-only` module and invokes only the public submit and limiter functions from the application backend.
- RSVP and admin routes are dynamic/no-store where data is involved and carry no-index metadata or headers.

## Supabase setup

Link and verify the staging project before applying migrations:

```bash
npx supabase link --project-ref YOUR_PROJECT_REF
npx supabase db push --linked --dry-run
npx supabase db push --linked
npx supabase test db --linked
```

Disable public sign-ups in Supabase Authentication settings. Create a coordinator user manually in Supabase Auth, then assign the protected role in the SQL editor:

```sql
update auth.users
set raw_app_meta_data = coalesce(raw_app_meta_data, '{}'::jsonb)
  || '{"role":"rsvp_admin"}'::jsonb
where email = 'COORDINATOR_EMAIL';
```

Do not use editable `user_metadata` for authorization. Sign out and back in after changing app metadata so the access token is refreshed.

## Operations

- Guests use `/rsvp` and cannot query submitted responses.
- Coordinators sign in at `/admin`, review response totals, search/filter names, attendance, and roles, and export Guest Name / Role / Attendance / Submitted At.
- CSV cells beginning with spreadsheet formula characters are neutralized. Treat exports as private event data.
- Periodically remove old `rsvp_rate_limits` windows if desired. Do not expose their digests to administrators.
- If a response appears duplicated or questionable, reconcile it outside the guest-facing application. Do not infer identity from a name or request-address digest.
