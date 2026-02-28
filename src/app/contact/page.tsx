"use client";

import Header from "@/components/sections/Header";
import ContactSection from "@/components/sections/ContactSection";
import Footer from "@/components/sections/Footer";
import CartDrawer from "@/components/ui/CartDrawer";

export default function ContactPage() {
    return (
        <main className="min-h-screen relative bg-[#FAF8F4]">
            <Header />
            <CartDrawer />
            <ContactSection />
            <Footer />
        </main>
    );
}
