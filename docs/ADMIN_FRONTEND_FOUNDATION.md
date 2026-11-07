# Zuena Cakes & Decor — Admin Portal Frontend Foundation (Phase 4.1 & Phase 4.2)

## 1. Executive Summary & Architecture Overview

This document serves as the technical reference, architectural guide, and developer handoff manual for the **Zuena Cakes & Decor Admin Portal Frontend Foundation (Phase 4.1 & Phase 4.2)**.

The admin portal operates within the existing React + Vite + Tailwind CSS frontend application (`frontend/`). It provides a cohesive, brand-aligned administrative application shell with **hybrid desktop navigation** (expanded by default with collapsible state) and an **Overview workspace** summarizing the four primary business management areas without bloated SaaS dashboard cards or fake metrics:

1. **Orders**
2. **Custom Cake Requests**
3. **Decoration Enquiries**
4. **Catalogue**

```
frontend/
├── src/
│   ├── admin/
│   │   ├── components/
│   │   │   ├── layout/
│   │   │   │   ├── AdminHeader.jsx          # Context header, breadcrumbs, mobile trigger
│   │   │   │   └── AdminSidebar.jsx         # Hybrid desktop sidebar (expanded/collapsed) & mobile drawer
│   │   │   └── ui/                          # Shared reusable UI component library
│   │   │       ├── AdminButton.jsx          # Button or Link with auto icon resolution
│   │   │       ├── AdminDataTable.jsx       # Semantic data table with auto empty-state detection
│   │   │       ├── AdminEmptyState.jsx      # Empty state container with auto icon resolution
│   │   │       ├── AdminIcon.jsx            # Centralized SVG icon utility with size & className
│   │   │       ├── AdminInput.jsx           # Controlled text input with auto icon resolution
│   │   │       ├── AdminModal.jsx           # Accessible dialog with focus trap & escape listener
│   │   │       ├── AdminPageHeader.jsx      # Standard page title, subtitle & action slot
│   │   │       ├── AdminSelect.jsx          # Controlled dropdown select with chevron
│   │   │       ├── AdminStatusBadge.jsx     # Status indicators supporting tone & variant
│   │   │       ├── AdminTextarea.jsx        # Controlled textarea with error styling
│   │   │       └── index.js                 # Barrel exports for shared UI components
│   │   ├── navigation/
│   │   │   └── adminNavigation.js           # Central navigation config array
│   │   └── pages/                           # Admin entry point and module pages
│   │       ├── AdminLoginPlaceholderPage.jsx # Standalone login preview destination
│   │       ├── CataloguePlaceholderPage.jsx # Catalogue management entry point
│   │       ├── CustomCakeRequestsPlaceholderPage.jsx # Custom requests entry point
│   │       ├── DecorationEnquiriesPlaceholderPage.jsx # Decor enquiries entry point
│   │       ├── OrdersPlaceholderPage.jsx    # Orders management entry point
│   │       ├── OverviewPage.jsx             # 3-section Overview workspace
│   │       └── index.js                     # Barrel exports for admin pages
│   ├── layouts/
│   │   ├── AdminLayout.jsx                  # Hybrid layout shell coordinating sidebar collapse state
│   │   └── PublicLayout.jsx                 # Public customer storefront layout
│   └── App.jsx                              # Central router with wildcard sub-route delegation
```

---

## 2. Design System Conventions & Strict Restrictions

The admin portal inherits the brand identity established by the public storefront. It feels like an authentic, high-end internal tool designed specifically for Zuena Cakes & Decor, **not** a generic SaaS dashboard.

### A. Brand Color Tokens
Defined in `frontend/src/index.css` via Tailwind `@theme`:

| Token | Hex Value | Usage |
| :--- | :--- | :--- |
| **Primary Gold** | `#DEAC4B` | Primary actions, key figures, active navigation indicator, brand headings |
| **Gold Highlight** | `#FBD46D` | Hover states, focal accents, active borders |
| **Champagne Gold** | `#EFC767` | Secondary accents, table column titles, badge highlights |
| **Bronze** | `#A36733` | Subdued borders, secondary badges |
| **Deep Amber** | `#9C6230` | Muted warning tones, dark accent outlines |
| **Dark Canvas** | `#141210` | Main application background surface |
| **Dark Surface** | `#191614` | Sidebar, modal panels, table surfaces |
| **Brand White** | `#FFFFFF` | Primary text headings, contrasting icons |

