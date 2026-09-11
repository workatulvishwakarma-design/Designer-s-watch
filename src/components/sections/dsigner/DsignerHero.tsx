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
                { label: "Timepieces", value: "300+" },
                { label: "Since", value: "1991" },
                { label: "Onwards", value: "₹4,595" }
            ]}
            image="/images/new-img/model-1/824/824-RGFS-3-nobg.png"
            pills={["All", "Chronograph", "Classic", "Sport", "Limited"]}
        />
    );
}
