// Copyright (c) Meta Platforms, Inc. and affiliates.

'use client';

/**
 * @file Marquee.tsx
 * @input Uses React, StyleX, spacing/color/typography tokens
 * @output Exports Marquee component and MarqueeProps
 * @position Continuously scrolling announcement strip, pausable on hover
 *
 * SYNC: When modified, update these files to stay in sync:
 * - /packages/core/src/Marquee/Marquee.doc.mjs
 * - /packages/core/src/Marquee/index.ts
 */

import * as stylex from '@stylexjs/stylex';
import type {BaseProps} from '../BaseProps';
import {
  colorVars,
  spacingVars,
  typeScaleVars,
  fontWeightVars,
  borderVars,
} from '../theme/tokens.stylex';
import {mergeProps} from '../utils';
import {themeProps} from '../utils/themeProps';
import {marqueeScope} from './marquee.stylex';

// =============================================================================
// Animation
// =============================================================================

const scroll = stylex.keyframes({
  '0%': {transform: 'translateX(0)'},
  '100%': {transform: 'translateX(-50%)'},
});

// =============================================================================
// Styles
// =============================================================================

const styles = stylex.create({
  root: {
    display: 'block',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    backgroundColor: colorVars['--color-background-surface'],
    borderBlockEnd: `${borderVars['--border-width']} solid ${colorVars['--color-border']}`,
    paddingBlock: spacingVars['--spacing-2'],
  },
  track: (duration: string) => ({
    display: 'inline-flex',
    width: 'max-content',
    animationName: scroll,
    animationDuration: duration,
    animationTimingFunction: 'linear',
    animationIterationCount: 'infinite',
    willChange: 'transform',
    [stylex.when.ancestor(':hover', marqueeScope)]: {
      '@media (hover: hover)': {animationPlayState: 'paused'},
    },
    '@media (prefers-reduced-motion: reduce)': {
      animationPlayState: 'paused',
    },
  }),
  // A function style: `color` is a runtime prop (any CSS color a caller
  // passes), not known at compile time.
  item: (color: string) => ({
    display: 'inline-block',
    flexShrink: 0,
    paddingInlineEnd: spacingVars['--spacing-12'],
    color,
    fontSize: typeScaleVars['--text-body-size'],
    lineHeight: typeScaleVars['--text-body-leading'],
    fontWeight: fontWeightVars['--font-weight-semibold'],
  }),
});

// =============================================================================
// Props
// =============================================================================

export interface MarqueeProps extends BaseProps<HTMLDivElement> {
  /** Ref forwarded to the root element */
  ref?: React.Ref<HTMLDivElement>;
  /**
   * The announcement text — a single string, or a list to scroll several
   * messages through the same strip (each still gets its own trailing gap).
   * The whole set is rendered twice internally for the seamless loop.
   */
  text: string | string[];
  /**
   * Seconds for one full loop — lower is faster.
   * @default 25
   */
  speed?: number;
  /**
   * Text color — any CSS color value (hex, named color, a token via `var()`, ...).
   * @default colorVars['--color-error']
   */
  color?: string;
}

// =============================================================================
// Marquee
// =============================================================================

/**
 * Continuously scrolling announcement strip. Pauses on hover (pointer
 * devices only — reduced-motion visitors get a static, unanimated strip
 * instead of a moving one they can't otherwise pause).
 *
 * @example
 * ```
 * <Marquee text="Change in Service Preference will be allowed during the updation window..." />
 * ```
 */
export function Marquee({
  text,
  speed = 30,
  color = colorVars['--color-error'],
  ref,
  xstyle,
  className,
  style,
  ...props
}: MarqueeProps) {
  const texts = Array.isArray(text) ? text : [text];

  return (
    <div
      ref={ref}
      {...props}
      {...mergeProps(
        themeProps('marquee'),
        stylex.props(styles.root, marqueeScope, xstyle),
        className,
        style,
      )}>
      <div
        aria-label={texts.join(' — ')}
        {...stylex.props(styles.track(`${speed}s`))}>
        {texts.map((t, i) => (
          <span key={`a-${i}`} {...stylex.props(styles.item(color))}>
            {t}
          </span>
        ))}
        {texts.map((t, i) => (
          <span
            key={`b-${i}`}
            {...stylex.props(styles.item(color))}
            aria-hidden="true">
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

Marquee.displayName = 'Marquee';