### B. Typography Conventions
- **Headings & Brand Title**: `font-serif` (`Playfair Display`, serif). Use for `AdminPageHeader` titles, section titles, and modal headers.
- **Body, UI Controls, Tables & Navigation**: `font-sans` (`Lato`, sans-serif). Use for form inputs, table data, navigation links, and descriptions.
- **Identifiers, Codes & Metadata**: `font-mono` (monospace). Use for order references, timestamps, category tags, and status slugs.

### C. Aesthetic Boundaries (Non-Negotiable)
When developing module features, you must **NEVER** introduce:
- ❌ **Cards on the Overview page** (Overview strictly uses aligned columns, typography, and thin horizontal separators)
- ❌ **Glassmorphism** (`backdrop-blur-*` overlays)
- ❌ **Gradient backgrounds** (`bg-gradient-to-*` hero banners or buttons)
- ❌ **Glow effects** (`shadow-[0_0_..._#DEAC4B]`)
- ❌ **AI-generated visual artifacts** or decorative floating orbs
- ❌ **Decorative charts, graphs or fake revenue graphs**
- ❌ **Generic SaaS cards** with fake percentage badges
- ❌ **External icon libraries** (`lucide-react`, `heroicons`, font-awesome). Always use `AdminIcon.jsx`.

---

## 3. Overview Page Architecture (Phase 4.2)

The Overview page (`/admin/overview`) comprises exactly three primary sections:

### SECTION A — Welcome Header
- **Dynamic Greeting**: Time-based greeting based on user's browser local time:
  - `05:00–11:59`: "Good morning!"
  - `12:00–16:59`: "Good afternoon!"
  - `17:00–04:59`: "Good evening!"
- **Current Date**: Dynamically formatted using native `Intl.DateTimeFormat` (e.g., "Saturday, 7 November 2026").
- **Message**: "Welcome to your Zuena Cakes & Decor workspace."

### SECTION B — Business Overview
- Displays four compact business totals horizontally on desktop (2-column on mobile) separated by thin dividers (`divide-stone-800`):
  1. **Total Orders**: `—` (Awaiting module sync; not fake zeros)
  2. **Total Custom Cake Requests**: `—` (Awaiting module sync)
  3. **Total Decoration Enquiries**: `—` (Awaiting module sync)
  4. **Total Catalogue Products**: `37` (Verified live count from `frontend/src/data/creationsData.js`)
- **Strictly Card-Free**: Uses pure typography, gold key numbers (`#DEAC4B`), and Lato labels without widget boxes or background cards.

### SECTION C — Recent Submissions
- A single combined table rendering the latest submissions from Orders, Custom Requests, and Decoration Enquiries.
- Columns: `Date`, `Reference`, `Type`, `Customer`.
- Directly renders an `AdminEmptyState` when empty.
- When populated, sorts by submission date, newest first.

---

## 4. Shared Data Integration Contracts

To maintain complete architectural decoupling between the Overview and individual feature modules, the Overview page accepts clean, standardized data inputs.

```typescript
interface OverviewDataContract {
  totalOrders?: number | string; // e.g. 14 or '—'
  totalCustomRequests?: number | string; // e.g. 8 or '—'
  totalDecorationEnquiries?: number | string; // e.g. 5 or '—'
  totalProducts?: number; // Defaults to live creationsData.js count (37)
  recentSubmissions?: Array<{
    date: string;       // e.g. "2026-11-07"
    reference: string;  // e.g. "ORD-2026-0042" or "REQ-2026-0018"
    type: string;       // "Order" | "Custom Cake" | "Decoration"
    customer: string;   // e.g. "Brenda Namubiru"
  }>;
}
```

Module developers can provide these totals and recent submissions through a shared service or context when backend/persistence integration is introduced, with zero changes required to the Overview presentation logic.

---

## 5. Hybrid Navigation (Desktop & Mobile)

The `AdminSidebar` supports a hybrid state:

