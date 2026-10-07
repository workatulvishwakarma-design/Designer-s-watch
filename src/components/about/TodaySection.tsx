'use client';

import s from './AboutTimeline.module.css';

export function TodaySection() {
  return (
    <section id="section-today" className={s.todaySection}>
      <div className={s.todayGrid}>
        {/* Left Column */}
        <div className={s.todayColLeft}>
          <h2 className={s.todayHeading}>TODAY</h2>
          <p className={s.bodyText}>
            Blending decades of legacy with modern design, Designer World continues to create watches that balance style, quality, and accessibility.
          </p>
        </div>

        {/* Center Artwork within green spine */}
        <div className={s.todayColCenter}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/new-img/PNG/today.png"
            alt="Designer World - Today & Beyond"
            className={s.centerArtworkImg}
            style={{ width: "100%", height: "auto" }}
            loading="lazy"
          />
        </div>

        {/* Right Column */}
        <div className={s.todayColRight}>
          <h2 className={s.affordHeading}>Affordable Luxury</h2>
          <p className={s.bodyText}>
            Where heritage meets modern design, Designer World creates watches that combine timeless style, reliable quality, and everyday accessibility.
          </p>
        </div>
      </div>
    </section>
  );
}
