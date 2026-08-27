import React from 'react';
import { YearBlock } from '../shared/YearBlock';
import { EditorialHeading, TimelineCopy } from '../shared/EditorialTypography';
import s from '../AboutTimeline.module.css';

const ASSET_DIR = '/about-us-coded/assets/';

export function Composition2015() {
  return (
    <section id="section-2015" className={s.compositionSection}>
      {/* Left Column: Small 2015 Label & Narrative */}
      <div className={s.colLeft}>
        <div className={s.contentBlock}>
          <YearBlock main="2015" sub="" isSmall />
          <TimelineCopy>
            Over 500 private labels would trust our manufacturing expertise to engineer precision timepieces adhering to international quality benchmarks.
          </TimelineCopy>
        </div>
      </div>

      {/* Center Column: OEM Time Lab Logo & Workshop Stack */}
      <div className={s.colCenter}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`${ASSET_DIR}x60.png`}
          alt="OEM Time Lab Logo"
          className={s.centerImg}
          style={{ width: '50%', maxWidth: '150px', marginBottom: '10px' }}
          loading="lazy"
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`${ASSET_DIR}x42.png`}
          alt="Every Second Handcrafted Stack"
          className={s.centerImg}
          style={{ width: '95%', maxWidth: '290px' }}
          loading="lazy"
        />
      </div>

      {/* Right Column: Giant 2015 Year & Title */}
      <div className={s.colRight}>
        <div className={s.contentBlock}>
          <YearBlock main="20" sub="15" />
          <EditorialHeading isGreen>
            Beyond Our Own<br />Brand
          </EditorialHeading>
          <TimelineCopy>
            Expanding into OEM manufacturing, we began designing and producing watches for global and national brands, marking a significant leap in manufacturing capability.
          </TimelineCopy>
        </div>
      </div>
    </section>
  );
}

export function Composition2017() {
  return (
    <section id="section-2017" className={s.compositionSection}>
      {/* Left Column: Giant 2017 Year & Title */}
      <div className={s.colLeft}>
        <div className={s.contentBlock}>
          <YearBlock main="20" sub="17" />
          <EditorialHeading>Adding More Brands</EditorialHeading>
          <TimelineCopy>
            Same year Designer World stepped into international exports, in London, Singapore, and in Middle Eastern countries like Bahrain and Oman.
          </TimelineCopy>
        </div>
      </div>

      {/* Center Column: Mathey-Tissot Watch */}
      <div className={s.colCenter}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`${ASSET_DIR}x34.png`}
          alt="Mathey-Tissot Chronograph Watch"
          className={s.centerImg}
          style={{ width: '115%', maxWidth: '370px' }}
          loading="lazy"
        />
      </div>

      {/* Right Column: Small 2017 Label & Narrative */}
      <div className={s.colRight}>
        <div className={s.contentBlock}>
          <YearBlock main="2017" sub="" isSmall />
          <TimelineCopy>
            The house introduced few more international fashion brands in its distribution channel: MATHEY TISSOT and D1 MILANO.
          </TimelineCopy>
        </div>
      </div>
    </section>
  );
}

export function Composition2020() {
  return (
    <section id="section-2020" className={s.compositionSection} style={{ minHeight: '500px' }}>
      {/* Left Column: Small 2020 Label & Narrative */}
      <div className={s.colLeft}>
        <div className={s.contentBlock}>
          <YearBlock main="2020" sub="" isSmall />
          <TimelineCopy>
            Direct-to-consumer acceleration and modern logistics allowed us to deliver timepieces with agility to watch lovers across India.
          </TimelineCopy>
        </div>
      </div>

      {/* Center Column: ghadiwaala Logo */}
      <div className={s.colCenter}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`${ASSET_DIR}x24.png`}
          alt="ghadiwaala"
          className={s.centerImg}
          style={{ width: '70%', maxWidth: '220px' }}
          loading="lazy"
        />
      </div>

      {/* Right Column: Giant 2020 Year & Title */}
      <div className={s.colRight}>
        <div className={s.contentBlock}>
          <YearBlock main="20" sub="20" />
          <EditorialHeading isGreen>The Digital Shift</EditorialHeading>
          <TimelineCopy>
            With the rise of e-commerce, we adapted quickly, designing for online-first brands and expanding our reach across digital platforms.
          </TimelineCopy>
        </div>
      </div>
    </section>
  );
}

