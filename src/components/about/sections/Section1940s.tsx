import React from 'react';
import s from '../AboutTimeline.module.css';

export function Section1940s() {
  return (
    <section id="section-1940s" className={s.editorialSection}>
      {/* ── Left Column: Year, Title, Rule, Narrative ── */}
      <div className={s.leftCol}>
        <div className={s.contentCard}>
          <div className={s.bigYear}>
            <span className={s.yearNumber}>19</span>
            <span className={s.yearSuffix}>40s</span>
          </div>
          <h2 className={s.editorialTitle}>The Beginning</h2>
          <div className={s.greenRule} />
          <p className={s.bodyParagraph}>
            Started a new division solely managing foreign brand distribution under the name{' '}
            <strong>DESIGNER WORLD BRANDS</strong> &amp; added more labels like INGERSOLL, INVICTA, and SANTA BARBARA POLO CLUB.
          </p>
        </div>
      </div>

      {/* ── Center Column: Founder Portrait sitting over green spine ── */}
      <div className={s.centerCol}>
        <div className={s.portraitWrap}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/about-us-coded/assets/x102.png"
            alt="Founder Portrait"
            className={s.portraitImg}
            loading="eager"
          />
        </div>
      </div>

      {/* ── Right Column: 1940s Label, Narrative, and Storefront Artwork ── */}
      <div className={s.rightCol}>
        <div className={s.contentCard}>
          <div className={s.smallYear}>1940s</div>
          <p className={s.bodyParagraph}>
            Dedicated brand management infrastructure empowered global fashion icons to flourish in the Indian marketplace.
          </p>
          <div className={s.storeArtworkWrap}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/about-us-coded/assets/x122.png"
              alt="Nagpal Watch Co. Storefront"
              className={s.storeImg}
              loading="eager"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
