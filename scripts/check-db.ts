import 'dotenv/config';
import { prisma } from '../src/lib/db';
import dns from 'dns';
import { URL } from 'url';

async function main() {
  console.log("=== DATABASE DIAGNOSTIC TOOL ===");
  const dbUrl = process.env.DATABASE_URL;

  if (!dbUrl) {
    console.error("❌ ERROR: DATABASE_URL is not set in .env!");
    process.exit(1);
  }

  try {
    const parsed = new URL(dbUrl);
    console.log(`Host: ${parsed.hostname}`);
    console.log(`Port: ${parsed.port || '5432'}`);
    console.log(`Database: ${parsed.pathname}`);
    console.log(`Username: ${parsed.username}`);

    console.log("\n1. Testing DNS resolution for hostname...");
    await new Promise((resolve, reject) => {
      dns.lookup(parsed.hostname, (err, address) => {
        if (err) {
          console.error(`❌ DNS Resolution FAILED for '${parsed.hostname}':`, err.message);
          console.error("-> Your server's DNS cannot resolve this hostname (EAI_AGAIN).");
          console.error("-> Fix by adding nameserver 8.8.8.8 to /etc/resolv.conf");
          reject(err);
        } else {
          console.log(`✓ DNS Resolved successfully to IP: ${address}`);
          resolve(address);
        }
      });
    });

    console.log("\n2. Testing Prisma database connection...");
    await prisma.$connect();
    console.log("✓ Connected to PostgreSQL database successfully!");

    const userCount = await prisma.user.count();
    const orderCount = await prisma.order.count();
    const queryCount = await prisma.contactQuery.count();
    console.log(`✓ Database accessible. Users: ${userCount}, Orders: ${orderCount}, Contact Queries: ${queryCount}`);

    console.log("\n✅ ALL DATABASE TESTS PASSED!");
  } catch (err: any) {
    console.error("\n❌ Database connection check failed:", err.message);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
