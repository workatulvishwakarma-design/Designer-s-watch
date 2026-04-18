"use client";

import MenHero from "@/components/sections/men/MenHero";
import MenGrid from "@/components/sections/men/MenGrid";
import SectionDivider from "@/components/ui/SectionDivider";
import NewsletterStrip from "@/components/ui/NewsletterStrip";

export default function MenPage() {
    return (
        <main className="min-h-screen bg-[#FAF8F4] relative">
            <MenHero />
            <SectionDivider />
            <MenGrid />
            <NewsletterStrip />
        </main>
    );
}
