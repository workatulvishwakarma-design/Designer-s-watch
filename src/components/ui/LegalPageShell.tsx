"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { 
  Shield, Database, FileText, Cookie, Lock, Key, UserCheck, Mail,
  ShoppingBag, Sparkles, CreditCard, ShieldCheck, Bookmark, AlertTriangle, Activity, Globe,
  CheckSquare, Truck, XCircle, AlertOctagon, Clock, Package, MapPin, HelpCircle, Layers, Settings, RefreshCw,
  Home, ChevronRight, ArrowLeft, PhoneCall
} from "lucide-react";

export type LegalIconType = "shield" | "terms" | "returns" | "shipping" | "cookie";

export interface LegalSection {
  id: string;
  title: string;
  iconType: keyof typeof ICON_MAP;
  content: React.ReactNode;
}

const ICON_MAP = {
  shield: Shield,
  database: Database,
  fileText: FileText,
  cookie: Cookie,
  lock: Lock,
  key: Key,
  userCheck: UserCheck,
  mail: Mail,
  shoppingBag: ShoppingBag,
  sparkles: Sparkles,
  creditCard: CreditCard,
  shieldCheck: ShieldCheck,
  bookmark: Bookmark,
  alertTriangle: AlertTriangle,
  activity: Activity,
  globe: Globe,
  checkSquare: CheckSquare,
  truck: Truck,
  xCircle: XCircle,
  alertOctagon: AlertOctagon,
  clock: Clock,
  package: Package,
  mapPin: MapPin,
  helpCircle: HelpCircle,
  layers: Layers,
  settings: Settings,
  refreshCw: RefreshCw,
};

interface LegalPageShellProps {
  sections: LegalSection[];
  title: string;
  subtitle: string;
  iconType: LegalIconType;
  lastUpdated: string;
}

const LEGAL_LINKS = [
  { name: "Privacy Policy", href: "/privacy-policy" },
  { name: "Terms & Conditions", href: "/terms-and-conditions" },
  { name: "Return & Cancellation", href: "/return-cancellation-policy" },
  { name: "Shipping Policy", href: "/shipping-policy" },
  { name: "Cookie Policy", href: "/cookie-policy" },
];

