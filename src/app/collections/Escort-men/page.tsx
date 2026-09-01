import type { Metadata } from "next";
import EscortMenGrid from "@/components/sections/escort-men/EscortMenGrid";

export const metadata: Metadata = {
    title: "Men's Escort Collection | Designer World - Luxury Watches",
    description: "Discover our refined collection of Escort timepieces for men, featuring superior craftsmanship, accurate quartz movements, and distinguished styling.",
};

export default function EscortMenCollectionPage() {
    return <EscortMenGrid />;
}
