import 'dotenv/config';
import pg from 'pg';

const { Client } = pg;

async function migrate() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  });

  await client.connect();
  console.log("Connected to PostgreSQL DB.");

  const sql = `
    CREATE TABLE IF NOT EXISTS "Store" (
        "id" TEXT NOT NULL,
        "name" TEXT NOT NULL,
        "contactPerson" TEXT,
        "phone" TEXT,
        "email" TEXT,
        "brands" TEXT[] DEFAULT ARRAY['D''Signer Watches', 'Escort Watches']::TEXT[],
        "category" TEXT DEFAULT 'All Categories',
        "address" TEXT NOT NULL,
        "area" TEXT,
        "city" TEXT NOT NULL,
        "state" TEXT NOT NULL,
        "location" TEXT,
        "latitude" DOUBLE PRECISION,
        "longitude" DOUBLE PRECISION,
        "googleMapsQuery" TEXT,
        "isActive" BOOLEAN NOT NULL DEFAULT true,
        "sortOrder" INTEGER NOT NULL DEFAULT 0,
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

        CONSTRAINT "Store_pkey" PRIMARY KEY ("id")
    );

    CREATE INDEX IF NOT EXISTS "Store_city_idx" ON "Store"("city");
    CREATE INDEX IF NOT EXISTS "Store_state_idx" ON "Store"("state");
    CREATE INDEX IF NOT EXISTS "Store_isActive_idx" ON "Store"("isActive");
  `;

  await client.query(sql);
  console.log("Successfully created 'Store' table and indexes in PostgreSQL!");

  const check = await client.query(`SELECT count(*) FROM "Store";`);
  console.log("Store count:", check.rows[0].count);

  await client.end();
}

migrate().catch(console.error);
