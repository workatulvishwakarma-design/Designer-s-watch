import { prisma } from '../src/lib/db';
import bcrypt from 'bcryptjs';

async function main() {
  console.log("Seeding Demo Users...");

  const passwordHash = bcrypt.hashSync("password123", 10);

  // 1. Upsert Admin User
  const admin = await prisma.user.upsert({
    where: { email: 'admin@designerworld.com' },
    update: {
      passwordHash: passwordHash,
      role: 'ADMIN',
    },
    create: {
      name: 'Maison Administrator',
      email: 'admin@designerworld.com',
      passwordHash: passwordHash,
      role: 'ADMIN',
    }
  });

  console.log(`Admin user created: ${admin.email}`);

  // 2. Upsert Customer User
  const customer = await prisma.user.upsert({
    where: { email: 'customer@designerworld.com' },
    update: {
      passwordHash: passwordHash,
      role: 'CUSTOMER',
    },
    create: {
      name: 'VIP Guest Persona',
      email: 'customer@designerworld.com',
      passwordHash: passwordHash,
      role: 'CUSTOMER',
    }
  });

  console.log(`VIP Customer user created: ${customer.email}`);
  console.log("Demo Users Seed Complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
