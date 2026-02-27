"use client";

import Header from "@/components/sections/Header";
import DsignerHero from "@/components/sections/dsigner/DsignerHero";
import DsignerGrid from "@/components/sections/dsigner/DsignerGrid";
import DsignerFeatures from "@/components/sections/dsigner/DsignerFeatures";
import Footer from "@/components/sections/Footer";
import NewsletterStrip from "@/components/ui/NewsletterStrip";
import SectionDivider from "@/components/ui/SectionDivider";
import GrainOverlay from "@/components/ui/GrainOverlay";
import CartDrawer from "@/components/ui/CartDrawer";

export default function DsignerPage() {
    return (
        <main className="min-h-screen bg-[#FAF8F4] relative">
            <Header />
            <CartDrawer />

            <DsignerHero />

            <SectionDivider />
            <DsignerGrid />

            <SectionDivider />
            <DsignerFeatures />

            <NewsletterStrip />
            <Footer />
        </main>
    );
}
