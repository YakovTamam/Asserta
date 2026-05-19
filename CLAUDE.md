# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev    # Dev server on :3000
npm run build  # Production build
npm run lint   # Next.js linter
```

Node ≥ 19, Next.js 15, React 19.

---

## Architecture Overview

Bilingual (Hebrew/English, RTL) jewelry e-commerce built on **Next.js App Router**.  
Two distinct worlds share the same repo: a large public storefront (template-based) and a fully custom admin panel.

### Route Groups

Next.js route groups (`(parentheses)`) organise the public site without affecting URLs:

| Group | URL pattern | Contents |
|---|---|---|
| `(homes)/` | `/home-{2-6}` | Homepage variants |
| `(shop-pages)/` | `/shop-*` | 11 shop layout variants |
| `(products-single)/` | `/{product-type}/[id]` | 18 product page layouts |
| `(otherPages)/` | `/about-us`, `/checkout`, etc. | Misc pages |
| `(blogs)/` | `/blog-*` | Blog list + single |
| `(account)/` | `/account-*` | Account pages |
| `admin/` | `/admin/*` | Protected admin panel |

`app/layout.js` (root) wraps **everything** — including all modals (`<Login>`, `<ShoppingCart>`, etc.) and the mobile `<Toolbar>`. **Exception**: `<SiteOnlyComponents>` hides `<Toolbar>` and `<AccessibilityWidget>` on `/admin/*` routes by checking `usePathname()`.

---

## Supabase Clients — Three Variants

Always pick the right client for the context:

| File | Export | Key used | Use when |
|---|---|---|---|
| `lib/supabase-server.js` | `supabaseAdmin` | `SUPABASE_SECRET_KEY` (service role) | API routes (`app/api/*`) |
| `lib/supabase-browser.js` | `createClient()` | `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | `"use client"` components |
| `lib/supabase-ssr.js` | `createClient()` (async) | `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` + cookies | Server Components, middleware |

---

## API Routes (`app/api/`)

All routes are server-side and use `supabaseAdmin`.

### `GET /api/products`
Optional query params: `?featured=true` | `?category={slug}`

Returns a **normalised** product array. Raw Supabase rows have inconsistent field names (e.g. `category_id` vs `category_ids`); the API resolves both and always returns:

```js
{
  id, title, title_he, title_en, slug,
  imgSrc, hoverImgSrc, images[],
  price, oldPrice,
  badge, outOfStock, featured,
  categoryIds[], categories[{ id, name_he, name_en, slug }],
  category,       // first category slug
  categoryName,   // first category name_he
  description,
  specs[]         // [{ icon_url, value, label }]
}
```

### `GET /api/categories`
Returns all categories ordered by `name_he`. Fields: `id, name_he, name_en, slug, image_url`.

### `POST /api/upload`
Body: `FormData` with key `file`.  
Uploads to Cloudinary (folder `asserta/products`), returns `{ url: string }`.  
Used by both the products and categories admin pages for all image uploads.

---

## Database Schema (Supabase / PostgreSQL)

```sql
categories  (id, name_he, name_en, slug UNIQUE, image_url, created_at)
products    (id, title_he, title_en, slug, description_he, description_en,
             price, old_price, badge, in_stock, featured,
             images text[], category_id uuid FK, category_ids uuid[],
             specs jsonb DEFAULT '[]', created_at)
customers   (id, full_name, email, phone, created_at)
orders      (id, customer_id FK, status, total_amount, items jsonb,
             shipping_address jsonb, notes, created_at)
```

`specs` shape: `[{ icon_url: string, value: string, label: string }]`  
`category_ids` is the **authoritative** field; `category_id` is the legacy single-value FK kept for backwards compatibility. The API handles both.

---

## Admin Panel (`app/admin/`)

All admin pages are `"use client"`. Direct Supabase queries via `supabase-browser.js`.  
Authentication is enforced in `middleware.js` — unauthenticated requests to `/admin/*` redirect to `/admin/login`.

### Layout shell — `AdminNav`

`components/admin/AdminNav.jsx` + `AdminNav.module.css`

- **Desktop (≥768px)**: Fixed 220px dark sidebar on the right (RTL). Nav items are always expanded, showing section labels + child links.
- **Mobile (<768px)**: Sticky top bar + hamburger → slide-in drawer (280px, `transform: translateX`) with accordion sections + overlay. Fixed bottom nav with 5 quick links + ☰ menu button.
- Body scroll is locked (`overflow: hidden`) while the drawer is open.
- Closing triggers: overlay click, any link click (`useEffect` on `pathname`), × button.

### Nav structure (defined in `NAV` array in AdminNav.jsx)

```
📊 דשבורד          /admin
💍 מוצרים
   ├─ כל המוצרים   /admin/products
   └─ הוספת מוצר   /admin/products?new=true
🏷️ קטגוריות
   ├─ כל הקטגוריות /admin/categories
   └─ הוספת קטגוריה /admin/categories?new=true
📦 הזמנות
   ├─ כל ההזמנות   /admin/orders
   ├─ ממתין לאישור  /admin/orders?status=pending
   ├─ שולם          /admin/orders?status=paid
   └─ נשלח          /admin/orders?status=shipped
📖 מדריך למשתמש   /admin/docs
```

Pages detect `useSearchParams()` to react to `?new=true` / `?status=` on mount.

### Products page — 3-step wizard

`app/admin/products/page.jsx` is a single client component that toggles between `view === "list"` and `view === "form"`.

| Step | Fields |
|---|---|
| 0 — תמונות | Multi-image upload via `/api/upload` |
| 1 — פרטים | `title_he`*, `title_en`, `slug` (auto), `price`*, `old_price`, `badge`, `in_stock` toggle, `featured` toggle |
| 2 — קטגוריות ומפרטים | Category pill multi-select (required — save is blocked without one), specs editor, `description_he` |

`emptyForm` shape mirrors the DB columns. `openEdit(product)` maps raw Supabase rows back to form state.

Design tokens live in a `C` object at the top of the file (primary, bg, card, border, muted, success, danger, label style, input style, card style).

### Categories page
Simple CRUD. Image uploaded via `/api/upload`. Slug auto-generated from `name_he` on create, editable. `?new=true` auto-opens the form via `useSearchParams`.

### Orders page
Card list with status filter tabs. Clicking a card expands an `<OrderDetail>` panel above the list with inline status-change buttons. `?status=X` pre-sets the filter tab.

---

## Styling

| Layer | Where | Used for |
|---|---|---|
| SCSS (`public/scss/`) | Public storefront | Bootstrap-based; component partials in `component/` |
| CSS Modules (`*.module.css`) | AdminNav only | Scoped responsive layout |
| Inline `style` props | All admin pages | Defined via `C` design-token object per file |

SCSS breakpoint mixin: `@include res(xl)` targets below 1200px (mobile/tablet). AdminNav uses a raw `@media (max-width: 767px)` in its module.

Bootstrap RTL is loaded conditionally in `app/layout.js`: `bootstrap.rtl.min.css` for Hebrew, `bootstrap.min.css` otherwise.

---

## i18n

`next-intl` with messages in `/messages/{en,he}.json`. Default locale: `he`. Locale detected from cookie in `i18n/request.js`. Direction set in root layout: `dir={isRTL ? "rtl" : "ltr"}`.

---

## Environment Variables

```bash
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY   # anon key
SUPABASE_SECRET_KEY                     # service_role key — server only
CLOUDINARY_CLOUD_NAME
CLOUDINARY_API_KEY
CLOUDINARY_API_SECRET
```

---

## Key Patterns

- **Public shop pages** fetch from `/api/products` client-side (`useEffect`). Never query Supabase directly from public pages.
- **Admin pages** query Supabase directly via browser client; no intermediate API layer needed since the admin owns the data.
- **Image uploads** always go through `/api/upload` → Cloudinary. Store only the returned `url` string in the DB.
- **Multi-category**: always write `category_ids` (array). Set `category_id` to `category_ids[0]` for legacy compatibility.
- **Slug generation**: `value.trim().toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]/g, "")` — used in both products and categories.
