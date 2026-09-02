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
  item: {
    display: 'inline-block',
    flexShrink: 0,
    paddingInlineEnd: spacingVars['--spacing-12'],
    color: colorVars['--color-error'],
    fontSize: typeScaleVars['--text-body-size'],
    lineHeight: typeScaleVars['--text-body-leading'],
    fontWeight: fontWeightVars['--font-weight-semibold'],
  },
});

// =============================================================================
// Props
// =============================================================================

export interface MarqueeProps extends BaseProps<HTMLDivElement> {
  /** Ref forwarded to the root element */
  ref?: React.Ref<HTMLDivElement>;
  /** The announcement text. Rendered twice internally for the seamless loop. */
  text: string;
  /**
   * Seconds for one full loop — lower is faster.
   * @default 25
   */
  speed?: number;
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
  speed = 25,
  ref,
  xstyle,
  className,
  style,
  ...props
}: MarqueeProps) {
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
      <div aria-label={text} {...stylex.props(styles.track(`${speed}s`))}>
        <span {...stylex.props(styles.item)}>{text}</span>
        <span {...stylex.props(styles.item)} aria-hidden="true">
          {text}
        </span>
      </div>
    </div>
  );
}

Marquee.displayName = 'Marquee';
