import type { Metadata } from "next";
import EscortWomensGrid from "@/components/sections/escort-womens/EscortWomensGrid";

export const metadata: Metadata = {
    title: "Women's Escort Collection | Designer World - Luxury Watches",
    description: "Explore the graceful Escort collection for women. Featuring radiant dials, stainless steel bracelets, and reliable quartz precision.",
};

export default function EscortWomensCollectionPage() {
    return <EscortWomensGrid />;
}
