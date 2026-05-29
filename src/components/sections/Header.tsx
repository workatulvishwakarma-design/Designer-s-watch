import { prisma } from "@/lib/db";
import HeaderClient, { MegaMenuPayload, CollectionPayload } from "./HeaderClient";
import { collections as staticCollections } from "@/data/collections";

export default async function Header({ hasAnnouncement = false }: { hasAnnouncement?: boolean }) {
    let rawCollections: any[] = [];
    
    try {
        if (prisma.collection) {
            rawCollections = await prisma.collection.findMany({
                include: {
                    families: {
                        where: { status: "ACTIVE" },
                        take: 1,
                        include: {
                            images: true,
                            variants: {
                                take: 1,
                                select: { price: true }
                            }
                        }
                    },
                    _count: {
                        select: { families: true }
                    }
                }
            });
        }
    } catch (error) {
        console.warn("Header: DB query failed, using fallback collections:", (error as Error).message);
    }

    const coreSlugs = ["mens-designer", "womens-designer", "mens-escort", "womens-escort"];
    
    const coreCollections: CollectionPayload[] = [];
    const signatureCollections: CollectionPayload[] = [];

    // Map DB collections
    for (const c of rawCollections) {
        let featuredProduct = null;
        if (c.families?.length > 0) {
            const family = c.families[0];
            const price = family.variants?.length > 0 ? Number(family.variants[0].price) : 0;
            const image = family.images?.find((img: any) => img.type === 'HERO')?.url || family.images?.[0]?.url || null;
            
            featuredProduct = {
                id: family.id,
                name: family.name,
                slug: family.slug,
                price,
                image
            };
        }

        const payload: CollectionPayload = {
            id: c.id,
            name: c.name,
            slug: c.slug,
            tagline: c.description || null,
            philosophy: c.philosophy || c.description || null,
            gender: c.gender || null,
            heroImage: c.bannerImage || null,
            lifestyleImage: null, 
            featuredProduct,
            productCount: c._count?.families || 0,
            collectionType: coreSlugs.includes(c.slug) ? "CORE" : "SIGNATURE"
        };

        if (coreSlugs.includes(c.slug)) {
            coreCollections.push(payload);
        } else {
            signatureCollections.push(payload);
        }
    }

    // ── Hardcoded Core Fallbacks ──
    const defaultCore: CollectionPayload[] = [
        { id: "core-1", name: "Men's D'SIGNER", slug: "mens-designer", tagline: "Premium Luxury for Him", philosophy: "Precision and boldness in every detail.", gender: "Men", heroImage: null, lifestyleImage: null, featuredProduct: null, productCount: 0, collectionType: "CORE" },
        { id: "core-2", name: "Women's D'SIGNER", slug: "womens-designer", tagline: "Elegance Redefined", philosophy: "Graceful elegance and timeless beauty.", gender: "Women", heroImage: null, lifestyleImage: null, featuredProduct: null, productCount: 0, collectionType: "CORE" },
        { id: "core-3", name: "Men's Escort", slug: "mens-escort", tagline: "Everyday Style", philosophy: "Refined everyday style and durability.", gender: "Men", heroImage: null, lifestyleImage: null, featuredProduct: null, productCount: 0, collectionType: "CORE" },
        { id: "core-4", name: "Women's Escort", slug: "womens-escort", tagline: "Daily Elegance", philosophy: "Timeless daily elegance and sophistication.", gender: "Women", heroImage: null, lifestyleImage: null, featuredProduct: null, productCount: 0, collectionType: "CORE" },
    ];

    const missingCore = defaultCore.filter(dc => !coreCollections.some(cc => cc.slug === dc.slug));
    coreCollections.push(...missingCore);

    // ── Hardcoded Signature Fallbacks (from collections.ts) ──
    // If DB returned zero signature collections, populate from static data
    if (signatureCollections.length === 0) {
        const signatureSlugs = staticCollections
            .filter(c => !coreSlugs.includes(c.slug))
            .slice(0, 14); // Top 14 collections for the grid

        for (const sc of signatureSlugs) {
            signatureCollections.push({
                id: `sig-${sc.slug}`,
                name: sc.name,
                slug: sc.slug,
                tagline: sc.meaning,
                philosophy: sc.description,
                gender: sc.gender,
                heroImage: sc.heroImage || null,
                lifestyleImage: null,
                featuredProduct: null,
                productCount: sc.modelFamilies.length,
                collectionType: "SIGNATURE"
            });
        }
    }

    // Sort core to ensure consistent order
    const orderedCore = coreSlugs
        .map(slug => coreCollections.find(c => c.slug === slug)!)
        .filter(Boolean);

    const payload: MegaMenuPayload = {
        coreCollections: orderedCore,
        signatureCollections
    };

    return <HeaderClient hasAnnouncement={hasAnnouncement} megaMenuPayload={payload} />;
}
