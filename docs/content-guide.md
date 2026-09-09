# Content guide

## Replace wedding facts

Edit `src/config/wedding.ts`. Replace uppercase placeholders only with details approved by the couple. Dates must use ISO 8601 with an explicit offset, for example `2027-01-01T13:00:00+08:00`.

Never commit private guest information to configuration or public JSON.

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
  music/
```

Keep original photographs outside Git when they are excessively large. Export web-ready versions with meaningful alt text and record focal positioning in wedding configuration.
