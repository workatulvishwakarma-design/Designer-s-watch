import React from 'react';
import { YearBlock } from '../shared/YearBlock';
import { EditorialHeading, TimelineCopy } from '../shared/EditorialTypography';
import s from '../AboutTimeline.module.css';

const ASSET_DIR = '/about-us-coded/assets/';

export function Composition1940s() {
  return (
    <section id="section-1940s" className={s.compositionSection}>
      {/* Left Column */}
      <div className={s.colLeft}>
        <div className={s.contentBlock}>
          <YearBlock main="19" sub="40s" />
          <EditorialHeading withRule>The Beginning</EditorialHeading>
          <TimelineCopy>
            Started a new division solely managing foreign brand distribution under the name{' '}
            <b>DESIGNER WORLD BRANDS</b> &amp; added more labels like INGERSOLL, INVICTA, and SANTA BARBARA POLO CLUB.
          </TimelineCopy>
        </div>
      </div>

      {/* Center Column: Founder Portrait */}
      <div className={s.colCenter}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`${ASSET_DIR}x102.png`}
          alt="Founder Portrait"
          className={s.centerImg}
          style={{ width: '100%', maxWidth: '340px' }}
          loading="eager"
        />
      </div>

      {/* Right Column: 1940s Label + Nagpal Watch Co. Store */}
      <div className={s.colRight}>
        <div className={s.contentBlock}>
          <YearBlock main="1940s" sub="" isSmall />
          <TimelineCopy>
            Dedicated brand management infrastructure empowered global fashion icons to flourish in the Indian marketplace.
          </TimelineCopy>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`${ASSET_DIR}x122.png`}
            alt="Nagpal Watch Co. Store"
            className={s.sideImg}
            style={{ width: '100%', maxWidth: '440px', marginTop: '20px' }}
            loading="eager"
          />
        </div>
      </div>
    </section>
  );
}

export function Composition1960s() {
  return (
    <section id="section-1960s" className={s.compositionSection}>
      {/* Left Column: 1960s Label & Narrative */}
      <div className={s.colLeft}>
        <div className={s.contentBlock}>
          <YearBlock main="1960s" sub="" isSmall />
          <TimelineCopy>
            International partnerships formed the backbone of a growing enterprise. By the mid-60s, Nagpals had become a trusted name in the Northern India trade circuit for precision components and watch batteries.
          </TimelineCopy>
        </div>
      </div>

      {/* Center Column: 1960 Family Group Photo */}
      <div className={s.colCenter}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`${ASSET_DIR}x114.png`}
          alt="1960s Family Group"
          className={s.centerImg}
          style={{ width: '125%', maxWidth: '480px' }}
          loading="lazy"
        />
      </div>

      {/* Right Column: Giant 1960s Year & Title */}
      <div className={s.colRight}>
        <div className={s.contentBlock}>
          <YearBlock main="19" sub="60s" />
          <EditorialHeading isGreen>
            The 2nd Generation<br />of Nagpal Watch.CO
          </EditorialHeading>
          <TimelineCopy>
            This was when the 2nd generation of Nagpal’s family entered the business, deepening roots in horology and building relationships with component suppliers across Northern India.
          </TimelineCopy>
        </div>
      </div>
    </section>
  );
}

export function Composition1976() {
  return (
    <section id="section-1976" className={s.compositionSection}>
      {/* Left Column: Giant 1976 Year & Title */}
      <div className={s.colLeft}>
        <div className={s.contentBlock}>
          <YearBlock main="19" sub="76" />
          <EditorialHeading>
            ‘Nagpal’s Bombay‘<br />was formed
          </EditorialHeading>
          <TimelineCopy>
            This was when the 2nd generation of Nagpal’s family entered the business, deepening roots in horology and building relationships across Northern India.
          </TimelineCopy>
        </div>
      </div>

      {/* Center Column: Nagpals Bombay Logo & Photo */}
      <div className={s.colCenter}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`${ASSET_DIR}x130.png`}
          alt="Nagpals Bombay Logo"
          className={s.centerImg}
          style={{ width: '85%', maxWidth: '230px', marginBottom: '8px' }}
          loading="lazy"
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`${ASSET_DIR}x118.png`}
          alt="1976 Historical Photo"
          className={s.centerImg}
          style={{ width: '125%', maxWidth: '480px' }}
          loading="lazy"
        />
      </div>

      {/* Right Column: Small 1976 Label & Narrative */}
      <div className={s.colRight}>
        <div className={s.contentBlock}>
          <YearBlock main="1976" sub="" isSmall />
          <TimelineCopy>
            This was the time when they travelled to international markets to import parts &amp; components for direct distribution and during various BUTTON CELL brands tied up with NAGPALS BOMBAY for battery distribution all over India. Brands from Japan like MAXELL &amp; Swiss like RENATA became a major area of company’s focus for growth.
          </TimelineCopy>
        </div>
      </div>
    </section>
  );
}

export function Composition1991() {
  return (
    <section id="section-1991" className={s.compositionSection}>
      {/* Left Column: Small 1991 Label & Philosophy */}
      <div className={s.colLeft}>
        <div className={s.contentBlock}>
          <YearBlock main="1991" sub="" isSmall />
          <TimelineCopy>
            D’SIGNER was not simply a product launch but a philosophical statement. At a time when Indian watchmaking was dominated by mass-market models, D’SIGNER chose craftsmanship over compromise and design over convention.
          </TimelineCopy>
        </div>
      </div>

      {/* Center Column: D'SIGNER Logo & Couple Ad */}
      <div className={s.colCenter}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`${ASSET_DIR}x110.png`}
          alt="D'SIGNER Logo"
          className={s.centerImg}
          style={{ width: '70%', maxWidth: '210px', marginBottom: '12px' }}
          loading="lazy"
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`${ASSET_DIR}x98.png`}
          alt="D'SIGNER Couple Advertisement"
          className={s.centerImg}
          style={{ width: '110%', maxWidth: '350px' }}
          loading="lazy"
        />
      </div>

      {/* Right Column: Giant 1991 Year & Title */}
      <div className={s.colRight}>
        <div className={s.contentBlock}>
          <YearBlock main="19" sub="91" />
          <EditorialHeading isGreen>A Brand Is Born</EditorialHeading>
          <TimelineCopy>
            D’SIGNER was introduced, a step into creating watches defined by design, quality, and individuality. One of the early Indian brands to design and manufacture to international horological standards.
          </TimelineCopy>
        </div>
      </div>
    </section>
  );
}