export function Composition2022() {
  return (
    <section id="section-2022" className={s.compositionSection}>
      {/* Left Column: Giant 2022 Year & Title */}
      <div className={s.colLeft}>
        <div className={s.contentBlock}>
          <YearBlock main="20" sub="22" />
          <EditorialHeading isGreen>
            Designer World<br />Brands
          </EditorialHeading>
          <TimelineCopy>
            Dedicated brand management infrastructure empowered global fashion icons to flourish in the Indian marketplace.
          </TimelineCopy>
        </div>
      </div>

      {/* Center Column: DW Brands Portfolio */}
      <div className={s.colCenter}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`${ASSET_DIR}x20.png`}
          alt="Designer World Brands Portfolio"
          className={s.centerImg}
          style={{ width: '100%', maxWidth: '320px' }}
          loading="lazy"
        />
      </div>

      {/* Right Column: Small 2022 Label & Narrative */}
      <div className={s.colRight}>
        <div className={s.contentBlock}>
          <YearBlock main="2022" sub="" isSmall />
          <TimelineCopy>
            Started a new division solely managing foreign brand distribution under the name DESIGNER WORLD BRANDS &amp; added more labels like INGERSOLL, INVICTA, and SANTA BARBARA POLO CLUB.
          </TimelineCopy>
        </div>
      </div>
    </section>
  );
}

export function Composition2024() {
  return (
    <section id="section-2024" className={s.compositionSection} style={{ minHeight: '700px' }}>
      {/* Left Column: Small 2024 Label & Narrative */}
      <div className={s.colLeft}>
        <div className={s.contentBlock}>
          <YearBlock main="2024" sub="" isSmall />
          <TimelineCopy>
            Combining modern ethical lab-grown diamonds with Swiss-inspired horology to deliver sophisticated luxury for discerning collectors.
          </TimelineCopy>
        </div>
      </div>

      {/* Center Column: Diamond Studded Watch */}
      <div className={s.colCenter}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`${ASSET_DIR}x16.png`}
          alt="D'SIGNER Diamond Watches"
          className={s.centerImg}
          style={{ width: '115%', maxWidth: '380px' }}
          loading="lazy"
        />
      </div>

      {/* Right Column: Giant 2024 Year & Title */}
      <div className={s.colRight}>
        <div className={s.contentBlock}>
          <YearBlock main="20" sub="24" />
          <EditorialHeading isGreen>
            D’signer Diamond<br />Watches
          </EditorialHeading>
          <TimelineCopy>
            Launched Lab Grown Diamond Studded Watches as a new step to reach a more luxury audience, featuring models ranging up to Rs. 1,50,000/-.
          </TimelineCopy>
        </div>
      </div>
    </section>
  );
}

export function Composition2025() {
  return (
    <section id="section-2025" className={s.compositionSection} style={{ minHeight: '750px' }}>
      {/* Left Column: Giant 2025 Year & Title */}
      <div className={s.colLeft}>
        <div className={s.contentBlock}>
          <YearBlock main="20" sub="25" />
          <EditorialHeading>Time Corridor</EditorialHeading>
          <TimelineCopy>
            A latest feather in Designer World story. At Designer World it’s not about just the product we make but the aura we pass to our user with the time we design.
          </TimelineCopy>
        </div>
      </div>

      {/* Center Column: Time Corridor Boutique */}
      <div className={s.colCenter}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`${ASSET_DIR}x12.png`}
          alt="Time Corridor Boutique"
          className={s.centerImg}
          style={{ width: '120%', maxWidth: '400px' }}
          loading="lazy"
        />
      </div>

      {/* Right Column: Small 2025 Label & Narrative */}
      <div className={s.colRight}>
        <div className={s.contentBlock}>
          <YearBlock main="2025" sub="" isSmall />
          <TimelineCopy>
            This retail Time Boutique is initiated to promote our home brands, D’SIGNER &amp; ESCORT watches at a unique experience store showcasing our prime models, new launches, top sellers &amp; special editions with an appealing display and aura. A gesture to connect &amp; add some value to our happy watch buyers.
          </TimelineCopy>
        </div>
      </div>
    </section>
  );
}

export function TodayComposition() {
  return (
    <section id="section-today" className={s.todaySection}>
      <div className={s.todayGrid}>
        {/* Left Column */}
        <div className={s.colLeft}>
          <div className={s.contentBlock}>
            <h2 className={s.todayHeading}>TODAY</h2>
            <TimelineCopy>
              Blending decades of legacy with modern design, Designer World continues to create watches that balance style, quality, and accessibility.
            </TimelineCopy>
          </div>
        </div>

        {/* Center Spine Blank for continuity */}
        <div className={s.colCenter} />

        {/* Right Column */}
        <div className={s.colRight}>
          <div className={s.contentBlock}>
            <h2 className={s.affordHeading}>Affordable Luxury</h2>
            <TimelineCopy>
              Where heritage meets modern design, Designer World creates watches that combine timeless style, reliable quality, and everyday accessibility.
            </TimelineCopy>
          </div>
        </div>
      </div>

      {/* Full-width Grand Team Photo */}
      <div className={s.teamPhotoWrap}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`${ASSET_DIR}x8.png`}
          alt="Designer World Team"
          className={s.teamPhoto}
          loading="lazy"
        />
      </div>
    </section>
  );
}
