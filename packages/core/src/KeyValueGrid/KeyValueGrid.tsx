// Copyright (c) Meta Platforms, Inc. and affiliates.

'use client';

/**
 * @file KeyValueGrid.tsx
 * @input Uses React, Card, stylex
 * @output Exports KeyValueGrid component, DocPillButton, formatDateWithWords, KeyValueGridProps
 * @position Core implementation for multi-column key-value summary review displays
 */

import type {ReactNode} from 'react';
import * as stylex from '@stylexjs/stylex';
import {
  colorVars,
  spacingVars,
  radiusVars,
  textSizeVars,
  fontWeightVars,
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
    fontSize: textSizeVars['--font-size-lg'],
    fontWeight: fontWeightVars['--font-weight-semibold'],
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
    fontSize: textSizeVars['--font-size-sm'],
    fontWeight: fontWeightVars['--font-weight-medium'],
    color: colorVars['--color-text-secondary'],
  },
  value: {
    fontSize: textSizeVars['--font-size-base'],
    fontWeight: fontWeightVars['--font-weight-medium'],
    color: colorVars['--color-text-primary'],
  },

  // Table Shell Styles (variant="table")
  tableContainer: {
    position: 'relative',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: '#1b5fa7',
    backgroundColor: colorVars['--color-background-surface'],
    borderRadius: '4px',
    overflow: 'hidden',
    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.05)',
  },
  watermark: {
    position: 'absolute',
    top: '50%',
    // eslint-disable-next-line @astryx/no-physical-properties
    left: '50%',
    transform: 'translate(-50%, -50%)',
    opacity: 0.12,
    pointerEvents: 'none',
    maxHeight: '280px',
    maxWidth: '280px',
    objectFit: 'contain',
    zIndex: 0,
  },
  tableHeaderBanner: {
    backgroundColor: '#1b5fa7',
    color: '#ffffff',
    paddingInline: spacingVars['--spacing-3'],
    paddingBlock: '10px',
    fontWeight: fontWeightVars['--font-weight-bold'],
    fontSize: textSizeVars['--font-size-base'],
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: '1px',
    borderBottomStyle: 'solid',
    borderBottomColor: '#4da3ff',
    position: 'relative',
    zIndex: 1,
  },
  tableHeaderSimple: {
    paddingInline: spacingVars['--spacing-3'],
    paddingBlock: '10px',
    borderBottomWidth: '1px',
    borderBottomStyle: 'solid',
    borderBottomColor: '#4da3ff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'relative',
    zIndex: 1,
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    fontSize: textSizeVars['--font-size-base'],
    position: 'relative',
    zIndex: 1,
  },
  tableRow: {
    transitionProperty: 'background-color',
    transitionDuration: '150ms',
    ':hover:where(:not(:disabled,[aria-disabled="true"]))': {
      backgroundColor: '#eef5ff',
    },
  },
  tableRowSubHeader: {
    backgroundColor: '#1b5fa7',
    color: '#ffffff',
    textAlign: 'center',
    fontWeight: fontWeightVars['--font-weight-bold'],
    fontSize: textSizeVars['--font-size-base'],
  },
  tableRowColHeader: {
    backgroundColor: colorVars['--color-background-yellow'],
    fontWeight: fontWeightVars['--font-weight-bold'],
    fontSize: textSizeVars['--font-size-base'],
    color: colorVars['--color-text-primary'],
  },
  tableCell: {
    paddingInline: spacingVars['--spacing-3'],
    paddingBlock: '10px',
    fontSize: '13px',
    color: colorVars['--color-text-primary'],
    borderBottomWidth: '1px',
    borderBottomStyle: 'solid',
    borderBottomColor: '#4da3ff',
  },
  tableCellLabel: {
    fontWeight: fontWeightVars['--font-weight-medium'],
    borderInlineEndWidth: '1px',
    borderInlineEndStyle: 'solid',
    borderInlineEndColor: '#4da3ff',
  },
  tableCellValue: {
    fontWeight: fontWeightVars['--font-weight-semibold'],
  },
  tableCellBorderRight: {
    borderInlineEndWidth: '1px',
    borderInlineEndStyle: 'solid',
    borderInlineEndColor: '#4da3ff',
  },
  docPillButton: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: spacingVars['--spacing-1-5'],
    backgroundColor: colorVars['--color-background-blue'],
    color: colorVars['--color-text-blue'],
    fontSize: textSizeVars['--font-size-xs'],
    fontWeight: fontWeightVars['--font-weight-semibold'],
    paddingInline: spacingVars['--spacing-3'],
    paddingBlock: spacingVars['--spacing-1'],
    borderRadius: radiusVars['--radius-full'],
    borderWidth: '0px',
    cursor: {
      default: 'pointer',
      ':is(:disabled,[aria-disabled="true"])': 'default',
    },
    transitionProperty: 'background-color, opacity',
    transitionDuration: '150ms',
    ':hover:where(:not(:disabled,[aria-disabled="true"]))': {
      opacity: 0.85,
    },
  },
});

