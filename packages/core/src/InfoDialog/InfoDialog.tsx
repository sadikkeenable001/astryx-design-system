// Copyright (c) Meta Platforms, Inc. and affiliates.

'use client';

/**
 * @file InfoDialog.tsx
 * @input Uses React, StyleX, Dialog
 * @output Exports InfoDialog component and InfoDialogProps
 * @position A read-only info popup: a colored header bar with a title and
 *   close button, and a plain-text body below
 *
 * SYNC: When modified, update these files to stay in sync:
 * - /packages/core/src/InfoDialog/InfoDialog.doc.mjs
 * - /packages/core/src/InfoDialog/index.ts
 */

import type {ReactNode} from 'react';
import * as stylex from '@stylexjs/stylex';
import type {BaseProps} from '../BaseProps';
import {Dialog} from '../Dialog/Dialog';
import {mergeProps} from '../utils';
import {themeProps} from '../utils/themeProps';

// =============================================================================
// Styles
// =============================================================================
//
// Self-contained plain elements, same reasoning as DashboardCards: this
// reproduces a specific external reference's header/body look (a colored
// bar with title + close button, white body below) rather than composing
// DialogHeader/LayoutContent, so the colors and spacing below are literal.

const styles = stylex.create({
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 16,
    paddingBlock: 16,
    paddingInline: 24,
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 700,
  },
  closeButton: {
    borderWidth: 0,
    borderStyle: 'none',
    backgroundColor: 'transparent',
    padding: 4,
    color: 'inherit',
    cursor: {default: 'pointer', ':is(:disabled,[aria-disabled="true"])': 'default'},
    display: 'inline-flex',
    flexShrink: 0,
  },
  body: {
    backgroundColor: '#ffffff',
    color: '#000000',
    paddingBlock: 24,
    paddingInline: 24,
    fontSize: 16,
    lineHeight: 1.6,
  },
});

// =============================================================================
// Props
// =============================================================================

export interface InfoDialogProps extends BaseProps<HTMLDialogElement> {
  /** Ref forwarded to the root element */
  ref?: React.Ref<HTMLDialogElement>;
  /** Whether the dialog is open. */
  open: boolean;
  /** Called when the dialog requests to close (X button, Escape, or backdrop click). */
  onClose: () => void;
  /** Header bar title. */
  title: string;
  /** Header bar background color. */
  headerColor?: string;
  /** Dialog width. */
  width?: number | string;
  /** Body content. */
  children: ReactNode;
}

// =============================================================================
// InfoDialog
// =============================================================================

/**
 * A read-only info popup — a colored header bar (title + close button) and
 * a white body below. For contact info, help text, terms — anything the
 * visitor just reads and dismisses, not a form or confirm/cancel action
 * (use AlertDialog for that).
 *
 * @example
 * ```
 * const [isOpen, setIsOpen] = useState(false);
 * <InfoDialog open={isOpen} onClose={() => setIsOpen(false)} title="Email - Id">
 *   <p>Email-Id: <strong>helpdesk@example.gov</strong></p>
 * </InfoDialog>
 * ```
 */
export function InfoDialog({
  open,
  onClose,
  title,
  headerColor = '#195893',
  width = 500,
  children,
  ref,
  xstyle,
  className,
  style,
  ...props
}: InfoDialogProps) {
  return (
    <Dialog
      ref={ref}
      isOpen={open}
      onOpenChange={isOpen => {
        if (!isOpen) {onClose();}
      }}
      width={width}
      padding={0}
      aria-label={title}
      {...props}
      {...mergeProps(
        themeProps('info-dialog'),
        stylex.props(xstyle),
        className,
        style,
      )}>
      <div
        {...stylex.props(styles.header)}
        style={{backgroundColor: headerColor}}>
        <span>{title}</span>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          {...stylex.props(styles.closeButton)}>
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}>
            <path
              d="M18 6 6 18M6 6l12 12"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
      <div {...stylex.props(styles.body)}>{children}</div>
    </Dialog>
  );
}

InfoDialog.displayName = 'InfoDialog';
