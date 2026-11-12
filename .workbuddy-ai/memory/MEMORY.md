# Project Memory — Tailor Management System (StitchCraft)

## Project Overview
- **Name:** StitchCraft — Tailor Management System
- **Type:** Frontend-only dummy/prototype UI (no backend)
- **Stack:** React 19 + Vite + TypeScript + Tailwind CSS v4 + React Router v7 + Lucide React
- **Theme:** Deep navy + warm gold/amber accents, dark mode support

## Key Technical Decisions
- Tailwind CSS v4 with @tailwindcss/vite plugin (uses @theme directive, not tailwind.config.js)
- Path alias `@/` -> `src/` configured in both vite.config.ts and tsconfig.app.json
- Dark mode via `.dark` class strategy on document root, persisted in localStorage
- Custom navy/gold color palette defined in index.css @theme block
- Inter + Playfair Display fonts loaded via Google Fonts

## Modules Built
1. Dashboard — stats cards, charts, recent orders table
2. Orders — filterable list, status badges, summary cards
3. Create Order — 5-step form with live summary sidebar
4. Measurements — customer-wise history, templates, add modal
5. Customers — grid view + profile page with order/measurement history
6. Inventory — fabric list, low-stock alerts, filters
7. Catalog — garment cards with style option details
8. Messages — chat UI, notifications, quick reminders
9. Settings — shop details, preferences, toggles

## Mock Data
- 10 customers (Indian names), 15 orders, 12 fabrics, 12 garment types, 8 measurement records, 7 messages
