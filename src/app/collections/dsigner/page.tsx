"use client";

import DsignerHero from "@/components/sections/dsigner/DsignerHero";
import DsignerGrid from "@/components/sections/dsigner/DsignerGrid";
import DsignerFeatures from "@/components/sections/dsigner/DsignerFeatures";
import NewsletterStrip from "@/components/ui/NewsletterStrip";
import SectionDivider from "@/components/ui/SectionDivider";

export default function DsignerPage() {
    return (
        <main className="min-h-screen bg-[#FAF8F4] relative">
            <DsignerHero />

            <SectionDivider />
            <DsignerGrid />

            <SectionDivider />
            <DsignerFeatures />

            <NewsletterStrip />
        </main>
    );
}
