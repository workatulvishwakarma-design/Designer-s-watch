"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Cookie } from "lucide-react";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Check local storage for consent
    const consent = localStorage.getItem("dw_cookie_consent");
    if (!consent) {
      const timer = setTimeout(() => {
        setVisible(true);
      }, 1500); // 1.5 second delay
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem("dw_cookie_consent", "all");
    setVisible(false);
  };

  const handleAcceptEssential = () => {
    localStorage.setItem("dw_cookie_consent", "essential");
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-0 left-0 right-0 z-[90] p-4 md:p-6"
        >
          <div
            className="max-w-[1400px] mx-auto rounded-2xl overflow-hidden p-5 md:p-6 flex flex-col md:flex-row items-center justify-between gap-5 md:gap-8 border"
            style={{
              background: "rgba(250, 248, 244, 0.95)",
              backdropFilter: "blur(20px) saturate(180%)",
              borderColor: "rgba(0, 57, 38, 0.08)",
              boxShadow: "0 -10px 40px rgba(0, 31, 20, 0.06), 0 20px 40px rgba(0,0,0,0.1)",
            }}
          >
            {/* Left Content */}
            <div className="flex items-center md:items-start gap-4 text-center md:text-left flex-1">
              <div className="w-10 h-10 rounded-full bg-[#003926]/5 flex items-center justify-center text-[#003926] shrink-0 hidden sm:flex">
                <Cookie size={18} strokeWidth={1.5} />
              </div>
              <div className="space-y-1">
                <h4 className="text-[12px] font-body font-bold uppercase tracking-wider text-[#001F14]">
                  Cookie Preferences
                </h4>
                <p className="text-[12px] font-body text-[#9C9690] leading-relaxed">
                  We use cookies to elevate your browsing experience, analyze site traffic, and curate personalized collections. By clicking &quot;Accept All&quot;, you consent to our use of cookies. Read our{" "}
                  <Link
                    href="/privacy-policy"
                    className="text-[#003926] underline hover:text-[#B8935A] transition-colors"
                  >
                    Privacy Policy
                  </Link>
                  .
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center justify-center md:justify-end gap-3 shrink-0">
              <button
                onClick={handleAcceptEssential}
                className="px-5 py-2.5 rounded-full border border-[#003926]/20 text-[#003926] hover:bg-[#003926]/5 transition-all text-[10px] font-body font-bold uppercase tracking-widest"
              >
                Essential Only
              </button>
              <button
                onClick={handleAcceptAll}
                className="px-6 py-2.5 rounded-full bg-[#003926] text-white hover:bg-[#002b1c] shadow-lg shadow-[#003926]/20 transition-all text-[10px] font-body font-bold uppercase tracking-widest"
              >
                Accept All
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
