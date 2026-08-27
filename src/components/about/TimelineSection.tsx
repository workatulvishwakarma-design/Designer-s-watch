'use client';

import type { TimelineItem } from './timeline-data';
import s from './AboutTimeline.module.css';

type Props = {
  item: TimelineItem;
};

export function TimelineSection({ item }: Props) {
  const yearOnLeft = item.yearSide === 'left';
  const fullYearString = `${item.yearMain}${item.yearSub}`;

  const renderYearBlock = () => (
    <div className={s.yearBlock}>
      <span className={s.yearMain}>{item.yearMain}</span>
      <span className={s.yearSub}>
        {item.yearSub}
      </span>
    </div>
  );

  const renderSmallYearLabel = () => (
    <div className={s.smallYearWrap}>
      <span className={s.yearSmall}>{fullYearString}</span>
    </div>
  );

  const renderTitleBlock = () => (
    <div className={s.titleWrap}>
      <h2
        className={`${s.title} ${item.titleGreen ? s.titleGreen : ''}`}
        dangerouslySetInnerHTML={{ __html: item.title }}
      />
      <div className={s.rule} />
    </div>
  );

  return (
    <section id={`section-${item.id}`} className={s.timelineSection}>
      {/* ── Left Column ── */}
      <div className={s.colLeft}>
        <div className={s.colInner}>
          {yearOnLeft ? (
            <>
              {renderYearBlock()}
              {renderTitleBlock()}
              <p
                className={s.bodyText}
                dangerouslySetInnerHTML={{ __html: item.leftText }}
              />
            </>
          ) : (
            <>
              {renderSmallYearLabel()}
              <p
                className={s.bodyText}
                dangerouslySetInnerHTML={{ __html: item.leftText }}
              />
            </>
          )}

          {item.sideImage?.side === 'left' && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={item.sideImage.src}
              alt={item.sideImage.alt}
              className={s.sideImg}
              style={{
                maxWidth: item.sideImage.maxWidth,
                ...item.sideImage.style,
              }}
              loading="lazy"
            />
          )}
        </div>
      </div>

      {/* ── Center Column (Over green spine) ── */}
      <div className={s.colCenter}>
        {item.centerImages?.map((img, idx) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={`${item.id}-center-${idx}`}
            src={img.src}
            alt={img.alt}
            className={s.centerImg}
            style={{
              width: img.width ?? '100%',
              maxWidth: img.maxWidth,
              ...img.style,
            }}
            loading="lazy"
          />
        ))}
      </div>

      {/* ── Right Column ── */}
      <div className={s.colRight}>
        <div className={s.colInner}>
          {!yearOnLeft ? (
            <>
              {renderYearBlock()}
              {renderTitleBlock()}
              <p
                className={s.bodyText}
                dangerouslySetInnerHTML={{ __html: item.rightText }}
              />
            </>
          ) : (
            <>
              {renderSmallYearLabel()}
              <p
                className={s.bodyText}
                dangerouslySetInnerHTML={{ __html: item.rightText }}
              />
            </>
          )}

          {item.sideImage?.side === 'right' && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={item.sideImage.src}
              alt={item.sideImage.alt}
              className={s.sideImg}
              style={{
                maxWidth: item.sideImage.maxWidth,
                ...item.sideImage.style,
              }}
              loading="lazy"
            />
          )}
        </div>
      </div>
    </section>
  );
}
