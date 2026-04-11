import { notFound } from "next/navigation";
import ProductClientView from "@/components/product/ProductClientView";
import { getProductBySlugHybrid, getRelatedProductsHybrid } from "@/actions/public.actions";

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug: urlSlug } = await params;
  const slug = decodeURIComponent(urlSlug);

  const product = await getProductBySlugHybrid(slug);
  if (!product) return notFound();

  // Fetch related products
  const related = await getRelatedProductsHybrid(slug, product.brand, 4);

  // Map to the shape ProductClientView expects
  const mappedProduct = {
    id: product.slug, // Universal slug-based ID
    dbId: product.dbId || null, // Keep DB ID for checkout if available
    name: product.name,
    slug: product.slug,
    description: product.description,
    price: product.price,
    mrp: product.comparePrice,
    images: product.images.length > 0 ? product.images : ["/images/main-img1.png"],
    brand: product.brand,
    category: product.category,
    badge: product.badge,
    sizes: product.sizes,
    colors: product.colors,
    specs: product.specs,
    stock: product.stock,
    lowStockThreshold: product.lowStockThreshold,
    reviews: product.reviews || [],
    // Luxury fields
    heritageText: product.heritageText,
    storyText: product.storyText,
    materialDetails: product.materialDetails,
    movementType: product.movementType,
    caseSize: product.caseSize,
    strapDetails: product.strapDetails,
    warrantyInfo: product.warrantyInfo,
  };

  const mappedRelated = related.map(r => ({
    id: r.slug,
    name: r.name,
    slug: r.slug,
    price: r.price,
    mrp: r.comparePrice,
    images: r.images.length > 0 ? r.images : ["/images/main-img1.png"],
    brand: r.brand,
    badge: r.badge,
  }));

  return <ProductClientView product={mappedProduct} relatedProducts={mappedRelated} />;
}
