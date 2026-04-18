"use client";

import WomenHero from "@/components/sections/women/WomenHero";
import WomenGrid from "@/components/sections/women/WomenGrid";
import SectionDivider from "@/components/ui/SectionDivider";
import NewsletterStrip from "@/components/ui/NewsletterStrip";

export default function WomenPage() {
    return (
        <main className="min-h-screen bg-[#FAF8F4] relative">
            <WomenHero />
            <SectionDivider />
            <WomenGrid />
            <NewsletterStrip />
        </main>
    );
}
