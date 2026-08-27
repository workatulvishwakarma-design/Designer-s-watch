import React from 'react';
import s from '../AboutTimeline.module.css';

const ASSET_DIR = '/about-us-coded/assets/';

export function Section1976() {
  return (
    <section id="section-1976" className={s.editorialSection}>
      <div className={s.leftCol}>
        <div className={s.contentCard}>
          <div className={s.bigYear}>
            <span className={s.yearNumber}>19</span>
            <span className={s.yearNumber}>76</span>
          </div>
          <h2 className={s.editorialTitle}>‘Nagpal’s Bombay‘<br />was formed</h2>
          <div className={s.greenRule} />
          <p className={s.bodyParagraph}>
            This was when the 2nd generation of Nagpal’s family entered the business, deepening roots in horology and building relationships across Northern India.
          </p>
        </div>
      </div>
      <div className={s.centerCol}>
        <div className={s.centerLogoWrap} style={{ marginTop: '30px' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`${ASSET_DIR}x130.png`} alt="Nagpals Bombay Logo" className={s.centerLogoImg} loading="lazy" />
        </div>
      </div>
      <div className={s.rightCol}>
        <div className={s.contentCard}>
          <div className={s.smallYear}>1976</div>
          <p className={s.bodyParagraph}>
            This was the time when they travelled to international markets to import parts &amp; components for direct distribution and during various BUTTON CELL brands tied up with NAGPALS BOMBAY for battery distribution all over India. Brands from Japan like MAXELL &amp; Swiss like RENATA became a major area of company’s focus for growth.
          </p>
        </div>
      </div>
    </section>
  );
}

export function Section1991() {
  return (
    <section id="section-1991" className={s.editorialSection}>
      <div className={s.leftCol}>
        <div className={s.contentCard}>
          <div className={s.smallYear}>1991</div>
          <p className={s.bodyParagraph}>
            D’SIGNER was not simply a product launch but a philosophical statement. At a time when Indian watchmaking was dominated by mass-market models, D’SIGNER chose craftsmanship over compromise and design over convention.
          </p>
        </div>
      </div>
      <div className={s.centerCol}>
        <div className={s.centerLogoWrap}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`${ASSET_DIR}x110.png`} alt="D'SIGNER Logo" className={s.centerLogoImg} style={{ maxWidth: '180px' }} loading="lazy" />
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={`${ASSET_DIR}x98.png`} alt="D'SIGNER Couple Ad" className={s.centerProductImg} loading="lazy" />
      </div>
      <div className={s.rightCol}>
        <div className={s.contentCard}>
          <div className={s.bigYear}>
            <span className={s.yearNumber}>19</span>
            <span className={s.yearNumber}>91</span>
          </div>
          <h2 className={`${s.editorialTitle} ${s.editorialTitleGreen}`}>A Brand Is Born</h2>
          <div className={s.greenRule} />
          <p className={s.bodyParagraph}>
            D’SIGNER was introduced, a step into creating watches defined by design, quality, and individuality. One of the early Indian brands to design and manufacture to international horological standards.
          </p>
        </div>
      </div>
    </section>
  );
}

export function Section1995() {
  return (
    <section id="section-1995" className={s.editorialSection}>
      <div className={s.leftCol}>
        <div className={s.contentCard}>
          <div className={s.bigYear}>
            <span className={s.yearNumber}>19</span>
            <span className={s.yearNumber}>95</span>
          </div>
          <h2 className={s.editorialTitle}>Style For All</h2>
          <div className={s.greenRule} />
          <p className={s.bodyParagraph}>
            ESCORT was launched to make timeless design more accessible, bringing style to a wider audience with robust everyday timepieces at honest prices.
          </p>
        </div>
      </div>
      <div className={s.centerCol}>
        <div className={s.centerLogoWrap}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`${ASSET_DIR}x126.png`} alt="ESCORT Logo" className={s.centerLogoImg} style={{ maxWidth: '180px' }} loading="lazy" />
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={`${ASSET_DIR}x88.png`} alt="ESCORT Banquet Party" className={s.centerProductImg} loading="lazy" />
      </div>
      <div className={s.rightCol}>
        <div className={s.contentCard}>
          <div className={s.smallYear}>1995</div>
          <p className={s.bodyParagraph}>
            Escort answered a simple question: why shouldn’t every Indian have access to a reliable, beautifully finished timepiece? The market responded with extraordinary enthusiasm.
          </p>
        </div>
      </div>
    </section>
  );
}

