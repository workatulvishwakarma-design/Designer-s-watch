"use client";

import PageHero from "@/components/ui/PageHero";

export default function DsignerHero() {
    return (
        <PageHero
            brand="D'SIGNER"
            breadcrumb="HOME / COLLECTIONS / D'SIGNER"
            eyebrow="EST. 1991"
            titleFirst="Crafted for the"
            titleSecond="Extraordinary."
            subtext="Premium timepieces where Swiss-inspired design meets four generations of Indian horological mastery."
            stats={[
                { label: "Timepieces", value: "12" },
                { label: "Since", value: "1991" },
                { label: "Onwards", value: "₹1,299" }
            ]}
            image="/images/img03.png"
            pills={["All", "Chronograph", "Classic", "Sport", "Limited"]}
        />
    );
}
