"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface BrandCardProps {
    title: string;
    description: string;
    image: string;
    cta: string;
    logo?: string;
}

function BrandCard({ title, description, image, cta, logo }: BrandCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative w-full rounded-xl overflow-hidden cursor-pointer group h-[280px] md:h-[340px]"
        >
            {/* Background Image */}
            <motion.div
                className="absolute inset-0"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
                <Image
                    src={image}
                    alt={title}
                    fill
                    className="object-cover object-right"
                />
            </motion.div>

            {/* Overlay Gradient (Left to Right to darken text area) */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent transition-opacity group-hover:from-black/90" />

            {/* Content (Vertically Centered Overlay) */}
            <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-center text-left">
                <motion.div className="max-w-[280px] md:max-w-[320px] flex flex-col gap-4">
                    <div className="flex flex-col gap-3">
                        {logo ? (
                            <span className="font-serif text-white tracking-widest text-lg md:text-xl">{logo}</span>
                        ) : (
                            <h3 className="text-lg md:text-xl font-serif text-white uppercase tracking-wider">
                                {title}
                            </h3>
                        )}
                        <p className="text-[10px] md:text-xs text-white/80 leading-relaxed font-light">
                            {description}
                        </p>
                    </div>

                    <button className="w-fit text-[9px] md:text-[10px] tracking-widest uppercase text-white border border-white/50 px-5 py-2 rounded-md hover:bg-white hover:text-black transition-all mt-2">
                        {cta}
                    </button>
                </motion.div>
            </div>
        </motion.div>
    );
}

export default function HomeBrands() {
    return (
        <section className="py-16 md:py-20 bg-background text-primaryText">
            <div className="max-w-7xl mx-auto px-6 md:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                    {/* Left: Heading + Paragraph */}
                    <div className="w-full flex flex-col gap-6 lg:pr-12">
                        <h2 className="text-4xl md:text-5xl lg:text-[4rem] font-sans font-medium text-[#2d3748] leading-[1.1] tracking-tight">
                            Our Home<br />Brands
                        </h2>
                        <div className="flex flex-col gap-5 text-[#4a5568] max-w-sm mt-2">
                            <p className="text-sm md:text-base leading-relaxed">
                                Two distinct identities. One shared foundation of precision and trust.
                            </p>
                            <p className="text-sm md:text-base leading-relaxed">
                                From refined designer aesthetics to dependable everyday performance, our home brands reflect the depth of our watchmaking expertise.
                            </p>
                        </div>
                    </div>

                    {/* Right: Stacked Brand Cards */}
                    <div className="w-full flex flex-col space-y-8">
                        <BrandCard
                            title="Designer"
                            logo="D'SIGNER"
                            description="A design-led watch brand crafted for those who appreciate refined aesthetics, bold detailing, and international standards built to feel modern, confident, and timeless."
                            image="/images/img03.png"
                            cta="Shop Designer"
                        />
                        <BrandCard
                            title="Escort"
                            logo="ESCORT"
                            description="Built for everyday reliability, ESCORT delivers quality watches that combine durability, comfort, and lasting value."
                            image="/images/img04.png"
                            cta="Shop Escort"
                        />
                    </div>

                </div>
            </div>
        </section>
    );
}
