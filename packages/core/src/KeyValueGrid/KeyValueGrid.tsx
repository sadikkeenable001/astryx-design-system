// Copyright (c) Meta Platforms, Inc. and affiliates.

'use client';

/**
 * @file KeyValueGrid.tsx
 * @input Uses React, Card, stylex
 * @output Exports KeyValueGrid component, KeyValueGridProps
 * @position Core implementation for multi-column key-value summary review displays
 */

import type {ReactNode} from 'react';
import * as stylex from '@stylexjs/stylex';
import {
  colorVars,
  spacingVars,
} from '../theme/tokens.stylex';
import {Card} from '../Card';

const styles = stylex.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: spacingVars['--spacing-4'],
  },
  headerRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: '1px',
    borderBottomStyle: 'solid',
    borderBottomColor: colorVars['--color-border'],
    paddingBottom: spacingVars['--spacing-3'],
  },
  title: {
    fontSize: '18px',
    fontWeight: '600',
    color: colorVars['--color-text-primary'],
  },
  grid: {
    display: 'grid',
    gap: spacingVars['--spacing-4'],
  },
  gridCols1: {
    gridTemplateColumns: 'repeat(1, 1fr)',
  },
  gridCols2: {
    gridTemplateColumns: 'repeat(1, 1fr)',
    '@media (min-width: 640px)': {
      gridTemplateColumns: 'repeat(2, 1fr)',
    },
  },
  gridCols3: {
    gridTemplateColumns: 'repeat(1, 1fr)',
    '@media (min-width: 768px)': {
      gridTemplateColumns: 'repeat(3, 1fr)',
    },
  },
  gridCols4: {
    gridTemplateColumns: 'repeat(1, 1fr)',
    '@media (min-width: 1024px)': {
      gridTemplateColumns: 'repeat(4, 1fr)',
    },
  },
  itemBox: {
    display: 'flex',
    flexDirection: 'column',
    gap: spacingVars['--spacing-1'],
  },
  label: {
    fontSize: '12px',
    fontWeight: '500',
    color: colorVars['--color-text-secondary'],
  },
  value: {
    fontSize: '14px',
    fontWeight: '500',
    color: colorVars['--color-text-primary'],
  },
});

export type KeyValueItem = {
  label: string;
  value: ReactNode;
  colSpan?: number;
};

export type KeyValueGridProps = {
  /** Section title header */
  title?: string;
  /** Array of key-value items */
  items: KeyValueItem[];
  /** Grid column layout count (default 2) */
  columns?: 1 | 2 | 3 | 4;
  /** Action slot (e.g. "Edit Section" button) */
  actionSlot?: ReactNode;
  /** Card or Plain container variant */
  variant?: 'card' | 'plain';
};

export function KeyValueGrid({
  title,
  items,
  columns = 2,
  actionSlot,
  variant = 'card',
}: KeyValueGridProps) {
  const gridColStyle =
    columns === 1
      ? styles.gridCols1
      : columns === 3
      ? styles.gridCols3
      : columns === 4
      ? styles.gridCols4
      : styles.gridCols2;

  const content = (
    <div {...stylex.props(styles.container)}>
      {(title || actionSlot) && (
        <div {...stylex.props(styles.headerRow)}>
          {title && <span {...stylex.props(styles.title)}>{title}</span>}
          {actionSlot && <div>{actionSlot}</div>}
        </div>
      )}

      <div {...stylex.props(styles.grid, gridColStyle)}>
        {items.map((item, index) => (
          <div
            key={index}
            {...stylex.props(styles.itemBox)}
            style={item.colSpan ? {gridColumn: `span ${item.colSpan}`} : undefined}
          >
            <span {...stylex.props(styles.label)}>{item.label}</span>
            <div {...stylex.props(styles.value)}>
              {item.value !== null && item.value !== undefined && item.value !== ''
                ? item.value
                : '-'}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  if (variant === 'plain') {
    return content;
  }

  return <Card>{content}</Card>;
}
