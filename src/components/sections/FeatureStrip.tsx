"use client";

const items = [
    "Since 1940s",
    "4 Generations",
    "OEM Partner",
    "20+ Brands",
    "500+ Private Labels",
    "Premium Craftsmanship",
];

export default function FeatureStrip() {
    return (
        <section
            className="py-[16px] overflow-hidden border-y border-gold/20"
            style={{ backgroundColor: "#B8935A" }}
        >
            <div className="flex whitespace-nowrap animate-marquee">
                {[...items, ...items, ...items].map((item, i) => (
                    <span
                        key={i}
                        className="font-body text-[12px] font-bold tracking-[0.2em] uppercase mx-8 flex items-center gap-8"
                        style={{ color: "#1A1918" }}
                    >
                        {item}
                        <span
                            className="w-1.5 h-1.5 rounded-full inline-block"
                            style={{ backgroundColor: "#1A1918" }}
                        />
                    </span>
                ))}
            </div>
        </section>
    );
}
