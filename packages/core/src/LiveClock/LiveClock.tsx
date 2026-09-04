// Copyright (c) Meta Platforms, Inc. and affiliates.

'use client';

/**
 * @file LiveClock.tsx
 * @input Uses React, StyleX
 * @output Exports LiveClock component and LiveClockProps
 * @position A self-updating clock icon + formatted date/time string, ticking
 *   once a second by default — for a utility bar or header strip
 *
 * SYNC: When modified, update these files to stay in sync:
 * - /packages/core/src/LiveClock/LiveClock.doc.mjs
 * - /packages/core/src/LiveClock/index.ts
 */

import {useEffect, useState} from 'react';
import * as stylex from '@stylexjs/stylex';
import {colorVars} from '../theme/tokens.stylex';
import type {BaseProps} from '../BaseProps';
import {mergeProps} from '../utils';
import {themeProps} from '../utils/themeProps';
import {useLocale} from '../i18n';
import {formatInstant} from '../Timestamp/formatInstant';

const styles = stylex.create({
  root: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    fontSize: 13,
    color: colorVars['--color-text-primary'],
  },
  icon: {
    display: 'inline-flex',
    flexShrink: 0,
  },
});

export interface LiveClockProps extends BaseProps<HTMLSpanElement> {
  /** Ref forwarded to the root element */
  ref?: React.Ref<HTMLSpanElement>;
  /**
   * Formats the ticking date into the displayed string. Given a raw `Date`
   * rather than a locale, so a custom formatter is responsible for its own
   * locale sourcing (e.g. via `useLocale()`) if it needs one.
   * @default The active locale's full absolute date/time (`formatInstant(date, 'full', locale)`).
   */
  format?: (date: Date) => string;
  /** How often the display updates, in milliseconds. @default 1000 */
  intervalMs?: number;
}

/**
 * A self-updating clock: an icon followed by a formatted date/time string
 * that ticks on its own. Renders a non-breaking space until mounted, so
 * server and client markup match (the current time can't be known on the
 * server without a hydration mismatch).
 *
 * @example
 * ```
 * <LiveClock />
 * ```
 *
 * @example
 * ```
 * <LiveClock format={(date) => date.toLocaleTimeString()} intervalMs={1000} />
 * ```
 */
export function LiveClock({
  format,
  intervalMs = 1000,
  ref,
  xstyle,
  className,
  style,
  ...props
}: LiveClockProps) {
  const locale = useLocale();
  const [now, setNow] = useState<Date | null>(null);
  const resolvedFormat =
    format ?? ((date: Date) => formatInstant(date, 'full', locale));

  useEffect(() => {
    // The current time can only be read client-side (the server has no way
    // to know it without risking a hydration mismatch against the client's
    // clock), so the first paint intentionally starts from `null` and this
    // effect fills it in immediately after mount.
    // eslint-disable-next-line @eslint-react/set-state-in-effect -- initial value is only knowable client-side, see comment above
    setNow(new Date());
    const timer = setInterval(() => setNow(new Date()), intervalMs);
    return () => clearInterval(timer);
  }, [intervalMs]);

  return (
    <span
      ref={ref}
      {...props}
      {...mergeProps(
        themeProps('live-clock'),
        stylex.props(styles.root, xstyle),
        className,
        style,
      )}>
      <svg
        {...stylex.props(styles.icon)}
        width="14"
        height="14"
        viewBox="0 0 16 16"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.3}
        aria-hidden="true">
        <circle cx="8" cy="8" r="6.5" />
        <path
          d="M8 4.5v3.5l2.3 2.3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      {now ? resolvedFormat(now) : ' '}
    </span>
  );
}

LiveClock.displayName = 'LiveClock';
