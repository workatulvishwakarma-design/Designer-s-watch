import Header from "@/components/sections/Header";
import AboutHero from "@/components/sections/about/AboutHero";
import AboutRooted from "@/components/sections/about/AboutRooted";
import AboutTimeline from "@/components/sections/about/AboutTimeline";
import AboutChairman from "@/components/sections/about/AboutChairman";
import AboutValues from "@/components/sections/about/AboutValues";
import Footer from "@/components/sections/Footer";

export default function AboutPage() {
    return (
        <main className="w-full min-h-screen bg-background flex flex-col">
            <Header />
            <AboutHero />
            <AboutRooted />
            <AboutTimeline />
            <AboutChairman />
            <AboutValues />
            <Footer />
        </main>
    );
}
