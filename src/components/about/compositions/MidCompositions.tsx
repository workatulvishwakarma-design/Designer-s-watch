import React from 'react';
import { YearBlock } from '../shared/YearBlock';
import { EditorialHeading, TimelineCopy } from '../shared/EditorialTypography';
import s from '../AboutTimeline.module.css';

const ASSET_DIR = '/about-us-coded/assets/';

export function Composition1995() {
  return (
    <section id="section-1995" className={s.compositionSection}>
      {/* Left Column: Giant 1995 Year & Title */}
      <div className={s.colLeft}>
        <div className={s.contentBlock}>
          <YearBlock main="19" sub="95" />
          <EditorialHeading>Style For All</EditorialHeading>
          <TimelineCopy>
            ESCORT was launched to make timeless design more accessible, bringing style to a wider audience with robust everyday timepieces at honest prices.
          </TimelineCopy>
        </div>
      </div>

      {/* Center Column: ESCORT Logo & Banquet Launch */}
      <div className={s.colCenter}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`${ASSET_DIR}x126.png`}
          alt="ESCORT Logo"
          className={s.centerImg}
          style={{ width: '70%', maxWidth: '210px', marginBottom: '12px' }}
          loading="lazy"
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`${ASSET_DIR}x88.png`}
          alt="ESCORT Banquet Launch"
          className={s.centerImg}
          style={{ width: '120%', maxWidth: '410px' }}
          loading="lazy"
        />
      </div>

      {/* Right Column: Small 1995 Label & Narrative */}
      <div className={s.colRight}>
        <div className={s.contentBlock}>
          <YearBlock main="1995" sub="" isSmall />
          <TimelineCopy>
            Escort answered a simple question: why shouldn’t every Indian have access to a reliable, beautifully finished timepiece? The market responded with extraordinary enthusiasm.
          </TimelineCopy>
        </div>
      </div>
    </section>
  );
}

export function Composition1998() {
  return (
    <section id="section-1998" className={s.compositionSection}>
      {/* Left Column: Small 1998 Label & Narrative */}
      <div className={s.colLeft}>
        <div className={s.contentBlock}>
          <YearBlock main="1998" sub="" isSmall />
          <TimelineCopy>
            Bringing prestige Swiss and French horological brands to Indian retail counters established the Nagpal Group as an esteemed national distributor.
          </TimelineCopy>
        </div>
      </div>

      {/* Center Column: Tissot Meeting Photo */}
      <div className={s.colCenter}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`${ASSET_DIR}x106.png`}
          alt="Tissot Launch Meeting"
          className={s.centerImg}
          style={{ width: '120%', maxWidth: '390px' }}
          loading="lazy"
        />
      </div>

      {/* Right Column: Giant 1998 Year & Title */}
      <div className={s.colRight}>
        <div className={s.contentBlock}>
          <YearBlock main="19" sub="98" />
          <EditorialHeading isGreen>
            Introduction of<br />Tissot in India
          </EditorialHeading>
          <TimelineCopy>
            We were the ones to launch TISSOT watches in India as national distributors. We initiated the distribution for Tissot, Givenchy Paris, Christian Bernard Paris, and Rotary in India.
          </TimelineCopy>
        </div>
      </div>
    </section>
  );
}

export function Composition2004() {
  return (
    <section id="section-2004" className={s.compositionSection}>
      {/* Left Column: Giant 2004 Year & Title */}
      <div className={s.colLeft}>
        <div className={s.contentBlock}>
          <YearBlock main="20" sub="04" />
          <EditorialHeading>D’signer Effects</EditorialHeading>
          <TimelineCopy>
            Connecting brand messaging with high-quality custom corporate gifts allowed businesses across India to elevate their marketing initiatives and employee reward programs.
          </TimelineCopy>
        </div>
      </div>

      {/* Center Column: Corporate Gifts Flyer */}
      <div className={s.colCenter}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`${ASSET_DIR}x72.png`}
          alt="D'SIGNER Effects Catalog"
          className={s.centerImg}
          style={{ width: '90%', maxWidth: '250px' }}
          loading="lazy"
        />
      </div>

      {/* Right Column: Small 2004 Label & Narrative */}
      <div className={s.colRight}>
        <div className={s.contentBlock}>
          <YearBlock main="2004" sub="" isSmall />
          <TimelineCopy>
            We started a division purely in the corporate gifts &amp; promotion business under the name D’SIGNER EFFECTS. Here the idea was to connect with all small and large organizations, offering all sorts of promotion gifts for schemes and marketing plans.
          </TimelineCopy>
        </div>
      </div>
    </section>
  );
}

