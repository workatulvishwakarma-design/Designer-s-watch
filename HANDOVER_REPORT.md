# DESIGNER WORLD (WATCH-2) — DEVELOPER HANDOVER REPORT & SYSTEM ARCHITECTURE MANUAL

**Project**: Designer World Luxury Timepieces E-Commerce & Brand Showcase  
**Client / Brand**: Designer World / Nagpal Group (Since 1948)  
**Primary Brands**: D'Signer (Luxury Swiss/Sapphire) & Escort (Everyday Precision)  
**Date of Handover**: October 2026  
**Repository Branch**: `main`  
**Node.js Engine Target**: `>= 22.12.0`  

---

## 1. Executive Summary & Website Purpose

**Designer World** is a production-grade, headless e-commerce and brand platform built for a four-generation Indian horological enterprise founded in 1948. 

The website serves three core functions:
1. **Luxury Brand Showcase**: High-aesthetic presentation of heritage collections, craftsmanship pillars, 35-year celebration milestone, and official brand story.
2. **Direct-to-Consumer (D2C) E-Commerce**: Full product catalog, multi-colorway watch selector, live inventory, shopping cart, coupon engine, pincode serviceability checker, advance COD payment handling, and online payment gateway.
3. **Retailer & Dealer Network**: Comprehensive authorized store locator mapping hundreds of verified retail touchpoints across India.
4. **Internal Admin Operations**: Robust admin dashboard for product management, store CRUD, order fulfillment, coupon creation, customer database, and analytics.

---

## 2. Core Technology Stack

| Layer | Technology | Version / Provider | Key Notes |
| :--- | :--- | :--- | :--- |
| **Framework** | Next.js (App Router) | `16.1.6` (Turbopack) | Server Components, Server Actions & Route Handlers |
| **Frontend Core** | React / React DOM | `19.2.3` | Modern hooks, transitions, and concurrent rendering |
| **Language** | TypeScript | `^5.0` | Strict typing across catalog, orders, and APIs |
| **Styling** | Vanilla CSS + Tailwind CSS | `v4` (`@tailwindcss/postcss`) | Custom HSL tokens, gold/emerald palette, Cormorant & Montserrat fonts |
| **Smooth Scrolling** | Lenis | `^1.3.17` | Hardware-accelerated luxury inertial scroll |
| **Animations** | Framer Motion | `^12.34.3` | Parallax banners, drawer reveals, and micro-interactions |
| **Database** | PostgreSQL | Neon Serverless Postgres | Connection pooling via `@prisma/adapter-pg` & `pg.Pool` |
| **ORM** | Prisma ORM | `^7.5.0` | 20+ models (Auth, Orders, Products, Stores, Coupons) |
| **Authentication** | Auth.js / NextAuth | `^5.0.0-beta.30` | Edge-compatible proxy middleware, JWT sessions, Role-based (`ADMIN`, `CUSTOMER`) |
| **State Management**| Zustand | `^5.0.11` | Client cart with `localStorage` persistence |
| **Payments** | Razorpay & Cashfree | SDKs & Custom Webhooks | Advance COD verification & full prepayment |
| **SMS / OTP** | MSG91 | REST API | Order confirmation, dispatch, and delivery SMS triggers |
| **Email Service** | Nodemailer | SMTP | Customer receipts and Atelier contact inquiries |
| **Instagram Feed** | Meta Graph API | Official Graph API | Server-side caching with graceful offline JSON fallback |

---

## 3. Architecture & Directory Structure

