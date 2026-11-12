# StitchCraft — Tailor Management System

A complete, modern, professional, and fully responsive frontend UI for a Tailor Management System (Darzi / Tailoring Shop Management). This is a **frontend-only prototype** with mock/static data — no backend, no real API calls, no authentication, no database.

Built to look and feel like a real working product, ready for client demos.

---

## Tech Stack

| Technology | Purpose |
|---|---|
| **React 19** | UI framework |
| **Vite** | Build tool & dev server |
| **TypeScript** | Type safety |
| **Tailwind CSS v4** | Styling & theming |
| **React Router v7** | Navigation |
| **Lucide React** | Icons |
| **Framer Motion** | Animations (optional) |

---

## Features

### Core Modules

1. **Dashboard** — Quick stats (total/pending/completed orders, revenue, active customers), recent orders table, orders-this-week bar chart, popular garments chart, quick action buttons.

2. **Orders Management** — Full order list with status filters (Pending, In Progress, Ready for Trial, Ready for Delivery, Delivered, Cancelled), search by customer/order ID, priority badges, delivery date tracking with urgency indicators, summary cards.

3. **Create New Order (Multi-Step Flow)** — The most detailed module:
   - **Step 1:** Customer selection (search existing or create new)
   - **Step 2:** Garment type selection (12 Indian garment types with visual cards)
   - **Step 3:** Detailed measurements (17 fields — upper body + lower body)
   - **Step 4:** Fabric selection + style options (collars, cuffs, pockets, closures)
   - **Step 5:** Delivery date, trial date, priority, advance payment, notes
   - **Live order summary** sidebar showing all selections + price calculation in real-time

4. **Measurements Module** — Customer-wise measurement history, full upper/lower body measurement display, measurement templates, add new measurement records via modal.

5. **Customers** — Customer grid with search, customer profile page showing contact info, measurement history, past orders, total spent, stats summary. Add/edit customer via modal.

6. **Inventory / Fabric Management** — Fabric list with filters by type, stock quantity, price per meter, supplier info, low-stock alerts with visual warnings, stock value summary, add fabric modal.

7. **Garment Catalog** — 12 garment types with visual cards, style variations (collar types, cuff types, pocket styles, closures, necklines), price ranges, detailed view modal.

8. **Messaging / Communication** — Internal chat interface with customers, notification feed, quick action buttons (trial reminder, delivery reminder, measurement confirmation), conversation list.

9. **Settings** — Shop details, logo placeholder, measurement units (inches/cm), currency, tax rate, notification preferences (toggles), dark mode toggle, profile section.

### UI Features

- **Dark mode** — Full dark/light theme toggle with persistence (localStorage)
- **Responsive** — Works on mobile, tablet, and desktop. Collapsible sidebar.
- **Status badges** — Color-coded for each order status and priority level
- **Toast notifications** — Success, error, and info toasts for user actions
- **Loading skeletons** — Skeleton components available for loading states
- **Empty states** — Friendly empty state illustrations/messages throughout
- **Animations** — Subtle animate-in/fade-in transitions
- **Premium theme** — Deep navy + warm gold/amber accents, Playfair Display + Inter fonts

### Mock Data

- **10 sample customers** with Indian names, contact info, cities, and order history
- **15 sample orders** across all statuses with realistic garments and measurements
- **12 fabric types** with stock levels and pricing
- **12 garment types** (Shirt, Trouser, Kurta, Pathani, Sherwani, Suit, Blazer, Salwar Suit, Lehenga, Coat, Waistcoat, Pant)
- **8 measurement records** with full upper/lower body values
- **7 messages/notifications** for the messaging module

---

## Getting Started

### Prerequisites

- **Node.js** 18+ (recommended: 20+)
- **npm** or **yarn**

### Installation

```bash
# Clone the project (or extract the folder)
cd trailer_menagmente

# Install dependencies
npm install
```

### Run Development Server

```bash
npm run dev
```

The app will start at **http://localhost:5173**

### Build for Production

```bash
npm run build
```

Output will be in the `dist/` folder.

### Preview Production Build

```bash
npm run preview
```

---

## Project Structure

```
src/
├── components/
│   ├── ui/              # Reusable UI components
│   │   ├── Avatar.tsx
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── EmptyState.tsx
│   │   ├── Input.tsx
│   │   ├── Modal.tsx
│   │   ├── Skeleton.tsx
│   │   ├── StatusBadge.tsx
│   │   └── Toast.tsx
│   └── layout/          # Layout components
│       ├── Layout.tsx
│       ├── Sidebar.tsx
│       └── TopBar.tsx
├── context/
│   └── ThemeContext.tsx # Dark/light theme provider
├── data/
│   └── mockData.ts      # All mock/static data
├── lib/
│   └── utils.ts         # Utility functions (cn, formatDate, formatCurrency, etc.)
├── pages/
│   ├── Dashboard.tsx
│   ├── Orders.tsx
│   ├── CreateOrder.tsx       # Multi-step order creation flow
│   ├── Measurements.tsx
│   ├── Customers.tsx
│   ├── CustomerProfile.tsx
│   ├── Inventory.tsx
│   ├── Catalog.tsx
│   ├── Messages.tsx
│   └── Settings.tsx
├── types/
│   └── index.ts         # TypeScript type definitions
├── App.tsx              # Root component with routes
├── main.tsx             # Entry point
└── index.css            # Global styles & Tailwind theme
```

---

## Theme & Colors

| Color | Hex | Usage |
|---|---|---|
| Navy 900 | `#0a1f33` | Sidebar background, dark mode base |
| Navy 800 | `#102a43` | Primary dark surfaces |
| Gold 500 | `#d4881a` | Primary accent, buttons, highlights |
| Gold 400 | `#e6a02f` | Hover states, icons |
| Gold 300 | `#ecb75e` | Light accents |

---

## Notes

- This is a **dummy/prototype** — all data is static mock data. No data persists between sessions.
- The "Create Order" flow shows a success toast but does not actually save the order.
- All customer actions (add, edit, message) are visual only.
- Dark mode preference is saved in `localStorage`.
- The sidebar is collapsible on desktop and slide-out on mobile.

---

## License

This is a demo project for client presentation purposes.
