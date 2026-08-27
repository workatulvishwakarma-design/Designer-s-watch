'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import styles from './about5.module.css';

const GREEN = '#003926';
const FALLBACK = '/images/new-img/model-1/824/824-RGFS-3-nobg.png';

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
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ duration: 0.7, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   1. 1940s SECTION (Exact Match to Reference Screenshot)
   ═══════════════════════════════════════════════════════════════ */
function Section1940s() {
  return (
    <section id="section-1940s" className={styles.section1940}>
      {/* ── Left Column: 19/40s, The Beginning, Rule, Narrative ── */}
      <div className={styles.leftCol1940}>
        <div className={styles.bigYear1940}>
          <span className={styles.yearNumber}>19</span>
          <div className={styles.yearBottomRow}>
            <span className={styles.yearNumber}>40</span>
            <span className={styles.yearSuffix}>s</span>
          </div>
        </div>
        <h2 className={styles.editorialTitle1940}>The Beginning</h2>
        <div className={styles.greenDivider1940} />
        <p className={styles.bodyParagraph1940}>
          Started a new division solely managing foreign brand distribution
          under the name <strong>DESIGNER WORLD BRANDS</strong> &amp; added
          more labels like INGERSOLL, INVICTA, and SANTA BARBARA POLO CLUB.
        </p>
      </div>

      {/* ── Center Portrait: Anchored directly over the green spine ── */}
      <div className={styles.portraitWrap1940}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/about-us-coded/assets/x102.png"
          alt="1940s Founder Portrait"
          className={styles.portraitImg1940}
          loading="eager"
        />
      </div>

      {/* ── Right Column: 1940s, Rule, Narrative + Storefront Artwork ── */}
      <div className={styles.rightCol1940}>
        <div className={styles.rightYearHeading1940}>
          1940<span className={styles.rightYearSuffix}>s</span>
        </div>
        <div className={styles.rightGreenDivider1940} />
        <p className={styles.bodyParagraph1940}>
          Dedicated brand management infrastructure empowered global fashion
          icons to flourish in the Indian marketplace.
        </p>
        <div className={styles.storeWrap1940}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/about-us-coded/assets/x122.png"
            alt="Nagpal Watch Co. Historical Storefront"
            className={styles.storeImg1940}
            loading="eager"
          />
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   2. 1960s SECTION
   ═══════════════════════════════════════════════════════════════ */
function Section1960s() {
  return (
    <section id="section-1960s" className={styles.milestoneSection}>
      <div className={styles.leftCol}>
        <div className={styles.leftCard}>
          <div className={styles.smallYearLabel}>1960s</div>
          <p className={styles.bodyParagraph}>
            International partnerships formed the backbone of a growing
            enterprise. By the mid-60s, Nagpals had become a trusted name in the
            Northern India trade circuit for precision components and watch
            batteries.
          </p>
        </div>
      </div>
      <div className={styles.centerCol}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/about-us-coded/assets/x114.png"
          alt="1960s Three-Person Historical Photograph"
          className={styles.centerArtworkImg}
          style={{ width: 'clamp(320px, 30vw, 460px)' }}
          loading="lazy"
        />
      </div>
      <div className={styles.rightCol}>
        <div className={styles.rightCard}>
          <div className={styles.bigYear}>
            <span className={styles.yearNumber}>19</span>
            <span className={styles.yearNumber}>60s</span>
          </div>
          <h2
            className={styles.editorialTitle}
          >
            The 2<sup>nd</sup> Generation
            <br />
            of Nagpal Watch.CO
          </h2>
          <div className={styles.greenDivider} />
          <p className={styles.bodyParagraph}>
            This was when the 2nd generation of Nagpal&apos;s family entered the
            business, deepening roots in horology and building relationships
            with component suppliers across Northern India.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   3. 1976 SECTION (Exact Match to Reference Screenshot)
   ═══════════════════════════════════════════════════════════════ */
function Section1976() {
  return (
    <section id="section-1976" className={styles.milestoneSection}>
      <div className={styles.leftCol}>
        <div className={styles.leftCard}>
          <div className={styles.bigYear}>
            <span className={styles.yearNumber}>19</span>
            <span className={styles.yearNumber}>76</span>
          </div>
          <h2 className={styles.editorialTitle}>
            ‘Nagpal&apos;s Bombay‘
            <br />
            was formed
          </h2>
          <div className={styles.greenDivider} />
          <p className={styles.bodyParagraph}>
            This was when the 2nd generation of Nagpal&apos;s family entered the
            business, deepening roots in horology and building relationships
            with component suppliers across Northern India.
          </p>
        </div>
      </div>
      <div className={styles.centerCol}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/about-us-coded/assets/x130.png"
          alt="Nagpals Bombay Logo"
          className={styles.centerArtworkImg}
          style={{ width: 'clamp(200px, 20vw, 280px)', marginBottom: '8px' }}
          loading="lazy"
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/about-us-coded/assets/x118.png"
          alt="2nd Generation Nagpal Family Historical Photograph"
          className={styles.centerArtworkImg}
          style={{ width: 'clamp(320px, 32vw, 480px)' }}
          loading="lazy"
        />
      </div>
      <div className={styles.rightCol}>
        <div className={styles.rightCard}>
          <div className={styles.smallYearLabel}>1976</div>
          <div className={styles.greenDivider} style={{ width: '48px', height: '2.5px', margin: '8px 0 14px' }} />
          <p className={styles.bodyParagraph}>
            This was the time when they travelled to international markets to
            import parts &amp; components for direct distribution and during
            1980s various BUTTON CELL brands tied up with NAGPALS BOMBAY for
            battery distribution all over India. Brands from Japan like MAXELL
            &amp; Swiss like RENATA became a major area of company&apos;s focus
            for growth.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   4. 1991 SECTION
   ═══════════════════════════════════════════════════════════════ */
function Section1991() {
  return (
    <section
      id="section-1991"
      className={styles.milestoneSection}
      style={{ marginBottom: "clamp(60px, 10vh, 120px)" }}
    >
      <div className={styles.leftCol}>
        <div className={styles.leftCard}>
          <div className={styles.smallYearLabel}>1991</div>
          <p className={styles.bodyParagraph}>
            D&apos;Signer was not simply a product launch but a philosophical
            statement. At a time when Indian watchmaking was dominated by
            mass-market models, D&apos;Signer chose craftsmanship over compromise
            and design over convention.
          </p>
        </div>
      </div>
      <div className={styles.centerCol} style={{ gap: 'clamp(30px, 8vh, 60px)' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/about-us-coded/assets/x110.png"
          alt="D'SIGNER Logo"
          className={styles.centerArtworkImg}
          style={{ width: '160px', marginBottom: 'clamp(20px, 8vh, 50px)' }}
          loading="lazy"
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/about-us-coded/assets/x98.png"
          alt="D'SIGNER Couple Vintage Ad"
          className={styles.centerArtworkImg}
          style={{ width: 'clamp(260px, 26vw, 360px)' }}
          loading="lazy"
        />
      </div>
      <div className={styles.rightCol}>
        <div className={styles.rightCard}>
          <div className={styles.bigYear}>
            <span className={styles.yearNumber}>19</span>
            <span className={styles.yearNumber}>91</span>
          </div>
          <h2
            className={styles.editorialTitle}
          >
            A Brand Is Born
          </h2>
          <div className={styles.greenDivider} />
          <p className={styles.bodyParagraph}>
            D&apos;SIGNER was introduced, a step into creating watches defined
            by design, quality, and individuality. One of the early Indian brands
            to design and manufacture to international horological standards.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   5. 1995 SECTION
   ═══════════════════════════════════════════════════════════════ */
function Section1995() {
  return (
    <section
      id="section-1995"
      className={styles.milestoneSection}
      style={{ marginBottom: "clamp(60px, 10vh, 120px)" }}
    >
      <div className={styles.leftCol}>
        <div className={styles.leftCard}>
          <div className={styles.bigYear}>
            <span className={styles.yearNumber}>19</span>
            <span className={styles.yearNumber}>95</span>
          </div>
          <h2 className={styles.editorialTitle}>Style For All</h2>
          <div className={styles.greenDivider} />
          <p className={styles.bodyParagraph}>
            ESCORT was launched to make timeless design more accessible,
            bringing style to a wider audience with robust everyday timepieces
            at honest prices.
          </p>
        </div>
      </div>
      <div className={styles.centerCol}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/about-us-coded/assets/x126.png"
          alt="ESCORT Logo"
          className={styles.centerArtworkImg}
          style={{ width: '150px' }}
          loading="lazy"
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/about-us-coded/assets/x88.png"
          alt="ESCORT Launch Celebration"
          className={styles.centerArtworkImg}
          style={{ width: 'clamp(260px, 26vw, 360px)' }}
          loading="lazy"
        />
      </div>
      <div className={styles.rightCol}>
        <div className={styles.rightCard}>
          <div className={styles.smallYearLabel}>1995</div>
          <p className={styles.bodyParagraph}>
            Escort answered a simple question: why shouldn&apos;t every Indian
            have access to a reliable, beautifully finished timepiece? The
            market responded with extraordinary enthusiasm.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   6. 1998 SECTION
   ═══════════════════════════════════════════════════════════════ */
function Section1998() {
  return (
    <section
      id="section-1998"
      className={styles.milestoneSection}
      style={{ marginBottom: "clamp(60px, 10vh, 120px)" }}
    >
      <div className={styles.leftCol}>
        <div className={styles.leftCard}>
          <div className={styles.smallYearLabel}>1998</div>
          <p className={styles.bodyParagraph}>
            Bringing prestige Swiss and French horological brands to Indian
            retail counters established the Nagpal Group as an esteemed
            national distributor.
          </p>
        </div>
      </div>
      <div className={styles.centerCol}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/about-us-coded/assets/x106.png"
          alt="Tissot Launch Partnership"
          className={styles.centerArtworkImg}
          style={{ width: 'clamp(280px, 28vw, 380px)' }}
          loading="lazy"
        />
      </div>
      <div className={styles.rightCol}>
        <div className={styles.rightCard}>
          <div className={styles.bigYear}>
            <span className={styles.yearNumber}>19</span>
            <span className={styles.yearNumber}>98</span>
          </div>
          <h2
            className={styles.editorialTitle}
          >
            Introduction of
            <br />
            Tissot in India
          </h2>
          <div className={styles.greenDivider} />
          <p className={styles.bodyParagraph}>
            We were the ones to launch TISSOT watches in India as national
            distributors. We initiated the distribution for Tissot, Givenchy
            Paris, Christian Bernard Paris, and Rotary in India.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   7. 2004 SECTION
   ═══════════════════════════════════════════════════════════════ */
function Section2004() {
  return (
    <section
      id="section-2004"
      className={styles.milestoneSection}
      style={{ marginBottom: "clamp(60px, 10vh, 120px)" }}
    >
      <div className={styles.leftCol}>
        <div className={styles.leftCard}>
          <div className={styles.bigYear}>
            <span className={styles.yearNumber}>20</span>
            <span className={styles.yearNumber}>04</span>
          </div>
          <h2 className={styles.editorialTitle}>D’signer Effects</h2>
          <div className={styles.greenDivider} />
          <p className={styles.bodyParagraph}>
            We started a division purely in the corporate gifts &amp; promotion
            business under the name D’SIGNER EFFECTS. Here the idea was to
            connect with all small and large organizations, offering all sorts
            of promotion gifts for schemes and marketing plans.
          </p>
        </div>
      </div>
      <div className={styles.centerCol} style={{ gap: '14px' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/about-us-coded/assets/x80.png"
          alt="D'SIGNER Effects Logo"
          className={styles.centerArtworkImg}
          style={{ width: 'clamp(180px, 18vw, 250px)' }}
          loading="lazy"
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/about-us-coded/assets/x72.png"
          alt="D'SIGNER Effects Flyer"
          className={styles.centerArtworkImg}
          style={{ width: 'clamp(200px, 20vw, 280px)' }}
          loading="lazy"
        />
      </div>
      <div className={styles.rightCol}>
        <div className={styles.rightCard}>
          <div className={styles.smallYearLabel}>2004</div>
          <p className={styles.bodyParagraph}>
            Connecting brand messaging with high-quality custom corporate
            gifts allowed businesses across India to elevate their marketing
            initiatives and employee reward programs.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   8. 2010 SECTION
   ═══════════════════════════════════════════════════════════════ */
function Section2010() {
  return (
    <section
      id="section-2010"
      className={styles.milestoneSection}
      style={{ marginBottom: "clamp(60px, 10vh, 120px)" }}
    >
      <div className={styles.leftCol}>
        <div className={styles.leftCard}>
          <div className={styles.smallYearLabel}>2010</div>
          <p className={styles.bodyParagraph}>
            DESIGNER WATCHES scaled production skills and managed largest volume
            B2B orders of watches in lakhs, delivering projects for esteemed
            groups like TATA INDICOM, REEBOK, NIKON, and PHARMA COMPANIES.
          </p>
        </div>
      </div>
      <div className={styles.centerCol}>
        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/about-us-coded/assets/x76.png"
            alt="Antique Clock"
            style={{ width: '100px', objectFit: 'contain' }}
            loading="lazy"
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/about-us-coded/assets/x46.png"
            alt="Desk Clock"
            style={{ width: '130px', objectFit: 'contain' }}
            loading="lazy"
          />
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/about-us-coded/assets/x50.png"
          alt="Clocks Collection"
          className={styles.centerArtworkImg}
          style={{ width: 'clamp(280px, 28vw, 380px)' }}
          loading="lazy"
        />
      </div>
      <div className={styles.rightCol}>
        <div className={styles.rightCard}>
          <div className={styles.bigYear}>
            <span className={styles.yearNumber}>20</span>
            <span className={styles.yearNumber}>10</span>
          </div>
          <h2
            className={styles.editorialTitle}
          >
            B2B &amp; Corporate
            <br />
            Gifting
          </h2>
          <div className={styles.greenDivider} />
          <p className={styles.bodyParagraph}>
            B2B &amp; Corporate Gifting became a very important focus as
            wristwatches became a strong category for business promotion and
            marketing plans for major corporates. Launched clocks &amp; bags
            category under D’SIGNER for B2B requirements.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   9. 2013 SECTION
   ═══════════════════════════════════════════════════════════════ */
function Section2013() {
  return (
    <section
      id="section-2013"
      className={styles.milestoneSection}
      style={{ marginBottom: "clamp(60px, 10vh, 120px)" }}
    >
      <div className={styles.leftCol}>
        <div className={styles.leftCard}>
          <div className={styles.bigYear}>
            <span className={styles.yearNumber}>20</span>
            <span className={styles.yearNumber}>13</span>
          </div>
          <h2 className={styles.editorialTitle}>Daniel Klein in India</h2>
          <div className={styles.greenDivider} />
          <p className={styles.bodyParagraph}>
            Got exclusive distribution of Daniel Klein, a leading Turkish brand
            of watches and fashion accessories, in India.
          </p>
        </div>
      </div>
      <div className={styles.centerCol}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/about-us-coded/assets/x84.png"
          alt="Daniel Klein Splash Watch Artwork"
          className={styles.centerArtworkImg}
          style={{ width: 'clamp(260px, 26vw, 360px)' }}
          loading="lazy"
        />
      </div>
      <div className={styles.rightCol}>
        <div className={styles.rightCard}>
          <div className={styles.smallYearLabel}>2013</div>
          <p className={styles.bodyParagraph}>
            Bringing dynamic international styling and accessible luxury to
            retail counters opened new fashion-forward demographics across all
            major tier-1 and tier-2 cities.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   10. 2015 SECTION
   ═══════════════════════════════════════════════════════════════ */
function Section2015() {
  return (
    <section id="section-2015" className={styles.milestoneSection}>
      <div className={styles.leftCol}>
        <div className={styles.leftCard}>
          <div className={styles.smallYearLabel}>2015</div>
          <p className={styles.bodyParagraph}>
            Over 500 private labels would trust our manufacturing expertise to
            engineer precision timepieces adhering to international quality
            benchmarks.
          </p>
        </div>
      </div>
      <div className={styles.centerCol}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/about-us-coded/assets/x60.png"
          alt="OEM Time Lab Logo"
          className={styles.centerArtworkImg}
          style={{ width: '130px' }}
          loading="lazy"
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/about-us-coded/assets/x42.png"
          alt="Handcrafted Workshop Stack"
          className={styles.centerArtworkImg}
          style={{ width: 'clamp(240px, 24vw, 320px)' }}
          loading="lazy"
        />
      </div>
      <div className={styles.rightCol}>
        <div className={styles.rightCard}>
          <div className={styles.bigYear}>
            <span className={styles.yearNumber}>20</span>
            <span className={styles.yearNumber}>15</span>
          </div>
          <h2
            className={styles.editorialTitle}
          >
            Beyond Our Own
            <br />
            Brand
          </h2>
          <div className={styles.greenDivider} />
          <p className={styles.bodyParagraph}>
            Expanding into OEM manufacturing, we began designing and producing
            watches for global and national brands, marking a significant leap
            in manufacturing capability.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   11. 2017 SECTION
   ═══════════════════════════════════════════════════════════════ */
function Section2017() {
  return (
    <section id="section-2017" className={styles.milestoneSection}>
      <div className={styles.leftCol}>
        <div className={styles.leftCard}>
          <div className={styles.bigYear}>
            <span className={styles.yearNumber}>20</span>
            <span className={styles.yearNumber}>17</span>
          </div>
          <h2 className={styles.editorialTitle}>Adding More Brands</h2>
          <div className={styles.greenDivider} />
          <p className={styles.bodyParagraph}>
            The house introduced few more international fashion brands in its
            distribution channel: MATHEY TISSOT and D1 MILANO.
          </p>
        </div>
      </div>
      <div className={styles.centerCol}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/about-us-coded/assets/x34.png"
          alt="Mathey-Tissot Chronograph Watch"
          className={styles.centerArtworkImg}
          style={{ width: 'clamp(260px, 26vw, 360px)' }}
          loading="lazy"
        />
      </div>
      <div className={styles.rightCol}>
        <div className={styles.rightCard}>
          <div className={styles.smallYearLabel}>2017</div>
          <p className={styles.bodyParagraph}>
            Same year Designer World stepped into international exports, in
            London, Singapore, and in Middle Eastern countries like Bahrain and
            Oman.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   12. 2020 SECTION
   ═══════════════════════════════════════════════════════════════ */
function Section2020() {
  return (
    <section id="section-2020" className={styles.milestoneSection}>
      <div className={styles.leftCol}>
        <div className={styles.leftCard}>
          <div className={styles.smallYearLabel}>2020</div>
          <p className={styles.bodyParagraph}>
            Direct-to-consumer acceleration and modern logistics allowed us to
            deliver timepieces with agility to watch lovers across India.
          </p>
        </div>
      </div>
      <div className={styles.centerCol}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/about-us-coded/assets/x24.png"
          alt="ghadiwaala Logo"
          className={styles.centerArtworkImg}
          style={{ width: 'clamp(180px, 18vw, 240px)' }}
          loading="lazy"
        />
      </div>
      <div className={styles.rightCol}>
        <div className={styles.rightCard}>
          <div className={styles.bigYear}>
            <span className={styles.yearNumber}>20</span>
            <span className={styles.yearNumber}>20</span>
          </div>
          <h2
            className={styles.editorialTitle}
          >
            The Digital Shift
          </h2>
          <div className={styles.greenDivider} />
          <p className={styles.bodyParagraph}>
            With the rise of e-commerce, we adapted quickly, designing for
            online-first brands and expanding our reach across digital
            platforms.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   13. 2022 SECTION
   ═══════════════════════════════════════════════════════════════ */
function Section2022() {
  return (
    <section id="section-2022" className={styles.milestoneSection}>
      <div className={styles.leftCol}>
        <div className={styles.leftCard}>
          <div className={styles.bigYear}>
            <span className={styles.yearNumber}>20</span>
            <span className={styles.yearNumber}>22</span>
          </div>
          <h2
            className={styles.editorialTitle}
          >
            Designer World
            <br />
            Brands
          </h2>
          <div className={styles.greenDivider} />
          <p className={styles.bodyParagraph}>
            Started a new division solely managing foreign brand distribution
            under the name DESIGNER WORLD BRANDS &amp; added more labels like
            INGERSOLL, INVICTA, and SANTA BARBARA POLO CLUB.
          </p>
        </div>
      </div>
      <div className={styles.centerCol}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/about-us-coded/assets/x20.png"
          alt="Designer World Brands Portfolio"
          className={styles.centerArtworkImg}
          style={{ width: 'clamp(260px, 26vw, 360px)' }}
          loading="lazy"
        />
      </div>
      <div className={styles.rightCol}>
        <div className={styles.rightCard}>
          <div className={styles.smallYearLabel}>2022</div>
          <p className={styles.bodyParagraph}>
            Dedicated brand management infrastructure empowered global fashion
            icons to flourish in the Indian marketplace.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   14. 2024 SECTION
   ═══════════════════════════════════════════════════════════════ */
function Section2024() {
  return (
    <section id="section-2024" className={styles.milestoneSection}>
      <div className={styles.leftCol}>
        <div className={styles.leftCard}>
          <div className={styles.smallYearLabel}>2024</div>
          <p className={styles.bodyParagraph}>
            Combining modern ethical lab-grown diamonds with Swiss-inspired
            horology to deliver sophisticated luxury for discerning collectors.
          </p>
        </div>
      </div>
      <div className={styles.centerCol}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/about-us-coded/assets/x16.png"
          alt="D'SIGNER Diamond Studded Watch"
          className={styles.centerArtworkImg}
          style={{ width: 'clamp(260px, 26vw, 360px)' }}
          loading="lazy"
        />
      </div>
      <div className={styles.rightCol}>
        <div className={styles.rightCard}>
          <div className={styles.bigYear}>
            <span className={styles.yearNumber}>20</span>
            <span className={styles.yearNumber}>24</span>
          </div>
          <h2
            className={styles.editorialTitle}
          >
            D’signer Diamond
            <br />
            Watches
          </h2>
          <div className={styles.greenDivider} />
          <p className={styles.bodyParagraph}>
            Launched Lab Grown Diamond Studded Watches as a new step to reach a
            more luxury audience, featuring models ranging up to Rs. 1,50,000/-.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   15. 2025 SECTION
   ═══════════════════════════════════════════════════════════════ */
function Section2025() {
  return (
    <section id="section-2025" className={styles.milestoneSection}>
      <div className={styles.leftCol}>
        <div className={styles.leftCard}>
          <div className={styles.bigYear}>
            <span className={styles.yearNumber}>20</span>
            <span className={styles.yearNumber}>25</span>
          </div>
          <h2 className={styles.editorialTitle}>Time Corridor</h2>
          <div className={styles.greenDivider} />
          <p className={styles.bodyParagraph}>
            This retail Time Boutique is initiated to promote our home brands,
            D’SIGNER &amp; ESCORT watches at a unique experience store
            showcasing our prime models, new launches, top sellers &amp; special
            editions with an appealing display and aura. A gesture to connect
            &amp; add some value to our happy watch buyers.
          </p>
        </div>
      </div>
      <div className={styles.centerCol}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/about-us-coded/assets/x12.png"
          alt="Time Corridor Boutique"
          className={styles.centerArtworkImg}
          style={{ width: 'clamp(260px, 26vw, 360px)' }}
          loading="lazy"
        />
      </div>
      <div className={styles.rightCol}>
        <div className={styles.rightCard}>
          <div className={styles.smallYearLabel}>2025</div>
          <p className={styles.bodyParagraph}>
            A latest feather in Designer World story. At Designer World it’s
            not about just the product we make but the aura we pass to our user
            with the time we design.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   16. TODAY SECTION
   ═══════════════════════════════════════════════════════════════ */
function SectionToday() {
  return (
    <section id="section-today" className={styles.todaySection}>
      <div className={styles.todayGrid}>
        {/* ── Left Column: Small TODAY label, green divider, first narrative ── */}
        <div className={styles.leftCol}>
          <div className={styles.leftCard}>
            <div className={styles.smallYearLabel}>TODAY</div>
            <div
              className={styles.greenDivider}
              style={{ width: "48px", height: "2.5px", margin: "8px 0 14px" }}
            />
            <p className={styles.bodyParagraph}>
              Blending decades of legacy with modern design, Designer World
              continues to create watches that balance style, quality, and
              accessibility.
            </p>
          </div>
        </div>

        {/* ── Center Column: Center Spine ── */}
        <div className={styles.centerCol} />

        {/* ── Right Column: Stacked TO / DAY, Affordable Luxury, divider, second narrative ── */}
        <div className={styles.rightCol}>
          <div className={styles.rightCard}>
            <div className={styles.bigYear}>
              <span className={styles.yearNumber}>TO</span>
              <span className={styles.yearNumber}>DAY</span>
            </div>
            <h2 className={styles.editorialTitle}>Affordable Luxury</h2>
            <div className={styles.greenDivider} />
            <p className={styles.bodyParagraph}>
              Where heritage meets modern design, Designer World creates watches
              that combine timeless style, reliable quality, and everyday
              accessibility.
            </p>
          </div>
        </div>
      </div>

      <div
        className={styles.teamPhotoWrap}
        style={{ marginTop: "clamp(-100px, -10vh, -40px)" }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/about-us-coded/assets/x8.png"
          alt="Designer World Full Team Photo"
          className={styles.teamPhotoImg}
          loading="lazy"
        />
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   PAGE SHELL (About-3 Typography & Layout Foundation)
   ═══════════════════════════════════════════════════════════════ */
export default function About5Page() {
  return (
    <main className={styles.page}>
      {/* ── 1. Hero Banner (from About-3) ── */}
      <section className={styles.heroBanner}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/about us journey/banner-tt.JPG"
          alt="Nagpal Group Heritage"
          className={styles.heroImg}
          onError={(e) => {
            const t = e.target as HTMLImageElement;
            t.src = '/img/about-2.png';
          }}
        />
        <div className={styles.heroCaption}>
          <p className={styles.heroCaptionText}>
            Eight Decades of Horological Mastery &middot; From Amritsar to the
            World &middot; 1940 &ndash; 2025
          </p>
        </div>
      </section>

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
      <div className={styles.timelineBody}>
        {/* Continuous Distressed Green Center Spine */}
        <div className={styles.greenSpine} aria-hidden="true" />

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

      {/* ── 5. Closing Section (from About-3) ── */}
      <section style={{ background: GREEN }}>
        <div
          style={{
            maxWidth: '1240px',
            margin: '0 auto',
            padding: '5.5rem 1.5rem',
          }}
        >
          <FadeIn>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 items-center">
              <div>
                <p className="font-montserrat text-[11px] text-[#B8935A] uppercase tracking-[0.25em] font-bold mb-3">
                  TODAY
                </p>
                <h2 className="font-montserrat font-light text-white tracking-[-0.02em] text-[clamp(2rem,5vw,4rem)] leading-none mb-5">
                  Affordable Luxury.
                </h2>
                <div className="w-10 h-1 bg-[#B8935A] mb-5 rounded-sm" />
                <p className="font-montserrat text-[14px] sm:text-[15px] leading-[1.85] text-white/80 font-normal text-left">
                  Blending decades of legacy with modern design, Designer World
                  continues to create watches that balance style, quality, and
                  accessibility. 4 generations of expertise. 20+ international
                  brands. 500+ private labels manufactured.
                </p>
              </div>
              <div>
                <div
                  style={{
                    overflow: 'hidden',
                    borderRadius: '8px',
                    background: '#ffffff',
                    padding: '0.5rem',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.25)',
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/about us journey/1992 - Voltage Batteries/IMG_0205.jpeg"
                    alt="Nagpal Group Heritage"
                    style={{
                      width: '100%',
                      objectFit: 'cover',
                      height: 'clamp(220px, 32vw, 420px)',
                      display: 'block',
                    }}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = FALLBACK;
                    }}
                  />
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </main>
  );
}
