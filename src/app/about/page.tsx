import AboutHero from "@/components/sections/about/AboutHero";
import AboutRooted from "@/components/sections/about/AboutRooted";
import AboutTimeline from "@/components/sections/about/AboutTimeline";
import AboutChairman from "@/components/sections/about/AboutChairman";
import AboutValues from "@/components/sections/about/AboutValues";
import Footer from "@/components/sections/Footer";

// Note: Header is assumed to be handled globally in layout.tsx as it is on the home page.

export default function AboutPage() {
    return (
        <main className="w-full min-h-screen bg-background flex flex-col">
            <AboutHero />
            <AboutRooted />
            <AboutTimeline />
            <AboutChairman />
            <AboutValues />
            <Footer />
        </main>
    );
}
