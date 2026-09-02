# PricePerUse V1

Lightweight web app built with Vite + Vanilla JavaScript. No backend, database, account system, API or AI.

## Requirements
- Node.js 20+
- npm
- VS Code (recommended)

## Run locally
```bash
npm install
npm run dev
```
Then open the local URL printed by Vite (usually http://localhost:5173).

## Production build
```bash
npm run build
npm run preview
```
The static production bundle is generated in `dist/`.

## Architecture
- `src/config/` app name and global options
- `src/core/` pure business logic and formulas (React-ready)
- `src/storage/` localStorage history
- `src/ui/` formatting/helpers
- `src/pages/` page rendering/navigation
- `src/styles/` responsive CSS

## V1 features
- Cost-per-use calculator
- Advanced costs: maintenance, consumables, resale value
- Break-even target cost/use
- Half/expected/double usage scenarios
- Compare two products
- Share calculation through URL parameters
- Local browser history (max 20)
- Responsive mobile/desktop UI
- Informational/privacy page

## Rename later
Change `APP_NAME` in `src/config/app.js`. The UI uses that central configuration value.

## Data & privacy
Calculations happen in the browser. History is stored only in browser localStorage.
