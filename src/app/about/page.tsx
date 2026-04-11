"use client";

import AboutHero from "@/components/sections/about/AboutHero";
import AboutRooted from "@/components/sections/about/AboutRooted";
import AboutTimeline from "@/components/sections/about/AboutTimeline";
import DesignerJourney from "@/components/sections/about/DesignerJourney";
import AboutChairman from "@/components/sections/about/AboutChairman";
import AboutValues from "@/components/sections/about/AboutValues";
import AboutStats from "@/components/sections/about/AboutStats";

export default function AboutPage() {
    return (
        <main className="min-h-screen relative bg-[#FAF8F4]">
            <AboutHero />
            <AboutValues />
            <AboutStats />
            <AboutRooted />
            <DesignerJourney />
            <AboutTimeline />
            <AboutChairman />
        </main>
    );
}
