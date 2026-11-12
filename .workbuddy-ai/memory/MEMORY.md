# Project Memory — StitchCraft (Tailor Management System)

## Current State (2026-11-12)
The project was **fully rebuilt as a MOBILE-FIRST app**. The earlier desktop/sidebar version was discarded (`src/` wiped and rewritten). Do not assume the old desktop layout still exists.

- **Type:** Frontend-only prototype (no backend, no APIs, no auth, no DB). Static mock data only.
- **Target viewport:** 375–430px mobile. Native-app feel.
- **Stack:** React 19 + Vite + TypeScript + Tailwind CSS v4 (`@tailwindcss/vite`, `@theme`) + React Router v7 + Framer Motion + Lucide React + clsx/tailwind-merge.
- **Theme:** Deep navy (`#0F172A`) + warm gold/amber (`#F59E0B`) on soft white/gray. Inter + Playfair Display.

## Key Technical Decisions
- Path alias `@/` → `src/` in `vite.config.ts` and `tsconfig.app.json`.
- Tailwind v4: `@custom-variant dark (&:where(.dark, .dark *))` in `index.css`; custom navy/gold palettes in `@theme`.
- `ThemeProvider` defaults to **light** (not system preference), persisted to `localStorage` key `stitchcraft-theme`.
- `viewport-fit=cover` + `env(safe-area-inset-*)` safe-area helpers (`.safe-top-px`, `.safe-bottom-px`).
- Bottom nav with 5 items (Home, Orders, raised center "New Order", Customers, More). `/create-order` is a fullscreen route with NO bottom nav.
- Desktop modals replaced by `BottomSheet` (native-feeling). Framer Motion `AnimatePresence mode="wait"` keyed on pathname in `Layout.tsx`.
- `PullToRefresh` component (`src/components/ui/PullToRefresh.tsx`) used on Orders, Customers, Measurements.
- `ToastProvider` context with `useToast()`.

## Screens / Routes
`/` Dashboard · `/orders` · `/create-order` (5-step: Customer → Garment → Measurements → Fabric & Style → Review/Confirm, progress dots, sticky bottom CTA, "Fill sample measurements" demo helper) · `/measurements` (customer list → measurement cards, 6 templates, add sheet) · `/customers` · `/customers/:id` · `/more` · `/inventory` · `/catalog` · `/notifications` · `/settings`.

## Mock Data (`src/data/mockData.ts`)
10 Indian customers, 15 orders across 6 statuses, 12 fabrics, 12 garment types, 8 measurement records, 7 notifications, 6 measurement templates.

## Verification
`npx tsc -b --noEmit` and `npm run build` pass clean. Chrome CDP at true 390px: `scrollWidth == innerWidth` (no overflow), 5 nav items, `/create-order` navCount 0, zero console errors. Build emits only a harmless >500kB chunk warning (framer-motion + lucide).

## Note on headless Chrome screenshots
`--window-size=390,844` still yields `innerWidth: 512` (Chrome min window width). To visually test a real 390px viewport, must use CDP `Emulation.setDeviceMetricsOverride`.
