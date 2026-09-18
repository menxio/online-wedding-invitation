# Content guide

## Replace wedding facts

Edit `src/config/wedding.ts`. Replace `NEEDS COUPLE APPROVAL` only with details approved by the couple. Once approved, dates must use ISO 8601 with an explicit offset, for example `2027-01-01T13:00:00+08:00`.

Never commit private guest information to configuration or public JSON.

The current date/time conflict and unresolved content are tracked in `docs/wedding-content-status.md`.

## Change the theme

Edit `src/config/theme.ts`. Colors use six-digit hexadecimal values. Semantic tokens should be changed in configuration rather than adding arbitrary colors to components.

Script typography is decorative only. Dates, addresses, navigation, and form controls must use readable heading/body/label roles.

## Enable, disable, or reorder sections

Edit `src/config/sections.ts`:

- `order` controls presentation order.
- `enabled` controls whether each section renders.

Disabling an optional section must not leave unexplained whitespace or broken navigation.

## Add media

Use predictable paths:

```text
public/wedding/
  hero/
  story/
  gallery/
  entourage/
  details/
  gifts/
  music/
```

Keep original photographs outside Git when they are excessively large. Export web-ready versions with meaningful alt text and record focal positioning in wedding configuration.

Gift QR images belong in `public/wedding/gifts/` and are listed in `giftGuide.accounts`. The section intentionally renders no empty QR placeholders.

Music supports two delivery modes in `wedding.music`:

- `spotifyUrl` displays Spotify's guest-controlled embedded player.
- `src` displays a site-wide play/pause control for an audio file the couple is permitted to publish.

Do not rely on audible autoplay. Browser policies can block playback until a guest interacts with the page.