export function Section1998() {
  return (
    <section id="section-1998" className={s.editorialSection}>
      <div className={s.leftCol}>
        <div className={s.contentCard}>
          <div className={s.smallYear}>1998</div>
          <p className={s.bodyParagraph}>
            Bringing prestige Swiss and French horological brands to Indian retail counters established the Nagpal Group as an esteemed national distributor.
          </p>
        </div>
      </div>
      <div className={s.centerCol}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={`${ASSET_DIR}x106.png`} alt="Tissot Launch Meeting" className={s.centerProductImg} style={{ marginTop: '20px' }} loading="lazy" />
      </div>
      <div className={s.rightCol}>
        <div className={s.contentCard}>
          <div className={s.bigYear}>
            <span className={s.yearNumber}>19</span>
            <span className={s.yearNumber}>98</span>
          </div>
          <h2 className={`${s.editorialTitle} ${s.editorialTitleGreen}`}>Introduction of<br />Tissot in India</h2>
          <div className={s.greenRule} />
          <p className={s.bodyParagraph}>
            We were the ones to launch TISSOT watches in India as national distributors. We initiated the distribution for Tissot, Givenchy Paris, Christian Bernard Paris, and Rotary in India.
          </p>
        </div>
      </div>
    </section>
  );
}

export function Section2004() {
  return (
    <section id="section-2004" className={s.editorialSection}>
      <div className={s.leftCol}>
        <div className={s.contentCard}>
          <div className={s.bigYear}>
            <span className={s.yearNumber}>20</span>
            <span className={s.yearNumber}>04</span>
          </div>
          <h2 className={s.editorialTitle}>D’signer Effects</h2>
          <div className={s.greenRule} />
          <p className={s.bodyParagraph}>
            Connecting brand messaging with high-quality custom corporate gifts allowed businesses across India to elevate their marketing initiatives and employee reward programs.
          </p>
        </div>
      </div>
      <div className={s.centerCol}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={`${ASSET_DIR}x72.png`} alt="D'SIGNER Effects Flyer" className={s.centerProductImg} style={{ maxWidth: '260px', marginTop: '20px' }} loading="lazy" />
      </div>
      <div className={s.rightCol}>
        <div className={s.contentCard}>
          <div className={s.smallYear}>2004</div>
          <p className={s.bodyParagraph}>
            We started a division purely in the corporate gifts &amp; promotion business under the name D’SIGNER EFFECTS. Here the idea was to connect with all small and large organizations, offering all sorts of promotion gifts for schemes and marketing plans.
          </p>
        </div>
      </div>
    </section>
  );
}

export function Section2010() {
  return (
    <section id="section-2010" className={s.editorialSection} style={{ minHeight: '800px' }}>
      <div className={s.leftCol}>
        <div className={s.contentCard}>
          <div className={s.bigYear}>
            <span className={s.yearNumber}>20</span>
            <span className={s.yearNumber}>10</span>
          </div>
          <p className={s.bodyParagraph}>
            DESIGNER WATCHES scaled production skills and managed largest volume B2B orders of watches in lakhs, delivering projects for esteemed groups like TATA INDICOM, REEBOK, NIKON, and PHARMA COMPANIES.
          </p>
          <p className={s.bodyParagraph} style={{ marginTop: '14px' }}>
            B2B &amp; Corporate Gifting became a very important focus as wristwatches became a strong category for business promotion and marketing plans for major corporates. Launched clocks &amp; bags category under D’SIGNER for B2B requirements.
          </p>
        </div>
      </div>
      <div className={s.centerCol}>
        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginBottom: '14px' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`${ASSET_DIR}x76.png`} alt="Antique Clock" style={{ width: '120px', height: 'auto', objectFit: 'contain' }} loading="lazy" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`${ASSET_DIR}x46.png`} alt="Desk Clock" style={{ width: '150px', height: 'auto', objectFit: 'contain' }} loading="lazy" />
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={`${ASSET_DIR}x50.png`} alt="Clocks Shelf Display" className={s.centerProductImg} style={{ maxWidth: '440px' }} loading="lazy" />
      </div>
      <div className={s.rightCol}>
        <div className={s.contentCard}>
          <div className={s.bigYear}>
            <span className={s.yearNumber}>20</span>
            <span className={s.yearNumber}>10</span>
          </div>
          <h2 className={`${s.editorialTitle} ${s.editorialTitleGreen}`}>B2B &amp; Corporate<br />Gifting</h2>
        </div>
      </div>
    </section>
  );
}

