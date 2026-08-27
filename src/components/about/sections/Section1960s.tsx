import React from 'react';
import s from '../AboutTimeline.module.css';

export function Section1960s() {
  return (
    <section id="section-1960s" className={s.editorialSection}>
      {/* ── Left Column: 1960s Label & Narrative ── */}
      <div className={s.leftCol}>
        <div className={s.contentCard}>
          <div className={s.smallYear}>1960s</div>
          <p className={s.bodyParagraph}>
            International partnerships formed the backbone of a growing enterprise. By the mid-60s, Nagpals had become a trusted name in the Northern India trade circuit for precision components and watch batteries.
          </p>
        </div>
      </div>

      {/* ── Center Column: 1960s Family Group Photo ── */}
      <div className={s.centerCol}>
        <div className={s.familyPhotoWrap}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/about-us-coded/assets/x114.png"
            alt="1960s Family Group"
            className={s.familyPhotoImg}
            loading="lazy"
          />
        </div>
      </div>

      {/* ── Right Column: Big Year, Green Title & Narrative ── */}
      <div className={s.rightCol}>
        <div className={s.contentCard}>
          <div className={s.bigYear}>
            <span className={s.yearNumber}>19</span>
            <span className={s.yearSuffix}>60s</span>
          </div>
          <h2 className={`${s.editorialTitle} ${s.editorialTitleGreen}`}>
            The 2nd Generation<br />of Nagpal Watch.CO
          </h2>
          <div className={s.greenRule} />
          <p className={s.bodyParagraph}>
            This was when the 2nd generation of Nagpal’s family entered the business, deepening roots in horology and building relationships with component suppliers across Northern India.
          </p>
        </div>
      </div>
    </section>
  );
}
