'use client';

import React, { useRef, useState, useEffect, useContext, createContext } from 'react';
import { motion, useInView } from 'framer-motion';
import styles from './about5.module.css';

const GREEN = '#003926';
const FALLBACK = '/images/new-img/model-1/824/824-RGFS-3-nobg.png';
const LUXURY_EASE = [0.22, 1, 0.36, 1] as const;

function FadeIn({
  children,
  delay = 0,
  className = '',
  style = {},
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SCROLL-DRIVEN TRANSFORM SYSTEM (ABOUT-5)
   - Every text element transforms continuously DURING scrolling
   - Large years: translateY(55px -> 0), scale(0.95 -> 1.0)
   - Headings & Paragraphs: translateY & opacity transform as user scrolls
   - Columns: leftCol slides from -36px, rightCol slides from +36px
   - Never stuck at opacity: 0 (default progress 1, min opacity 0.2)
   ═══════════════════════════════════════════════════════════════ */

const ScrollSectionContext = createContext<{
  enterProgress: number;
  scrollThrough: number;
  isMobile: boolean;
}>({
  enterProgress: 1,
  scrollThrough: 0,
  isMobile: false,
});

function MilestoneSectionWrapper({
  id,
  className,
  style,
  children,
}: {
  id: string;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const [metrics, setMetrics] = useState({
    enterProgress: 1,
    scrollThrough: 0,
    isMobile: false,
  });

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (sectionRef.current) {
            const rect = sectionRef.current.getBoundingClientRect();
            const wh = window.innerHeight || 800;
            const mobile = window.innerWidth < 768;
            const secHeight = rect.height || 600;

            // Only update when section is anywhere near the viewport (-50% to +150%)
            if (rect.top < wh * 1.5 && rect.bottom > -wh * 0.5) {
              // 1. Entrance progress (0 -> 1 as section enters viewport from bottom)
              // Starts entering when top is at wh * 1.05, fully settled when top reaches wh * 0.40
              const enterDistance = wh * 0.65;
              const scrolledIn = wh * 1.05 - rect.top;
              const enter = Math.max(0, Math.min(1, scrolledIn / enterDistance));

              // 2. Continuous scroll-through (-1 when entering from below, 0 at viewport center, +1 when leaving upward)
              const sectionCenter = rect.top + secHeight / 2;
              const viewportCenter = wh / 2;
              const span = (wh + secHeight) * 0.55;
              const through = Math.max(-1, Math.min(1, (viewportCenter - sectionCenter) / span));

              setMetrics({
                enterProgress: Number(enter.toFixed(3)),
                scrollThrough: Number(through.toFixed(3)),
                isMobile: mobile,
              });
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  return (
    <ScrollSectionContext.Provider value={metrics}>
      <section
        ref={sectionRef}
        id={id}
        className={className}
        style={style}
      >
        {children}
      </section>
    </ScrollSectionContext.Provider>
  );
}

// 7. TIMELINE SECTION MOVEMENT: Left column glides in from left + continuous vertical scroll drift
function LeftCol({
  children,
  className,
  style,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  const { enterProgress, scrollThrough, isMobile } = useContext(ScrollSectionContext);
  const maxShift = isMobile ? -18 : -32;
  const parallaxY = isMobile ? -6 : -12;
  const x = (1 - enterProgress) * maxShift;
  const y = scrollThrough * parallaxY;

  return (
    <div
      className={className || styles.leftCol}
      style={{
        transform: `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px)`,
        transition: 'transform 0.05s ease-out',
        willChange: 'transform',
        ...style,
      }}
    >
      {children}
    </div>
  );
}

// 7. TIMELINE SECTION MOVEMENT: Right column glides in from right + continuous vertical scroll drift
function RightCol({
  children,
  className,
  style,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  const { enterProgress, scrollThrough, isMobile } = useContext(ScrollSectionContext);
  const maxShift = isMobile ? 18 : 32;
  const parallaxY = isMobile ? -6 : -12;
  const x = (1 - enterProgress) * maxShift;
  const y = scrollThrough * parallaxY;

  return (
    <div
      className={className || styles.rightCol}
      style={{
        transform: `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px)`,
        transition: 'transform 0.05s ease-out',
        willChange: 'transform',
        ...style,
      }}
    >
      {children}
    </div>
  );
}

// 2. LARGE YEARS: Continuous multi-axis transform during scrolling (translateY, dynamic scale, 3D tilt)
function HeroYear({
  children,
  className,
  style,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  const { enterProgress, scrollThrough, isMobile } = useContext(ScrollSectionContext);
  const maxEntryY = isMobile ? 32 : 48;
  const parallaxY = isMobile ? -22 : -36;
  const y = (1 - enterProgress) * maxEntryY + scrollThrough * parallaxY;
  // Scale breathes as it passes through the viewport center
  const scale = 0.95 + enterProgress * 0.05 + (1 - Math.abs(scrollThrough)) * 0.035;
  // Subtle 3D perspective tilt
  const rotX = (1 - enterProgress) * 7 - scrollThrough * 2.5;
  const opacity = Math.min(1, Math.max(0.25, 0.25 + enterProgress * 0.75));

  return (
    <div
      className={className}
      style={{
        transform: `translateY(${y.toFixed(1)}px) scale(${scale.toFixed(3)}) perspective(600px) rotateX(${rotX.toFixed(1)}deg)`,
        opacity,
        transition: 'transform 0.05s ease-out, opacity 0.12s linear',
        transformOrigin: 'left bottom',
        willChange: 'transform, opacity',
        ...style,
      }}
    >
      {children}
    </div>
  );
}

// 2. SMALL YEARS: Smooth vertical glide & parallax during scroll
function SmallYear({
  children,
  className,
  style,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  const { enterProgress, scrollThrough, isMobile } = useContext(ScrollSectionContext);
  const maxEntryY = isMobile ? 20 : 30;
  const parallaxY = isMobile ? -12 : -20;
  const y = (1 - enterProgress) * maxEntryY + scrollThrough * parallaxY;
  const opacity = Math.min(1, Math.max(0.25, 0.25 + enterProgress * 0.75));

  return (
    <div
      className={className}
      style={{
        transform: `translateY(${y.toFixed(1)}px)`,
        opacity,
        transition: 'transform 0.05s ease-out, opacity 0.12s linear',
        willChange: 'transform, opacity',
        ...style,
      }}
    >
      {children}
    </div>
  );
}

// 3. HEADINGS: Continuous scroll transform (translateY, 3D tilt, subtle tracking)
function SectionHeading({
  children,
  className,
  style,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  const { enterProgress, scrollThrough, isMobile } = useContext(ScrollSectionContext);
  const maxEntryY = isMobile ? 24 : 36;
  const parallaxY = isMobile ? -14 : -24;
  const y = (1 - enterProgress) * maxEntryY + scrollThrough * parallaxY;
  const rotX = (1 - enterProgress) * 5 - scrollThrough * 1.8;
  const opacity = Math.min(1, Math.max(0.2, 0.2 + enterProgress * 0.8));

  return (
    <h2
      className={className}
      style={{
        transform: `translateY(${y.toFixed(1)}px) perspective(600px) rotateX(${rotX.toFixed(1)}deg)`,
        opacity,
        transition: 'transform 0.05s ease-out, opacity 0.12s linear',
        transformOrigin: 'left center',
        willChange: 'transform, opacity',
        ...style,
      }}
    >
      {children}
    </h2>
  );
}

// 4. BODY TEXT: Paragraphs transform during scrolling with distinct parallax rate
function SectionDescription({
  children,
  className,
  style,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  const { enterProgress, scrollThrough, isMobile } = useContext(ScrollSectionContext);
  const maxEntryY = isMobile ? 18 : 26;
  const parallaxY = isMobile ? -10 : -16;
  const y = (1 - enterProgress) * maxEntryY + scrollThrough * parallaxY;
  const opacity = Math.min(1, Math.max(0.25, 0.25 + enterProgress * 0.75));

  return (
    <p
      className={className}
      style={{
        transform: `translateY(${y.toFixed(1)}px)`,
        opacity,
        transition: 'transform 0.05s ease-out, opacity 0.12s linear',
        willChange: 'transform, opacity',
        ...style,
      }}
    >
      {children}
    </p>
  );
}

// 5. DECORATION ACCENT LINE: Horizontal expansion during scroll entry
function DecorationLine({
  className,
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  const { enterProgress } = useContext(ScrollSectionContext);
  const scaleX = 0.25 + enterProgress * 0.75;
  const opacity = Math.min(1, 0.3 + enterProgress * 0.7);

  return (
    <div
      className={className}
      style={{
        transform: `scaleX(${scaleX.toFixed(3)})`,
        transformOrigin: 'left center',
        opacity,
        transition: 'transform 0.06s ease-out, opacity 0.12s linear',
        willChange: 'transform, opacity',
        ...style,
      }}
    />
  );
}

// 5. HISTORICAL IMAGES: Dynamic translateY, scale reveal, and internal parallax float
function HistoricalImageWrap({
  children,
  className,
  style,
  delay = 0.14,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  delay?: number;
}) {
  const { enterProgress, scrollThrough, isMobile } = useContext(ScrollSectionContext);
  const maxMove = isMobile ? 24 : 36;
  const parallaxY = isMobile ? -16 : -26;
  const y = (1 - enterProgress) * maxMove + scrollThrough * parallaxY;
  const scale = 0.94 + enterProgress * 0.06;
  const clip = (1 - enterProgress) * 8;
  const opacity = Math.min(1, Math.max(0.25, 0.25 + enterProgress * 0.75));
  const innerFloat = scrollThrough * (isMobile ? -10 : -18);

  return (
    <div
      className={className}
      style={{
        transform: `translateY(${y.toFixed(1)}px) scale(${scale.toFixed(3)})`,
        clipPath: `inset(${clip.toFixed(1)}% 0% 0% 0% round 3px)`,
        opacity,
        transition: 'transform 0.05s ease-out, clip-path 0.08s ease-out, opacity 0.12s linear',
        overflow: 'hidden',
        willChange: 'transform, opacity, clip-path',
        ...style,
      }}
    >
      <div
        style={{
          transform: `translateY(${innerFloat.toFixed(1)}px)`,
          transition: 'transform 0.05s linear',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          willChange: 'transform',
        }}
      >
        {children}
      </div>
    </div>
  );
}

// 9. BACKGROUND DECORATIONS: Subtle scroll parallax (5-15px) without continuous rotation
function ParallaxDecoration({
  children,
  speed = 0.028,
  className,
  style,
}: {
  children: React.ReactNode;
  speed?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (ref.current) {
            const rect = ref.current.getBoundingClientRect();
            const wh = window.innerHeight || 800;
            if (rect.top < wh && rect.bottom > 0) {
              const delta = (rect.top + rect.height / 2) - wh / 2;
              const y = Math.max(-12, Math.min(12, -delta * speed));
              setOffsetY(Number(y.toFixed(2)));
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        transform: `translateY(${offsetY}px)`,
        transition: 'transform 0.12s linear',
        ...style,
      }}
    >
      {children}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   1. 1940s SECTION (Exact Match to Reference Screenshot)
   ═══════════════════════════════════════════════════════════════ */
function Section1940s() {
  return (
    <MilestoneSectionWrapper
      id="section-1940s"
      className={styles.milestoneSection}
      style={{ alignItems: "flex-start", paddingTop: "clamp(12px, 1.5vh, 24px)" }}
    >
      {/* ── Left Column: 19/40s, The Beginning, Rule, Narrative ── */}
      <LeftCol className={styles.leftCol}>
        <div className={styles.leftCard}>
          {/* 1. Large year → strongest reveal */}
          <HeroYear className={styles.bigYear}>
            <span className={styles.yearNumber}>19</span>
            <div style={{ display: "flex", alignItems: "flex-end" }}>
              <span className={styles.yearNumber}>40</span>
              <span className={styles.yearSuffix}>s</span>
            </div>
          </HeroYear>

          {/* 3. Section heading → fade-up */}
          <SectionHeading className={styles.editorialTitle}>The Beginning</SectionHeading>

          {/* 5. Background decorations → almost static */}
          <DecorationLine className={styles.greenDivider} />

          {/* 4. Description → fade-up with small delay */}
          <SectionDescription className={styles.bodyParagraph}>
            Started a new division solely managing foreign brand distribution
            under the name <strong>DESIGNER WORLD BRANDS</strong> &amp; added
            more labels like INGERSOLL, INVICTA, and SANTA BARBARA POLO CLUB.
          </SectionDescription>
        </div>
      </LeftCol>

      {/* ── Center Portrait: Anchored at top of green spine ── */}
      <div className={styles.centerCol} style={{ alignSelf: "flex-start" }}>
        {/* 2. Historical image → smooth reveal + very slight scale */}
        <HistoricalImageWrap style={{ width: "clamp(260px, 26vw, 360px)", marginTop: 0 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/about-us-coded/assets/x102.png"
            alt="1940s Founder Portrait"
            className={styles.centerArtworkImg}
            style={{ width: "100%", height: "auto" }}
            loading="eager"
          />
        </HistoricalImageWrap>
      </div>

      {/* ── Right Column: 1940s, Narrative + Storefront Artwork ── */}
      <RightCol className={styles.rightCol}>
        <div className={styles.rightCard}>
          <SmallYear className={styles.smallYearLabel}>1940s</SmallYear>
          <DecorationLine className={styles.smallYearDivider} />
          <SectionDescription className={styles.bodyParagraph}>
            Dedicated brand management infrastructure empowered global fashion
            icons to flourish in the Indian marketplace.
          </SectionDescription>

          {/* 2. Historical image → smooth reveal + very slight scale */}
          <HistoricalImageWrap
            delay={0.16}
            className={styles.rightArtworkWrap}
            style={{
              marginLeft: "calc(-140px - clamp(20px, 2.5vw, 50px))",
              marginTop: "clamp(60px, 25vh, 180px)",
              width: "clamp(300px, 28vw, 400px)",
              position: "relative",
              zIndex: 6,
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/about-us-coded/assets/x122.png"
              alt="Nagpal Watch Co. Historical Storefront"
              className={styles.rightArtworkImg}
              loading="eager"
            />
          </HistoricalImageWrap>
        </div>
      </RightCol>
    </MilestoneSectionWrapper>
  );
}

/* ═══════════════════════════════════════════════════════════════
   2. 1960s SECTION
   ═══════════════════════════════════════════════════════════════ */
function Section1960s() {
  return (
    <MilestoneSectionWrapper id="section-1960s" className={styles.milestoneSection}>
      <LeftCol className={styles.leftCol}>
        <div className={styles.leftCard}>
          <SmallYear className={styles.smallYearLabel}>1960s</SmallYear>
          <DecorationLine className={styles.smallYearDivider} />
          <SectionDescription className={styles.bodyParagraph}>
            International partnerships formed the backbone of a growing
            enterprise. By the mid-60s, Nagpals had become a trusted name in the
            Northern India trade circuit for precision components and watch
            batteries.
          </SectionDescription>
        </div>
      </LeftCol>
      <div className={styles.centerCol}>
        {/* 2. Historical image → smooth reveal + very slight scale */}
        <HistoricalImageWrap style={{ width: 'clamp(320px, 30vw, 460px)' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/about-us-coded/assets/x114.png"
            alt="1960s Three-Person Historical Photograph"
            className={styles.centerArtworkImg}
            style={{ width: '100%', height: 'auto' }}
            loading="lazy"
          />
        </HistoricalImageWrap>
      </div>
      <RightCol className={styles.rightCol}>
        <div className={styles.rightCard}>
          {/* 1. Large year → strongest reveal */}
          <HeroYear className={styles.bigYear}>
            <span className={styles.yearNumber}>19</span>
            <span className={styles.yearNumber}>60s</span>
          </HeroYear>

          {/* 3. Section heading → fade-up */}
          <SectionHeading className={styles.editorialTitle}>
            The 2<sup>nd</sup> Generation
            <br />
            of Nagpal Watch.CO
          </SectionHeading>

          {/* 5. Background decorations → almost static */}
          <DecorationLine className={styles.greenDivider} />

          {/* 4. Description → fade-up with small delay */}
          <SectionDescription className={styles.bodyParagraph}>
            This was when the 2nd generation of Nagpal&apos;s family entered the
            business, deepening roots in horology and building relationships
            with component suppliers across Northern India.
          </SectionDescription>
        </div>
      </RightCol>
    </MilestoneSectionWrapper>
  );
}

/* ═══════════════════════════════════════════════════════════════
   3. 1976 SECTION (Exact Match to Reference Screenshot)
   ═══════════════════════════════════════════════════════════════ */
function Section1976() {
  return (
    <MilestoneSectionWrapper id="section-1976" className={styles.milestoneSection}>
      <LeftCol className={styles.leftCol}>
        <div className={styles.leftCard}>
          {/* 1. Large year → strongest reveal */}
          <HeroYear className={styles.bigYear}>
            <span className={styles.yearNumber}>19</span>
            <span className={styles.yearNumber}>76</span>
          </HeroYear>

          {/* 3. Section heading → fade-up */}
          <SectionHeading className={styles.editorialTitle}>
            ‘Nagpal&apos;s Bombay‘
            <br />
            was formed
          </SectionHeading>

          {/* 5. Background decorations → almost static */}
          <DecorationLine className={styles.greenDivider} />

          {/* 4. Description → fade-up with small delay */}
          <SectionDescription className={styles.bodyParagraph}>
            This was when the 2nd generation of Nagpal&apos;s family entered the
            business, deepening roots in horology and building relationships
            with component suppliers across Northern India.
          </SectionDescription>
        </div>
      </LeftCol>
      <div className={styles.centerCol}>
        {/* 2. Historical images → smooth reveal + very slight scale */}
        <HistoricalImageWrap delay={0.12} style={{ width: 'clamp(200px, 20vw, 280px)', marginBottom: '8px' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/about-us-coded/assets/x130.png"
            alt="Nagpals Bombay Logo"
            className={styles.centerArtworkImg}
            style={{ width: '100%', height: 'auto' }}
            loading="lazy"
          />
        </HistoricalImageWrap>
        <HistoricalImageWrap delay={0.16} style={{ width: 'clamp(320px, 32vw, 480px)' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/about-us-coded/assets/x118.png"
            alt="2nd Generation Nagpal Family Historical Photograph"
            className={styles.centerArtworkImg}
            style={{ width: '100%', height: 'auto' }}
            loading="lazy"
          />
        </HistoricalImageWrap>
      </div>
      <RightCol className={styles.rightCol}>
        <div className={styles.rightCard}>
          <SmallYear className={styles.smallYearLabel}>1976</SmallYear>
          <DecorationLine className={styles.smallYearDivider} />
          <SectionDescription className={styles.bodyParagraph}>
            This was the time when they travelled to international markets to
            import parts &amp; components for direct distribution and during
            1980s various BUTTON CELL brands tied up with NAGPALS BOMBAY for
            battery distribution all over India. Brands from Japan like MAXELL
            &amp; Swiss like RENATA became a major area of company&apos;s focus
            for growth.
          </SectionDescription>
        </div>
      </RightCol>
    </MilestoneSectionWrapper>
  );
}

/* ═══════════════════════════════════════════════════════════════
   4. 1991 SECTION
   ═══════════════════════════════════════════════════════════════ */
function Section1991() {
  return (
    <MilestoneSectionWrapper
      id="section-1991"
      className={styles.milestoneSection}
      style={{ marginBottom: "clamp(60px, 10vh, 120px)" }}
    >
      <LeftCol className={styles.leftCol}>
        <div className={styles.leftCard}>
          <SmallYear className={styles.smallYearLabel}>1991</SmallYear>
          <DecorationLine className={styles.smallYearDivider} />
          <SectionDescription className={styles.bodyParagraph}>
            D&apos;Signer was not simply a product launch but a philosophical
            statement. At a time when Indian watchmaking was dominated by
            mass-market models, D&apos;Signer chose craftsmanship over compromise
            and design over convention.
          </SectionDescription>
        </div>
      </LeftCol>
      <div className={styles.centerCol} style={{ gap: 'clamp(30px, 8vh, 60px)' }}>
        {/* 2. Historical images → smooth reveal + very slight scale */}
        <HistoricalImageWrap delay={0.12} style={{ width: '160px', marginBottom: 'clamp(20px, 8vh, 50px)' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/about-us-coded/assets/x110.png"
            alt="D'SIGNER Logo"
            className={styles.centerArtworkImg}
            style={{ width: '100%', height: 'auto' }}
            loading="lazy"
          />
        </HistoricalImageWrap>
        <HistoricalImageWrap delay={0.16} style={{ width: 'clamp(260px, 26vw, 360px)' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/about-us-coded/assets/x98.png"
            alt="D'SIGNER Couple Vintage Ad"
            className={styles.centerArtworkImg}
            style={{ width: '100%', height: 'auto' }}
            loading="lazy"
          />
        </HistoricalImageWrap>
      </div>
      <RightCol className={styles.rightCol}>
        <div className={styles.rightCard}>
          {/* 1. Large year → strongest reveal */}
          <HeroYear className={styles.bigYear}>
            <span className={styles.yearNumber}>19</span>
            <span className={styles.yearNumber}>91</span>
          </HeroYear>

          {/* 3. Section heading → fade-up */}
          <SectionHeading className={styles.editorialTitle}>A Brand Is Born</SectionHeading>

          {/* 5. Background decorations → almost static */}
          <DecorationLine className={styles.greenDivider} />

          {/* 4. Description → fade-up with small delay */}
          <SectionDescription className={styles.bodyParagraph}>
            D&apos;SIGNER was introduced, a step into creating watches defined
            by design, quality, and individuality. One of the early Indian brands
            to design and manufacture to international horological standards.
          </SectionDescription>
        </div>
      </RightCol>
    </MilestoneSectionWrapper>
  );
}

/* ═══════════════════════════════════════════════════════════════
   5. 1995 SECTION
   ═══════════════════════════════════════════════════════════════ */
function Section1995() {
  return (
    <MilestoneSectionWrapper
      id="section-1995"
      className={styles.milestoneSection}
      style={{ marginBottom: "clamp(60px, 10vh, 120px)" }}
    >
      <LeftCol className={styles.leftCol}>
        <div className={styles.leftCard}>
          {/* 1. Large year → strongest reveal */}
          <HeroYear className={styles.bigYear}>
            <span className={styles.yearNumber}>19</span>
            <span className={styles.yearNumber}>95</span>
          </HeroYear>

          {/* 3. Section heading → fade-up */}
          <SectionHeading className={styles.editorialTitle}>Style For All</SectionHeading>

          {/* 5. Background decorations → almost static */}
          <DecorationLine className={styles.greenDivider} />

          {/* 4. Description → fade-up with small delay */}
          <SectionDescription className={styles.bodyParagraph}>
            ESCORT was launched to make timeless design more accessible,
            bringing style to a wider audience with robust everyday timepieces
            at honest prices.
          </SectionDescription>
        </div>
      </LeftCol>
      <div className={styles.centerCol}>
        {/* 2. Historical images → smooth reveal + very slight scale */}
        <HistoricalImageWrap delay={0.12} style={{ width: '150px' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/about-us-coded/assets/x126.png"
            alt="ESCORT Logo"
            className={styles.centerArtworkImg}
            style={{ width: '100%', height: 'auto' }}
            loading="lazy"
          />
        </HistoricalImageWrap>
        <HistoricalImageWrap delay={0.16} style={{ width: 'clamp(260px, 26vw, 360px)' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/about-us-coded/assets/x88.png"
            alt="ESCORT Launch Celebration"
            className={styles.centerArtworkImg}
            style={{ width: '100%', height: 'auto' }}
            loading="lazy"
            onError={(e) => {
              const t = e.target as HTMLImageElement;
              if (!t.dataset.fallback) {
                t.dataset.fallback = '1';
                t.src = '/images/about/clean_assets/escort_launch.png';
              }
            }}
          />
        </HistoricalImageWrap>
      </div>
      <RightCol className={styles.rightCol}>
        <div className={styles.rightCard}>
          <SmallYear className={styles.smallYearLabel}>1995</SmallYear>
          <DecorationLine className={styles.smallYearDivider} />
          <SectionDescription className={styles.bodyParagraph}>
            Escort answered a simple question: why shouldn&apos;t every Indian
            have access to a reliable, beautifully finished timepiece? The
            market responded with extraordinary enthusiasm.
          </SectionDescription>
        </div>
      </RightCol>
    </MilestoneSectionWrapper>
  );
}

/* ═══════════════════════════════════════════════════════════════
   6. 1998 SECTION
   ═══════════════════════════════════════════════════════════════ */
function Section1998() {
  return (
    <MilestoneSectionWrapper
      id="section-1998"
      className={styles.milestoneSection}
      style={{ marginBottom: "clamp(60px, 10vh, 120px)" }}
    >
      <LeftCol className={styles.leftCol}>
        <div className={styles.leftCard}>
          <SmallYear className={styles.smallYearLabel}>1998</SmallYear>
          <DecorationLine className={styles.smallYearDivider} />
          <SectionDescription className={styles.bodyParagraph}>
            Bringing prestige Swiss and French horological brands to Indian
            retail counters established the Nagpal Group as an esteemed
            national distributor.
          </SectionDescription>
        </div>
      </LeftCol>
      <div className={styles.centerCol}>
        {/* 2. Historical image → smooth reveal + very slight scale */}
        <HistoricalImageWrap style={{ width: 'clamp(280px, 28vw, 380px)' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/about-us-coded/assets/x106.png"
            alt="Tissot Launch Partnership"
            className={styles.centerArtworkImg}
            style={{ width: '100%', height: 'auto' }}
            loading="lazy"
            onError={(e) => {
              const t = e.target as HTMLImageElement;
              if (!t.dataset.fallback) {
                t.dataset.fallback = '1';
                t.src = '/images/about/clean_assets/tissot_meet.png';
              }
            }}
          />
        </HistoricalImageWrap>
      </div>
      <RightCol className={styles.rightCol}>
        <div className={styles.rightCard}>
          {/* 1. Large year → strongest reveal */}
          <HeroYear className={styles.bigYear}>
            <span className={styles.yearNumber}>19</span>
            <span className={styles.yearNumber}>98</span>
          </HeroYear>

          {/* 3. Section heading → fade-up */}
          <SectionHeading className={styles.editorialTitle}>
            Introduction of
            <br />
            Tissot in India
          </SectionHeading>

          {/* 5. Background decorations → almost static */}
          <DecorationLine className={styles.greenDivider} />

          {/* 4. Description → fade-up with small delay */}
          <SectionDescription className={styles.bodyParagraph}>
            We were the ones to launch TISSOT watches in India as national
            distributors. We initiated the distribution for Tissot, Givenchy
            Paris, Christian Bernard Paris, and Rotary in India.
          </SectionDescription>
        </div>
      </RightCol>
    </MilestoneSectionWrapper>
  );
}

/* ═══════════════════════════════════════════════════════════════
   7. 2004 SECTION
   ═══════════════════════════════════════════════════════════════ */
function Section2004() {
  return (
    <MilestoneSectionWrapper
      id="section-2004"
      className={styles.milestoneSection}
      style={{ marginBottom: "clamp(60px, 10vh, 120px)" }}
    >
      <LeftCol className={styles.leftCol}>
        <div className={styles.leftCard}>
          {/* 1. Large year → strongest reveal */}
          <HeroYear className={styles.bigYear}>
            <span className={styles.yearNumber}>20</span>
            <span className={styles.yearNumber}>04</span>
          </HeroYear>

          {/* 3. Section heading → fade-up */}
          <SectionHeading className={styles.editorialTitle}>D’signer Effects</SectionHeading>

          {/* 5. Background decorations → almost static */}
          <DecorationLine className={styles.greenDivider} />

          {/* 4. Description → fade-up with small delay */}
          <SectionDescription className={styles.bodyParagraph}>
            We started a division purely in the corporate gifts &amp; promotion
            business under the name D’SIGNER EFFECTS. Here the idea was to
            connect with all small and large organizations, offering all sorts
            of promotion gifts for schemes and marketing plans.
          </SectionDescription>
        </div>
      </LeftCol>
      <div className={styles.centerCol} style={{ gap: '14px' }}>
        {/* 2. Historical images → smooth reveal + very slight scale */}
        <HistoricalImageWrap delay={0.12} style={{ width: 'clamp(180px, 18vw, 250px)' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/about-us-coded/assets/x80.png"
            alt="D'SIGNER Effects Logo"
            className={styles.centerArtworkImg}
            style={{ width: '100%', height: 'auto' }}
            loading="lazy"
          />
        </HistoricalImageWrap>
        <HistoricalImageWrap delay={0.16} style={{ width: 'clamp(200px, 20vw, 280px)' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/about-us-coded/assets/x72.png"
            alt="D'SIGNER Effects Flyer"
            className={styles.centerArtworkImg}
            style={{ width: '100%', height: 'auto' }}
            loading="lazy"
          />
        </HistoricalImageWrap>
      </div>
      <RightCol className={styles.rightCol}>
        <div className={styles.rightCard}>
          <SmallYear className={styles.smallYearLabel}>2004</SmallYear>
          <DecorationLine className={styles.smallYearDivider} />
          <SectionDescription className={styles.bodyParagraph}>
            Connecting brand messaging with high-quality custom corporate
            gifts allowed businesses across India to elevate their marketing
            initiatives and employee reward programs.
          </SectionDescription>
        </div>
      </RightCol>
    </MilestoneSectionWrapper>
  );
}

/* ═══════════════════════════════════════════════════════════════
   8. 2010 SECTION
   ═══════════════════════════════════════════════════════════════ */
function Section2010() {
  return (
    <MilestoneSectionWrapper
      id="section-2010"
      className={styles.milestoneSection}
      style={{ marginBottom: "clamp(60px, 10vh, 120px)" }}
    >
      <LeftCol className={styles.leftCol}>
        <div className={styles.leftCard}>
          <SmallYear className={styles.smallYearLabel}>2010</SmallYear>
          <DecorationLine className={styles.smallYearDivider} />
          <SectionDescription className={styles.bodyParagraph}>
            DESIGNER WATCHES scaled production skills and managed largest volume
            B2B orders of watches in lakhs, delivering projects for esteemed
            groups like TATA INDICOM, REEBOK, NIKON, and PHARMA COMPANIES.
          </SectionDescription>
        </div>
      </LeftCol>
      <div className={styles.centerCol}>
        {/* 2. Historical images → smooth reveal + very slight scale */}
        <HistoricalImageWrap delay={0.12}>
          <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', alignItems: 'center' }}>
            <ParallaxDecoration speed={0.02}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/about-us-coded/assets/x76.png"
                alt="Antique Clock"
                style={{ width: '100px', objectFit: 'contain', display: 'block' }}
                loading="lazy"
              />
            </ParallaxDecoration>
            <ParallaxDecoration speed={0.038}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/about-us-coded/assets/x46.png"
                alt="Desk Clock"
                style={{ width: '130px', objectFit: 'contain', display: 'block' }}
                loading="lazy"
              />
            </ParallaxDecoration>
          </div>
        </HistoricalImageWrap>
        <HistoricalImageWrap delay={0.16} style={{ width: 'clamp(280px, 28vw, 380px)' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/about-us-coded/assets/x50.png"
            alt="Clocks Collection"
            className={styles.centerArtworkImg}
            style={{ width: '100%', height: 'auto' }}
            loading="lazy"
          />
        </HistoricalImageWrap>
      </div>
      <RightCol className={styles.rightCol}>
        <div className={styles.rightCard}>
          {/* 1. Large year → strongest reveal */}
          <HeroYear className={styles.bigYear}>
            <span className={styles.yearNumber}>20</span>
            <span className={styles.yearNumber}>10</span>
          </HeroYear>

          {/* 3. Section heading → fade-up */}
          <SectionHeading className={styles.editorialTitle}>
            B2B &amp; Corporate
            <br />
            Gifting
          </SectionHeading>

          {/* 5. Background decorations → almost static */}
          <DecorationLine className={styles.greenDivider} />

          {/* 4. Description → fade-up with small delay */}
          <SectionDescription className={styles.bodyParagraph}>
            B2B &amp; Corporate Gifting became a very important focus as
            wristwatches became a strong category for business promotion and
            marketing plans for major corporates. Launched clocks &amp; bags
            category under D’SIGNER for B2B requirements.
          </SectionDescription>
        </div>
      </RightCol>
    </MilestoneSectionWrapper>
  );
}

/* ═══════════════════════════════════════════════════════════════
   9. 2013 SECTION
   ═══════════════════════════════════════════════════════════════ */
function Section2013() {
  return (
    <MilestoneSectionWrapper
      id="section-2013"
      className={styles.milestoneSection}
      style={{ marginBottom: "clamp(60px, 10vh, 120px)" }}
    >
      <LeftCol className={styles.leftCol}>
        <div className={styles.leftCard}>
          {/* 1. Large year → strongest reveal */}
          <HeroYear className={styles.bigYear}>
            <span className={styles.yearNumber}>20</span>
            <span className={styles.yearNumber}>13</span>
          </HeroYear>

          {/* 3. Section heading → fade-up */}
          <SectionHeading className={styles.editorialTitle}>Daniel Klein in India</SectionHeading>

          {/* 5. Background decorations → almost static */}
          <DecorationLine className={styles.greenDivider} />

          {/* 4. Description → fade-up with small delay */}
          <SectionDescription className={styles.bodyParagraph}>
            Got exclusive distribution of Daniel Klein, a leading Turkish brand
            of watches and fashion accessories, in India.
          </SectionDescription>
        </div>
      </LeftCol>
      <div className={styles.centerCol}>
        {/* 2. Historical image → smooth reveal + very slight scale */}
        <HistoricalImageWrap style={{ width: 'clamp(260px, 26vw, 360px)' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/about-us-coded/assets/x84.png"
            alt="Daniel Klein Splash Watch Artwork"
            className={styles.centerArtworkImg}
            style={{ width: '100%', height: 'auto' }}
            loading="lazy"
          />
        </HistoricalImageWrap>
      </div>
      <RightCol className={styles.rightCol}>
        <div className={styles.rightCard}>
          <SmallYear className={styles.smallYearLabel}>2013</SmallYear>
          <DecorationLine className={styles.smallYearDivider} />
          <SectionDescription className={styles.bodyParagraph}>
            Bringing dynamic international styling and accessible luxury to
            retail counters opened new fashion-forward demographics across all
            major tier-1 and tier-2 cities.
          </SectionDescription>
        </div>
      </RightCol>
    </MilestoneSectionWrapper>
  );
}

/* ═══════════════════════════════════════════════════════════════
   10. 2015 SECTION
   ═══════════════════════════════════════════════════════════════ */
function Section2015() {
  return (
    <MilestoneSectionWrapper id="section-2015" className={styles.milestoneSection}>
      <LeftCol className={styles.leftCol}>
        <div className={styles.leftCard}>
          <SmallYear className={styles.smallYearLabel}>2015</SmallYear>
          <DecorationLine className={styles.smallYearDivider} />
          <SectionDescription className={styles.bodyParagraph}>
            Over 500 private labels would trust our manufacturing expertise to
            engineer precision timepieces adhering to international quality
            benchmarks.
          </SectionDescription>
        </div>
      </LeftCol>
      <div className={styles.centerCol}>
        {/* 2. Historical images → smooth reveal + very slight scale */}
        <HistoricalImageWrap delay={0.12} style={{ width: '130px' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/about-us-coded/assets/x60.png"
            alt="OEM Time Lab Logo"
            className={styles.centerArtworkImg}
            style={{ width: '100%', height: 'auto' }}
            loading="lazy"
          />
        </HistoricalImageWrap>
        <HistoricalImageWrap delay={0.16} style={{ width: 'clamp(240px, 24vw, 320px)' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/about-us-coded/assets/x42.png"
            alt="Handcrafted Workshop Stack"
            className={styles.centerArtworkImg}
            style={{ width: '100%', height: 'auto' }}
            loading="lazy"
          />
        </HistoricalImageWrap>
      </div>
      <RightCol className={styles.rightCol}>
        <div className={styles.rightCard}>
          {/* 1. Large year → strongest reveal */}
          <HeroYear className={styles.bigYear}>
            <span className={styles.yearNumber}>20</span>
            <span className={styles.yearNumber}>15</span>
          </HeroYear>

          {/* 3. Section heading → fade-up */}
          <SectionHeading className={styles.editorialTitle}>
            Beyond Our Own
            <br />
            Brand
          </SectionHeading>

          {/* 5. Background decorations → almost static */}
          <DecorationLine className={styles.greenDivider} />

          {/* 4. Description → fade-up with small delay */}
          <SectionDescription className={styles.bodyParagraph}>
            Expanding into OEM manufacturing, we began designing and producing
            watches for global and national brands, marking a significant leap
            in manufacturing capability.
          </SectionDescription>
        </div>
      </RightCol>
    </MilestoneSectionWrapper>
  );
}

/* ═══════════════════════════════════════════════════════════════
   11. 2017 SECTION
   ═══════════════════════════════════════════════════════════════ */
function Section2017() {
  return (
    <MilestoneSectionWrapper id="section-2017" className={styles.milestoneSection}>
      <LeftCol className={styles.leftCol}>
        <div className={styles.leftCard}>
          {/* 1. Large year → strongest reveal */}
          <HeroYear className={styles.bigYear}>
            <span className={styles.yearNumber}>20</span>
            <span className={styles.yearNumber}>17</span>
          </HeroYear>

          {/* 3. Section heading → fade-up */}
          <SectionHeading className={styles.editorialTitle}>Adding More Brands</SectionHeading>

          {/* 5. Background decorations → almost static */}
          <DecorationLine className={styles.greenDivider} />

          {/* 4. Description → fade-up with small delay */}
          <SectionDescription className={styles.bodyParagraph}>
            The house introduced few more international fashion brands in its
            distribution channel: MATHEY TISSOT and D1 MILANO.
          </SectionDescription>
        </div>
      </LeftCol>
      <div className={styles.centerCol}>
        {/* 2. Historical image → smooth reveal + very slight scale */}
        <HistoricalImageWrap style={{ width: 'clamp(260px, 26vw, 360px)' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/about-us-coded/assets/x34.png"
            alt="Mathey-Tissot Chronograph Watch"
            className={styles.centerArtworkImg}
            style={{ width: '100%', height: 'auto' }}
            loading="lazy"
          />
        </HistoricalImageWrap>
      </div>
      <RightCol className={styles.rightCol}>
        <div className={styles.rightCard}>
          <SmallYear className={styles.smallYearLabel}>2017</SmallYear>
          <DecorationLine className={styles.smallYearDivider} />
          <SectionDescription className={styles.bodyParagraph}>
            Same year Designer World stepped into international exports, in
            London, Singapore, and in Middle Eastern countries like Bahrain and
            Oman.
          </SectionDescription>
        </div>
      </RightCol>
    </MilestoneSectionWrapper>
  );
}

/* ═══════════════════════════════════════════════════════════════
   12. 2020 SECTION
   ═══════════════════════════════════════════════════════════════ */
function Section2020() {
  return (
    <MilestoneSectionWrapper id="section-2020" className={styles.milestoneSection}>
      <LeftCol className={styles.leftCol}>
        <div className={styles.leftCard}>
          <SmallYear className={styles.smallYearLabel}>2020</SmallYear>
          <DecorationLine className={styles.smallYearDivider} />
          <SectionDescription className={styles.bodyParagraph}>
            Direct-to-consumer acceleration and modern logistics allowed us to
            deliver timepieces with agility to watch lovers across India.
          </SectionDescription>
        </div>
      </LeftCol>
      <div className={styles.centerCol}>
        {/* 2. Historical image → smooth reveal + very slight scale */}
        <HistoricalImageWrap style={{ width: 'clamp(180px, 18vw, 240px)' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/about-us-coded/assets/x24.png"
            alt="ghadiwaala Logo"
            className={styles.centerArtworkImg}
            style={{ width: '100%', height: 'auto' }}
            loading="lazy"
          />
        </HistoricalImageWrap>
      </div>
      <RightCol className={styles.rightCol}>
        <div className={styles.rightCard}>
          {/* 1. Large year → strongest reveal */}
          <HeroYear className={styles.bigYear}>
            <span className={styles.yearNumber}>20</span>
            <span className={styles.yearNumber}>20</span>
          </HeroYear>

          {/* 3. Section heading → fade-up */}
          <SectionHeading className={styles.editorialTitle}>The Digital Shift</SectionHeading>

          {/* 5. Background decorations → almost static */}
          <DecorationLine className={styles.greenDivider} />

          {/* 4. Description → fade-up with small delay */}
          <SectionDescription className={styles.bodyParagraph}>
            With the rise of e-commerce, we adapted quickly, designing for
            online-first brands and expanding our reach across digital
            platforms.
          </SectionDescription>
        </div>
      </RightCol>
    </MilestoneSectionWrapper>
  );
}

/* ═══════════════════════════════════════════════════════════════
   13. 2022 SECTION
   ═══════════════════════════════════════════════════════════════ */
function Section2022() {
  return (
    <MilestoneSectionWrapper id="section-2022" className={styles.milestoneSection}>
      <LeftCol className={styles.leftCol}>
        <div className={styles.leftCard}>
          {/* 1. Large year → strongest reveal */}
          <HeroYear className={styles.bigYear}>
            <span className={styles.yearNumber}>20</span>
            <span className={styles.yearNumber}>22</span>
          </HeroYear>

          {/* 3. Section heading → fade-up */}
          <SectionHeading className={styles.editorialTitle}>
            Designer World
            <br />
            Brands
          </SectionHeading>

          {/* 5. Background decorations → almost static */}
          <DecorationLine className={styles.greenDivider} />

          {/* 4. Description → fade-up with small delay */}
          <SectionDescription className={styles.bodyParagraph}>
            Started a new division solely managing foreign brand distribution
            under the name DESIGNER WORLD BRANDS &amp; added more labels like
            INGERSOLL, INVICTA, and SANTA BARBARA POLO CLUB.
          </SectionDescription>
        </div>
      </LeftCol>
      <div className={styles.centerCol}>
        {/* 2. Historical image → smooth reveal + very slight scale */}
        <HistoricalImageWrap style={{ width: 'clamp(260px, 26vw, 360px)' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/about-us-coded/assets/x20.png"
            alt="Designer World Brands Portfolio"
            className={styles.centerArtworkImg}
            style={{ width: '100%', height: 'auto' }}
            loading="lazy"
          />
        </HistoricalImageWrap>
      </div>
      <RightCol className={styles.rightCol}>
        <div className={styles.rightCard}>
          <SmallYear className={styles.smallYearLabel}>2022</SmallYear>
          <DecorationLine className={styles.smallYearDivider} />
          <SectionDescription className={styles.bodyParagraph}>
            Dedicated brand management infrastructure empowered global fashion
            icons to flourish in the Indian marketplace.
          </SectionDescription>
        </div>
      </RightCol>
    </MilestoneSectionWrapper>
  );
}

/* ═══════════════════════════════════════════════════════════════
   14. 2024 SECTION
   ═══════════════════════════════════════════════════════════════ */
function Section2024() {
  return (
    <MilestoneSectionWrapper id="section-2024" className={styles.milestoneSection}>
      <LeftCol className={styles.leftCol}>
        <div className={styles.leftCard}>
          <SmallYear className={styles.smallYearLabel}>2024</SmallYear>
          <DecorationLine className={styles.smallYearDivider} />
          <SectionDescription className={styles.bodyParagraph}>
            Combining modern ethical lab-grown diamonds with Swiss-inspired
            horology to deliver sophisticated luxury for discerning collectors.
          </SectionDescription>
        </div>
      </LeftCol>
      <div className={styles.centerCol}>
        {/* 2. Historical image → smooth reveal + very slight scale */}
        <HistoricalImageWrap style={{ width: 'clamp(260px, 26vw, 360px)' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/about-us-coded/assets/x16.png"
            alt="D'SIGNER Diamond Studded Watch"
            className={styles.centerArtworkImg}
            style={{ width: '100%', height: 'auto' }}
            loading="lazy"
          />
        </HistoricalImageWrap>
      </div>
      <RightCol className={styles.rightCol}>
        <div className={styles.rightCard}>
          {/* 1. Large year → strongest reveal */}
          <HeroYear className={styles.bigYear}>
            <span className={styles.yearNumber}>20</span>
            <span className={styles.yearNumber}>24</span>
          </HeroYear>

          {/* 3. Section heading → fade-up */}
          <SectionHeading className={styles.editorialTitle}>
            D’signer Diamond
            <br />
            Watches
          </SectionHeading>

          {/* 5. Background decorations → almost static */}
          <DecorationLine className={styles.greenDivider} />

          {/* 4. Description → fade-up with small delay */}
          <SectionDescription className={styles.bodyParagraph}>
            Launched Lab Grown Diamond Studded Watches as a new step to reach a
            more luxury audience, featuring models ranging up to Rs. 1,50,000/-.
          </SectionDescription>
        </div>
      </RightCol>
    </MilestoneSectionWrapper>
  );
}

/* ═══════════════════════════════════════════════════════════════
   15. 2025 SECTION
   ═══════════════════════════════════════════════════════════════ */
function Section2025() {
  return (
    <MilestoneSectionWrapper id="section-2025" className={styles.milestoneSection}>
      <LeftCol className={styles.leftCol}>
        <div className={styles.leftCard}>
          {/* 1. Large year → strongest reveal */}
          <HeroYear className={styles.bigYear}>
            <span className={styles.yearNumber}>20</span>
            <span className={styles.yearNumber}>25</span>
          </HeroYear>

          {/* 3. Section heading → fade-up */}
          <SectionHeading className={styles.editorialTitle}>Time Corridor</SectionHeading>

          {/* 5. Background decorations → almost static */}
          <DecorationLine className={styles.greenDivider} />

          {/* 4. Description → fade-up with small delay */}
          <SectionDescription className={styles.bodyParagraph}>
            This retail Time Boutique is initiated to promote our home brands,
            D’SIGNER &amp; ESCORT watches at a unique experience store
            showcasing our prime models, new launches, top sellers &amp; special
            editions with an appealing display and aura. A gesture to connect
            &amp; add some value to our happy watch buyers.
          </SectionDescription>
        </div>
      </LeftCol>
      <div className={styles.centerCol}>
        {/* 2. Historical image → smooth reveal + very slight scale */}
        <HistoricalImageWrap style={{ width: 'clamp(260px, 26vw, 360px)' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/about-us-coded/assets/x12.png"
            alt="Time Corridor Boutique"
            className={styles.centerArtworkImg}
            style={{ width: '100%', height: 'auto' }}
            loading="lazy"
          />
        </HistoricalImageWrap>
      </div>
      <RightCol className={styles.rightCol}>
        <div className={styles.rightCard}>
          <SmallYear className={styles.smallYearLabel}>2025</SmallYear>
          <DecorationLine className={styles.smallYearDivider} />
          <SectionDescription className={styles.bodyParagraph}>
            A latest feather in Designer World story. At Designer World it’s
            not about just the product we make but the aura we pass to our user
            with the time we design.
          </SectionDescription>
        </div>
      </RightCol>
    </MilestoneSectionWrapper>
  );
}

/* ═══════════════════════════════════════════════════════════════
   16. TODAY SECTION
   ═══════════════════════════════════════════════════════════════ */
function SectionToday() {
  return (
    <MilestoneSectionWrapper
      id="section-today"
      className={styles.todaySection}
      style={{ marginBottom: "clamp(40px, 6vh, 80px)" }}
    >
      <div className={styles.todayGrid}>
        {/* ── Left Column: Small TODAY label, green divider, first narrative ── */}
        <LeftCol className={styles.leftCol}>
          <div className={styles.leftCard}>
            <SmallYear className={styles.smallYearLabel}>TODAY</SmallYear>
            <DecorationLine className={styles.smallYearDivider} />
            <SectionDescription className={styles.bodyParagraph}>
              Blending decades of legacy with modern design, Designer World
              continues to create watches that balance style, quality, and
              accessibility.
            </SectionDescription>
          </div>
        </LeftCol>

        {/* ── Center Column: Center Spine ── */}
        <div className={styles.centerCol} />

        {/* ── Right Column: Stacked TO / DAY, Today & Beyond, divider, second narrative ── */}
        <RightCol className={styles.rightCol}>
          <div className={styles.rightCard}>
            {/* 1. Large hero year → strongest reveal */}
            <HeroYear className={styles.bigYearToday}>
              <span className={styles.yearNumber}>TO</span>
              <span className={styles.yearNumber}>DAY</span>
            </HeroYear>

            {/* 3. Section heading → fade-up */}
            <SectionHeading className={styles.editorialTitle}>
              Today &amp; Beyond
            </SectionHeading>

            {/* 5. Background decorations → almost static */}
            <DecorationLine className={styles.greenDivider} />

            {/* 4. Description → fade-up with small delay */}
            <SectionDescription className={styles.bodyParagraph}>
              Where heritage meets modern design, Designer World creates watches
              that combine timeless style, reliable quality, and everyday
              accessibility.
            </SectionDescription>
          </div>
        </RightCol>
      </div>

      {/* 2. Full team photo centered below the grid */}
      <div className={styles.teamPhotoWrap}>
        <HistoricalImageWrap style={{ width: "100%" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/about-us-coded/assets/x8.png"
            alt="Designer World Full Team Photo"
            className={styles.teamPhotoImg}
            loading="lazy"
            onError={(e) => {
              const t = e.target as HTMLImageElement;
              if (!t.dataset.fallback) {
                t.dataset.fallback = "1";
                t.src = "/images/aboutImg3.png";
              }
            }}
          />
        </HistoricalImageWrap>
      </div>
    </MilestoneSectionWrapper>
  );
}



/* ═══════════════════════════════════════════════════════════════
   CINEMATIC HERO BANNER (ABOUT-5)
   - Background image slowly scales from approx 1.05 -> 1.00
   - Subtle vertical parallax drift as user scrolls
   - Dark overlay subtly transitioning to let historical photograph come alive
   - Bottom tagline: premium fade-up with small delay (y: 24 -> 0, duration 0.85s)
   - Hero exit: moves slower than scroll and smoothly transitions upward into timeline
   ═══════════════════════════════════════════════════════════════ */
function HeroBanner() {
  const heroRef = useRef<HTMLElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const h = window.innerHeight || 800;
          const currentY = window.scrollY;
          if (currentY <= h * 1.5) {
            const p = Math.min(Math.max(currentY / h, 0), 1);
            setScrollProgress(p);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 1. HERO IMAGE: Slowly scales from approximately 1.05 -> 1.00 + subtle vertical parallax
  const imgScale = Number((1.05 - scrollProgress * 0.05).toFixed(4));
  const imgY = `-${(scrollProgress * 12).toFixed(2)}%`;

  // 2. DARK OVERLAY: Subtle transition so historical photograph feels alive without sudden brightness
  const overlayOpacity = Math.min(0.48, 0.16 + scrollProgress * 0.32);

  // 4. HERO EXIT: Moves slightly slower than scroll and smoothly transitions upward into the timeline
  const heroExitOpacity = Math.max(0.28, 1 - scrollProgress * 0.72);
  const heroExitY = `-${(scrollProgress * 6).toFixed(2)}%`;

  // Caption scroll fade
  const captionScrollOpacity = Math.max(0, 1 - scrollProgress * 1.3);

  return (
    <section
      ref={heroRef}
      className={styles.heroBanner}
      style={{ opacity: heroExitOpacity, transform: `translateY(${heroExitY})` }}
    >
      {/* 1. Hero Image with slow zoom/parallax */}
      <div
        className={styles.heroImgWrap}
        style={{
          transform: `scale(${imgScale}) translateY(${imgY})`,
          transformOrigin: 'center center',
          transition: 'transform 0.1s linear',
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <motion.img
          src="/images/about us journey/banner-tt.JPG"
          alt="Nagpal Group Heritage"
          className={styles.heroImg}
          initial={{ opacity: 0.85 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, ease: LUXURY_EASE }}
          onError={(e) => {
            const t = e.target as HTMLImageElement;
            t.src = '/img/about-2.png';
          }}
        />
      </div>

      {/* 2. Dark Overlay - subtly transitioning */}
      <div
        className={styles.heroDarkOverlay}
        style={{ opacity: overlayOpacity }}
        aria-hidden="true"
      />

      {/* 3. Bottom Tagline - premium fade-up with small delay */}
      <div
        className={styles.heroCaption}
        style={{ opacity: captionScrollOpacity }}
      >
        <motion.p
          className={styles.heroCaptionText}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.85,
            delay: 0.35,
            ease: LUXURY_EASE,
          }}
        >
          Eight Decades of Horological Mastery &middot; From Amritsar to the
          World &middot; 1940 &ndash; 2025
        </motion.p>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   PAGE SHELL (About-3 Typography & Layout Foundation)
   ═══════════════════════════════════════════════════════════════ */
export default function About5Page() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const [timelineProgress, setTimelineProgress] = useState(0);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (timelineRef.current) {
            const rect = timelineRef.current.getBoundingClientRect();
            const wh = window.innerHeight || 800;
            // Progress starts when timeline enters viewport and tracks throughout all 16 milestones
            const totalDistance = rect.height - wh * 0.4;
            const scrolledDistance = (wh * 0.55) - rect.top;
            if (totalDistance > 0) {
              const progress = Math.min(Math.max(scrolledDistance / totalDistance, 0), 1);
              setTimelineProgress(progress);
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <main className={styles.page}>
      {/* ── 1. Hero Banner with Cinematic Scroll Animation ── */}
      <HeroBanner />

      {/* ── 2. Intro Text & Stats Section (from About-3) ── */}
      <section className={styles.introSection}>
        <div className={styles.introContainer}>
          <FadeIn delay={0.1}>
            <div className={styles.introGrid}>
              <div>
                <p className={styles.introTextLeft}>
                  <span className={styles.dropCap}>A</span>
                  vast watch empire, born at the heart of an immense nation and a
                  business that has promised so much. The Nagpal Group, 1940 to
                  2025, explores the origins, growth and legacy of one of the
                  most transformative periods in Indian horology. In this
                  wide-ranging narrative, the Nagpal family discusses how their
                  legacy shapes watches beyond ideology, placing it firmly in
                  the context of commerce, craft, and cultural aspiration.
                </p>
              </div>
              <div>
                <p className={styles.introTextRight}>
                  From the final decades of tradition to the resurgence of
                  D&apos;Signer, the Nagpal story reveals how horological hopes
                  collided with harsh realities, from small Amritsar workshops
                  to global OEM manufacturing, supplying over 500 private labels
                  across the world, and why the legacy continues to shape
                  India&apos;s watch industry today. With 20+ international
                  brands, Designer World stands as a chronicle of Indian
                  horology&apos;s finest chapter.
                </p>
              </div>
            </div>

            <div className={styles.statsDivider} />

            <div className={styles.statsRow}>
              {[
                ['4', 'Generations'],
                ['20+', 'Intl Brands'],
                ['500+', 'OEM Labels'],
              ].map(([num, label]) => (
                <div key={label} className={styles.statItem}>
                  <div className={styles.statNum}>{num}</div>
                  <div className={styles.statLabel}>{label}</div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── 3. Continuous Timeline Body (All 16 Milestones in Normal Flow) ── */}
      <div ref={timelineRef} className={styles.timelineBody}>
        {/* Continuous Distressed Green Center Spine with Scroll-Driven Progress */}
        <div className={styles.greenSpine} aria-hidden="true">
          {/* Highlight overlay tracking scroll */}
          <div
            className={styles.spineHighlightOverlay}
            style={{ height: `${(timelineProgress * 100).toFixed(2)}%` }}
          />
          {/* Progress track with golden bar & milestone indicator */}
          <div className={styles.spineProgressTrack}>
            <div
              className={styles.spineProgressBar}
              style={{ height: `${(timelineProgress * 100).toFixed(2)}%` }}
            />
            <div
              className={styles.spineProgressHead}
              style={{
                top: `${(timelineProgress * 100).toFixed(2)}%`,
                opacity: timelineProgress > 0.005 ? 1 : 0,
                transition: 'opacity 0.25s ease',
              }}
            />
          </div>
        </div>

        {/* 16 Sequential Milestone Sections */}
        <Section1940s />
        <Section1960s />
        <Section1976 />
        <Section1991 />
        <Section1995 />
        <Section1998 />
        <Section2004 />
        <Section2010 />
        <Section2013 />
        <Section2015 />
        <Section2017 />
        <Section2020 />
        <Section2022 />
        <Section2024 />
        <Section2025 />
        <SectionToday />
      </div>

      {/* ── 4. Chairman Message Section (from About-3) ── */}
      <section className={styles.chairmanSection}>
        <div className={styles.chairmanContainer}>
          <FadeIn>
            <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-8 md:gap-16 items-start">
              <div>
                <div className={styles.chairmanImgWrap}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/aboutImg3.png"
                    alt="Jatinder Nagpal Chairman"
                    className={styles.chairmanImg}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = FALLBACK;
                    }}
                  />
                  <div className={styles.chairmanBadge}>
                    <p className="font-montserrat italic text-[12px] text-white/90 tracking-[0.08em] m-0">
                      Jatinder Nagpal, Chairman, Designer World
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <div className={styles.chairmanHeadingWrap}>
                  <h2 className={styles.chairmanHeading}>CHAIRMAN MESSAGE</h2>
                </div>
                <p className={styles.chairmanText}>
                  On behalf of our entire team, I extend my heartfelt thanks to
                  all the proud owners and loyal users of our house brands,
                  D&apos;SIGNER and ESCORT. Our parent company, Nagpals, has been
                  a trusted name in watch components for decades.
                </p>
                <p className={styles.chairmanText}>
                  Building on this rich legacy, we ventured into the world of
                  premium timepieces in 1991, inspired by the elegance of Swiss
                  and European watchmaking traditions. This led to the birth of
                  D&apos;SIGNER which quickly carved out a niche for itself by
                  upholding the highest standards of design and quality. In
                  1995, we introduced ESCORT, a brand that delivers
                  high-quality watches at affordable prices, making stylish
                  timekeeping accessible to all.
                </p>
                <p className={styles.chairmanText}>
                  Today, both D&apos;SIGNER and ESCORT enjoy a strong presence
                  across the country through our Multi Brand Stores, with
                  millions of happy customers who continue to place their trust
                  in us. I sincerely thank each one of you for being a part of
                  this journey.
                </p>
                <p className={styles.chairmanSign}>Jatinder Nagpal, Chairman</p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </main>
  );
}