export function Section2013() {
  return (
    <section id="section-2013" className={s.editorialSection}>
      <div className={s.leftCol}>
        <div className={s.contentCard}>
          <div className={s.bigYear}>
            <span className={s.yearNumber}>20</span>
            <span className={s.yearNumber}>13</span>
          </div>
          <h2 className={s.editorialTitle}>Daniel Klein in India</h2>
          <div className={s.greenRule} />
          <p className={s.bodyParagraph}>
            Got exclusive distribution of Daniel Klein, a leading Turkish brand of watches and fashion accessories, in India.
          </p>
        </div>
      </div>
      <div className={s.centerCol}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={`${ASSET_DIR}x84.png`} alt="Daniel Klein Liquid Chrome Splash" className={s.centerProductImg} loading="lazy" />
      </div>
      <div className={s.rightCol}>
        <div className={s.contentCard}>
          <div className={s.smallYear}>2013</div>
          <p className={s.bodyParagraph}>
            Bringing dynamic international styling and accessible luxury to retail counters opened new fashion-forward demographics across all major tier-1 and tier-2 cities.
          </p>
        </div>
      </div>
    </section>
  );
}

export function Section2015() {
  return (
    <section id="section-2015" className={s.editorialSection}>
      <div className={s.leftCol}>
        <div className={s.contentCard}>
          <div className={s.smallYear}>2015</div>
          <p className={s.bodyParagraph}>
            Over 500 private labels would trust our manufacturing expertise to engineer precision timepieces adhering to international quality benchmarks.
          </p>
        </div>
      </div>
      <div className={s.centerCol}>
        <div className={s.centerLogoWrap}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`${ASSET_DIR}x60.png`} alt="OEM Time Lab Logo" className={s.centerLogoImg} style={{ maxWidth: '140px' }} loading="lazy" />
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={`${ASSET_DIR}x42.png`} alt="Every Second Handcrafted" className={s.centerProductImg} style={{ maxWidth: '280px' }} loading="lazy" />
      </div>
      <div className={s.rightCol}>
        <div className={s.contentCard}>
          <div className={s.bigYear}>
            <span className={s.yearNumber}>20</span>
            <span className={s.yearNumber}>15</span>
          </div>
          <h2 className={`${s.editorialTitle} ${s.editorialTitleGreen}`}>Beyond Our Own<br />Brand</h2>
          <div className={s.greenRule} />
          <p className={s.bodyParagraph}>
            Expanding into OEM manufacturing, we began designing and producing watches for global and national brands, marking a significant leap in manufacturing capability.
          </p>
        </div>
      </div>
    </section>
  );
}

export function Section2017() {
  return (
    <section id="section-2017" className={s.editorialSection}>
      <div className={s.leftCol}>
        <div className={s.contentCard}>
          <div className={s.bigYear}>
            <span className={s.yearNumber}>20</span>
            <span className={s.yearNumber}>17</span>
          </div>
          <h2 className={s.editorialTitle}>Adding More Brands</h2>
          <div className={s.greenRule} />
          <p className={s.bodyParagraph}>
            Same year Designer World stepped into international exports, in London, Singapore, and in Middle Eastern countries like Bahrain and Oman.
          </p>
        </div>
      </div>
      <div className={s.centerCol}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={`${ASSET_DIR}x34.png`} alt="Mathey-Tissot Watch" className={s.centerProductImg} loading="lazy" />
      </div>
      <div className={s.rightCol}>
        <div className={s.contentCard}>
          <div className={s.smallYear}>2017</div>
          <p className={s.bodyParagraph}>
            The house introduced few more international fashion brands in its distribution channel: MATHEY TISSOT and D1 MILANO.
          </p>
        </div>
      </div>
    </section>
  );
}

