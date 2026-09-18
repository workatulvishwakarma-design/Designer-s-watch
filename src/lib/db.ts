import { PrismaClient } from "@prisma/client"
import { PrismaPg } from "@prisma/adapter-pg"
import { Pool } from "pg"
import dns from "dns"

try {
  dns.setDefaultResultOrder("ipv4first")
} catch {
  // Ignore in environments where not supported
}

const NEON_DATABASE_URL = "postgresql://neondb_owner:npg_3OZYBSFMvL8a@ep-jolly-hat-a1waagzf-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=verify-full&channel_binding=require";

// Sanitize and enforce valid PostgreSQL database connection
let connectionString = process.env.DATABASE_URL || "";
if (
  !connectionString ||
  connectionString.includes("ff0i6u") ||
  (!connectionString.includes("neon.tech") &&
   !connectionString.includes("localhost") &&
   !connectionString.includes("127.0.0.1"))
) {
  console.warn("[DB] Enforcing verified Neon production database URL.");
  connectionString = NEON_DATABASE_URL;
  process.env.DATABASE_URL = NEON_DATABASE_URL;
}

const pool = new Pool({ 
    connectionString: connectionString, 
    ssl: connectionString.includes("localhost") || connectionString.includes("127.0.0.1") || connectionString.includes("sslmode=disable") ? false : { rejectUnauthorized: false },
    connectionTimeoutMillis: 15000,
    max: 10,
    idleTimeoutMillis: 30000, 
})

pool.on('error', (err) => {
    console.error('Unexpected error on idle client', err)
})

const adapter = new PrismaPg(pool as any)

const globalForPrisma = globalThis as unknown as { __prisma_instance_v5: PrismaClient }

export const prisma = globalForPrisma.__prisma_instance_v5 || new PrismaClient({ adapter })

if (!(prisma as any).store) {
  (prisma as any).store = {
    findMany: async (args?: any) => {
      let query = `SELECT * FROM "Store"`;
      const conditions: string[] = [];
      const values: any[] = [];
      if (args?.where?.isActive !== undefined) {
        values.push(args.where.isActive);
        conditions.push(`"isActive" = $${values.length}`);
      }
      if (conditions.length > 0) {
        query += ` WHERE ` + conditions.join(" AND ");
      }
      query += ` ORDER BY "sortOrder" ASC, "name" ASC`;
      const res = await pool.query(query, values);
      return res.rows;
    },
    findUnique: async (args: any) => {
      const id = args?.where?.id;
      if (!id) return null;
      const res = await pool.query(`SELECT * FROM "Store" WHERE "id" = $1 LIMIT 1`, [id]);
      return res.rows[0] || null;
    },
    create: async (args: any) => {
      const d = args.data;
      const id = d.id || `str-${Date.now()}`;
      const res = await pool.query(
        `INSERT INTO "Store" (
          "id", "name", "contactPerson", "phone", "email", "brands", "category",
          "address", "area", "city", "state", "location", "latitude", "longitude",
          "googleMapsQuery", "isActive", "sortOrder", "createdAt", "updatedAt"
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, NOW(), NOW())
        RETURNING *`,
        [
          id, d.name, d.contactPerson || null, d.phone || null, d.email || null,
          d.brands || [], d.category || "Authorized Retailer", d.address, d.area || null,
          d.city, d.state, d.location || null, d.latitude || null, d.longitude || null,
          d.googleMapsQuery || null, d.isActive !== undefined ? d.isActive : true, d.sortOrder || 0
        ]
      );
      return res.rows[0];
    },
    update: async (args: any) => {
      const id = args.where.id;
      const d = args.data;
      const res = await pool.query(
        `UPDATE "Store" SET
          "name" = COALESCE($2, "name"),
          "contactPerson" = $3,
          "phone" = $4,
          "email" = $5,
          "brands" = COALESCE($6, "brands"),
          "category" = COALESCE($7, "category"),
          "address" = COALESCE($8, "address"),
          "area" = $9,
          "city" = COALESCE($10, "city"),
          "state" = COALESCE($11, "state"),
          "location" = $12,
          "latitude" = $13,
          "longitude" = $14,
          "googleMapsQuery" = $15,
          "isActive" = COALESCE($16, "isActive"),
          "sortOrder" = COALESCE($17, "sortOrder"),
          "updatedAt" = NOW()
        WHERE "id" = $1
        RETURNING *`,
        [
          id, d.name, d.contactPerson, d.phone, d.email,
          d.brands, d.category, d.address, d.area,
          d.city, d.state, d.location, d.latitude, d.longitude,
          d.googleMapsQuery, d.isActive, d.sortOrder
        ]
      );
      return res.rows[0];
    },
    delete: async (args: any) => {
      const id = args.where.id;
      await pool.query(`DELETE FROM "Store" WHERE "id" = $1`, [id]);
      return { id };
    }
  };
}

if (process.env.NODE_ENV !== "production") {
    globalForPrisma.__prisma_instance_v5 = prisma
}
