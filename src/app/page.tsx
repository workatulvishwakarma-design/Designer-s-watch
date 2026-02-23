import HeroSection from "@/components/sections/HeroSection";
import FeatureStrip from "@/components/sections/FeatureStrip";
import HomeBrands from "@/components/sections/HomeBrands";
import StatsCounter from "@/components/sections/StatsCounter";
import OemCta from "@/components/sections/OemCta";
import CollectionCarousel from "@/components/sections/CollectionCarousel";
import QualityFeatures from "@/components/sections/QualityFeatures";
import LegacySection from "@/components/sections/LegacySection";
import TrustGrid from "@/components/sections/TrustGrid";
import Footer from "@/components/sections/Footer";

export default function Home() {

  const designerProducts = [
    { id: "1", name: "Classic Chrono", price: "INR 20,000", image: "/images/29474d931b23fdfefff0d1ba9a3b6dfc.jpg" },
    { id: "2", name: "Midnight Onyx", price: "INR 18,500", image: "/images/47e37e63651dbce120cea792a46ca0d4.jpg" },
    { id: "3", name: "Gold Standard", price: "INR 22,000", image: "/images/67350e2417b468f72ecfcdaae5511a03.jpg" },
    { id: "4", name: "Silver Elegance", price: "INR 15,000", image: "/images/d2c54c36fcfb42a430df6da5c8cd5e01.jpg" },
    { id: "5", name: "Rose Gold Limit", price: "INR 25,000", image: "/images/d2307c58d34384ccea6aa02743ec9210.jpg" },
    { id: "6", name: "Platinum Series", price: "INR 28,000", image: "/images/d2c54c36fcfb42a430df6da5c8cd5e01.jpg" },
  ];

  const escortProducts = [
    { id: "e1", name: "Escort Diver", price: "INR 12,000", image: "/images/d2c54c36fcfb42a430df6da5c8cd5e01.jpg" },
    { id: "e2", name: "Escort Minimal", price: "INR 8,500", image: "/images/d2307c58d34384ccea6aa02743ec9210.jpg" },
    { id: "e3", name: "Escort Pilot", price: "INR 14,000", image: "/images/d2307c58d34384ccea6aa02743ec9210.jpg" },
    { id: "e4", name: "Escort Classic", price: "INR 9,000", image: "/images/d2c54c36fcfb42a430df6da5c8cd5e01.jpg" },
    { id: "e5", name: "Escort Sport", price: "INR 11,500", image: "/images/d2307c58d34384ccea6aa02743ec9210.jpg" },
  ];

  return (
    <main className="w-full bg-background min-h-screen">
      <HeroSection />
      <FeatureStrip baseVelocity={2} />
      <LegacySection />
      <HomeBrands />
      <StatsCounter />
      <OemCta />
      <CollectionCarousel title="Designer Collection" products={designerProducts} />
      <CollectionCarousel title="Escort Collection" products={escortProducts} />
      <QualityFeatures />
      <TrustGrid />
      <Footer />
    </main>
  );
}
