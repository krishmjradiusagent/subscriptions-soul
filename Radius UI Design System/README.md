# Radius UI Design System

> **Radius UI v2.0** — a shadcn/ui-inspired design system based on Tailwind v4. Originally crafted by Obra Studio, here recreated and extended into a working design-system repository. Neutral-driven, intentionally minimal, ready to be themed.

## What this is

Radius UI is a **production-ready shadcn/ui kit** built on Tailwind v4's color tokens and the Geist + Inter type pairing. The system is deliberately small: a complete neutral scale, one brand accent, semantic intents (destructive / success / warning / info), and the full Tailwind palette available for charts and incidental color. It contains 50+ component recipes, screen examples, and a chart system.

There is **one product surface**: a generic web/SaaS app shell (sidebar + content + data-table / dialog / drawer patterns). Sample "Internal Components" frames hint at use in CRM / prospecting / admin tools, but the core kit is product-agnostic and meant to be customized per-brand.

## Sources

- **Figma file** — `Radius UI - v2.0.fig` (mounted, read-only). 60 pages: foundations (Colors, Typography, Shadows, Icons), 50+ component pages (Accordion → Tooltip), Charts (7 frames), 13 Screen Examples, 9 Internal Component templates, 6 Logos.
- **Repo** — `krishmjradiusagent/collaborators` (referenced; not pulled — components reconstructed from Figma JSX).
- **Icons** — Lucide (`lucide-icons/lucide`) — used via CDN.
- **Uploaded logos** — `uploads/logo.svg`, `logo_dark.svg`, `logo-1..4.svg`, `logo.png` — the Radius wordmark in white and black. Copied into `assets/`.

## Index

| Path | Purpose |
|------|---------|
| `colors_and_type.css` | Color tokens, type scale, spacing, radii, shadows, utility classes |
| `components.css` | Component recipes — `.r-btn`, `.r-badge`, `.r-input`, `.r-card`, `.r-alert`, etc. |
| `fonts/` | Inter (variable + static). Geist + Geist Mono come from Google Fonts |
| `assets/` | Radius wordmark logos (light + dark + PNG) |
| `preview/` | Per-token / per-component HTML cards rendered in the Design System tab |
| `ui_kits/web_app/` | Full working dashboard — sidebar, data table, settings, ⌘K palette |
| `SKILL.md` | Agent-Skill manifest — drop into Claude Code as a portable skill |
| `README.md` | This file |

---

## CONTENT FUNDAMENTALS

Radius UI is documentation-as-product: copy is **terse, second-person, sentence-case**, and reads like clean shadcn/Tailwind docs.

- **Voice** — Direct, declarative. "Displays a button or a component that looks like a button." No marketing fluff.
- **Person** — Second person ("your project's type style"). "We" appears only in author/credit notes.
- **Casing** — Sentence case for headings, labels, and button text ("View documentation", "Add to library").
- **Length** — One-sentence component descriptions. Notes are 1–3 sentences max.
- **Punctuation** — Periods on full sentences, none on labels or button text.
- **Emoji** — None. Iconography is exclusively Lucide / strokes.
- **Examples** — `Email`, `Password`, `Continue`, `Add to library`, `View documentation`, `Sign in with Google`, `Acme Inc`, `Sofia Davis`. Generic, neutral, demo-friendly.
- **Vibe** — Engineering-led, calm, "use as-is or theme it". Reads like the Stripe / Vercel / Linear docs school.

---

## VISUAL FOUNDATIONS

### Color
- **Neutral-first.** ~80% of every screen is `neutral-50` → `neutral-950`. Black text on white background, neutral borders, neutral muted surfaces.
- **One brand accent**: indigo `#5A5FF2` (`--primary`). Used sparingly — for primary CTAs and active states only.
- **Full Tailwind v4 palette** is included — Red, Blue, Slate, Zinc, Stone, Sky, Orange, Lime, Yellow, Indigo, Amber, Emerald, Teal, Cyan, Violet, Purple, Pink, Rose, Green — but only the neutral scale + 5 red values are "in use" per the kit's own annotation.
- **Documentation accent**: a violet `#9747FF` is used **only for documentation overlays** (dashed bracket frames in the Figma kit). Never in product UI.

### Typography
- **Geist** for everything except control labels — display, body, paragraph.
- **Inter** for control labels (button, badge, tabs) at -2.5% letter-spacing.
- **Geist Mono** for code / kbd / numerics.
- Tight, system-y. Large headings use -1% letter-spacing; H2/H3 use -2%.

### Spacing
4px base unit. Components are tightly packed: button padding `6px 12px` (sm) / `8px 16px` (default), card padding `24px`, section padding `32–64px`. Inline gap commonly `8px`.

