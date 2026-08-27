'use client';

import React from 'react';
import { Section1940s } from './sections/Section1940s';
import { Section1960s } from './sections/Section1960s';
import {
  Section1976,
  Section1991,
  Section1995,
  Section1998,
  Section2004,
  Section2010,
  Section2013,
  Section2015,
  Section2017,
  Section2020,
  Section2022,
  Section2024,
  Section2025,
  SectionToday,
} from './sections/RemainingSections';
import s from './AboutTimeline.module.css';

export function AboutTimeline() {
  return (
    <div className={`${s.pageRoot} ${s.pageWrap}`}>
      {/* Continuous Center Green Spine Layer */}
      <div className={s.greenSpine} aria-hidden="true" />

      {/* Main Editorial Timeline Canvas */}
      <main className={s.timelineContainer}>
        {/* 1940s */}
        <Section1940s />

        {/* 1960s */}
        <Section1960s />

        {/* 1976 */}
        <Section1976 />

        {/* 1991 */}
        <Section1991 />

        {/* 1995 */}
        <Section1995 />

        {/* 1998 */}
        <Section1998 />

        {/* 2004 */}
        <Section2004 />

        {/* 2010 */}
        <Section2010 />

        {/* 2013 */}
        <Section2013 />

        {/* 2015 */}
        <Section2015 />

        {/* 2017 */}
        <Section2017 />

        {/* 2020 */}
        <Section2020 />

        {/* 2022 */}
        <Section2022 />

        {/* 2024 */}
        <Section2024 />

        {/* 2025 */}
        <Section2025 />

        {/* TODAY */}
        <SectionToday />
      </main>
    </div>
  );
}