export default function LegalPageShell({
  sections,
  title,
  subtitle,
  iconType,
  lastUpdated,
}: LegalPageShellProps) {
  const MainIcon = ICON_MAP[iconType] || Shield;
  const [activeSection, setActiveSection] = useState(sections[0]?.id || "");
  const [scrolled, setScrolled] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Monitor scroll for header background & active section scroll-spy
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 120);
    };
    window.addEventListener("scroll", handleScroll);

    // Scroll spy observer
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0px -60% 0px" } // trigger when section is around top center
    );

    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observerRef.current?.observe(el);
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observerRef.current?.disconnect();
    };
  }, [sections]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 100; // Header height offset
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
      setActiveSection(id);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F4] text-[#001F14] pb-24 font-body relative selection:bg-[#003926]/10">
      
      {/* ── Background Floating Ambient Blurs ── */}
      <div className="absolute top-[30vh] left-[5vw] w-[45vw] h-[45vw] rounded-full blur-[160px] opacity-[0.05] pointer-events-none" 
        style={{ background: "radial-gradient(circle, #003926 0%, transparent 70%)" }} />
      <div className="absolute top-[80vh] right-[5vw] w-[35vw] h-[35vw] rounded-full blur-[140px] opacity-[0.04] pointer-events-none" 
        style={{ background: "radial-gradient(circle, #B8935A 0%, transparent 70%)" }} />

      {/* ── Grand Editorial Hero Banner ── */}
      <div className="relative h-[380px] md:h-[450px] w-full bg-[#111110] flex flex-col justify-center overflow-hidden border-b border-[#003926]/10">
        
        {/* Background Radial Light Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] blur-[120px] opacity-25 pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(0, 57, 38, 0.9), transparent 75%)" }}
        />
        {/* Custom Fine Noise Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20" />

        <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10 w-full flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, cubicBezier: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center justify-center p-4 rounded-full bg-[#003926]/40 border border-[#003926]/30 text-[#B8935A] mb-5 shadow-2xl backdrop-blur-md"
          >
            <MainIcon size={28} strokeWidth={1.2} />
          </motion.div>

          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, cubicBezier: [0.16, 1, 0.3, 1] }}
            className="text-[10px] tracking-[0.35em] uppercase text-[#B8935A] font-bold mb-3"
          >
            Maison Legal Operations
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, cubicBezier: [0.16, 1, 0.3, 1] }}
            className="font-cormorant text-[44px] sm:text-[56px] lg:text-[68px] leading-[1.05] text-white font-medium max-w-4xl"
          >
            {title}
            <span className="text-[#B8935A]">.</span>
          </motion.h1>

          <motion.div 
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="h-[1px] w-24 bg-gradient-to-r from-transparent via-[#B8935A]/50 to-transparent my-6"
          />

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, cubicBezier: [0.16, 1, 0.3, 1] }}
            className="font-cormorant italic text-[16px] sm:text-[19px] text-white/50 max-w-2xl leading-relaxed"
          >
            {subtitle}
          </motion.p>
        </div>
      </div>

      {/* ── Breadcrumbs & Metadata Bar ── */}
      <div className="bg-white/40 backdrop-blur-md border-b border-[#003926]/5 sticky top-[80px] z-40 transition-all duration-300">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-[#9C9690] text-[10px] uppercase tracking-[0.2em] font-semibold">
          <div className="flex items-center gap-2">
            <Link href="/" className="hover:text-[#003926] transition-colors flex items-center gap-1">
              <Home size={11} /> Home
            </Link>
            <ChevronRight size={10} className="text-gray-300" />
            <span className="text-[#003926]/40">Legal Desk</span>
            <ChevronRight size={10} className="text-gray-300" />
            <span className="text-[#003926] font-bold">{title}</span>
          </div>
          <div>
            Last audited: <span className="text-[#003926] font-bold">{lastUpdated}</span>
          </div>
        </div>
      </div>

      {/* ── Main Editorial Content Layout ── */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 mt-12 md:mt-20">
        <div className="flex flex-col lg:flex-row gap-12 xl:gap-20 items-start">
          
          {/* ── LEFT COLUMN: Sticky Table of Contents (30%) ── */}
          <aside className="w-full lg:w-[28%] lg:sticky lg:top-[160px] space-y-8 z-30 shrink-0 hidden lg:block">
            <div className="rounded-3xl p-6 border bg-white/60 backdrop-blur-xl border-[#003926]/6 shadow-[0_12px_40px_rgba(0,31,20,0.03)] space-y-6">
              <h3 className="text-[10px] uppercase tracking-[0.3em] text-[#003926] font-bold border-b border-[#003926]/10 pb-4">
                Policy Sections
              </h3>
              <nav className="flex flex-col gap-1">
                {sections.map((sec) => {
                  const isActive = activeSection === sec.id;
                  return (
                    <button
                      key={sec.id}
                      onClick={() => scrollToSection(sec.id)}
                      className="group flex items-center gap-3 text-left py-2.5 px-3.5 rounded-xl transition-all duration-300 cursor-pointer w-full"
                      style={{
                        background: isActive ? "rgba(0, 57, 38, 0.05)" : "transparent",
                      }}
                    >
                      <div 
                        className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                          isActive ? "bg-[#B8935A] scale-125" : "bg-[#003926]/15 group-hover:bg-[#003926]/40"
                        }`}
                      />
                      <span
                        className={`text-[12px] font-dm font-semibold uppercase tracking-wider transition-colors duration-300 ${
                          isActive 
                            ? "text-[#001F14]" 
                            : "text-[#003926]/50 group-hover:text-[#001F14]"
                        }`}
                      >
                        {sec.title}
                      </span>
                    </button>
                  );
                })}
              </nav>
            </div>
            
            {/* Quick links shortcut panel */}
            <div className="rounded-3xl p-6 border bg-[#003926]/5 border-[#003926]/8">
              <h4 className="text-[9px] uppercase tracking-[0.25em] text-[#003926]/40 font-bold mb-4">
                Legal Framework Links
              </h4>
              <div className="flex flex-col gap-3">
                {LEGAL_LINKS.filter(l => l.name !== title).map((link) => (
                  <Link key={link.name} href={link.href} className="group flex items-center justify-between text-[11px] font-dm font-bold uppercase tracking-wider text-[#003926]/60 hover:text-[#001F14] transition-colors">
                    <span>{link.name}</span>
                    <ChevronRight size={12} className="text-[#003926]/20 group-hover:translate-x-0.5 group-hover:text-[#003926] transition-all" />
                  </Link>
                ))}
              </div>
            </div>
          </aside>

          {/* ── RIGHT COLUMN: Content Cards (72%) ── */}
          <main className="w-full lg:w-[72%] space-y-8 md:space-y-12">
            {sections.map((sec, idx) => {
              const SecIcon = ICON_MAP[sec.iconType] || Shield;
              return (
                <motion.section
                  key={sec.id}
                  id={sec.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-10%" }}
                  transition={{ duration: 0.7, cubicBezier: [0.16, 1, 0.3, 1] }}
                  className="rounded-[2.5rem] border bg-white/75 backdrop-blur-xl border-[#003926]/5 shadow-[0_20px_50px_rgba(0,31,20,0.02)] p-8 sm:p-12 transition-all duration-500 hover:shadow-[0_30px_70px_rgba(0,31,20,0.04)] hover:border-[#003926]/8 relative overflow-hidden"
                >
                  {/* Left decorative gold accent bar */}
                  <div className="absolute top-0 left-0 bottom-0 w-[4px] bg-gradient-to-b from-[#B8935A] to-transparent opacity-80" />

                  {/* Section Header */}
                  <div className="flex items-center gap-4 mb-8 border-b border-[#003926]/5 pb-6">
                    <div className="w-11 h-11 rounded-2xl bg-[#003926]/5 flex items-center justify-center text-[#B8935A] shrink-0 border border-[#003926]/6">
                      <SecIcon size={20} strokeWidth={1.5} />
                    </div>
                    <div>
                      <span className="text-[9px] tracking-[0.25em] uppercase text-[#B8935A] font-bold block mb-1">
                        Section {idx + 1}
                      </span>
                      <h2 className="font-cormorant text-[24px] sm:text-[28px] font-semibold text-[#001F14] tracking-wide leading-none">
                        {sec.title}
                      </h2>
                    </div>
                  </div>

                  {/* Section Content */}
                  <div className="legal-content">
                    {sec.content}
                  </div>
                </motion.section>
              );
            })}

            {/* ── Professional Footer CTA ── */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="rounded-[2.5rem] bg-gradient-to-br from-[#003926] via-[#001F14] to-[#000A06] p-8 sm:p-14 text-center text-white relative overflow-hidden shadow-[0_30px_60px_rgba(0,57,38,0.15)] group"
            >
              {/* Backlight effect */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] blur-[100px] opacity-[0.15] pointer-events-none bg-[radial-gradient(circle,_#FAF8F4_0%,_transparent_70%)]" />

              <div className="relative z-10 space-y-6">
                <span className="text-[9px] uppercase tracking-[0.4em] text-white/55 font-bold block">
                  Customer Horological Concierge
                </span>
                <h3 className="font-cormorant text-[32px] sm:text-[42px] text-white leading-none font-medium">
                  Need Assistance?
                </h3>
                <p className="text-[13px] sm:text-[14px] text-white/50 max-w-xl mx-auto leading-relaxed font-body">
                  Our regulatory support desk is available to assist you with inquiries regarding privacy rights, transaction rules, shipping guarantees, or return verifications.
                </p>
                <div className="pt-4">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-3 bg-white/10 hover:bg-[#FAF8F4] border border-white/20 hover:border-transparent px-8 py-4 rounded-full text-white hover:text-[#001F14] transition-all duration-500 text-[11px] uppercase tracking-[0.2em] font-bold group"
                  >
                    <PhoneCall size={14} className="group-hover:scale-110 transition-transform duration-300 text-[#B8935A]" />
                    Contact Designer World Support
                  </Link>
                </div>
              </div>
            </motion.section>

            {/* Mobile Nav Links Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-6 lg:hidden">
              {LEGAL_LINKS.map((link) => {
                const isActive = link.name === title;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`p-4 rounded-2xl flex items-center justify-between border text-[11px] font-bold uppercase tracking-wider ${
                      isActive 
                        ? "bg-[#003926]/5 border-[#003926]/12 text-[#003926] cursor-default pointer-events-none" 
                        : "bg-white border-[#003926]/5 text-[#003926]/50"
                    }`}
                  >
                    <span>{link.name}</span>
                    {!isActive && <ChevronRight size={10} />}
                  </Link>
                );
              })}
            </div>

            <div className="flex justify-center pt-8">
              <Link href="/" className="inline-flex items-center gap-2 text-[10px] uppercase tracking-widest text-[#B8935A] hover:text-[#003926] transition-colors">
                <ArrowLeft size={12} /> Return to Showroom
              </Link>
            </div>

          </main>
        </div>
      </div>
    </div>
  );
}
