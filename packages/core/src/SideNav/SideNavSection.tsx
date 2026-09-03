// Copyright (c) Meta Platforms, Inc. and affiliates.

'use client';

/**
 * @file SideNavSection.tsx
 * @input Uses React, StyleX
 * @output Exports SideNavSection component and SideNavSectionProps
 * @position Core implementation; used inside SideNav children
 *
 * Section grouping for navigation items with optional title and end content.
 *
 * SYNC: When modified, update these files to stay in sync:
 * - /packages/core/src/SideNav/SideNav.doc.mjs
 * - /packages/core/src/SideNav/SideNav.test.tsx
 * - /packages/core/src/SideNav/index.ts
 * - /apps/storybook/stories/SideNav.stories.tsx
 * - /packages/cli/assets/templates/blocks/components/SideNav/ (showcase blocks)
 */

import React, {useId, type ReactNode} from 'react';
import * as stylex from '@stylexjs/stylex';
import {
  colorVars,
  spacingVars,
  fontWeightVars,
  typeScaleVars,
} from '../theme/tokens.stylex';
import {mergeProps} from '../utils';
import type {BaseProps} from '../BaseProps';
import {useSideNavCollapse} from './SideNavCollapseContext';
import {VisuallyHidden} from '../VisuallyHidden';
import {themeProps} from '../utils/themeProps';
// =============================================================================
// Styles
// =============================================================================

const styles = stylex.create({
  root: {
    display: 'flex',
    flexDirection: 'column',
    paddingBlock: 0,
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    gap: spacingVars['--spacing-2'],
    paddingInline: spacingVars['--spacing-2'],
    paddingBlock: spacingVars['--spacing-1'],
    cursor: 'default',
    userSelect: 'none',
  },
  headerBanner: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingInline: spacingVars['--spacing-3'],
    paddingBlock: spacingVars['--spacing-2'],
    backgroundColor: '#1453a3',
    color: '#ffffff',
    borderRadius: '8px',
    marginBottom: spacingVars['--spacing-2'],
    cursor: 'default',
    userSelect: 'none',
  },
  headerBannerCollapsed: {
    height: '40px',
    paddingInline: 0,
    borderRadius: '4px',
  },
  bannerTitle: {
    fontSize: typeScaleVars['--text-supporting-size'],
    fontWeight: fontWeightVars['--font-weight-semibold'],
    color: '#ffffff',
    textAlign: 'center',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  bannerTitleCollapsed: {
    fontSize: '18px',
    fontWeight: fontWeightVars['--font-weight-bold'],
    lineHeight: '1',
  },

  titleContainer: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    minWidth: 0,
  },
  title: {
    fontSize: typeScaleVars['--text-supporting-size'],
    fontWeight: fontWeightVars['--font-weight-semibold'],
    lineHeight: typeScaleVars['--text-supporting-leading'],
    color: colorVars['--color-text-secondary'],
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  subtitle: {
    fontSize: typeScaleVars['--text-supporting-size'],
    lineHeight: typeScaleVars['--text-supporting-leading'],
    color: colorVars['--color-text-secondary'],
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  endContent: {
    flexShrink: 0,
    display: 'flex',
    alignItems: 'center',
  },

  items: {
    display: 'flex',
    flexDirection: 'column',
    gap: spacingVars['--spacing-2'],
  },
});

function getCollapsedTitle(title: string): string {
  const t = String(title || '').trim();
  if (!t) {
    return 'UR';
  }
  if (t.toLowerCase() === 'universal registration') {
    return 'UR';
  }
  const parts = t.split(/\s+/).filter(Boolean);
  if (parts.length >= 2) {
    return `${parts[0][0] ?? ''}${parts[1][0] ?? ''}`.toUpperCase();
  }
  return t.slice(0, 2).toUpperCase();
}

// =============================================================================
// Types
// =============================================================================

export interface SideNavSectionProps extends BaseProps<HTMLDivElement> {
  ref?: React.Ref<HTMLDivElement>;
  /**
   * Section title.
   */
  title: string;
  /**
   * Section subtitle.
   */
  subtitle?: string;
  /**
   * Header visual variant. Set to 'banner' for a solid colored header banner block.
   * @default 'default'
   */
  headerVariant?: 'default' | 'banner';
  /**
   * Section items.
   */
  children: ReactNode;
  /**
   * Right-side content in the section header.
   */
  endContent?: ReactNode;
  /**
   * Whether the section header is visually hidden.
   * The section title is still accessible to screen readers.
   * @default false
   */
  isHeaderHidden?: boolean;
}

// =============================================================================
// Component
// =============================================================================

/**
 * Section grouping for SideNav items.
 *
 * Renders a labeled group of navigation items.
 * Uses `role="group"` with `aria-labelledby` for accessibility.
 *
 * @example
 * ```
 * <SideNavSection title="Main">
 *   <SideNavItem label="Dashboard" icon={HomeIcon} isSelected />
 *   <SideNavItem label="Projects" icon={FolderIcon} />
 * </SideNavSection>
 * ```
 */
export function SideNavSection({
  ref,
  title,
  subtitle,
  headerVariant = 'default',
  children,
  endContent,
  isHeaderHidden = false,
  xstyle,
  className,
  style,
  'data-testid': testId,
  ...rest
}: SideNavSectionProps) {
  const {isCollapsed} = useSideNavCollapse();
  const id = useId();
  const titleId = `${id}-title`;

  const isBanner = headerVariant === 'banner';

  const headerContent = isBanner ? (
    <div
      id={titleId}
      {...stylex.props(
        styles.headerBanner,
        isCollapsed && styles.headerBannerCollapsed,
      )}
      title={title}>
      <span
        {...stylex.props(
          styles.bannerTitle,
          isCollapsed && styles.bannerTitleCollapsed,
        )}>
        {isCollapsed ? getCollapsedTitle(title) : title}
      </span>
    </div>
  ) : (
    <>
      <span {...stylex.props(styles.titleContainer)}>
        <span id={titleId} {...stylex.props(styles.title)}>
          {title}
        </span>
        {subtitle && <span {...stylex.props(styles.subtitle)}>{subtitle}</span>}
      </span>
      {endContent && (
        <span {...stylex.props(styles.endContent)}>{endContent}</span>
      )}
    </>
  );

  const shouldHideHeader = isHeaderHidden || (isCollapsed && !isBanner);

  return (
    <div
      ref={ref}
      {...mergeProps(
        themeProps('side-nav-section'),
        stylex.props(styles.root, xstyle),
        className,
        style,
      )}
      {...rest}
      role="group"
      aria-labelledby={titleId}
      data-testid={testId}>
      {shouldHideHeader ? (
        <VisuallyHidden as="div">{headerContent}</VisuallyHidden>
      ) : isBanner ? (
        headerContent
      ) : (
        <div {...stylex.props(styles.header)}>{headerContent}</div>
      )}
      <div {...stylex.props(styles.items)}>{children}</div>
    </div>
  );
}

SideNavSection.displayName = 'SideNavSection';
