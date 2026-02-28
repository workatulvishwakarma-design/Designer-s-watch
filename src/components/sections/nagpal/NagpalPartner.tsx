"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Loader2, ChevronDown, Check } from "lucide-react";

const enquiryOptions = [
  "Brand Owner",
  "Retailer",
  "Distributor",
  "Corporate Buyer",
  "Export Enquiry",
  "Other",
];

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function NagpalPartner() {
  const [form, setForm] = useState({
    fullName: "",
    subject: "",
    email: "",
    message: "",
    enquiryAs: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [selectOpen, setSelectOpen] = useState(false);
  const [imgError, setImgError] = useState(false);

  const validate = () => {
    const next: Record<string, string> = {};
    if (!form.fullName.trim()) next.fullName = "Required";
    if (!form.subject.trim()) next.subject = "Required";
    if (!form.email.trim()) next.email = "Required";
    else if (!emailRegex.test(form.email)) next.email = "Invalid email";
    if (!form.message.trim()) next.message = "Required";
    if (!form.enquiryAs) next.enquiryAs = "Required";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setLoading(false);
    setSuccess(true);
  };

  return (
    <section
      id="partner"
      className="relative overflow-hidden"
      style={{ backgroundColor: "#F2EDE6" }}
    >
      {/* Hero visual block */}
      <div
        className="relative min-h-[50vh] overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #EDE8E0 0%, #F5F2EC 100%)",
        }}
      >
        <svg className="absolute inset-0 w-full h-full opacity-[0.03] pointer-events-none z-0" aria-hidden>
          <filter id="nagpal-partner-grain">
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#nagpal-partner-grain)" />
        </svg>

        {/* Center content */}
        <div className="relative z-10 flex flex-col items-center justify-center py-20 px-6">
          <h2 className="font-heading text-[48px] md:text-[72px] font-light leading-[1.1] mb-0 text-center" style={{ color: "#1A1918" }}>
            Partner
          </h2>
          <h2 className="font-heading text-[48px] md:text-[72px] font-bold leading-[1.1] mb-0 text-center" style={{ color: "#003926" }}>
            With Us
          </h2>

          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="w-[403px] md:w-[538px] h-auto my-6"
          >
            {!imgError ? (
              <Image
                src="/images/nagpal2.png"
                alt="Watch"
                width={538}
                height={538}
                className="object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.12)]"
                onError={() => setImgError(true)}
              />
            ) : (
              <div
                className="w-full h-24 rounded-lg flex items-center justify-center"
                style={{ background: "rgba(184,147,90,0.1)" }}
              />
            )}
          </motion.div>

          <p
            className="font-body font-light text-[14px] md:text-[15px] leading-relaxed text-center max-w-[480px] mx-auto"
            style={{ color: "#6B6560", lineHeight: 1.8 }}
          >
            If you are a brand, retailer, or business looking to collaborate across manufacturing,
            distribution, components, or exports, our team is ready to assist.
          </p>
        </div>

        {/* Bottom line */}
        <div
          className="absolute bottom-0 left-0 w-full h-[1.5px] pointer-events-none z-0"
          style={{ backgroundColor: "rgba(0,57,38,0.15)" }}
        />
      </div>

      {/* Form block */}
      <div className="relative z-10 max-w-[780px] mx-auto px-6 mt-12">
        <div
          className="rounded-2xl md:rounded-[24px] p-6 md:p-8 lg:p-12 border shadow-[0_20px_80px_rgba(0,0,0,0.07)]"
          style={{ backgroundColor: "#FFFFFF", borderColor: "#E0D8CE" }}
        >
          <AnimatePresence mode="wait">
            {success ? (
              <motion.div
                key="success"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", damping: 20, stiffness: 300 }}
                className="text-center py-8"
              >
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
                  style={{ backgroundColor: "#B8935A" }}
                >
                  <Check className="w-8 h-8 text-white" strokeWidth={2.5} />
                </div>
                <h3 className="font-heading text-[32px] md:text-[38px] mb-4" style={{ color: "#003926" }}>
                  Enquiry Received!
                </h3>
                <p className="font-body text-[15px]" style={{ color: "#6B6560" }}>
                  Our team will reach out within 24 business hours.
                </p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
              >
                <h3 className="font-heading text-[32px] md:text-[38px] text-center mb-10" style={{ color: "#1A1918" }}>
                  Start a Conversation
                </h3>
                <div className="w-10 h-0.5 mx-auto mb-10" style={{ backgroundColor: "#B8935A" }} />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-8">
                  <div>
                    <label className="block font-body text-[12px] mb-1" style={{ color: "#6B6560" }}>
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={form.fullName}
                      onChange={(e) => setForm((f) => ({ ...f, fullName: e.target.value }))}
                      className="w-full border-0 border-b-[1.5px] rounded-none py-3.5 font-body text-[14px] bg-transparent focus:outline-none focus:ring-0 transition-colors duration-300"
                      style={{
                        borderBottomColor: errors.fullName ? "#D4455A" : "#E0D8CE",
                        color: "#1A1918",
                      }}
                      placeholder="Your name"
                    />
                    {errors.fullName && (
                      <p className="font-body text-[11px] mt-1" style={{ color: "#D4455A" }}>
                        {errors.fullName}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block font-body text-[12px] mb-1" style={{ color: "#6B6560" }}>
                      Subject *
                    </label>
                    <input
                      type="text"
                      value={form.subject}
                      onChange={(e) => setForm((f) => ({ ...f, subject: e.target.value }))}
                      className="w-full border-0 border-b-[1.5px] rounded-none py-3.5 font-body text-[14px] bg-transparent focus:outline-none focus:ring-0 transition-colors duration-300"
                      style={{
                        borderBottomColor: errors.subject ? "#D4455A" : "#E0D8CE",
                        color: "#1A1918",
                      }}
                      placeholder="Enquiry subject"
                    />
                    {errors.subject && (
                      <p className="font-body text-[11px] mt-1" style={{ color: "#D4455A" }}>
                        {errors.subject}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block font-body text-[12px] mb-1" style={{ color: "#6B6560" }}>
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                      className="w-full border-0 border-b-[1.5px] rounded-none py-3.5 font-body text-[14px] bg-transparent focus:outline-none focus:ring-0 transition-colors duration-300"
                      style={{
                        borderBottomColor: errors.email ? "#D4455A" : "#E0D8CE",
                        color: "#1A1918",
                      }}
                      placeholder="you@example.com"
                    />
                    {errors.email && (
                      <p className="font-body text-[11px] mt-1" style={{ color: "#D4455A" }}>
                        {errors.email}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block font-body text-[12px] mb-1" style={{ color: "#6B6560" }}>
                      Message *
                    </label>
                    <textarea
                      rows={3}
                      value={form.message}
                      onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                      className="w-full border-0 border-b-[1.5px] rounded-none py-3.5 font-body text-[14px] bg-transparent focus:outline-none focus:ring-0 transition-colors duration-300 resize-none"
                      style={{
                        borderBottomColor: errors.message ? "#D4455A" : "#E0D8CE",
                        color: "#1A1918",
                      }}
                      placeholder="Your message"
                    />
                    {errors.message && (
                      <p className="font-body text-[11px] mt-1" style={{ color: "#D4455A" }}>
                        {errors.message}
                      </p>
                    )}
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block font-body text-[12px] mb-1" style={{ color: "#6B6560" }}>
                      I Am Enquiring As *
                    </label>
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => setSelectOpen(!selectOpen)}
                        className="w-full flex items-center justify-between border-0 border-b-[1.5px] rounded-none py-3.5 font-body text-[14px] bg-transparent focus:outline-none focus:ring-0 transition-colors duration-300 text-left"
                        style={{
                          borderBottomColor: errors.enquiryAs ? "#D4455A" : "#E0D8CE",
                          color: form.enquiryAs ? "#1A1918" : "#9C9690",
                        }}
                      >
                        {form.enquiryAs || "Select option"}
                        <ChevronDown
                          className="w-5 h-5 flex-shrink-0 transition-transform duration-200"
                          style={{ color: "#B8935A" }}
                        />
                      </button>
                      {selectOpen && (
                        <>
                          <div
                            className="fixed inset-0 z-10"
                            onClick={() => setSelectOpen(false)}
                            aria-hidden
                          />
                          <ul
                            className="absolute top-full left-0 right-0 mt-1 bg-white border border-[#E0D8CE] rounded-lg shadow-lg py-2 z-20 max-h-48 overflow-auto"
                            style={{ color: "#1A1918" }}
                          >
                            {enquiryOptions.map((opt) => (
                              <li key={opt}>
                                <button
                                  type="button"
                                  onClick={() => {
                                    setForm((f) => ({ ...f, enquiryAs: opt }));
                                    setSelectOpen(false);
                                  }}
                                  className="w-full text-left font-body text-[14px] px-4 py-2 hover:bg-[#FAF8F4] transition-colors"
                                >
                                  {opt}
                                </button>
                              </li>
                            ))}
                          </ul>
                        </>
                      )}
                    </div>
                    {errors.enquiryAs && (
                      <p className="font-body text-[11px] mt-1" style={{ color: "#D4455A" }}>
                        {errors.enquiryAs}
                      </p>
                    )}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full mt-8 h-[52px] rounded-[10px] font-body font-medium text-[14px] tracking-[0.12em] text-white flex items-center justify-center gap-2 transition-all duration-300 disabled:opacity-70 hover:shadow-[0_8px_32px_rgba(184,147,90,0.3)]"
                  style={{ backgroundColor: loading ? "#6B6560" : "#1A1918" }}
                  onMouseEnter={(e) => {
                    if (!loading) e.currentTarget.style.backgroundColor = "#B8935A";
                  }}
                  onMouseLeave={(e) => {
                    if (!loading) e.currentTarget.style.backgroundColor = "#1A1918";
                  }}
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    "Submit Enquiry"
                  )}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
