# Owner launch checklist

Use this checklist when you return to the project. Complete the items in order before sending the invitation to guests.

## 1. Secure the services

- [ ] In Supabase Authentication settings, disable public user sign-ups.
- [ ] Confirm that only the intended coordinator account exists.
- [ ] Confirm that the coordinator has `app_metadata.role = rsvp_admin` and can sign in at `/admin`.
- [ ] Rotate any server secret that has ever been pasted into chat, a screenshot, an issue, or another public place.
- [ ] Keep `.env.local`, database exports, and secret keys out of Git.

## 2. Finish the wedding information

- [ ] Confirm the complete street address and Google Maps link for San Agustin Parish Valencia City.
- [ ] Confirm Jocel's Garden's complete address, Google Maps link, and reception time.
- [ ] Ask the couple to approve the proposed Bridal Rose-led dress-code palette shown on the site.
- [ ] Confirm the final wording for the invitation introduction, gallery introduction, and closing message.
- [ ] Provide the guest contact person's name and contact details.
- [ ] Recheck every entourage name and role for spelling.

## 3. Supply the gift details

- [ ] Obtain the final QR image for each gift account.
- [ ] Confirm the safe guest-facing label for each account, such as `GCash — Michael` or `Bank transfer — Marris`.
- [ ] Place the QR images in `public/wedding/gifts/`.
- [ ] Add each QR image and label to `giftGuide.accounts` in `src/config/wedding.ts`.
- [ ] Do not publish account numbers as plain text unless the couple explicitly approves it.

The Gift Guide section already works without QR codes. QR cards appear only after real account entries are configured.

## 4. Add the couple's song

- [x] Spotify track selected: **Born For You — Khel Pangilinan**.
- [x] Spotify link added to `music.spotifyUrl` in `src/config/wedding.ts`.
- [x] Music section enabled in `src/config/sections.ts`.
- [ ] Play the embedded track once on the final preview and confirm it is the exact recording the couple wants.
- [ ] If the couple owns a licensed audio file and wants a site-wide play/pause control, place it in `public/wedding/music/` and set `music.src` instead.

Spotify playback must remain guest-controlled. Browsers can block audible autoplay, so the site must not rely on music starting automatically.

## 5. Configure production abuse protection

- [ ] Create a Cloudflare Turnstile **Managed** widget.
- [ ] Restrict the widget to the final production hostname.
- [ ] Add `NEXT_PUBLIC_TURNSTILE_SITE_KEY` and `TURNSTILE_SECRET_KEY` to the production host.
- [ ] Keep `TURNSTILE_SECRET_KEY` server-only.

Local development uses Cloudflare's official always-pass test keys when these variables are absent. Production intentionally requires real keys.

## 6. Configure the deployment host

- [ ] Import the GitHub repository into Vercel.
- [ ] Add all six environment variables from `.env.example` to Vercel:
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
  - `SUPABASE_SECRET_KEY`
  - `RSVP_RATE_LIMIT_PEPPER`
  - `NEXT_PUBLIC_TURNSTILE_SITE_KEY`
  - `TURNSTILE_SECRET_KEY`
- [ ] Deploy a preview first; do not immediately distribute the production link.
- [ ] Add the final domain to the Turnstile widget and Supabase authentication URL settings.

## 7. Run the pre-launch checks

- [ ] Run `npm run lint`.
- [ ] Run `npm run typecheck`.
- [ ] Run `npm test`.
- [ ] Run `npm run build`.
- [ ] Test the invitation on a phone, tablet, and desktop.
- [ ] Submit one accepting RSVP and one declining RSVP.
- [ ] Verify both responses in `/admin`.
- [ ] Verify search, filters, totals, and CSV export.
- [ ] Verify that repeated rapid submissions receive a friendly retry message.
- [ ] Verify that the RSVP closes after October 5, 2026 in Asia/Manila time.
- [ ] Test every navigation link, venue link, QR code, and Spotify link.
- [ ] Ask the couple to approve the final preview before launch.

## 8. Send and operate the invitation

- [ ] Send the same private invitation link only to intended guests.
- [ ] Remind guests that each submitted RSVP reserves exactly one seat.
- [ ] Remind guests that uninvited companions cannot be accommodated.
- [ ] Reconcile duplicate or questionable names manually in the coordinator dashboard.
- [ ] Export and back up the final attendance list after the deadline.

The shared link is private by distribution, not by identity verification. The site has no authoritative guest list and does not use invitation codes or household groups.