export type DocPillButtonProps = {
  fileName?: string;
  label?: string;
  onClick?: () => void;
};

/**
 * Reusable document preview pill button styled via StyleX tokens.
 */
export function DocPillButton({
  fileName,
  label = 'View Uploaded Document',
  onClick,
}: DocPillButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      {...stylex.props(styles.docPillButton)}>
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
      <span>{label || 'View Uploaded Document'}</span>
    </button>
  );
}

const ONES = [
  '',
  'ONE',
  'TWO',
  'THREE',
  'FOUR',
  'FIVE',
  'SIX',
  'SEVEN',
  'EIGHT',
  'NINE',
  'TEN',
  'ELEVEN',
  'TWELVE',
  'THIRTEEN',
  'FOURTEEN',
  'FIFTEEN',
  'SIXTEEN',
  'SEVENTEEN',
  'EIGHTEEN',
  'NINETEEN',
];
const TENS = [
  '',
  '',
  'TWENTY',
  'THIRTY',
  'FORTY',
  'FIFTY',
  'SIXTY',
  'SEVENTY',
  'EIGHTY',
  'NINETY',
];

function numToWords(n: number): string {
  if (n < 20) {
    return ONES[n] || '';
  }
  if (n < 100) {
    return (
      TENS[Math.floor(n / 10)] + (n % 10 ? ' ' + ONES[n % 10] : '')
    ).trim();
  }
  if (n < 1000) {
    return (
      ONES[Math.floor(n / 100)] +
      ' HUNDRED ' +
      numToWords(n % 100)
    ).trim();
  }
  if (n < 10000) {
    const thousand = Math.floor(n / 1000);
    const rest = n % 1000;
    return (
      numToWords(thousand) +
      ' THOUSAND ' +
      (rest ? numToWords(rest) : '')
    ).trim();
  }
  return String(n);
}

const MONTHS = [
  'JANUARY',
  'FEBRUARY',
  'MARCH',
  'APRIL',
  'MAY',
  'JUNE',
  'JULY',
  'AUGUST',
  'SEPTEMBER',
  'OCTOBER',
  'NOVEMBER',
  'DECEMBER',
];

/**
 * Formats a date string (DD/MM/YYYY or YYYY-MM-DD) with uppercase words in parentheses.
 * e.g., "15/08/1998" -> "15/08/1998\nIn words: (FIFTEENTH AUGUST ONE THOUSAND NINE HUNDRED NINETY EIGHT)"
 */
