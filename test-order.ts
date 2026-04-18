import { prisma } from './src/lib/db';
async function main() {
    try {
        const user = await prisma.user.findFirst();
        if (!user) {
            console.log("No user found");
            return;
        }

        const address = await prisma.address.findFirst({ where: { userId: user.id } });
        if (!address) {
            console.log("No address found");
            return;
        }

        const product = await prisma.product.findFirst();
        if (!product) {
            console.log("No product found");
            return;
        }

        console.log("USER:", user.id);
        console.log("ADDRESS:", address.id);
        console.log("PRODUCT:", product.id);

        const order = await prisma.$transaction(async (tx) => {
            return await tx.order.create({
                data: {
                    userId: user.id,
                    status: "PROCESSING",
                    totalAmount: 1000,
                    taxAmount: 180,
                    shippingAmount: 0,
                    paymentMethod: "COD",
                    shippingAddressId: address.id,
                    items: {
                        create: [
                            {
                                productId: product.id,
                                quantity: 1,
                                priceAtPurchase: 1000
                            }
                        ]
                    },
                    trackingEvents: {
                        create: {
                            status: "PROCESSING",
                            description: `Order confirmed.`
                        }
                    }
                }
            });
        });
        console.log("SUCCESS:", order.id);
    } catch (error) {
        console.error("PRISMA ERROR:", error);
    }
}

main().catch(console.error).finally(() => prisma.$disconnect());
