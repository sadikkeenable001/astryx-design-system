// Copyright (c) Meta Platforms, Inc. and affiliates.

'use client';

/**
 * @file PageFooter.tsx
 * @input Uses React, StyleX, spacing/typography tokens
 * @output Exports PageFooter component, PageFooterProps, PageFooterLink types
 * @position Site-wide footer bar: a row of contact/utility links, a divider,
 *   and a centered caption
 *
 * SYNC: When modified, update these files to stay in sync:
 * - /packages/core/src/PageFooter/PageFooter.doc.mjs
 * - /packages/core/src/PageFooter/index.ts
 */

import type {ReactNode} from 'react';
import * as stylex from '@stylexjs/stylex';
import {
  colorVars,
  spacingVars,
  typeScaleVars,
  fontWeightVars,
} from '../theme/tokens.stylex';
import type {BaseProps} from '../BaseProps';
import {mergeProps} from '../utils';
import {themeProps} from '../utils/themeProps';
import {useLinkComponent} from '../Link/useLinkComponent';

// =============================================================================
// Styles
// =============================================================================

const styles = stylex.create({
  root: {
    // Text/icon color, not background — this footer's background is brand-
    // specific (a caller's own color), so only the text token is opinionated
    // here: `on-dark` is the semantic pairing for text placed on a caller-
    // supplied dark/colored surface, same idea as NavIcon's on-accent text.
    color: colorVars['--color-on-dark'],
    paddingBlock: spacingVars['--spacing-4'],
    paddingInline: spacingVars['--spacing-6'],
  },
  linkRow: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    gap: spacingVars['--spacing-12'],
  },
  link: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: spacingVars['--spacing-2'],
    color: 'inherit',
    textDecoration: 'none',
    fontSize: typeScaleVars['--text-body-size'],
    fontWeight: fontWeightVars['--font-weight-semibold'],
    ':hover:where(:not(:disabled,[aria-disabled="true"]))': {
      color: '#fde047',
    },
  },
  // Button variant (no href — onClick only) needs its own reset: browsers
  // don't give <button> the same free inherited font/cursor treatment a
  // plain <a> gets. Longhands only — `background`/`font` shorthands
  // silently compile to nothing (StyleX doesn't recognize those property
  // names the way it does the longhands).
  button: {
    borderWidth: 0,
    borderStyle: 'none',
    backgroundColor: 'transparent',
    padding: 0,
    fontFamily: 'inherit',
    fontSize: 'inherit',
    fontWeight: 'inherit',
    lineHeight: 'inherit',
    color: 'inherit',
    cursor: {default: 'pointer', ':is(:disabled,[aria-disabled="true"])': 'default'},
  },
  icon: {
    display: 'inline-flex',
    flexShrink: 0,
  },
  divider: {
    // Physical border-* longhands throughout, deliberately not mixed with a
    // logical borderBlockStart override — StyleX generates atomic classes
    // per property, and pairing a `border: 'none'` shorthand with a logical
    // longhand for the same visual edge left the resulting class order
    // (alphabetical/hashed, not source order) free to cancel the border out.
    borderWidth: 0,
    borderTopWidth: 1,
    borderStyle: 'solid',
    borderColor: 'currentColor',
    opacity: 0.3,
    marginBlock: spacingVars['--spacing-4'],
  },
  caption: {
    textAlign: 'center',
    fontSize: typeScaleVars['--text-body-size'],
    fontWeight: fontWeightVars['--font-weight-semibold'],
  },
});

// =============================================================================
// Props
// =============================================================================

/** One contact/utility link in the footer's top row. */
export interface PageFooterLink {
  /** Link text. */
  label: string;
  /** Destination URL — `mailto:`/`tel:` links work as-is. Omit when using `onClick` instead. */
  href?: string;
  /** Called on click instead of navigating — e.g. to open a dialog with the actual contact info. Renders a <button> rather than a link when set. */
  onClick?: () => void;
  /** Optional leading icon. */
  icon?: ReactNode;
}

export interface PageFooterProps extends BaseProps<HTMLElement> {
  /** Ref forwarded to the root element */
  ref?: React.Ref<HTMLElement>;
  /** Contact/utility links shown in a row across the top. */
  links: PageFooterLink[];
  /** Centered content below the divider — typically the org/site name. */
  caption?: ReactNode;
}

// =============================================================================
// PageFooter
// =============================================================================

/**
 * Site-wide footer: a row of contact/utility links (email, phone, ...), a
 * divider, and a centered caption. Text uses the `on-dark` color pairing —
 * the background is a caller-supplied brand color, passed via `style` or
 * `className` like any component, not baked in here.
 *
 * @example
 * ```
 * <PageFooter
 *   style={{backgroundColor: '#1F4E79'}}
 *   links={[
 *     {label: 'Email-Id', href: 'mailto:helpdesk@example.gov', icon: <EnvelopeIcon />},
 *     {label: 'Help Desk', href: 'tel:+911123456789', icon: <PhoneIcon />},
 *   ]}
 *   caption="Union Public Service Commission"
 * />
 * ```
 */
export function PageFooter({
  links,
  caption,
  ref,
  xstyle,
  className,
  style,
  ...props
}: PageFooterProps) {
  const Link = useLinkComponent();

  return (
    <footer
      ref={ref}
      {...props}
      {...mergeProps(
        themeProps('page-footer'),
        stylex.props(styles.root, xstyle),
        className,
        style,
      )}>
      <div {...stylex.props(styles.linkRow)}>
        {links.map(link =>
          link.onClick ? (
            <button
              key={link.label}
              type="button"
              onClick={link.onClick}
              {...stylex.props(styles.link, styles.button)}>
              {link.icon && (
                <span {...stylex.props(styles.icon)} aria-hidden="true">
                  {link.icon}
                </span>
              )}
              {link.label}
            </button>
          ) : (
            <Link
              key={link.label}
              href={link.href as string}
              {...stylex.props(styles.link)}>
              {link.icon && (
                <span {...stylex.props(styles.icon)} aria-hidden="true">
                  {link.icon}
                </span>
              )}
              {link.label}
            </Link>
          ),
        )}
      </div>
      {caption && (
        <>
          <hr {...stylex.props(styles.divider)} />
          <div {...stylex.props(styles.caption)}>{caption}</div>
        </>
      )}
    </footer>
  );
}

PageFooter.displayName = 'PageFooter';
