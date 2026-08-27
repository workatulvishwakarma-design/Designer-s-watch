import React from 'react';
import s from '../AboutTimeline.module.css';

interface YearBlockProps {
  main: string;        // e.g. "19" or "20"
  sub: string;         // e.g. "40s" or "76"
  isSmall?: boolean;   // for single-line small year labels like "1960s"
  className?: string;
}

export function YearBlock({ main, sub, isSmall = false, className = '' }: YearBlockProps) {
  if (isSmall) {
    return (
      <div className={`${s.yearSmall} ${className}`}>
        {main}{sub}
      </div>
    );
  }

  return (
    <div className={`${s.yearBig} ${className}`}>
      <span className={s.yearMain}>{main}</span>
      <span className={s.yearSub}>{sub}</span>
    </div>
  );
}
