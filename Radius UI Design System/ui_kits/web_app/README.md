# Radius UI — Web App Kit

A realistic web-app shell built from the Radius UI components. Demonstrates sidebar navigation, dashboard metrics, a data table, dialogs and command menu — all wired to the design tokens in `colors_and_type.css`.

## Run

Open `index.html`. All state is in-memory (React + Babel inline).

## Screens (click-through)

1. **Dashboard** — KPI cards, line chart, recent activity
2. **Customers** — data table with filtering, selection, bulk actions, pagination
3. **Settings** — form sections with inputs, switch, radio, avatar upload

Use the **⌘K** shortcut for the command palette.

## Files

- `index.html` — entrypoint, mounts `<App/>`
- `App.jsx` — top-level routing + state
- `Sidebar.jsx`, `Topbar.jsx` — app chrome
- `Dashboard.jsx`, `Customers.jsx`, `Settings.jsx` — pages
- `components.jsx` — shared primitives (Button, Card, Badge, etc.)
- `icons.jsx` — Lucide icon React components
