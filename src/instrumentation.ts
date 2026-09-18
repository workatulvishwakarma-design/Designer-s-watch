export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    const dns = await import('dns');
    try {
      dns.setDefaultResultOrder('ipv4first');
    } catch {}

    const NEON_DATABASE_URL = "postgresql://neondb_owner:npg_3OZYBSFMvL8a@ep-jolly-hat-a1waagzf-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=verify-full&channel_binding=require";

    if (
      !process.env.DATABASE_URL ||
      process.env.DATABASE_URL.includes("ff0i6u") ||
      (!process.env.DATABASE_URL.includes("neon.tech") &&
       !process.env.DATABASE_URL.includes("localhost") &&
       !process.env.DATABASE_URL.includes("127.0.0.1"))
    ) {
      console.warn("[Instrumentation] Enforcing verified Neon production database URL in process.env");
      process.env.DATABASE_URL = NEON_DATABASE_URL;
    }
  }
}