export function formatDateWithWords(dateStr: string): ReactNode {
  if (!dateStr) {
    return '-';
  }
  const clean = dateStr.trim();
  const parts = clean.split(/[-/.]/);
  if (parts.length !== 3) {
    return clean;
  }
  let day = parseInt(parts[0], 10);
  let month = parseInt(parts[1], 10);
  let year = parseInt(parts[2], 10);

  if (parts[0].length === 4) {
    year = parseInt(parts[0], 10);
    month = parseInt(parts[1], 10);
    day = parseInt(parts[2], 10);
  }

  if (isNaN(day) || isNaN(month) || isNaN(year) || month < 1 || month > 12) {
    return clean;
  }

  const dayWords = numToWords(day);
  const monthWords = MONTHS[month - 1] || '';
  const yearWords = numToWords(year);

  const formattedDate = `${String(day).padStart(2, '0')}/${String(month).padStart(2, '0')}/${year}`;
  const words = `${dayWords} ${monthWords} ${yearWords}`;

  return (
    <div style={{lineHeight: 1.25}}>
      <div>{formattedDate}</div>
      <div
        style={{
          fontSize: '11px',
          marginTop: '2px',
          fontWeight: 400,
          color: 'inherit',
        }}>
        In words: ({words})
      </div>
    </div>
  );
}

export type KeyValueItem = {
  /** Primary field label */
  label: string;
  /** Primary field value (Column 2) */
  value?: ReactNode;
  /** Secondary field value for 3-column comparisons (Column 3) */
  v2?: ReactNode;
  /** Grid column span for 'card' and 'plain' variants */
  colSpan?: number;
  /** Row discriminator: 'data' (default) | 'subheader' | 'colHeader' | 'fullText' */
  type?: 'data' | 'subheader' | 'colHeader' | 'fullText';
  /** Headers for column header rows (e.g. ["Name", "Name on 10th Cert"]) */
  colHeaderLabels?: [string, string] | [string, string, string];
  /** Document preview properties */
  docPreview?: {
    fileName?: string;
    label?: string;
    onView?: () => void;
  };
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
  /** Container variant: 'card' (default) | 'plain' | 'table' */
  variant?: 'card' | 'plain' | 'table';
  /** Optional background watermark image URL for table variant */
  watermarkSrc?: string;
  /** Table header variant: 'banner' (solid dark blue) | 'simple' | 'none' */
  headerVariant?: 'banner' | 'simple' | 'none';
};

