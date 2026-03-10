"use client";

import { useState, useId } from "react";
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

// ── Animated input field ──────────────────────────────────────────────────────
function FormField({
  label,
  id,
  error,
  children,
}: {
  label: string;
  id: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={id}
        className="font-body text-[11px] tracking-[0.12em] uppercase transition-colors duration-300"
        style={{ color: error ? "#D4455A" : "#6B6560" }}
      >
        {label} *
      </label>
      {children}
      <AnimatePresence>
        {error && (
          <motion.p
            key="error"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="font-body text-[11px]"
            style={{ color: "#D4455A" }}
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Shared input base styles ──────────────────────────────────────────────────
function StyledInput({
  id,
  type = "text",
  value,
  onChange,
  placeholder,
  hasError,
}: {
  id: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  hasError?: boolean;
}) {
  const [focused, setFocused] = useState(false);
  const [hovered, setHovered] = useState(false);

  const borderColor = hasError
    ? "#D4455A"
    : focused
      ? "#003926"
      : hovered
        ? "#B8935A"
        : "#E0D8CE";

  return (
    <div className="relative">
      <input
        id={id}
        name={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        aria-invalid={hasError ? "true" : "false"}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="w-full border-0 border-b-[1.5px] rounded-none py-4 font-body text-[14px] bg-transparent focus:outline-none focus:ring-0 transition-all duration-300 placeholder:text-[#B0A99F]"
        style={{
          borderBottomColor: borderColor,
          color: "#1A1918",
          backgroundColor: focused ? "rgba(250,248,244,0.55)" : "transparent",
          boxShadow: hovered && !focused ? "0 2px 8px rgba(184,147,90,0.07)" : "none",
        }}
      />
      {/* animated underline */}
      <motion.span
        className="absolute bottom-0 left-0 h-[2px] rounded-full"
        style={{ backgroundColor: "#003926" }}
        animate={{ width: focused ? "100%" : "0%" }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      />
    </div>
  );
}

function StyledTextarea({
  id,
  value,
  onChange,
  placeholder,
  hasError,
}: {
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder: string;
  hasError?: boolean;
}) {
  const [focused, setFocused] = useState(false);
  const [hovered, setHovered] = useState(false);

  const borderColor = hasError
    ? "#D4455A"
    : focused
      ? "#003926"
      : hovered
        ? "#B8935A"
        : "#E0D8CE";

  return (
    <div className="relative">
      <textarea
        id={id}
        name={id}
        rows={4}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        aria-invalid={hasError ? "true" : "false"}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="w-full border-0 border-b-[1.5px] rounded-none py-4 font-body text-[14px] bg-transparent focus:outline-none focus:ring-0 transition-all duration-300 resize-none placeholder:text-[#B0A99F]"
        style={{
          borderBottomColor: borderColor,
          color: "#1A1918",
          backgroundColor: focused ? "rgba(250,248,244,0.55)" : "transparent",
          boxShadow: hovered && !focused ? "0 2px 8px rgba(184,147,90,0.07)" : "none",
        }}
      />
      <motion.span
        className="absolute bottom-0 left-0 h-[2px] rounded-full"
        style={{ backgroundColor: "#003926" }}
        animate={{ width: focused ? "100%" : "0%" }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      />
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export default function NagpalPartner() {
  const uid = useId();
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
  const [selectHovered, setSelectHovered] = useState(false);
  const [selectFocused, setSelectFocused] = useState(false);

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

  const selectBorderColor = errors.enquiryAs
    ? "#D4455A"
    : selectFocused
      ? "#003926"
      : selectHovered
        ? "#B8935A"
        : "#E0D8CE";

  return (
    <section
      id="partner"
      className="relative overflow-hidden"
      style={{ backgroundColor: "#F2EDE6" }}
    >
      {/* ── Hero visual block ── */}
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
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="font-heading text-[48px] md:text-[72px] font-light leading-[1.1] mb-0 text-center"
            style={{ color: "#1A1918" }}
          >
            Partner
          </motion.h2>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="font-heading text-[48px] md:text-[72px] font-bold leading-[1.1] mb-0 text-center"
            style={{ color: "#003926" }}
          >
            With Us
          </motion.h2>

          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="w-full max-w-[260px] sm:max-w-[360px] md:max-w-[460px] h-auto my-6 mx-auto"
          >
            {!imgError ? (
              <Image
                src="/images/nagpal2.png"
                alt="Watch — Partner With Us"
                width={538}
                height={538}
                className="object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.12)] w-full h-auto"
                onError={() => setImgError(true)}
              />
            ) : (
              <div
                className="w-full h-24 rounded-lg flex items-center justify-center"
                style={{ background: "rgba(184,147,90,0.1)" }}
              />
            )}
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="font-body font-light text-[14px] md:text-[15px] text-center max-w-[480px] mx-auto"
            style={{ color: "#6B6560", lineHeight: 1.8 }}
          >
            If you are a brand, retailer, or business looking to collaborate across manufacturing,
            distribution, components, or exports, our team is ready to assist.
          </motion.p>
        </div>

        {/* Bottom line */}
        <div
          className="absolute bottom-0 left-0 w-full h-[1.5px] pointer-events-none z-0"
          style={{ backgroundColor: "rgba(0,57,38,0.15)" }}
        />
      </div>

      {/* ── Form block ── */}
      <div className="relative z-10 max-w-[820px] mx-auto px-4 sm:px-6 mt-12 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-2xl md:rounded-[28px] p-6 sm:p-10 lg:p-14 border shadow-[0_24px_80px_rgba(0,0,0,0.08)]"
          style={{ backgroundColor: "#FFFFFF", borderColor: "#E0D8CE" }}
        >
          <AnimatePresence mode="wait">
            {success ? (
              <motion.div
                key="success"
                initial={{ scale: 0.85, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", damping: 20, stiffness: 300 }}
                className="text-center py-12"
              >
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
                  style={{ backgroundColor: "#003926" }}
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
                noValidate
              >
                <h3 className="font-heading text-[30px] md:text-[38px] text-center mb-3" style={{ color: "#1A1918" }}>
                  Start a Conversation
                </h3>
                <div className="w-10 h-0.5 mx-auto mb-10" style={{ backgroundColor: "#B8935A" }} />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-10">
                  {/* Full Name */}
                  <FormField label="Full Name" id={`${uid}-fullName`} error={errors.fullName}>
                    <StyledInput
                      id={`${uid}-fullName`}
                      value={form.fullName}
                      onChange={(e) => setForm((f) => ({ ...f, fullName: e.target.value }))}
                      placeholder="Your name"
                      hasError={!!errors.fullName}
                    />
                  </FormField>

                  {/* Subject */}
                  <FormField label="Subject" id={`${uid}-subject`} error={errors.subject}>
                    <StyledInput
                      id={`${uid}-subject`}
                      value={form.subject}
                      onChange={(e) => setForm((f) => ({ ...f, subject: e.target.value }))}
                      placeholder="Enquiry subject"
                      hasError={!!errors.subject}
                    />
                  </FormField>

                  {/* Email */}
                  <FormField label="Email Address" id={`${uid}-email`} error={errors.email}>
                    <StyledInput
                      id={`${uid}-email`}
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                      placeholder="you@example.com"
                      hasError={!!errors.email}
                    />
                  </FormField>

                  {/* Message */}
                  <FormField label="Message" id={`${uid}-message`} error={errors.message}>
                    <StyledTextarea
                      id={`${uid}-message`}
                      value={form.message}
                      onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                      placeholder="Your message"
                      hasError={!!errors.message}
                    />
                  </FormField>

                  {/* Enquiry As — full width */}
                  <div className="sm:col-span-2">
                    <FormField label="I Am Enquiring As" id={`${uid}-enquiryAs`} error={errors.enquiryAs}>
                      <div className="relative">
                        <button
                          type="button"
                          id={`${uid}-enquiryAs`}
                          aria-haspopup="listbox"
                          aria-expanded={selectOpen}
                          onClick={() => setSelectOpen(!selectOpen)}
                          onFocus={() => setSelectFocused(true)}
                          onBlur={() => setSelectFocused(false)}
                          onMouseEnter={() => setSelectHovered(true)}
                          onMouseLeave={() => setSelectHovered(false)}
                          className="w-full flex items-center justify-between border-0 border-b-[1.5px] rounded-none py-4 font-body text-[14px] bg-transparent focus:outline-none focus:ring-0 transition-all duration-300 text-left"
                          style={{
                            borderBottomColor: selectBorderColor,
                            color: form.enquiryAs ? "#1A1918" : "#B0A99F",
                          }}
                        >
                          {form.enquiryAs || "Select option"}
                          <ChevronDown
                            className={`w-5 h-5 flex-shrink-0 transition-transform duration-300 ${selectOpen ? "rotate-180" : ""}`}
                            style={{ color: "#B8935A" }}
                          />
                        </button>
                        {/* animated underline for select */}
                        <motion.span
                          className="absolute bottom-0 left-0 h-[2px] rounded-full"
                          style={{ backgroundColor: "#003926" }}
                          animate={{ width: selectFocused || selectOpen ? "100%" : "0%" }}
                          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                        />
                        <AnimatePresence>
                          {selectOpen && (
                            <>
                              <div
                                className="fixed inset-0 z-10"
                                onClick={() => setSelectOpen(false)}
                                aria-hidden
                              />
                              <motion.ul
                                role="listbox"
                                aria-label="Enquiry type"
                                initial={{ opacity: 0, y: 6 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 6 }}
                                transition={{ duration: 0.2 }}
                                className="absolute top-full left-0 right-0 mt-2 bg-white border border-[#E0D8CE] rounded-xl shadow-[0_12px_40px_rgba(0,0,0,0.1)] py-2 z-20 max-h-52 overflow-auto"
                                style={{ color: "#1A1918" }}
                              >
                                {enquiryOptions.map((opt) => (
                                  <li key={opt} role="option" aria-selected={form.enquiryAs === opt}>
                                    <button
                                      type="button"
                                      onClick={() => {
                                        setForm((f) => ({ ...f, enquiryAs: opt }));
                                        setSelectOpen(false);
                                      }}
                                      className="w-full text-left font-body text-[14px] px-5 py-3 hover:bg-[#FAF8F4] hover:text-[#003926] transition-colors duration-150"
                                    >
                                      {opt}
                                    </button>
                                  </li>
                                ))}
                              </motion.ul>
                            </>
                          )}
                        </AnimatePresence>
                      </div>
                    </FormField>
                  </div>
                </div>

                {/* Submit button */}
                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={!loading ? { y: -2, boxShadow: "0 12px 36px rgba(184,147,90,0.35)" } : {}}
                  whileTap={!loading ? { scale: 0.98 } : {}}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="w-full mt-12 h-[54px] rounded-full font-body font-medium text-[13px] tracking-[0.18em] uppercase text-white flex items-center justify-center gap-2.5 disabled:opacity-60 cursor-pointer disabled:cursor-not-allowed"
                  style={{ backgroundColor: loading ? "#6B6560" : "#1A1918" }}
                  onMouseEnter={(e) => {
                    if (!loading) e.currentTarget.style.backgroundColor = "#003926";
                  }}
                  onMouseLeave={(e) => {
                    if (!loading) e.currentTarget.style.backgroundColor = "#1A1918";
                  }}
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Sending…
                    </>
                  ) : (
                    "Submit Enquiry"
                  )}
                </motion.button>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
