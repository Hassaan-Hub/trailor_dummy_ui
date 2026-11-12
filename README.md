# StitchCraft — Tailor Management System (Mobile-First)

A polished, **mobile-first** frontend prototype of a Tailor / Darzi shop management app. Built as a client demo — **no backend, no API calls, no authentication, no database**. All data is static mock data.

## Tech Stack

- React 19 + Vite + TypeScript
- Tailwind CSS v4 (`@tailwindcss/vite`, `@theme` directive)
- React Router v7
- Framer Motion (page transitions)
- Lucide React (icons)
- clsx + tailwind-merge (`cn()` helper)

## Run locally

```bash
npm install
npm run dev
```

Open the printed URL (usually `http://localhost:5173`). For the best experience, open your browser's DevTools device toolbar and set a phone viewport (375px–430px), or just narrow the window. The app is designed for mobile widths and centers nicely on larger screens.

Other commands:

```bash
npm run build     # type-check + production build
npm run preview   # preview the production build
```

## Screens

| Route | Screen |
|---|---|
| `/` | Home / Dashboard — greeting, stats, recent orders (horizontal scroll), quick actions |
| `/orders` | Orders — filter chips, search, order cards, FAB |
| `/create-order` | **5-step New Order flow** — Customer → Garment → Measurements → Fabric & Style → Review & Confirm |
| `/measurements` | Measurements — customer list, saved measurement cards, 6 standard templates, add form |
| `/customers` | Customers — searchable list, add customer sheet |
| `/customers/:id` | Customer profile — contact, stats, measurements, order history |
| `/more` | More / Profile — dark mode toggle, links to all sub-screens |
| `/inventory` | Fabric inventory — filters, low stock alerts, stock bars |
| `/catalog` | Garment catalog — 12 garment types with style options |
| `/notifications` | Notifications — read/unread, quick reminder templates |
| `/settings` | Settings — shop details, units, tax, theme, toggles |

## Mobile UX details

- **Bottom navigation** with a raised center "New Order" action button
- **Safe area** handling via `env(safe-area-inset-*)` and `viewport-fit=cover`
- **Sticky bottom CTA** in the multi-step order flow
- **Progress indicator** across all 5 steps
- **Bottom sheets** instead of desktop modals (native-feeling)
- **Page transitions** via Framer Motion
- **Pull-to-refresh** on Orders, Customers and Measurements lists (swipe down at the top)
- **Skeleton loaders**, empty states, toast messages, status badges with colors
- **Touch-friendly** tap targets, `active:scale` press feedback, no iOS input zoom
- **Light / dark mode** with `localStorage` persistence

## Theme

Deep navy (`#0F172A`) + warm gold/amber (`#F59E0B`) on soft white/gray surfaces. Fonts: Inter (UI) + Playfair Display (display accents).

## Mock data

10 Indian customers, 15 orders across all statuses, 12 fabrics, 12 garment types, 8 measurement records, 7 notifications, 6 measurement templates. All in `src/data/mockData.ts`.

> This is a prototype: forms show success toasts but do not persist anything.
