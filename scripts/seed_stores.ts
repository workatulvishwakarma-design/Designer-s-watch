import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import pg from 'pg';

const { Client } = pg;

async function seed() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  });

  await client.connect();
  console.log("Connected to PostgreSQL DB.");

  const dealersPath = path.join(process.cwd(), 'src', 'data', 'dealers.json');
  const dealersRaw = fs.readFileSync(dealersPath, 'utf8');
  const dealers = JSON.parse(dealersRaw);
  console.log(`Loaded ${dealers.length} dealers from JSON.`);

  // Check how many stores exist
  const existingRes = await client.query(`SELECT count(*) FROM "Store";`);
  const existingCount = parseInt(existingRes.rows[0].count, 10);
  console.log(`Current stores in DB: ${existingCount}`);

  let inserted = 0;
  for (let i = 0; i < dealers.length; i++) {
    const d = dealers[i];
    const id = d.id || `dlr-${i + 1}`;
    const name = d.name || 'Store';
    const contactPerson = d.contactPerson || null;
    const phone = d.phone || null;
    const email = d.email || null;
    const brands = Array.isArray(d.brands) && d.brands.length > 0 ? d.brands : ["D'Signer Watches", "Escort Watches"];
    
    // Determine category
    let category = "Authorized Retailer";
    if (d.tabs && d.tabs.includes("DESIGNER") && d.tabs.includes("ESCORT")) {
      category = "Dual Brand Boutique";
    } else if (d.tabs && d.tabs.includes("DESIGNER")) {
      category = "D'Signer Exclusive";
    } else if (d.tabs && d.tabs.includes("ESCORT")) {
      category = "Escort Specialist";
    }

    const address = d.address || `${d.city || ''}, ${d.state || ''}`;
    const area = d.area || null;
    const city = (d.city || 'DELHI').trim().toUpperCase();
    const state = (d.state || '').trim().toUpperCase();
    const location = d.location || null;
    const googleMapsQuery = d.googleMapsQuery || null;
    const isActive = true;
    const sortOrder = i;

    await client.query(
      `INSERT INTO "Store" (
        "id", "name", "contactPerson", "phone", "email", "brands", "category",
        "address", "area", "city", "state", "location", "googleMapsQuery",
        "isActive", "sortOrder", "createdAt", "updatedAt"
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, NOW(), NOW())
      ON CONFLICT ("id") DO UPDATE SET
        "name" = EXCLUDED."name",
        "address" = EXCLUDED."address",
        "city" = EXCLUDED."city",
        "state" = EXCLUDED."state",
        "phone" = EXCLUDED."phone",
        "email" = EXCLUDED."email",
        "brands" = EXCLUDED."brands",
        "category" = EXCLUDED."category",
        "googleMapsQuery" = EXCLUDED."googleMapsQuery",
        "updatedAt" = NOW();
      `,
      [
        id, name, contactPerson, phone, email, brands, category,
        address, area, city, state, location, googleMapsQuery,
        isActive, sortOrder
      ]
    );
    inserted++;
  }

  console.log(`Successfully upserted ${inserted} stores into database.`);
  const finalCheck = await client.query(`SELECT count(*) FROM "Store";`);
  console.log(`Final stores count in DB: ${finalCheck.rows[0].count}`);

  await client.end();
}

seed().catch(console.error);
