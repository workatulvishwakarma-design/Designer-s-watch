import React from 'react';
import s from '../AboutTimeline.module.css';

interface EditorialHeadingProps {
  children: React.ReactNode;
  isGreen?: boolean;
  withRule?: boolean;
  className?: string;
}

export function EditorialHeading({
  children,
  isGreen = false,
  withRule = false,
  className = '',
}: EditorialHeadingProps) {
  return (
    <div className={`${s.headingWrap} ${className}`}>
      <h2 className={`${s.story} ${isGreen ? s.storyGreen : ''}`}>
        {children}
      </h2>
      {withRule && <div className={s.rule} />}
    </div>
  );
}

interface TimelineCopyProps {
  children: React.ReactNode;
  className?: string;
  maxWidth?: number | string;
}

export function TimelineCopy({ children, className = '', maxWidth }: TimelineCopyProps) {
  return (
    <p
      className={`${s.kicker} ${className}`}
      style={maxWidth ? { maxWidth } : undefined}
    >
      {children}
    </p>
  );
}
