"use client";

import { motion } from "framer-motion";
import { Truck, ShieldCheck, Headset, CreditCard, MessageSquare } from "lucide-react";

export default function TrustGrid() {
    const cards = [
        { icon: <Truck size={40} strokeWidth={1.5} />, title: "Fast & Reliable Shipping", desc: "Prompt dispatch and dependable delivery you can trust." },
        { icon: <CreditCard size={40} strokeWidth={1.5} />, title: "Secure Checkout", desc: "Encrypted payment systems to keep every transaction safe and protected." },
        { icon: <ShieldCheck size={40} strokeWidth={1.5} />, title: "Warranty Protection", desc: "Official warranty coverage for assured performance and peace of mind." },
        { icon: <MessageSquare size={40} strokeWidth={1.5} />, title: "Easy Service Assistance", desc: "Simple, hassle-free support for servicing and maintenance." },
        { icon: <Headset size={40} strokeWidth={1.5} />, title: "Dedicated Customer Support", desc: "Responsive assistance whenever you need guidance or help." }
    ];

    return (
        <section className="pt-0 pb-24 bg-white text-primaryText">
            <div className="container mx-auto px-6 md:px-12 xl:px-24">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
                    {cards.slice(0, 3).map((card, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            className="flex flex-col items-center text-center gap-6 group"
                        >
                            <div className="text-[#0E3D2B] group-hover:scale-110 group-hover:-translate-y-1 transition-transform duration-300">
                                {card.icon}
                            </div>
                            <div className="flex flex-col gap-3">
                                <h4 className="font-sans text-xs md:text-sm font-bold text-primaryText/90">{card.title}</h4>
                                <p className="font-sans text-[10px] md:text-xs opacity-60 leading-relaxed font-light max-w-[200px] mx-auto">{card.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 mt-16 max-w-2xl mx-auto">
                    {cards.slice(3, 5).map((card, i) => (
                        <motion.div
                            key={i + 3}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: (i + 3) * 0.1 }}
                            className="flex flex-col items-center text-center gap-6 group"
                        >
                            <div className="text-[#0E3D2B] group-hover:scale-110 group-hover:-translate-y-1 transition-transform duration-300">
                                {card.icon}
                            </div>
                            <div className="flex flex-col gap-3">
                                <h4 className="font-sans text-xs md:text-sm font-bold text-primaryText/90">{card.title}</h4>
                                <p className="font-sans text-[10px] md:text-xs opacity-60 leading-relaxed font-light max-w-[200px] mx-auto">{card.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