export function Section2020() {
  return (
    <section id="section-2020" className={s.editorialSection} style={{ minHeight: '520px' }}>
      <div className={s.leftCol}>
        <div className={s.contentCard}>
          <div className={s.smallYear}>2020</div>
          <p className={s.bodyParagraph}>
            Direct-to-consumer acceleration and modern logistics allowed us to deliver timepieces with agility to watch lovers across India.
          </p>
        </div>
      </div>
      <div className={s.centerCol}>
        <div className={s.centerLogoWrap} style={{ marginTop: '20px' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`${ASSET_DIR}x24.png`} alt="ghadiwaala Logo" className={s.centerLogoImg} style={{ maxWidth: '190px' }} loading="lazy" />
        </div>
      </div>
      <div className={s.rightCol}>
        <div className={s.contentCard}>
          <div className={s.bigYear}>
            <span className={s.yearNumber}>20</span>
            <span className={s.yearNumber}>20</span>
          </div>
          <h2 className={`${s.editorialTitle} ${s.editorialTitleGreen}`}>The Digital Shift</h2>
          <div className={s.greenRule} />
          <p className={s.bodyParagraph}>
            With the rise of e-commerce, we adapted quickly, designing for online-first brands and expanding our reach across digital platforms.
          </p>
        </div>
      </div>
    </section>
  );
}

export function Section2022() {
  return (
    <section id="section-2022" className={s.editorialSection}>
      <div className={s.leftCol}>
        <div className={s.contentCard}>
          <div className={s.bigYear}>
            <span className={s.yearNumber}>20</span>
            <span className={s.yearNumber}>22</span>
          </div>
          <h2 className={`${s.editorialTitle} ${s.editorialTitleGreen}`}>Designer World<br />Brands</h2>
          <div className={s.greenRule} />
          <p className={s.bodyParagraph}>
            Dedicated brand management infrastructure empowered global fashion icons to flourish in the Indian marketplace.
          </p>
        </div>
      </div>
      <div className={s.centerCol}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={`${ASSET_DIR}x20.png`} alt="Designer World Brands Portfolio" className={s.centerProductImg} loading="lazy" />
      </div>
      <div className={s.rightCol}>
        <div className={s.contentCard}>
          <div className={s.smallYear}>2022</div>
          <p className={s.bodyParagraph}>
            Started a new division solely managing foreign brand distribution under the name DESIGNER WORLD BRANDS &amp; added more labels like INGERSOLL, INVICTA, and SANTA BARBARA POLO CLUB.
          </p>
        </div>
      </div>
    </section>
  );
}

export function Section2024() {
  return (
    <section id="section-2024" className={s.editorialSection}>
      <div className={s.leftCol}>
        <div className={s.contentCard}>
          <div className={s.smallYear}>2024</div>
          <p className={s.bodyParagraph}>
            Combining modern ethical lab-grown diamonds with Swiss-inspired horology to deliver sophisticated luxury for discerning collectors.
          </p>
        </div>
      </div>
      <div className={s.centerCol}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={`${ASSET_DIR}x16.png`} alt="D'SIGNER Diamond Watches" className={s.centerProductImg} loading="lazy" />
      </div>
      <div className={s.rightCol}>
        <div className={s.contentCard}>
          <div className={s.bigYear}>
            <span className={s.yearNumber}>20</span>
            <span className={s.yearNumber}>24</span>
          </div>
          <h2 className={`${s.editorialTitle} ${s.editorialTitleGreen}`}>D’signer Diamond<br />Watches</h2>
          <div className={s.greenRule} />
          <p className={s.bodyParagraph}>
            Launched Lab Grown Diamond Studded Watches as a new step to reach a more luxury audience, featuring models ranging up to Rs. 1,50,000/-.
          </p>
        </div>
      </div>
    </section>
  );
}

export function Section2025() {
  return (
    <section id="section-2025" className={s.editorialSection}>
      <div className={s.leftCol}>
        <div className={s.contentCard}>
          <div className={s.bigYear}>
            <span className={s.yearNumber}>20</span>
            <span className={s.yearNumber}>25</span>
          </div>
          <h2 className={s.editorialTitle}>Time Corridor</h2>
          <div className={s.greenRule} />
          <p className={s.bodyParagraph}>
            A latest feather in Designer World story. At Designer World it’s not about just the product we make but the aura we pass to our user with the time we design.
          </p>
        </div>
      </div>
      <div className={s.centerCol}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={`${ASSET_DIR}x12.png`} alt="Time Corridor Boutique" className={s.centerProductImg} loading="lazy" />
      </div>
      <div className={s.rightCol}>
        <div className={s.contentCard}>
          <div className={s.smallYear}>2025</div>
          <p className={s.bodyParagraph}>
            This retail Time Boutique is initiated to promote our home brands, D’SIGNER &amp; ESCORT watches at a unique experience store showcasing our prime models, new launches, top sellers &amp; special editions with an appealing display and aura. A gesture to connect &amp; add some value to our happy watch buyers.
          </p>
        </div>
      </div>
    </section>
  );
}

export function SectionToday() {
  return (
    <section id="section-today" className={s.todaySection}>
      <div className={s.todayGrid}>
        <div className={s.leftCol}>
          <div className={s.contentCard}>
            <h2 className={s.todayHeading}>TODAY</h2>
            <p className={s.bodyParagraph}>
              Blending decades of legacy with modern design, Designer World continues to create watches that balance style, quality, and accessibility.
            </p>
          </div>
        </div>
        <div className={s.centerCol} />
        <div className={s.rightCol}>
          <div className={s.contentCard}>
            <h2 className={s.affordHeading}>Affordable Luxury</h2>
            <p className={s.bodyParagraph}>
              Where heritage meets modern design, Designer World creates watches that combine timeless style, reliable quality, and everyday accessibility.
            </p>
          </div>
        </div>
      </div>
      <div className={s.teamPhotoWrap}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={`${ASSET_DIR}x8.png`} alt="Designer World Team Photo" className={s.teamPhotoImg} loading="lazy" />
      </div>
    </section>
  );
}