export function Composition2010() {
  return (
    <section id="section-2010" className={s.compositionSection} style={{ minHeight: '850px' }}>
      {/* Left Column: Giant 2010 Year & Corporate B2B details */}
      <div className={s.colLeft}>
        <div className={s.contentBlock}>
          <YearBlock main="20" sub="10" />
          <TimelineCopy>
            DESIGNER WATCHES scaled production skills and managed largest volume B2B orders of watches in lakhs, delivering projects for esteemed groups like TATA INDICOM, REEBOK, NIKON, and PHARMA COMPANIES.
          </TimelineCopy>
          <TimelineCopy style={{ marginTop: '20px' }}>
            B2B &amp; Corporate Gifting became a very important focus as wristwatches became a strong category for business promotion and marketing plans for major corporates. Launched clocks &amp; bags category under D’SIGNER for B2B requirements.
          </TimelineCopy>
        </div>
      </div>

      {/* Center Column: Clocks Collection Display */}
      <div className={s.colCenter}>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center', justifyContent: 'center', marginBottom: '14px' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`${ASSET_DIR}x76.png`}
            alt="Antique Clock"
            className={s.centerImg}
            style={{ width: '130px' }}
            loading="lazy"
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`${ASSET_DIR}x46.png`}
            alt="Desk Clock"
            className={s.centerImg}
            style={{ width: '160px' }}
            loading="lazy"
          />
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`${ASSET_DIR}x50.png`}
          alt="Clocks on Shelves Collection"
          className={s.centerImg}
          style={{ width: '135%', maxWidth: '510px' }}
          loading="lazy"
        />
      </div>

      {/* Right Column: Giant 2010 Year & Title */}
      <div className={s.colRight}>
        <div className={s.contentBlock}>
          <YearBlock main="20" sub="10" />
          <EditorialHeading isGreen>
            B2B &amp; Corporate<br />Gifting
          </EditorialHeading>
        </div>
      </div>
    </section>
  );
}

export function Composition2013() {
  return (
    <section id="section-2013" className={s.compositionSection}>
      {/* Left Column: Giant 2013 Year & Title */}
      <div className={s.colLeft}>
        <div className={s.contentBlock}>
          <YearBlock main="20" sub="13" />
          <EditorialHeading>Daniel Klein in India</EditorialHeading>
          <TimelineCopy>
            Got exclusive distribution of Daniel Klein, a leading Turkish brand of watches and fashion accessories, in India.
          </TimelineCopy>
        </div>
      </div>

      {/* Center Column: Daniel Klein Watch with Splash */}
      <div className={s.colCenter}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`${ASSET_DIR}x84.png`}
          alt="Daniel Klein Watch with Liquid Chrome Splash"
          className={s.centerImg}
          style={{ width: '115%', maxWidth: '350px' }}
          loading="lazy"
        />
      </div>

      {/* Right Column: Small 2013 Label & Narrative */}
      <div className={s.colRight}>
        <div className={s.contentBlock}>
          <YearBlock main="2013" sub="" isSmall />
          <TimelineCopy>
            Bringing dynamic international styling and accessible luxury to retail counters opened new fashion-forward demographics across all major tier-1 and tier-2 cities.
          </TimelineCopy>
        </div>
      </div>
    </section>
  );
}
