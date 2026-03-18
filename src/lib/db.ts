import { PrismaClient } from "@prisma/client"
import { PrismaPg } from "@prisma/adapter-pg"
import { Pool } from "pg"

const connectionString = `${process.env.DATABASE_URL}`
const pool = new Pool({ 
    connectionString, 
    ssl: connectionString.includes("localhost") || connectionString.includes("127.0.0.1") ? false : { rejectUnauthorized: false },
    connectionTimeoutMillis: 5000, // 5 second timeout to prevent infinite buffering
})
const adapter = new PrismaPg(pool as any)

const globalForPrisma = globalThis as unknown as { __prisma_instance_v3: PrismaClient }

export const prisma = globalForPrisma.__prisma_instance_v3 || new PrismaClient({ adapter })

if (process.env.NODE_ENV !== "production") {
    globalForPrisma.__prisma_instance_v3 = prisma
}
