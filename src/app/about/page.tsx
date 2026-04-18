"use client";

import AboutHero from "@/components/sections/about/AboutHero";
import DesignerJourney from "@/components/sections/about/DesignerJourney";
import OurExpertise from "@/components/sections/about/OurExpertise";
import AboutValues from "@/components/sections/about/AboutValues";
import AboutStats from "@/components/sections/about/AboutStats";
import AboutChairman from "@/components/sections/about/AboutChairman";

export default function AboutPage() {
    return (
        <main className="min-h-screen relative bg-[#FAF8F4]">
            <AboutHero />
            <DesignerJourney />
            <OurExpertise />
            <AboutValues />
            <AboutStats />
            <AboutChairman />
        </main>
    );
}
