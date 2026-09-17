# Protein Tracker

A mobile-first PWA for logging daily protein (and fat/carbs/sugar) instead of a spreadsheet.

- **Today** — quick-add food from your library (grams pre-filled with your usual portion) or a custom entry for anything not in the library (e.g. a restaurant meal you estimated elsewhere). Daily totals at the top.
- **Library** — your personal foods with macros per 100g and a usual portion size; add, edit, or delete freely.
- **History** — every past day is kept (not deleted), browsable with per-day totals and entries.

Data is stored locally on-device (localStorage); no backend or account needed.

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

Installable as a PWA (add to home screen) via `vite-plugin-pwa`.