### Backgrounds
- **Mostly white.** No gradients, no patterns, no full-bleed imagery in the core kit.
- The "Note about fonts" callouts are the lone exception — flat `#BFDBFE` (blue-200) blocks for documentation, not product use.
- The auth screen example uses a `--muted` (`#F5F5F5`) split panel — that's the limit of background variety.

### Animation & motion
- **Calm.** No bounce, no scale-up. Default expectation: 150ms ease-in-out for hover/state. Tooltips fade. Dialogs fade + 4px slide.
- No parallax, no spring physics, no entrance choreography.

### States
- **Hover** — Primary buttons darken (`primary` → roughly 90% lightness). Secondary/ghost buttons gain `--accent` (`#F5F5F5`) background. Outline buttons add `--accent` background. Links underline.
- **Focus** — 2px `--ring` outline at 2px offset. Subtle, not loud.
- **Active/pressed** — Same as hover (no visual shrink). `aria-pressed`/data-state takes the active treatment.
- **Disabled** — 50% opacity, `pointer-events: none`. No greyed swap.

### Borders
- 1px solid `--border` (`#E5E5E5`) almost everywhere.
- Card / input / button-outline all use the same border.
- 1.5px stroke-width is the icon convention (Lucide default).

### Shadows
shadcn-style — very tight:
- `shadow-2xs`: `0 1px 0 rgba(0,0,0,0.05)` — buttons sit on this.
- `shadow-xs`: `0 1px 2px rgba(0,0,0,0.05)` — inputs, cards.
- `shadow-sm` → `shadow-2xl`: standard Tailwind v4 scale.
- **No inner shadows.** No "protection gradient" treatments. Elevation is signaled by shadow + border, never gradient.

### Capsules vs. shapes
- **Controls are pill-shaped.** Buttons, badges, kbd, tooltip chips all use `border-radius: 30px` — a strong signature of the system.
- Cards/dialogs use `12px` (`--radius-xl`).  Inputs use `6px` (`--radius-md`).
- `--radius-full` (9999px) remains the convention for avatars, progress bars, switch tracks.

### Transparency & blur
- Used **rarely**. Modal/dialog overlays use `rgba(0,0,0,0.5)` scrim, no blur. Sheet uses the same.
- Outline button has a `rgba(255,255,255,0.1)` fill (effectively transparent) so it inherits surface color.

### Imagery
- The kit ships almost no imagery. When demo content is shown (auth example), it's a **flat color block on the left, form on the right**. No photography, no illustration.
- When users add imagery, the convention is **full-saturation, neutral-leaning, no overlay**. The brand has no warm/cool/grain bias.

### Layout rules
- **Sidebar + content** is the dominant app shell.
- 64px page padding on documentation frames.
- Cards are `border + shadow-xs + 24px padding + 8px radius`. No accent borders, no colored left strips.
- Sticky headers are 64px tall, white, 1px bottom border.

---

## ICONOGRAPHY

Radius UI uses **Lucide** as its icon system — 1.5px stroke, 24×24 default canvas, currentColor stroke. This is the de-facto shadcn/ui icon set.

- **No icon font.** No icon sprite. SVG-per-icon, loaded via CDN or per-component.
- **Stroke-only.** No solid/filled icons. No two-tone.
- **Sizing** — `16px` inside controls (button, input), `20px` in nav/sidebar, `24px` standalone.
- **Color** — `currentColor`. Inherits text color (`--foreground` or `--muted-foreground`).
- **No emoji.** None in the kit, none in copy. The Figma file uses a "square-dashed" placeholder icon (3,000+ instances) literally to mark "icon goes here" — we substitute with real Lucide icons in production.
- **No unicode-as-icon.** No checkmarks-as-glyphs. Always Lucide.

CDN load:
```html
<script src="https://unpkg.com/lucide@latest/dist/umd/lucide.js"></script>
<script>lucide.createIcons();</script>
```

---

## CAVEATS & SUBSTITUTIONS

- **Geist + Geist Mono** are loaded from Google Fonts (no local file provided). **Inter** ships locally — variable upright + italic — in `fonts/`. The variable TTFs cover weights 100–900 for both styles.
- The brand "Radius" wordmark logo (`assets/logo-radius-*.svg`) was provided by the user; the smaller wordmarks (`logo-2..4.svg`) are scaled variants of the same.
- Lucide icon set is loaded via CDN — no local sprite is generated.
- The "documentation violet" `#9747FF` from the Figma file appears only as documentation chrome (dashed bracket frames). It is not a brand accent and is not used in product UI.