### Desktop Navigation
- **Expanded (Default)**: Width `w-64`. Displays the Zuena Cakes logo, business identity, "Staff Operations" badge, full module labels, and a collapse toggle button.
- **Collapsed**: Width `w-20`. Displays the compact brand mark, centered navigation icons, accessible hover tooltips (`title` and `aria-label`), active route indicators, and an expand toggle button.
- **Persistence**: Remembers desktop collapse preference via `localStorage` key `zuena_admin_sidebar_collapsed`.
- **Layout Coordination**: `AdminLayout.jsx` automatically adjusts content padding (`lg:pl-64` vs. `lg:pl-20`) with smooth transitions.

### Mobile Navigation
- Independent responsive drawer (`w-72 max-w-[85vw]`) triggered by the hamburger icon in `AdminHeader`.
- Automatically dismisses upon clicking any navigation link.
- Handles keyboard `Escape` to close.
- Locks `document.body.style.overflow` while open and restores it upon closing or unmounting.

---

## 6. Shared Admin UI Component Library & Exact API Reference

All components reside in `frontend/src/admin/components/ui/` and can be imported directly:

```jsx
import {
  AdminButton,
  AdminInput,
  AdminSelect,
  AdminTextarea,
  AdminDataTable,
  AdminStatusBadge,
  AdminEmptyState,
  AdminPageHeader,
  AdminModal,
  AdminIcon,
} from '../components/ui';
```

### Component Reference & Prop Specifications

#### 1. `AdminPageHeader`
Standardizes the header section for all admin views.
```jsx
<AdminPageHeader
  eyebrow="Orders Management"
  title="Customer Orders"
  subtitle="Manage and fulfill customer orders placed through the public catalogue."
  actions={
    <AdminButton variant="primary" icon="orders">
      Export Orders
    </AdminButton>
  }
/>
```

#### 2. `AdminButton`
Accessible button supporting interactive actions or client-side navigation (`to` prop). Automatically resolves string icon names through `AdminIcon`.
```jsx
<AdminButton
  variant="primary"   // 'primary' | 'secondary' | 'ghost' | 'danger'
  size="md"           // 'sm' | 'md' | 'lg'
  icon="search"       // String name from AdminIcon OR ReactNode
  iconPosition="left" // 'left' | 'right'
  to="/admin/orders"  // Optional: renders React Router Link when provided
  disabled={false}
  onClick={handleClick}
>
  Search Records
</AdminButton>
```

#### 3. `AdminInput`
Controlled input with accessible labels, hint text, error states, and leading icons (auto-resolves string icon names).
```jsx
<AdminInput
  label="Customer Phone"
  placeholder="+256 700 000000"
  value={phone}
  onChange={(e) => setPhone(e.target.value)}
  error={errors.phone}
  hint="Include country code for WhatsApp notification"
  icon="search" // String name from AdminIcon OR ReactNode
  required
/>
```

#### 4. `AdminSelect`
Dropdown select with styled dark background, gold focus ring, and built-in SVG chevron.
```jsx
<AdminSelect
  label="Fulfillment Status"
  value={status}
  onChange={(e) => setStatus(e.target.value)}
  options={[
    { value: 'all', label: 'All Statuses' },
    { value: 'pending', label: 'Pending Payment' },
    { value: 'confirmed', label: 'Confirmed' },
  ]}
/>
```

#### 5. `AdminStatusBadge`
Subtle pill badge for state indication. Supports both `tone` and `variant` props.
```jsx
<AdminStatusBadge tone="gold">In Production</AdminStatusBadge>
<AdminStatusBadge tone="green">Delivered</AdminStatusBadge>
<AdminStatusBadge tone="amber">Pending Review</AdminStatusBadge>
<AdminStatusBadge tone="red">Cancelled</AdminStatusBadge>
<AdminStatusBadge tone="blue">Catalogue Active</AdminStatusBadge>
<AdminStatusBadge tone="purple">Consultation</AdminStatusBadge>
<AdminStatusBadge tone="gray">Draft</AdminStatusBadge>
```

#### 6. `AdminEmptyState`
Clean container for empty tables, search with 0 results, or uninitialized views. Automatically resolves string icon names.
```jsx
<AdminEmptyState
  icon="orders" // String name from AdminIcon OR ReactNode
  title="No Orders Found"
  description="No orders currently match the selected filter criteria."
  action={
    <AdminButton variant="secondary" onClick={resetFilters}>
      Clear Filters
    </AdminButton>
  }
/>
```

