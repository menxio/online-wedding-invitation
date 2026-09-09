# Architecture

## Product boundary

This repository represents one wedding and is designed to be cloned. It is not a multi-tenant platform and has no CMS, billing, public registration, or page builder.

## Application boundaries

- `src/app`: routing, metadata, and global styles
- `src/components`: visual and layout components
- `src/config`: parsed wedding, theme, and section configuration
- `src/lib`: framework-independent business logic
- `public/wedding`: wedding-owned media
- `tests`: unit and component tests
- `supabase/migrations`: version-controlled database work added at the RSVP checkpoint

Configuration is parsed by Zod as the application loads. Visual components consume typed data and must not contain wedding-specific facts. Section rendering will follow `sectionsConfig.order` and `sectionsConfig.enabled`.

## Rendering principles

- Prefer Server Components and static rendering.
- Add Client Components only for interaction such as countdown updates, invitation opening, music, gallery controls, and RSVP forms.
- Keep business and authorization rules out of visual components.
- Keep secret credentials in server-only modules and environment variables.

## Checkpoint status

The foundation currently includes typed configuration, theme-to-CSS-variable mapping, layout primitives, a countdown utility, and unit tests. Full invitation sections, Supabase, RSVP, and admin routes are deliberately not implemented yet.
