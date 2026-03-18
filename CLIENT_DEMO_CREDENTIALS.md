# Designer World - Security & Access Architecture

This document outlines the strict access control mechanisms, testing credentials, and data generation flows for the pre-production luxury watch platform.

**⚠️ IMPORTANT**: ALL data created by the seeder and exposed in this file is strictly meant for demonstration and `localhost` testing purposes.

---

## 1. Quick Test Credentials

If the database has been properly seeded via `npm run prisma db seed`, the following accounts are permanently injected for your convenience.

### The Admin Persona
*Grants full access to the backend product catalogs, inventory control, and order timeline modifications.*
* **Email:** `admin@designerworld.com`
* **Password:** `password123`
* **Test Route:** [`http://localhost:3000/admin/dashboard`](http://localhost:3000/admin/dashboard)

### The VIP Customer Persona
*Grants access to the user-facing store, personal profile, cart checkout, and review submission engine. This account is pre-loaded with a `DELIVERED` mock order to test the review mechanism instantly.*
* **Email:** `customer@designerworld.com`
* **Password:** `password123`
* **Test Route:** [`http://localhost:3000/account`](http://localhost:3000/account)

---

## 2. Core Access Control System

The platform separates user spaces through strict architectural barriers:

- **Public Space (`/`)**: Navigations, product collections, and `/cart`.
- **User Space (`/account/*`, `/checkout`)**: Guaranteed strictly for authenticated users.
- **Admin Space (`/admin/*`)**: Walled off rigorously for users whose `Role` attribute is strictly marked as `ADMIN`.

### The Security Gateway Engine
All access boundaries are enforced natively at the Next.js Edge using the `src/middleware.ts` gatekeeper.

1. **Unauthenticated Redirects:** Anyone opening an `/account` or `/admin` link will be hard-bounced back to the `/login` route with a `callbackUrl` attached. 
2. **Authenticated Bouncing:** Logged-in users navigating *back* to `/login` or `/signup` are redirected instantly to their respective dashboards.
3. **Role Enforcement:** If a standard `CUSTOMER` attempts to type in an `/admin/*` URL, they are dropped safely back onto the homepage (`/`).

---

## 3. Data Flow & Cryptography Pipeline

To ensure no confusion regarding how passwords and accesses trigger:

### Generating Users (Signups & Seeding)
- **Engine**: Passwords are mathematically encoded directly using **Bcrypt (`bcryptjs`)** *before* they touch the database.
- **Location**: Look inside `src/actions/auth.actions.ts` (for public signups) or `prisma/seed.ts` (for demo data).
- **Result**: Prisma's `passwordHash` column holds the encrypted cipher; raw strings are never saved.

### Verifying Users (The Login Form)
- **Engine**: The platform utilizes **NextAuth.js v5 (Auth.js)** mounted at `src/lib/auth.ts`.
- **Execution**: The `CredentialsProvider` safely compares the plaintext login attempt against the DB's `passwordHash`.
- **Session Layer**: If successful, a JWT containing the user's secure ID and their explicit `ROLE` is pushed to their browser cookies context `src/lib/auth.config.ts`. 

## 4. Resetting The Demo Scenario

To completely wipe the database and reinstate the clean Admin/Customer profiles and 4 pristine mockup watches:

1. Stop your Localhost environment (`Ctrl + C`).
2. Wipe the Database tracking entirely:
   ```bash
   npx prisma db push --force-reset
   ```
3. Regenerate the pristine profiles:
   ```bash
   npx tsx prisma/seed.ts
   ```
4. Modify the `prisma/seed.ts` file if you wish to adjust the email strings, update prices, or change the default mock URLs.
