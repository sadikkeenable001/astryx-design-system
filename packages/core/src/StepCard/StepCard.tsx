// Copyright (c) Meta Platforms, Inc. and affiliates.

'use client';

/**
 * @file StepCard.tsx
 * @input Uses React, StyleX, Card, Heading, List, ListItem
 * @output Exports StepCard component, StepCardProps, StepCardItem types
 * @position Composed card for a numbered step in a multi-stage process
 *
 * SYNC: When modified, update these files to stay in sync:
 * - /packages/core/src/StepCard/StepCard.doc.mjs
 * - /packages/core/src/StepCard/index.ts
 */

import type {ReactNode} from 'react';
import * as stylex from '@stylexjs/stylex';
import {
  spacingVars,
  shadowVars,
  durationVars,
  easeVars,
} from '../theme/tokens.stylex';
import type {BaseProps} from '../BaseProps';
import {Card} from '../Card/Card';
import {Heading} from '../Heading/Heading';
import {List} from '../List/List';
import {ListItem} from '../List/ListItem';
import {mergeProps} from '../utils';
import {themeProps} from '../utils/themeProps';

// =============================================================================
// Styles
// =============================================================================

const styles = stylex.create({
  // Lifts on hover — including hovering a link inside it, since :hover on an
  // ancestor is a normal CSS match whenever the pointer is anywhere over its
  // box, links included. No JS or ancestor-marker plumbing needed for that
  // direction (contrast Marquee's pause-on-hover, which reads the opposite
  // way — a *descendant* reacting to an *ancestor* hovering).
  card: {
    minHeight: 205,
    padding: 18,
    borderRadius: 13,
    transitionProperty: 'transform, box-shadow',
    transitionDuration: durationVars['--duration-medium'],
    transitionTimingFunction: easeVars['--ease-standard'],
    ':hover:where(:not(:disabled,[aria-disabled="true"]))': {
      transform: 'translateY(-4px)',
      boxShadow: shadowVars['--shadow-high'],
    },
  },
  stack: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: spacingVars['--spacing-3'],
  },
  icon: {
    display: 'inline-flex',
  },
});

// =============================================================================
// Props
// =============================================================================

/** One entry in a StepCard's action list. */
export interface StepCardItem {
  /** Primary label content. */
  label: string;
  /** URL to navigate to when clicked. */
  href?: string;
  /** Callback when the item is clicked. */
  onClick?: () => void;
}

export interface StepCardProps extends BaseProps<HTMLDivElement> {
  /** Ref forwarded to the root element */
  ref?: React.Ref<HTMLDivElement>;
  /**
   * Badge shown above the title — typically a numbered icon (an `<img>` or
   * `<Image>`), but any element works.
   */
  icon: ReactNode;
  /** Card title. */
  title: string;
  /** Numbered (decimal) list of links/actions rendered under the title. */
  items: StepCardItem[];
}

// =============================================================================
// StepCard
// =============================================================================

/**
 * A card for one step in a numbered, multi-stage process — a badge, a title,
 * and a numbered list of related links or actions. Composed from `Card`,
 * `Heading`, and `List`/`ListItem` rather than a single primitive, so a
 * caller who needs a different arrangement of the same pieces can compose
 * them directly instead of fighting this component's layout.
 *
 * @example
 * ```
 * <StepCard
 *   icon={<img src="/icons/step-1.svg" alt="" width={32} height={32} />}
 *   title="Create Account and Login"
 *   items={[
 *     {label: 'Create Account', href: '/account-creation'},
 *     {label: 'Login', href: '/login'},
 *   ]}
 * />
 * ```
 */
export function StepCard({
  icon,
  title,
  items,
  ref,
  xstyle,
  className,
  style,
  ...props
}: StepCardProps) {
  return (
    <Card
      ref={ref}
      xstyle={[styles.card, xstyle]}
      {...props}
      {...mergeProps(themeProps('step-card'), className, style)}>
      <div {...stylex.props(styles.stack)}>
        <span {...stylex.props(styles.icon)} aria-hidden="true">
          {icon}
        </span>
        <Heading level={3}>{title}</Heading>
        <List listStyle="decimal">
          {items.map(item => (
            <ListItem
              key={item.label}
              label={item.label}
              href={item.href}
              onClick={item.onClick}
            />
          ))}
        </List>
      </div>
    </Card>
  );
}

StepCard.displayName = 'StepCard';
