"use client";

import { motion } from "framer-motion";

export default function NewsletterStrip() {
    return (
        <section className="bg-[#F2EDE6] py-16 px-6 text-center border-t border-border">
            <div className="max-w-4xl mx-auto">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="font-heading text-4xl text-primaryText mb-3"
                >
                    Stay in Time.
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="font-body text-secondaryText mb-10"
                >
                    New arrivals, limited editions and brand stories.
                </motion.p>

                <motion.form
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    onSubmit={(e) => e.preventDefault()}
                    className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto"
                >
                    <input
                        type="email"
                        placeholder="your@email.com"
                        required
                        className="flex-1 bg-white border border-[#E0D8CE] rounded-xl px-5 py-3 font-body text-sm outline-none focus:border-gold transition-colors"
                    />
                    <button
                        type="submit"
                        className="bg-gold text-white px-8 py-3 rounded-xl font-body text-sm tracking-widest uppercase hover:bg-bg-dark transition-all duration-300 transform hover:scale-[1.02]"
                    >
                        Subscribe
                    </button>
                </motion.form>
            </div>
        </section>
    );
}
