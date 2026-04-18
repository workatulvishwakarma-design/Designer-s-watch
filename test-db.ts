import { prisma } from './src/lib/db';
async function main() {
  const p = await prisma.product.findFirst({ include: { images: true, category: true } });
  console.log(JSON.stringify(p, null, 2));
}
main().catch(console.error).finally(()=>prisma.$disconnect());
