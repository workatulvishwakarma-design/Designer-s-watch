# Designer World - Project Setup & Operations Guide

Welcome to the Next.js Storefront & Admin Portal. This guide outlines the steps to initialize the database, seed mock products, and explains future extension integrations.

## 1. Initial Configuration

Before running the development server, you must configure your database and authentication secrets.

1. **Clone the Example Environment**
   Rename or copy the provided `.env.example` file to `.env`:
   ```bash
   cp .env.example .env
   ```

2. **Configure Database Connection**
   Open `.env` and set `DATABASE_URL` to point to a running PostgreSQL 14+ instance. Example:
   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/designerworld?schema=public"
   ```

3. **Configure Authentication**
   Ensure `AUTH_SECRET` is set to a securely generated random string (you can generate one with `openssl rand -base64 32`). The application uses NextAuth.js v5.

## 2. Database Migration & Seeding

This project utilizes Prisma ORM with Edge-compatible v7 adapters (`@prisma/adapter-pg`). 

**First, push the schema to your database:**
```bash
npm run prisma db push
```
*(Note: In production environments, use `npx prisma migrate deploy` instead).*

**Second, seed the database with mock luxury data:**
```bash
npm run prisma db seed
# or run directly if you bypassed package.json configuration:
npx tsx prisma/seed.ts
```

The seeder will automatically generate:
- 2 Product Categories ("Royal Oak", "Nautilus")
- 4 High-fidelity Luxury Watches complete with stock and pricing
- **1 Admin Account**
- **1 VIP Customer Account** (with a pre-populated shipped order to test reviews instantly)

### Test Credentials
Once the seeder has completed, you can test the application using:

| Role | Email | Password |
| :--- | :--- | :--- |
| **Admin** | `admin@designerworld.com` | `password123` |
| **Customer** | `customer@designerworld.com` | `password123` |

## 3. Running the Development Server

Start the Turbopack Next.js compiler:
```bash
npm run dev
```
The application will be universally available at `http://localhost:3000`.

---

## Future Integrations (Phase 2 Architectural Readiness)

The current architecture mimics Payment and Shipping tracking using Server Actions and sequential Database entries. However, the system is designed to gracefully absorb 3rd party webhooks.

### Payment Gateway API (e.g. Stripe, Razorpay)
1. In `src/actions/checkout.actions.ts`, locate the mock payment logic.
2. Swap the final "Mock Payment Success" step out by invoking a `stripe.checkout.sessions.create()` call. 
3. Move the `prisma.order.create` logic into a new `app/api/webhooks/stripe/route.ts` endpoint that listens for the `checkout.session.completed` event.

### Automated Shipping Carriers (e.g. Shiprocket)
1. The `OrderTrackingEvent` model naturally supports tracking statuses.
2. Hook into the `updateOrderStatus` Admin action to trigger an external carrier API dispatch whenever an order transitions from `PROCESSING` -> `SHIPPED`.

### Media CDN (Vercel Blob / AWS S3)
Presently, Product Images are tracked by URL strings (`String` in Prisma). To manage multi-megabyte media efficiently, install `@vercel/blob` or the `aws-sdk`, and bind the image `upload` capabilities inside `src/app/(admin)/admin/products/new/page.tsx` to post directly to your CDN, returning the URL to the Prisma database.
