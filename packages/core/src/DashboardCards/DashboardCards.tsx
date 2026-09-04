// Copyright (c) Meta Platforms, Inc. and affiliates.

'use client';

/**
 * @file DashboardCards.tsx
 * @input Uses React, StyleX, Link
 * @output Exports DashboardCards component, DashboardCardsProps,
 *   DashboardCardFeature, DashboardCardLink types
 * @position A responsive grid of numbered feature cards, each with an icon,
 *   a title, and a numbered list of links
 *
 * SYNC: When modified, update these files to stay in sync:
 * - /packages/core/src/DashboardCards/DashboardCards.doc.mjs
 * - /packages/core/src/DashboardCards/index.ts
 */

import type {ReactNode} from 'react';
import * as stylex from '@stylexjs/stylex';
import type {BaseProps} from '../BaseProps';
import {mergeProps} from '../utils';
import {themeProps} from '../utils/themeProps';
import {useLinkComponent} from '../Link/useLinkComponent';

// =============================================================================
// Styles
// =============================================================================
//
// Deliberately self-contained plain elements (div/h6/ol/li/a) styled
// directly, rather than composed from Card/Heading/List/ListItem — those
// components' internal color/size extension points (private CSS custom
// properties, StyleX's public xstyle type rejecting them) fought too hard
// for exact pixel/behavior parity with a specific external reference design.
// Colors, sizes, and breakpoints below are literal, deliberately not tokens,
// because this component's whole job is to reproduce that exact reference.

const styles = stylex.create({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    position: 'relative',
    marginInline: 10,
    insetBlockStart: {
      default: 17,
      '@media (max-width: 1199px)': 8,
      '@media (max-width: 991px)': 15,
      '@media (max-width: 480px)': 0,
    },
    insetInlineStart: {
      default: 18,
      '@media (max-width: 1199px)': 5,
    },
  },
  col: {
    boxSizing: 'border-box',
    flexGrow: 0,
    flexShrink: 0,
    paddingInline: 10,
    marginBlockEnd: 20,
    width: {
      default: '25%',
      '@media (max-width: 991px)': '50%',
      '@media (max-width: 576px)': '100%',
    },
  },
  card: {
    boxSizing: 'border-box',
    // `background` (the shorthand) silently compiles to nothing — StyleX
    // doesn't recognize it as a property name the way it does `backgroundColor`.
    backgroundColor: '#ffffff',
    borderRadius: 13,
    boxShadow: '0px 0px 5px 5px #c1bdbd40',
    transitionProperty: 'transform, box-shadow',
    transitionDuration: '0.3s',
    padding: {
      default: 18,
      '@media (max-width: 1199px)': 14,
      '@media (max-width: 991px)': 14,
    },
    minHeight: {
      default: 205,
      '@media (max-width: 1199px)': 198,
      '@media (max-width: 991px)': 234,
      '@media (max-width: 768px)': 190,
      '@media (max-width: 480px)': 157,
    },
    width: {
      default: '96%',
      '@media (max-width: 1199px)': '98%',
      '@media (max-width: 991px)': '98%',
      '@media (max-width: 480px)': '100%',
    },
    ':hover:where(:not(:disabled,[aria-disabled="true"]))': {
      transform: 'translateY(-4px)',
      boxShadow: '0 8px 20px rgba(0, 0, 0, 0.15)',
    },
  },
  icon: {
    display: 'block',
    width: 35,
    '@media (max-width: 480px)': {
      width: 25,
    },
  },
  title: {
    paddingBlockStart: 7,
    margin: 0,
    color: '#32608a',
    fontFamily: '"Gilroy-Bold", "Inter", sans-serif',
    fontWeight: 600,
    lineHeight: '22.28px',
    fontSize: {
      default: 19,
      '@media (max-width: 1399px)': 16,
      '@media (max-width: 480px)': 14,
    },
  },
  list: {
    fontSize: 13,
    paddingInlineStart: 20,
    color: '#2c5b86',
    marginBlockStart: 8,
    marginBlockEnd: 0,
    listStyleType: 'decimal',
    listStylePosition: 'outside',
  },
  listItem: {
    paddingBlock: 5,
    color: '#3e70cb',
    fontFamily: '"Inter", sans-serif',
    fontWeight: 500,
    fontSize: {
      default: 16,
      '@media (max-width: 1199px)': 15,
      '@media (max-width: 767px)': 13,
      '@media (max-width: 480px)': 13,
    },
    lineHeight: {
      default: 'normal',
      '@media (max-width: 1199px)': '18.41px',
      '@media (max-width: 767px)': '16.41px',
      '@media (max-width: 480px)': '16.41px',
    },
    // Pinned explicitly so it doesn't inherit the hover color below — a
    // ::marker with no color of its own would otherwise pick up li:hover's
    // color change along with the text, turning the "1."/"2." red too.
    '::marker': {
      color: '#3e70cb',
      fontWeight: 600,
      fontSize: 16,
    },
    ':hover:where(:not(:disabled,[aria-disabled="true"]))': {
      color: '#ff5e14',
      textDecoration: 'underline',
    },
  },
  link: {
    display: 'inline',
    color: '#3e70cb',
    fontFamily: '"Inter", sans-serif',
    fontWeight: 500,
    fontSize: 16,
    lineHeight: '19.41px',
    textDecoration: 'none',
    cursor: {default: 'pointer', ':is(:disabled,[aria-disabled="true"])': 'default'},
    ':hover:where(:not(:disabled,[aria-disabled="true"]))': {
      color: '#ff5e14',
      textDecoration: 'underline',
    },
  },
});

