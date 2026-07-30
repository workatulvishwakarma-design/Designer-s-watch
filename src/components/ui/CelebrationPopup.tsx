"use client";

import { useState, useEffect } from "react";

export default function CelebrationPopup() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  // Slide in after 2 seconds, only once per session
  useEffect(() => {
    const alreadySeen = sessionStorage.getItem("celebration-dismissed");
    if (alreadySeen) return;
    const t = setTimeout(() => setVisible(true), 2000);
    return () => clearTimeout(t);
  }, []);

  const handleDismiss = () => {
    setVisible(false);
    setTimeout(() => {
      setDismissed(true);
      sessionStorage.setItem("celebration-dismissed", "1");
    }, 500);
  };

  if (dismissed) return null;

  return (
    <>
      <style>{`
        @keyframes popSlideIn {
          0%   { transform: translateY(120px) scale(0.85); opacity: 0; }
          60%  { transform: translateY(-8px)  scale(1.03); opacity: 1; }
          80%  { transform: translateY(4px)   scale(0.99); }
          100% { transform: translateY(0px)   scale(1);    opacity: 1; }
        }
        @keyframes popSlideOut {
          0%   { transform: translateY(0)   scale(1);    opacity: 1; }
          100% { transform: translateY(120px) scale(0.85); opacity: 0; }
        }
        @keyframes spinStar {
          0%   { transform: rotate(0deg)   scale(1); }
          50%  { transform: rotate(180deg) scale(1.15); }
          100% { transform: rotate(360deg) scale(1); }
        }
        @keyframes shimmerBorder {
          0%   { background-position: 0%   50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0%   50%; }
        }
        @keyframes floatConfetti {
          0%,100% { transform: translateY(0px) rotate(0deg);   opacity: 1; }
          50%      { transform: translateY(-6px) rotate(180deg); opacity: 0.7; }
        }
        @keyframes pulse35 {
          0%,100% { transform: scale(1); }
          50%      { transform: scale(1.06); }
        }
        @keyframes glowRing {
          0%,100% { box-shadow: 0 0 0 0 rgba(184,142,78,0.4); }
          50%      { box-shadow: 0 0 0 8px rgba(184,142,78,0); }
        }

        .cel-popup {
          animation: popSlideIn 0.75s cubic-bezier(0.34,1.56,0.64,1) forwards;
        }
        .cel-popup.hiding {
          animation: popSlideOut 0.45s ease-in forwards;
        }
        .cel-star { animation: spinStar 3s ease-in-out infinite; }
        .cel-border {
          background: linear-gradient(270deg, #B88E4E, #003926, #D4AF6A, #003926, #B88E4E);
          background-size: 300% 300%;
          animation: shimmerBorder 4s ease infinite;
        }
        .cel-num { animation: pulse35 2s ease-in-out infinite; }
        .cel-ring { animation: glowRing 2s ease-in-out infinite; }

        .dot1 { animation: floatConfetti 2.1s ease-in-out infinite; }
        .dot2 { animation: floatConfetti 2.5s ease-in-out 0.4s infinite; }
        .dot3 { animation: floatConfetti 1.9s ease-in-out 0.8s infinite; }
        .dot4 { animation: floatConfetti 2.3s ease-in-out 0.2s infinite; }
      `}</style>

      <div
        className={`cel-popup${!visible ? " hiding" : ""} fixed bottom-6 right-6 z-[9999] w-[220px] select-none`}
        style={{ display: dismissed ? "none" : "block" }}
      >
        {/* Animated gradient border wrapper */}
        <div className="cel-border p-[2px] rounded-2xl">
          <div
            className="relative rounded-2xl overflow-hidden"
            style={{
              background: "linear-gradient(145deg, #0D1F16 0%, #0B1A13 60%, #101D17 100%)",
            }}
          >
            {/* Close button */}
            <button
              onClick={handleDismiss}
              className="absolute top-2.5 right-2.5 z-10 w-5 h-5 rounded-full flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all duration-200"
              aria-label="Dismiss"
            >
              <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                <path d="M1 1l6 6M7 1L1 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </button>

            {/* Floating confetti dots */}
            <div className="absolute top-3 left-4 w-1.5 h-1.5 rounded-full bg-[#D4AF6A]/60 dot1" />
            <div className="absolute top-5 left-10 w-1 h-1 rounded-full bg-[#B88E4E]/50 dot2" />
            <div className="absolute top-2 right-10 w-1.5 h-1.5 rounded-full bg-[#D4AF6A]/40 dot3" />
            <div className="absolute top-7 right-6 w-1 h-1 rounded-full bg-white/30 dot4" />

            <div className="px-4 pt-5 pb-4">
              {/* Star icon */}
              <div className="flex justify-center mb-3">
                <div className="cel-star w-8 h-8 flex items-center justify-center">
                  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                    <path
                      d="M14 2L16.9 10.1H25.5L18.8 15.1L21.7 23.2L14 18.2L6.3 23.2L9.2 15.1L2.5 10.1H11.1L14 2Z"
                      fill="url(#starGrad)"
                      stroke="#D4AF6A"
                      strokeWidth="0.5"
                    />
                    <defs>
                      <linearGradient id="starGrad" x1="2.5" y1="2" x2="25.5" y2="23.2" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#FFE08A"/>
                        <stop offset="0.5" stopColor="#D4AF6A"/>
                        <stop offset="1" stopColor="#B88E4E"/>
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              </div>

              {/* Big number */}
              <div className="flex items-baseline justify-center gap-0.5 mb-1">
                <span
                  className="cel-num font-montserrat font-bold text-[42px] leading-none"
                  style={{
                    background: "linear-gradient(135deg, #FFE08A, #D4AF6A, #B88E4E)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  35
                </span>
                <span
                  className="font-montserrat font-bold text-[22px] leading-none mb-1"
                  style={{
                    background: "linear-gradient(135deg, #FFE08A, #D4AF6A)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  +
                </span>
              </div>

              {/* Label line 1 */}
              <p
                className="text-center font-montserrat font-semibold text-[9px] tracking-[0.25em] uppercase mb-1"
                style={{ color: "#D4AF6A" }}
              >
                Years of Excellence
              </p>

              {/* Thin divider */}
              <div
                className="mx-auto my-2 h-[1px] w-12"
                style={{ background: "linear-gradient(90deg, transparent, #D4AF6A66, transparent)" }}
              />

              {/* Main message */}
              <p
                className="text-center font-montserrat text-[10px] leading-[1.55] font-light"
                style={{ color: "rgba(255,255,255,0.72)" }}
              >
                Celebrating the journey of
                <br />
                <span className="font-semibold" style={{ color: "#D4AF6A" }}>D&apos;Signer</span>
                &nbsp;—&nbsp;
                <span style={{ color: "rgba(255,255,255,0.55)" }}>since 1990</span>
              </p>

              {/* Bottom ring badge */}
              <div className="flex justify-center mt-3">
                <div
                  className="cel-ring px-3 py-1 rounded-full border"
                  style={{ borderColor: "#D4AF6A44", background: "rgba(184,142,78,0.08)" }}
                >
                  <span
                    className="font-montserrat text-[7.5px] tracking-[0.3em] uppercase"
                    style={{ color: "#D4AF6A" }}
                  >
                    Nagpal Group · Est. 1990
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