export function KeyValueGrid({
  title,
  items,
  columns = 2,
  actionSlot,
  variant = 'card',
  watermarkSrc,
  headerVariant = 'banner',
}: KeyValueGridProps) {
  if (variant === 'table') {
    const hasThreeCols = items.some(
      it =>
        it.v2 !== undefined ||
        (it.colHeaderLabels && it.colHeaderLabels.length === 3),
    );

    const totalCols = hasThreeCols ? 3 : 2;

    return (
      <div {...stylex.props(styles.tableContainer)}>
        {watermarkSrc && (
          <img src={watermarkSrc} alt="" {...stylex.props(styles.watermark)} />
        )}

        {/* Header Title Banner (flush 100% full width at top of tableContainer) */}
        {title && headerVariant !== 'none' && (
          <div
            style={{
              backgroundColor:
                headerVariant === 'banner' ? '#1b5fa7' : 'transparent',
              color:
                headerVariant === 'banner'
                  ? '#ffffff'
                  : colorVars['--color-text-primary'],
              padding: '10px 12px',
              textAlign: 'center',
              fontWeight: 'bold',
              fontSize: '14px',
              borderBottom: '1px solid #4da3ff',
              width: '100%',
              boxSizing: 'border-box',
              display: 'flex',
              alignItems: 'center',
              justifyContent: actionSlot ? 'space-between' : 'center',
              position: 'relative',
              zIndex: 2,
            }}>
            <span>{title}</span>
            {actionSlot && <div>{actionSlot}</div>}
          </div>
        )}

        <table
          {...stylex.props(styles.table)}
          style={{
            width: '100%',
            tableLayout: 'fixed',
            borderCollapse: 'collapse',
          }}>
          <colgroup>
            {hasThreeCols ? (
              <>
                <col style={{width: '12%'}} />
                <col style={{width: '36%'}} />
                <col style={{width: '52%'}} />
              </>
            ) : (
              <>
                <col style={{width: '46%'}} />
                <col style={{width: '54%'}} />
              </>
            )}
          </colgroup>
          <tbody>
            {items.map((item, index) => {
              // eslint-disable-next-line @astryx/no-react-introspection
              const itemType = item.type || 'data';

              if (itemType === 'subheader') {
                return (
                  <tr
                    key={index}
                    {...stylex.props(styles.tableRowSubHeader)}
                    style={{borderBottom: '1px solid #4da3ff'}}>
                    <td
                      colSpan={totalCols}
                      {...stylex.props(
                        styles.tableCell,
                        styles.tableRowSubHeader,
                      )}
                      style={{
                        padding: '10px 12px',
                        backgroundColor: '#1b5fa7',
                        color: '#ffffff',
                        textAlign: 'center',
                        fontWeight: 'bold',
                        fontSize: '14px',
                        borderBottom: '1px solid #4da3ff',
                      }}>
                      {item.label}
                    </td>
                  </tr>
                );
              }

              if (itemType === 'colHeader') {
                const labels = item.colHeaderLabels || [];
                const col1 = labels[0] || item.label || 'Name';
                const col2 = labels[1] || '';
                const col3 = labels[2] || '';

                if (hasThreeCols || labels.length === 3) {
                  return (
                    <tr
                      key={index}
                      {...stylex.props(styles.tableRowColHeader)}
                      style={{borderBottom: '1px solid #4da3ff'}}>
                      <td
                        {...stylex.props(
                          styles.tableCell,
                          styles.tableRowColHeader,
                          styles.tableCellBorderRight,
                        )}
                        style={{
                          width: '12%',
                          borderRight: '1px solid #4da3ff',
                          borderBottom: '1px solid #4da3ff',
                          padding: '10px 8px',
                        }}>
                        {col1}
                      </td>
                      <td
                        {...stylex.props(
                          styles.tableCell,
                          styles.tableRowColHeader,
                          styles.tableCellBorderRight,
                        )}
                        style={{
                          width: '36%',
                          borderRight: '1px solid #4da3ff',
                          borderBottom: '1px solid #4da3ff',
                          padding: '10px 8px',
                          textAlign: 'center',
                        }}>
                        {col2}
                      </td>
                      <td
                        {...stylex.props(
                          styles.tableCell,
                          styles.tableRowColHeader,
                        )}
                        style={{
                          width: '52%',
                          borderBottom: '1px solid #4da3ff',
                          padding: '10px 8px',
                          textAlign: 'center',
                        }}>
                        {col3}
                      </td>
                    </tr>
                  );
                }

                return (
                  <tr
                    key={index}
                    {...stylex.props(styles.tableRowColHeader)}
                    style={{borderBottom: '1px solid #4da3ff'}}>
                    <td
                      {...stylex.props(
                        styles.tableCell,
                        styles.tableRowColHeader,
                        styles.tableCellBorderRight,
                      )}
                      style={{
                        width: '46%',
                        borderRight: '1px solid #4da3ff',
                        borderBottom: '1px solid #4da3ff',
                        padding: '10px 12px',
                      }}>
                      {col1}
                    </td>
                    <td
                      {...stylex.props(
                        styles.tableCell,
                        styles.tableRowColHeader,
                      )}
                      style={{
                        width: '54%',
                        borderBottom: '1px solid #4da3ff',
                        padding: '10px 12px',
                        textAlign: 'center',
                      }}>
                      {col2}
                    </td>
                  </tr>
                );
              }

              if (itemType === 'fullText') {
                return (
                  <tr
                    key={index}
                    {...stylex.props(styles.tableRow)}
                    style={{borderBottom: '1px solid #4da3ff'}}>
                    <td
                      colSpan={totalCols}
                      {...stylex.props(styles.tableCell)}
                      style={{
                        padding: '10px 12px',
                        borderBottom: '1px solid #4da3ff',
                        color: colorVars['--color-error'],
                        fontWeight: fontWeightVars['--font-weight-semibold'],
                        textAlign: 'left',
                      }}>
                      {item.label}
                    </td>
                  </tr>
                );
              }

              // Standard Data Row
              const renderValue = async (
                val: ReactNode,
                docPreview?: KeyValueItem['docPreview'],
              ) => {
                if (docPreview) {
                  return (
                    <DocPillButton
                      fileName={docPreview.fileName}
                      label={docPreview.label}
                      onClick={docPreview.onView}
                    />
                  );
                }
                if (val !== null && val !== undefined && val !== '') {
                  return val;
                }
                return '-';
              };

              // 3-column table item
              if (hasThreeCols) {
                // If item has a v2 property explicitly defined (3-column comparison row)
                if (item.v2 !== undefined) {
                  return (
                    <tr
                      key={index}
                      {...stylex.props(styles.tableRow)}
                      style={{borderBottom: '1px solid #4da3ff'}}>
                      <td
                        {...stylex.props(
                          styles.tableCell,
                          styles.tableCellLabel,
                        )}
                        style={{
                          width: '12%',
                          borderRight: '1px solid #4da3ff',
                          borderBottom: '1px solid #4da3ff',
                          padding: '10px 12px',
                        }}>
                        {item.label}
                      </td>
                      <td
                        {...stylex.props(
                          styles.tableCell,
                          styles.tableCellValue,
                          styles.tableCellBorderRight,
                        )}
                        style={{
                          width: '36%',
                          borderRight: '1px solid #4da3ff',
                          borderBottom: '1px solid #4da3ff',
                          padding: '10px 12px',
                        }}>
                        {renderValue(item.value, item.docPreview)}
                      </td>
                      <td
                        {...stylex.props(
                          styles.tableCell,
                          styles.tableCellValue,
                        )}
                        style={{
                          width: '52%',
                          borderBottom: '1px solid #4da3ff',
                          padding: '10px 12px',
                        }}>
                        {renderValue(item.v2)}
                      </td>
                    </tr>
                  );
                }

                // If item is a 2-column row inside a 3-column table (colSpan 3 spanning 46% / 54%)
                return (
                  <tr
                    key={index}
                    {...stylex.props(styles.tableRow)}
                    style={{borderBottom: '1px solid #4da3ff'}}>
                    <td
                      colSpan={3}
                      style={{padding: 0, borderBottom: '1px solid #4da3ff'}}>
                      <div style={{display: 'flex', width: '100%'}}>
                        <div
                          {...stylex.props(
                            styles.tableCell,
                            styles.tableCellLabel,
                          )}
                          style={{
                            width: '46%',
                            borderRight: '1px solid #4da3ff',
                            padding: '10px 12px',
                            boxSizing: 'border-box',
                          }}>
                          {item.label}
                        </div>
                        <div
                          {...stylex.props(
                            styles.tableCell,
                            styles.tableCellValue,
                          )}
                          style={{
                            width: '54%',
                            padding: '10px 12px',
                            boxSizing: 'border-box',
                          }}>
                          {renderValue(item.value, item.docPreview)}
                        </div>
                      </div>
                    </td>
                  </tr>
                );
              }

              // Standard 2-column table row
              return (
                <tr
                  key={index}
                  {...stylex.props(styles.tableRow)}
                  style={{borderBottom: '1px solid #4da3ff'}}>
                  <td
                    {...stylex.props(styles.tableCell, styles.tableCellLabel)}
                    style={{
                      width: '46%',
                      borderRight: '1px solid #4da3ff',
                      borderBottom: '1px solid #4da3ff',
                      padding: '10px 12px',
                    }}>
                    {item.label}
                  </td>
                  <td
                    {...stylex.props(styles.tableCell, styles.tableCellValue)}
                    style={{
                      width: '54%',
                      borderBottom: '1px solid #4da3ff',
                      padding: '10px 12px',
                    }}>
                    {renderValue(item.value, item.docPreview)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }

  // Card or Plain Grid Variant
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
            style={
              item.colSpan ? {gridColumn: `span ${item.colSpan}`} : undefined
            }>
            <span {...stylex.props(styles.label)}>{item.label}</span>
            <div {...stylex.props(styles.value)}>
              {item.docPreview ? (
                <DocPillButton
                  fileName={item.docPreview.fileName}
                  label={item.docPreview.label}
                  onClick={item.docPreview.onView}
                />
              ) : item.value !== null &&
                item.value !== undefined &&
                item.value !== '' ? (
                item.value
              ) : (
                '-'
              )}
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
