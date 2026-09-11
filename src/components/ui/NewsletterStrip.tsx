"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { subscribeNewsletter } from "@/actions/contact.actions";
import { toast } from "sonner";
import { Check, Loader2 } from "lucide-react";

export default function NewsletterStrip() {
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isSubscribed, setIsSubscribed] = useState(false);

    const handleSubscribe = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!email.trim()) return;

        setIsLoading(true);
        try {
            const res = await subscribeNewsletter(email.trim());
            if (res.error) {
                toast.error(res.error);
            } else {
                toast.success(res.success || "Thank you for subscribing to Stay in Time!");
                setIsSubscribed(true);
                setEmail("");
            }
        } catch (err: any) {
            toast.error(err?.message || "Failed to subscribe. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

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

                {isSubscribed ? (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#003926] text-white rounded-xl font-dm text-sm font-medium shadow-sm"
                    >
                        <Check size={18} className="text-[#B8935A]" />
                        <span>You&apos;re subscribed! Thank you for staying in time with us.</span>
                    </motion.div>
                ) : (
                    <motion.form
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        onSubmit={handleSubscribe}
                        className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto"
                    >
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="your@email.com"
                            required
                            disabled={isLoading}
                            className="flex-1 bg-white border border-[#E0D8CE] rounded-xl px-5 py-3 font-body text-sm outline-none focus:border-gold transition-colors text-black disabled:opacity-60"
                        />
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="bg-gold text-white px-8 py-3 rounded-xl font-body text-sm tracking-widest uppercase hover:bg-bg-dark transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center gap-2 disabled:opacity-60 cursor-pointer"
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 size={16} className="animate-spin" />
                                    <span>Subscribing...</span>
                                </>
                            ) : (
                                "Subscribe"
                            )}
                        </button>
                    </motion.form>
                )}
            </div>
        </section>
    );
}

