"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Send, CheckCircle2, Loader2, Clock, MessageSquare } from "lucide-react";
import { toast } from "sonner";

export default function UnderConstruction() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill in your name, email, and message.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          subject: "Inquiry from Under Construction Page",
          enquiryType: "General Enquiry",
        }),
      });

      const data = await res.json().catch(() => null);

      if (res.ok) {
        setSubmitted(true);
        toast.success(data?.message || "Thank you. Your inquiry has been received!");
        setFormData({ name: "", email: "", phone: "", message: "" });
      } else {
        toast.error(data?.error || "Failed to send message. Please try again.");
      }
    } catch {
      toast.error("Network error. Please try again or reach out via WhatsApp / phone.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen w-full relative bg-[#00170F] text-[#FAF8F4] overflow-hidden flex flex-col justify-between selection:bg-[#B8935A] selection:text-black">
      {/* Background Ambience & Horological Dial Elements */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Soft Radial Gold/Emerald Glow */}
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[700px] md:w-[1100px] h-[700px] md:h-[1100px] rounded-full bg-[radial-gradient(ellipse_at_center,_rgba(184,147,90,0.18)_0%,_rgba(0,57,38,0.25)_40%,_transparent_75%)] blur-3xl" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,_rgba(184,147,90,0.08)_0%,_transparent_70%)] blur-2xl" />

        {/* Delicate Watch Dial Concentric Rings SVG */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] md:w-[950px] h-[600px] md:h-[950px] opacity-[0.06] animate-[spin_180s_linear_infinite]">
          <svg viewBox="0 0 1000 1000" className="w-full h-full text-[#B8935A]">
            <circle cx="500" cy="500" r="480" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="4 8" />
            <circle cx="500" cy="500" r="420" fill="none" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="500" cy="500" r="340" fill="none" stroke="currentColor" strokeWidth="0.75" strokeDasharray="2 12" />
            <circle cx="500" cy="500" r="260" fill="none" stroke="currentColor" strokeWidth="1" />
            <circle cx="500" cy="500" r="160" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="6 6" />
          </svg>
        </div>
      </div>

      {/* TOP HEADER: Centered Brand Emblem */}
      <header className="relative z-10 w-full pt-8 md:pt-12 pb-4 px-6 max-w-6xl mx-auto flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-center gap-2"
        >
          <div className="relative w-[180px] md:w-[240px] h-[45px] md:h-[55px]">
            <Image
              src="/images/designer world logo_B.png"
              alt="Designer World"
              fill
              className="object-contain filter invert contrast-125 brightness-110 drop-shadow-[0_2px_12px_rgba(184,147,90,0.3)]"
              priority
            />
          </div>
          <span className="text-[10px] md:text-[11px] font-montserrat uppercase tracking-[0.35em] text-[#B8935A]/90 mt-1">
            Four Generations of Horological Expertise
          </span>
        </motion.div>
      </header>

      {/* MAIN CONTENT: Centered Hero & Quick Query Grid */}
      <section className="relative z-10 w-full max-w-6xl mx-auto px-5 md:px-8 py-8 md:py-12 flex-1 flex flex-col justify-center">
        {/* Under Construction Headline Block */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center max-w-3xl mx-auto mb-10 md:mb-14"
        >
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="w-2 h-2 rounded-full bg-[#B8935A] animate-ping" />
            <span className="text-[11px] md:text-[12px] font-montserrat uppercase tracking-[0.3em] text-[#B8935A] font-semibold">
              Official Notice
            </span>
          </div>

          <h1 className="font-cormorant text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-[#FAF8F4] font-light leading-[1.1] mb-5 tracking-wide uppercase">
            UNDER <span className="italic font-normal text-[#D4AF37]">CONSTRUCTION</span>
          </h1>

          <p className="text-[14px] md:text-[16px] text-[#FAF8F4]/75 font-montserrat font-light leading-relaxed max-w-2xl mx-auto">
            Our official digital experience is currently undergoing scheduled refinement.
            We look forward to unveiling our elevated horological showcase soon.
          </p>

          <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-[#B8935A] to-transparent mx-auto mt-6" />
        </motion.div>

        {/* Responsive Grid: Contact Details (Left) + Clean Inquiry Form (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start max-w-5xl mx-auto w-full">
          {/* LEFT: Direct Contact Cards */}
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="lg:col-span-5 flex flex-col gap-4"
          >
            <div className="p-6 md:p-7 rounded-2xl bg-[#002418]/80 border border-[#B8935A]/25 backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
              <h2 className="text-[13px] font-montserrat uppercase tracking-[0.2em] text-[#B8935A] font-semibold mb-5 flex items-center gap-2">
                <span>✦</span> Reach Our Atelier Directly
              </h2>

              <div className="space-y-4">
                {/* Phone & WhatsApp */}
                <a
                  href="tel:+918454926088"
                  className="group flex items-start gap-4 p-3.5 rounded-xl bg-white/[0.03] border border-white/5 hover:border-[#B8935A]/40 hover:bg-[#B8935A]/10 transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#B8935A]/15 text-[#D4AF37] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <Phone size={18} />
                  </div>
                  <div>
                    <span className="text-[11px] font-montserrat uppercase tracking-wider text-[#FAF8F4]/50 block">Phone & WhatsApp</span>
                    <span className="text-[15px] font-montserrat text-[#FAF8F4] font-medium group-hover:text-[#D4AF37] transition-colors">
                      +91 84549 26088
                    </span>
                  </div>
                </a>

                {/* Email */}
                <a
                  href="mailto:info@dsigner.com"
                  className="group flex items-start gap-4 p-3.5 rounded-xl bg-white/[0.03] border border-white/5 hover:border-[#B8935A]/40 hover:bg-[#B8935A]/10 transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#B8935A]/15 text-[#D4AF37] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <Mail size={18} />
                  </div>
                  <div>
                    <span className="text-[11px] font-montserrat uppercase tracking-wider text-[#FAF8F4]/50 block">Email Inquiries</span>
                    <span className="text-[15px] font-montserrat text-[#FAF8F4] font-medium group-hover:text-[#D4AF37] transition-colors">
                      info@dsigner.com
                    </span>
                  </div>
                </a>

                {/* Location */}
                <a
                  href="https://maps.google.com/?q=Pinnacle+Business+Park,+Mahakali+Caves+Rd,+Shanti+Nagar,+Andheri+East,+Mumbai,+Maharashtra+400093"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-start gap-4 p-3.5 rounded-xl bg-white/[0.03] border border-white/5 hover:border-[#B8935A]/40 hover:bg-[#B8935A]/10 transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#B8935A]/15 text-[#D4AF37] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <span className="text-[11px] font-montserrat uppercase tracking-wider text-[#FAF8F4]/50 block">Atelier Location</span>
                    <span className="text-[13px] font-montserrat text-[#FAF8F4]/90 leading-relaxed block">
                      Pinnacle Business Park, Andheri East, Mumbai 400093
                    </span>
                  </div>
                </a>
              </div>

              {/* Business Hours */}
              <div className="mt-5 pt-4 border-t border-white/10 flex items-center gap-2.5 text-[12px] text-[#FAF8F4]/60 font-montserrat">
                <Clock size={14} className="text-[#B8935A]" />
                <span>Mon – Sat: 10:00 AM – 6:30 PM IST</span>
              </div>
            </div>

            {/* Direct WhatsApp Action Button */}
            <a
              href="https://wa.me/918454926088?text=Hello%20Designer%20World,%20I%20have%20an%20inquiry%20regarding%20your%20timepieces."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 px-6 rounded-xl border border-[#25D366]/40 bg-[#25D366]/15 hover:bg-[#25D366]/25 text-[#25D366] text-[13px] font-montserrat font-medium uppercase tracking-[0.15em] flex items-center justify-center gap-2.5 transition-all duration-300 shadow-sm"
            >
              <MessageSquare size={16} />
              Chat on WhatsApp
            </a>
          </motion.div>

          {/* RIGHT: Clean Query Form */}
          <motion.div
            initial={{ opacity: 0, x: 25 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="lg:col-span-7"
          >
            <div className="p-6 md:p-8 rounded-2xl bg-[#002418]/90 border border-[#B8935A]/25 backdrop-blur-md shadow-[0_12px_40px_rgba(0,0,0,0.35)]">
              {submitted ? (
                <div className="py-12 text-center flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-[#B8935A]/20 text-[#D4AF37] flex items-center justify-center mb-5">
                    <CheckCircle2 size={36} />
                  </div>
                  <h3 className="font-cormorant text-3xl text-[#FAF8F4] mb-2 font-normal">Inquiry Received</h3>
                  <p className="text-[14px] text-[#FAF8F4]/75 font-montserrat max-w-sm mb-6">
                    Thank you for reaching out. Our team will review your message and connect with you shortly.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="text-[12px] font-montserrat uppercase tracking-[0.2em] text-[#B8935A] hover:text-[#D4AF37] border-b border-[#B8935A]/50 pb-0.5 transition-colors"
                  >
                    Send Another Inquiry
                  </button>
                </div>
              ) : (
                <>
                  <div className="mb-6">
                    <h3 className="font-cormorant text-2xl md:text-3xl text-[#FAF8F4] font-normal mb-1">
                      Send Us Your Query
                    </h3>
                    <p className="text-[13px] text-[#FAF8F4]/60 font-montserrat">
                      Have a query regarding watches, OEM manufacturing, or custom orders? Write to us below.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] font-montserrat uppercase tracking-wider text-[#FAF8F4]/60 mb-1.5">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Your Name"
                          required
                          className="w-full px-4 py-3 rounded-xl bg-black/30 border border-white/10 focus:border-[#B8935A] focus:ring-1 focus:ring-[#B8935A]/30 text-[#FAF8F4] text-sm placeholder:text-white/20 outline-none transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-montserrat uppercase tracking-wider text-[#FAF8F4]/60 mb-1.5">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="you@example.com"
                          required
                          className="w-full px-4 py-3 rounded-xl bg-black/30 border border-white/10 focus:border-[#B8935A] focus:ring-1 focus:ring-[#B8935A]/30 text-[#FAF8F4] text-sm placeholder:text-white/20 outline-none transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-montserrat uppercase tracking-wider text-[#FAF8F4]/60 mb-1.5">
                        Phone / Contact Number (Optional)
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+91 98765 43210"
                        className="w-full px-4 py-3 rounded-xl bg-black/30 border border-white/10 focus:border-[#B8935A] focus:ring-1 focus:ring-[#B8935A]/30 text-[#FAF8F4] text-sm placeholder:text-white/20 outline-none transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-montserrat uppercase tracking-wider text-[#FAF8F4]/60 mb-1.5">
                        Your Message / Query *
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={4}
                        placeholder="Tell us what you're looking for..."
                        required
                        className="w-full px-4 py-3 rounded-xl bg-black/30 border border-white/10 focus:border-[#B8935A] focus:ring-1 focus:ring-[#B8935A]/30 text-[#FAF8F4] text-sm placeholder:text-white/20 outline-none transition-all resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-[#B8935A] via-[#C8A870] to-[#B8935A] text-[#00170F] font-montserrat font-bold text-[13px] uppercase tracking-[0.2em] hover:brightness-110 active:scale-[0.99] transition-all flex items-center justify-center gap-2.5 shadow-[0_4px_20px_rgba(184,147,90,0.25)] disabled:opacity-60 cursor-pointer"
                    >
                      {loading ? (
                        <>
                          <Loader2 size={16} className="animate-spin" />
                          Sending Query...
                        </>
                      ) : (
                        <>
                          <Send size={15} />
                          Send Inquiry
                        </>
                      )}
                    </button>
                  </form>
                </>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative z-10 w-full py-6 px-6 text-center border-t border-white/5">
        <p className="text-[11px] font-montserrat text-[#FAF8F4]/40 uppercase tracking-[0.2em]">
          © 2026 Designer World · All Rights Reserved · Crafted in India
        </p>
      </footer>
    </main>
  );
}
