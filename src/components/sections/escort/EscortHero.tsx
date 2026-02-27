"use client";

import PageHero from "@/components/ui/PageHero";

export default function EscortHero() {
    return (
        <PageHero
            brand="ESCORT"
            breadcrumb="HOME / COLLECTIONS / ESCORT"
            eyebrow="EVERYDAY EXCELLENCE"
            titleFirst="Built for"
            titleSecond="Every Moment."
            titleSecondColor="#003926"
            subtext="Durable, reliable timepieces crafted for everyday performance without compromising on style or value."
            stats={[
                { label: "Price", value: "₹799+" },
                { label: "Warranty", value: "1 Year" },
                { label: "Resistance", value: "5 ATM" }
            ]}
            image="/images/img04.png"
            pills={["✓ Under ₹2,500", "✓ 1 Year Warranty", "✓ Water Resistant"]}
        />
    );
}
