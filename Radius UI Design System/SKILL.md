---
name: radius-ui-design
description: Use this skill to generate well-branded interfaces and assets for Radius UI (v2.0), a minimal neutral-driven shadcn-style web design system with Geist + Inter typography, a single indigo accent, Lucide iconography and pill-shaped (30px radius) controls. Good for production UI, throwaway prototypes, mockups, and slide decks.
user-invocable: true
---

# Radius UI Design Skill

Read **`README.md`** at the root of this skill first — it holds content fundamentals, visual foundations, and iconography guidance. Then explore:

- `colors_and_type.css` — drop-in CSS custom-property tokens (colors, type, radii, shadows, spacing) and utility classes (`.r-h1`, `.r-p`, etc.). This is the single source of truth for the token system.
- `components.css` — component recipes: `.r-btn` (pill-shaped, 30px radius), `.r-badge`, `.r-input`, `.r-card`, `.r-alert`, `.r-switch`, `.r-checkbox`, `.r-tabs`, `.r-kbd`, `.r-tooltip`, `.r-progress`, `.r-slider`, `.r-skeleton`, `.r-table`.
- `assets/` — Radius wordmark logos (light + dark) + PNG.
- `fonts/` — Inter (variable + static) shipped locally. Geist + Geist Mono loaded from Google Fonts.
- `preview/` — per-token/per-component HTML cards. Open one to see a component in action.
- `ui_kits/web_app/` — a full working dashboard example (Sidebar + Topbar + Dashboard + Customers table + Settings) built from the primitives. Components are in `components.jsx`, `icons.jsx`. Read these before hand-rolling anything.

## When invoked without other guidance

Ask the user what they want to build. Good follow-up questions:
- Is this production code, a prototype, or a slide deck?
- Which surface — dashboard, marketing page, auth flow, data table?
- Dark mode, or light only? (The system is light-first; dark is not yet defined.)
- Are they themeing the primary color, or keeping Radius indigo?

## Core rules (do not violate)

1. **Pill-shaped controls.** Buttons, badges, pills, kbd, tooltip — all use `border-radius: 30px`. Cards use 12px, inputs use 6px. This is a defining visual signature.
2. **Neutral-first.** ~80% of surfaces are neutral (white backgrounds, neutral-200 borders, neutral-500 secondary text). Color is reserved for primary CTAs, status, and charts.
3. **One brand accent.** Indigo `#5A5FF2` (`--primary`). Used sparingly — primary buttons, active nav states, links, chart primary. Don't invent new brand colors.
4. **Geist for everything, Inter for controls.** `font-family: var(--font-body)` (Geist) is the default. Control labels (button, badge, tabs) use `var(--font-ui)` (Inter) at `-0.025em` letter-spacing. Code/kbd use `var(--font-mono)` (Geist Mono).
5. **Lucide icons, 1.5px stroke, `currentColor`.** Never emoji. Never two-tone. Never filled variants.
6. **Calm motion.** 150ms ease-in-out is the default. No bounces, no scale-ups.
7. **Tight shadows.** `var(--shadow-xs)` on cards/inputs/buttons. `--shadow-md` on dropdowns/tooltips. Never gradient elevation. Never inner shadows.

## Visual output workflow

When creating **static HTML artifacts** (slides, mocks, throwaway prototypes):
1. Link `colors_and_type.css` + `components.css`.
2. Copy assets out of `assets/` into your artifact's folder so the output is self-contained.
3. Compose with the `.r-*` utility classes or wrap them in components.
4. Use pre-built icons from `ui_kits/web_app/icons.jsx` or inline Lucide SVGs with 1.5px stroke.
5. Mirror the demo copy style — sentence case, terse, second person, no emoji. Generic names (Sofia Davis, Acme Inc).

## Production-code workflow

1. Extract tokens from `colors_and_type.css` into your app's own CSS variable file (or Tailwind theme).
2. Install `lucide-react` (or equivalent).
3. Build components by replicating the CSS classes in `components.css` as Tailwind classes or styled-components — see `ui_kits/web_app/components.jsx` for React patterns.
4. The `ui_kits/web_app/` folder is an educational reference for how pieces fit together — not a copy-paste target.

## Canonical demo copy (lift from these)

- Form labels: `Email`, `Password`, `Name`, `Bio`
- Buttons: `Continue`, `Save changes`, `Deploy`, `Add customer`, `Sign in`, `Cancel`
- People: `Sofia Davis`, `Jackson Lee`, `Olivia Martin`, `Isabella Nguyen`, `William Kim`
- Companies: `Acme Inc`
- Products: `Pro`, `Team`, `Free`
- States: `Active`, `Pending`, `Inactive`, `Paid`, `Unpaid`, `Shipped`