// =============================================================================
// Props
// =============================================================================

/** One link row under a card's title. */
export interface DashboardCardLink {
  /** Link text. */
  label: string;
  /** Destination URL. */
  href: string;
  /** Called on click instead of navigating — e.g. to show a "please login" prompt first. */
  onClick?: () => void;
  /** Open in a new tab. Ignored when `onClick` is set. */
  newTab?: boolean;
}

/** One card in the grid. */
export interface DashboardCardFeature {
  /** Card title. */
  title: string;
  /** Badge shown above the title — typically a numbered icon image. */
  icon: ReactNode;
  /** Numbered list of links rendered under the title. */
  links: DashboardCardLink[];
}

export interface DashboardCardsProps extends BaseProps<HTMLDivElement> {
  /** Ref forwarded to the root element */
  ref?: React.Ref<HTMLDivElement>;
  /** The cards to render, in order. */
  features: DashboardCardFeature[];
}

// =============================================================================
// DashboardCards
// =============================================================================

/**
 * A responsive grid of numbered feature cards — icon, title, and a numbered
 * list of links per card. Built for a "getting started" style dashboard
 * (account creation, applications, recruitment, ...): 4 columns down to 2
 * down to 1 as the viewport narrows.
 *
 * @example
 * ```
 * <DashboardCards
 *   features={[
 *     {
 *       title: 'Create Account and Login',
 *       icon: <img src="/icons/step-1.png" alt="" />,
 *       links: [
 *         {label: 'Create Account', href: '/account-creation'},
 *         {label: 'Login', href: '/login'},
 *       ],
 *     },
 *   ]}
 * />
 * ```
 */
export function DashboardCards({
  features,
  ref,
  xstyle,
  className,
  style,
  ...props
}: DashboardCardsProps) {
  const Link = useLinkComponent();

  return (
    <div
      ref={ref}
      {...props}
      {...mergeProps(
        themeProps('dashboard-cards'),
        stylex.props(styles.root, xstyle),
        className,
        style,
      )}>
      {features.map(feature => (
        <div key={feature.title} {...stylex.props(styles.col)}>
          <div {...stylex.props(styles.card)}>
            <span {...stylex.props(styles.icon)} aria-hidden="true">
              {feature.icon}
            </span>
            <h6 {...stylex.props(styles.title)}>{feature.title}</h6>
            <ol {...stylex.props(styles.list)}>
              {feature.links.map((link, linkIdx) => (
                <li
                  key={`${feature.title}-${linkIdx}`}
                  {...stylex.props(styles.listItem)}>
                  <Link
                    href={link.href}
                    target={
                      link.onClick
                        ? undefined
                        : link.newTab
                          ? '_blank'
                          : undefined
                    }
                    rel={
                      !link.onClick && link.newTab
                        ? 'noopener noreferrer'
                        : undefined
                    }
                    onClick={
                      link.onClick
                        ? (e: React.MouseEvent) => {
                            e.preventDefault();
                            link.onClick?.();
                          }
                        : undefined
                    }
                    {...stylex.props(styles.link)}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ol>
          </div>
        </div>
      ))}
    </div>
  );
}

DashboardCards.displayName = 'DashboardCards';