```plaintext
watch-2/
├── prisma/
│   └── schema.prisma            # Database schema (Auth, Orders, Stores, Products, Reviews)
├── public/
│   ├── images/                  # Static assets, logos, brand artwork, watch photography
│   │   ├── new-img/             # High-res transparent PNGs (D'Signer & Escort watches)
│   │   ├── celebration/         # 35 Years milestone artwork
│   │   └── dsigner world logo_B.png
│   └── robots.txt, sitemap.xml  # Automated SEO manifests
├── scripts/                     # Automation, data migration, and batch image processing
│   ├── seed_stores.ts           # Store seeding script for dealer network
│   ├── seed-users.ts            # Admin and staff user seeds
│   └── process_*.py             # Background removal and catalog processing scripts
├── src/
│   ├── app/                     # Next.js App Router root
│   │   ├── (admin)/             # Admin panel routes (/admin/dashboard, /admin/orders, /admin/products...)
│   │   ├── (auth)/              # Authentication routes (/login, /signup, /forgot-password)
│   │   ├── (public)/            # Core public pages (Home, About, Pillars, Contact, Legal)
│   │   ├── (user)/              # Customer account portal (/account/orders, /account/profile...)
│   │   ├── api/                 # REST API routes (auth, checkout, contact, instagram, payment...)
│   │   ├── collections/         # Dynamic collection explorer & brand-gender directories
│   │   │   ├── [collection]/    # 29 Dynamic collection view routes
│   │   │   ├── dsigner-men/     # Dedicated Men's D'Signer catalog
│   │   │   ├── dsigner-womens/  # Dedicated Women's D'Signer catalog
│   │   │   ├── Escort-men/      # Dedicated Men's Escort catalog
│   │   │   └── Escort-womens/   # Dedicated Women's Escort catalog
│   │   ├── product/[slug]/      # Interactive Product Detail Page (PDP)
│   │   ├── cart/ & checkout/    # Multi-step checkout pipeline
│   │   ├── page.tsx             # Root page (controls Under Construction vs Live Home)
│   │   └── layout.tsx           # Global Root layout (Fonts, Meta, Analytics, Toaster)
│   ├── components/
│   │   ├── instagram/           # Instagram continuous carousel feed (Homepage only)
│   │   ├── sections/            # HeaderClient (menu drawer), Footer, Hero, Brand Story
│   │   ├── ui/                  # SearchOverlay, CelebrationPopup, QuickViewModal, ChatbotWidget
│   │   ├── PublicShell.tsx      # Controls global header/footer/cart drawer rendering
│   │   └── UnderConstruction.tsx# Luxury maintenance page with inquiry form
│   ├── data/
│   │   ├── collections.ts       # 29 Collections definition with metadata, tags & banners
│   │   ├── collectionMap.ts     # Mapping rules between SKU models and collections
│   │   ├── productData.ts       # Master product grouping, variant resolution, and pricing
│   │   ├── dealers.json         # Master database of authorized retail dealers
│   │   └── instagram_cache.json # Offline fallback cache for Instagram feed
│   ├── lib/
│   │   ├── db.ts                # Neon Postgres connection pool & resilient fallback
│   │   ├── auth.ts              # NextAuth v5 server configuration & Prisma adapter
│   │   ├── auth.config.ts       # NextAuth edge-compatible middleware config
│   │   ├── imageResolver.ts     # Maps model numbers to physical filesystem PNGs
│   │   ├── instagram.ts         # Meta Graph API fetcher with fallback caching
│   │   ├── searchIndex.ts       # Client search index across all products and series
│   │   └── store/cart.ts        # Zustand cart store with pricing and quantity helpers
│   └── proxy.ts                 # Next.js edge middleware (lockdown & role protection)
```

---

## 4. Operational Modes: Under Construction vs. Live Site

The site includes a built-in, zero-downtime toggle between **Under Construction (Maintenance Mode)** and the **Full Live Website**.

### Current Status: **Under Construction Mode is ACTIVE**
In this mode:
- All public URLs (`/collections`, `/product/...`, `/about`, `/cart`) redirect automatically to `/`.
- The root URL `/` renders `src/components/UnderConstruction.tsx` (luxury dark emerald & gold theme, countdown badge, brand story, WhatsApp trigger, and contact query form).
- Header, footer, cart drawer, and shopping widgets are suppressed on `/`.
- Admin routes (`/admin`, `/login`, `/api/...`) remain **fully accessible** for staff.

### How to Switch to Full Live Website:
To make the entire website live again, change `IS_UNDER_CONSTRUCTION` from `true` to `false` in **two files**:

1. **`src/proxy.ts`** (Line 8):
   ```ts
   // Set to false to allow public access to all routes
   const IS_UNDER_CONSTRUCTION = false;
   ```

2. **`src/app/page.tsx`** (Line 8):
   ```ts
   // Set to false to render the full homepage
   const IS_UNDER_CONSTRUCTION = false;
   ```

3. Rebuild and restart the server:
   ```bash
   npm run build
   pm2 restart all
   ```

*(To turn Under Construction back ON, simply change those two booleans back to `true`, build, and restart).*

---

## 5. Catalog, Product Architecture & Image Resolution

### 1. Master Data Sources
The product catalog operates on a resilient hybrid structure:
- **`src/designer_world_products_grouped.json`**: Master export containing all watch models, specifications, MRPs, strap materials, case sizes, dial colors, and variant SKUs.
- **`src/data/productData.ts`**: Aggregates models into model family groups (e.g. `tactix-200`, `950`, `853`). Computes price ranges, color options, and specs.
- **Database Fallback**: In `src/app/page.tsx` and dynamic routes, the code attempts to query active items from the PostgreSQL database via Prisma; if the database is empty or queries return zero, it smoothly falls back to the curated static dataset without breaking the UI.

### 2. Smart Image Resolution (`src/lib/imageResolver.ts`)
Watch photography is mapped dynamically:
- Primary watch images live in `public/images/new-img/model-2/` and `public/images/new-img/escort/`.
- `imageResolver.ts` parses the model family and SKU, searches `transparent_image_map.json` and `physicalImageMap.json`, and returns:
  - `primary`: Front-facing cutout PNG.
  - `wrist`: Lifestyle/wrist photography (if available).
  - `caseback`: Back case engraving photography.
  - `angle`: Secondary angle / profile shots.
- If a specific image is absent, it gracefully falls back to the default hero timepiece, preventing broken image icons anywhere on the site.

