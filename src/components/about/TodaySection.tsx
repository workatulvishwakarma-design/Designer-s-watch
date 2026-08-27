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

        {/* Center Blank for green spine continuity */}
        <div className={s.todayColCenter} />

        {/* Right Column */}
        <div className={s.todayColRight}>
          <h2 className={s.affordHeading}>Affordable Luxury</h2>
          <p className={s.bodyText}>
            Where heritage meets modern design, Designer World creates watches that combine timeless style, reliable quality, and everyday accessibility.
          </p>
        </div>
      </div>

      {/* Full-width Team Photo Spanning across bottom */}
      <div className={s.teamPhotoWrap}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/about-us-coded/assets/x8.png"
          alt="Designer World Team"
          className={s.teamPhoto}
          loading="lazy"
        />
      </div>
    </section>
  );
}