#### 7. `AdminDataTable`
Semantic HTML table wrapper with responsive horizontal overflow scroll, dark header surfaces, and automatic empty state display.
- **Auto Empty-State Detection**: If `data` is passed as `[]` (or `isEmpty={true}`), the component directly renders `emptyState` without an awkward empty table header.
- **Row Rendering**: Supports either `renderRow={(item, index) => ...}` with `data`, or explicit `children`.

#### 8. `AdminModal`
Accessible dialog with backdrop dismiss, body scroll locking, Escape key listener, and keyboard Tab focus trap.

#### 9. `AdminIcon`
Centralized SVG icon utility. Supports both `size` (number in px) and `className`. Available icon keys:
`overview`, `orders`, `cake`, `decor`, `catalogue`, `menu`, `close`, `search`, `filter`, `chevron-right`, `external-link`, `check`, `alert`, `user`, `arrow-left`.

---

## 7. Route Organization & Wildcard Sub-Routing

Routes are centralized in `frontend/src/App.jsx` using **wildcard sub-routing (`/*`)** to protect against Git merge conflicts:

| Route Path | Handler Component | Sub-routing Mode | Description |
| :--- | :--- | :--- | :--- |
| `/admin/login` | `AdminLoginPlaceholderPage` | Standalone | Preview login and authentication explanation |
| `/admin` | `Navigate` to `/admin/overview` | Central Shell | Root redirect |
| `/admin/overview` | `OverviewPage` | Exact Leaf | Central operations landing hub |
| `/admin/orders/*` | `OrdersPlaceholderPage` | **Wildcard (`/*`)** | Orders module boundary |
| `/admin/custom-cake-requests/*` | `CustomCakeRequestsPlaceholderPage` | **Wildcard (`/*`)** | Custom cake requests boundary |
| `/admin/decoration-enquiries/*` | `DecorationEnquiriesPlaceholderPage` | **Wildcard (`/*`)** | Decoration enquiries boundary |
| `/admin/catalogue/*` | `CataloguePlaceholderPage` | **Wildcard (`/*`)** | Catalogue management boundary |
| `/admin/*` | `Navigate` to `/admin/overview` | Central Shell | Fallback redirect |

---

## 8. Boundaries: File Ownership Matrix

To prevent git conflicts across concurrent feature branches, ownership is partitioned:

| File / Directory | Owner | Can Module Devs Modify? |
| :--- | :--- | :--- |
| `frontend/src/layouts/AdminLayout.jsx` | Foundation Dev | ❌ No |
| `frontend/src/admin/components/layout/*` | Foundation Dev | ❌ No |
| `frontend/src/admin/components/ui/*` | Foundation Dev | ❌ No (Report bugs to Foundation Dev) |
| `frontend/src/admin/navigation/adminNavigation.js` | Foundation Dev | ❌ No |
| `frontend/src/admin/pages/OverviewPage.jsx` | Foundation Dev | ❌ No |
| `frontend/src/App.jsx` | Foundation Dev | ❌ No (Use wildcard sub-routing) |
| `frontend/src/admin/pages/OrdersPlaceholderPage.jsx` | Orders Dev | ✅ Yes (Full ownership) |
| `frontend/src/admin/pages/CustomCakeRequestsPlaceholderPage.jsx` | Custom Cakes Dev | ✅ Yes (Full ownership) |
| `frontend/src/admin/pages/DecorationEnquiriesPlaceholderPage.jsx` | Decor Dev | ✅ Yes (Full ownership) |
| `frontend/src/admin/pages/CataloguePlaceholderPage.jsx` | Catalogue Dev | ✅ Yes (Full ownership) |

---

## 9. Backend Integration Expectations (Phase 7: Laravel Sanctum)

In Phase 7, the Laravel API backend will provide:
- RESTful endpoints for `/api/v1/admin/orders`, `/api/v1/admin/custom-requests`, `/api/v1/admin/decor-enquiries`, and `/api/v1/admin/catalogue`.
- Stateful session authentication with CSRF protection via Laravel Sanctum.
- Role-based permissions (`admin`, `staff`, `decorator`, `baker`).
- Image upload endpoints for custom cake and catalogue media.

All frontend admin state and services developed in Phase 4 should be structured with cleanly decoupled service functions (`src/services/admin/`) to facilitate seamless swapping of local mock states with live Axios/Fetch API clients.