---

## 6. Payment, SMS, and Email Workflows

### 1. Razorpay Integration
- **Client Trigger**: `src/components/cart/CheckoutClient.tsx`
- **Server Verification**: `src/app/api/payment/razorpay/create-order/route.ts` & `/verify/route.ts`
- **Advance COD Logic**: For Cash on Delivery orders, customers can pay a small advance verification token (configured in settings) to confirm commitment, reducing RTO (Return to Origin).
- **Webhook**: Handled at `src/app/api/payment/razorpay/webhook/route.ts`.

### 2. Email Notifications
- **Module**: `src/lib/email.ts` via `nodemailer`.
- **Inquiry Form**: Submissions from the Under Construction page and `/contact` call `src/app/api/contact/route.ts`, sending full customer inquiries directly to `info@dsigner.com`.
- **Order Confirmation**: Sends branded HTML order summary to both customer and atelier.

### 3. Instagram Feed (`src/lib/instagram.ts`)
- Restrictive display: Active strictly on the homepage (`pathname === "/"`).
- Connects to Meta Graph API using `IG_ACCESS_TOKEN` and `IG_USER_ID`.
- If the token expires or rate-limits, it automatically serves the cached feed from `src/data/instagram_cache.json`, ensuring the carousel never shows an error state.

---

## 7. Database & Admin Portal

### 1. Neon Serverless Postgres
The database connection string is configured in `.env` (`DATABASE_URL`). Connection resiliency is handled in `src/lib/db.ts` with explicit connection pooling and timeout handling for serverless environments.

### 2. Prisma Models
Key schema entities in `prisma/schema.prisma`:
- **User / Account / Session**: Auth.js with `ADMIN` and `CUSTOMER` roles.
- **Order / OrderItem / Payment**: Full lifecycle tracking (`PENDING`, `PAID`, `PROCESSING`, `SHIPPED`, `DELIVERED`, `CANCELLED`).
- **ProductFamily / ProductVariant / Image**: Catalog structure matching luxury watch families.
- **Store**: Authorized retailer directory with GPS coordinates, cities, and brands (`D'Signer`, `Escort`).
- **Coupon / Review / Wishlist**: Customer engagement and loyalty features.

### 3. Admin Panel Access
- URL: `/admin` (Redirects to `/login?callbackUrl=/admin` if unauthenticated).
- Credentials: Admin users are identified by `role === "ADMIN"` in the database.
- Database Seeds: Run `npx tsx scripts/seed-users.ts` to seed or reset admin accounts.

---

## 8. Deployment & Server Operations (Handover Runbook)

### 1. Server Environment Requirements
- **OS**: Ubuntu Linux 22.04 LTS / Debian / macOS / Windows Server
- **Node.js**: `v22.12.0` or higher (verified compatible with Next.js 16.1.6)
- **Process Manager**: PM2 (`npm install -g pm2`)
- **Web Server / Reverse Proxy**: Nginx with SSL (Certbot) proxying to `http://localhost:3000`

### 2. Pulling Updates on the Production Server
Whenever changes are pushed to GitHub, execute the following commands on the live server:

```bash
# 1. Navigate to the project root
cd /path/to/watch-2

# 2. Pull the latest commits from the main branch
git pull origin main

# 3. Ensure database client is up to date
npx prisma generate

# 4. Build the Next.js production bundle
npm run build

# 5. Restart the PM2 process
pm2 restart all

# 6. Check live process logs to verify healthy startup
pm2 logs --lines 50
```

### 3. Managing Local Development
To run the project locally for development and testing:

```bash
# Install dependencies
npm install

# Run database generation
npx prisma generate

# Start development server
npm run dev
# Accessible at http://localhost:3000
```

### 4. Running Production Build Check Locally
Before pushing any code, always ensure the production build passes:

```bash
npm run build
```
*(All 57 routes should compile cleanly with green indicators).*

---

## 9. Developer Checklist & Immediate Action Items

For the incoming developer taking over this codebase:

1. **Verify Environment Variables**:
   - Check `.env` against production credentials (DATABASE_URL, RAZORPAY keys, SMTP settings, NEXTAUTH_SECRET).
   - Ensure `NEXTAUTH_URL` and `NEXT_PUBLIC_SITE_URL` point to the production domain on live servers.
2. **Review `src/proxy.ts`**:
   - Understand the edge proxy rules protecting admin paths and managing the `IS_UNDER_CONSTRUCTION` redirect.
3. **Inspect Product Family Logic**:
   - Check `src/data/productData.ts` and `src/data/collections.ts` before altering watch model categories.
4. **Header Navigation**:
   - `src/components/sections/HeaderClient.tsx` houses the main menu drawer containing "Brand & Gender" (`D'Signer Men's`, `D'Signer Women's`, `Escort Men's`, `Escort Women's`) and "Collections By Category".

---

*Report prepared and validated with zero compilation errors on commit `b90a6c4`.*
