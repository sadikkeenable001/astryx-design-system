// Copyright (c) Meta Platforms, Inc. and affiliates.

'use client';

/**
 * @file ConfirmDialog.tsx
 * @input Uses React, StyleX, Dialog
 * @output Exports ConfirmDialog component and ConfirmDialogProps
 * @position A centered icon + title + message confirm/cancel popup — a
 *   colored circle glyph above bold centered text, with two solid buttons
 *
 * SYNC: When modified, update these files to stay in sync:
 * - /packages/core/src/ConfirmDialog/ConfirmDialog.doc.mjs
 * - /packages/core/src/ConfirmDialog/index.ts
 */

import * as stylex from '@stylexjs/stylex';
import type {BaseProps} from '../BaseProps';
import {Dialog} from '../Dialog/Dialog';
import {mergeProps} from '../utils';
import {themeProps} from '../utils/themeProps';

// =============================================================================
// Styles
// =============================================================================
//
// Self-contained plain elements reproducing a specific external reference's
// popup (a SweetAlert2 dialog styled with literal, non-token hex values) —
// same reasoning as InfoDialog/DashboardCards: composing the design system's
// own Layout/Heading/Text/Button would fight those components' own opinions
// on spacing/color/radius instead of matching the reference pixel-for-pixel.

const styles = stylex.create({
  popup: {
    borderRadius: 18,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'rgba(70, 122, 190, 0.12)',
    boxShadow: '0 22px 60px rgba(12, 35, 78, 0.22)',
    fontFamily: '"Segoe UI", Arial, Roboto, sans-serif',
    paddingBlockStart: 32,
    paddingInlineEnd: 34,
    paddingBlockEnd: 26,
    paddingInlineStart: 34,
  },
  body: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    gap: 14,
  },
  iconWrap: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 92,
    height: 92,
    borderRadius: 999,
    borderWidth: 4,
    borderStyle: 'solid',
    backgroundColor: '#ffffff',
    fontSize: 58,
    fontWeight: 600,
    lineHeight: 1,
  },
  content: {
    maxWidth: 440,
  },
  title: {
    marginBlockStart: 0,
    marginBlockEnd: 8,
    marginInlineStart: 0,
    marginInlineEnd: 0,
    fontSize: 18,
    fontWeight: 700,
    color: '#2b2b2b',
    lineHeight: 1.2,
  },
  message: {
    marginBlockStart: 0,
    marginBlockEnd: 0,
    marginInlineStart: 0,
    marginInlineEnd: 0,
    fontSize: 20,
    fontWeight: 700,
    color: '#111111',
    lineHeight: 1.45,
  },
  actions: {
    display: 'flex',
    justifyContent: 'center',
    gap: 16,
    marginBlockStart: 22,
  },
  button: {
    minWidth: 116,
    borderWidth: 0,
    borderStyle: 'none',
    borderRadius: 6,
    paddingBlock: 12,
    paddingInline: 22,
    fontSize: 15,
    fontWeight: 700,
    color: '#ffffff',
    cursor: {default: 'pointer', ':is(:disabled,[aria-disabled="true"])': 'default'},
  },
  primaryButton: {
    backgroundColor: '#2263ae',
    ':hover:where(:not(:disabled,[aria-disabled="true"]))': {backgroundColor: '#1a5494'},
  },
  secondaryButton: {
    backgroundColor: '#e53935',
    ':hover:where(:not(:disabled,[aria-disabled="true"]))': {backgroundColor: '#c92d29'},
  },
});

/** Icon variants — same set as the reference `showConfirm` helper. */
export type ConfirmDialogIcon =
  'warning' | 'error' | 'success' | 'info' | 'question';

const ICON_COLORS: Record<ConfirmDialogIcon, string> = {
  warning: '#8fd3f4',
  info: '#8fd3f4',
  error: '#f2b8b5',
  success: '#cdeac0',
  question: '#b9d3e3',
};

const ICON_GLYPH_COLORS: Record<ConfirmDialogIcon, string> = {
  warning: '#4aa3d8',
  info: '#4aa3d8',
  error: '#d9534f',
  success: '#50a050',
  question: '#5d92b9',
};

const ICON_GLYPHS: Partial<Record<ConfirmDialogIcon, string>> = {
  error: '!',
  success: '✓',
  question: '?',
};

function iconGlyph(icon: ConfirmDialogIcon): string {
  return ICON_GLYPHS[icon] ?? 'i';
}

// =============================================================================
// Props
// =============================================================================

export interface ConfirmDialogProps extends BaseProps<HTMLDialogElement> {
  /** Ref forwarded to the root element */
  ref?: React.Ref<HTMLDialogElement>;
  /** Whether the dialog is open. */
  isOpen: boolean;
  /** Small heading above the message (e.g. "Warning"). */
  title: string;
  /** The main question/consequence text (e.g. "Please login to see this feature."). */
  message: string;
  /** Colored icon circle above the title. */
  icon?: ConfirmDialogIcon;
  /** Confirm button label. */
  confirmLabel: string;
  /** Cancel button label. */
  cancelLabel: string;
  /** Called when the confirm button is clicked. Does NOT auto-close. */
  onConfirm: () => unknown;
  /** Called when the cancel button is clicked. Does NOT auto-close. */
  onCancel: () => unknown;
  /** Dialog width. */
  width?: number | string;
}

// =============================================================================
// ConfirmDialog
// =============================================================================

/**
 * A centered icon + title + message confirm/cancel popup, pixel-matching a
 * reference SweetAlert2 `showConfirm` dialog: a colored circle glyph above
 * bold centered text, with a solid confirm button (blue) and a solid cancel
 * button (red), in that left-to-right order. Not dismissible via Escape or a
 * backdrop click — only the two buttons close it, matching the reference's
 * `allowOutsideClick: false, allowEscapeKey: false`.
 *
 * @example
 * ```
 * <ConfirmDialog
 *   isOpen={isOpen}
 *   title="Warning"
 *   message="Please login to see this feature."
 *   icon="info"
 *   confirmLabel="Proceed to login"
 *   cancelLabel="CANCEL"
 *   onConfirm={() => { window.location.href = href; }}
 *   onCancel={() => setIsOpen(false)}
 * />
 * ```
 */
export function ConfirmDialog({
  isOpen,
  title,
  message,
  icon,
  confirmLabel,
  cancelLabel,
  onConfirm,
  onCancel,
  width = 560,
  ref,
  xstyle,
  className,
  style,
  ...props
}: ConfirmDialogProps) {
  return (
    <Dialog
      ref={ref}
      isOpen={isOpen}
      onOpenChange={() => {}}
      purpose="required"
      width={width}
      padding={0}
      aria-label={title}
      {...props}
      {...mergeProps(
        themeProps('confirm-dialog'),
        stylex.props(styles.popup, xstyle),
        className,
        style,
      )}>
      <div {...stylex.props(styles.body)}>
        {icon && (
          <div {...stylex.props(styles.iconWrap)}>
            <div
              {...stylex.props(styles.icon)}
              style={{
                borderColor: ICON_COLORS[icon],
                color: ICON_GLYPH_COLORS[icon],
              }}>
              {iconGlyph(icon)}
            </div>
          </div>
        )}
        <div {...stylex.props(styles.content)}>
          <p {...stylex.props(styles.title)}>{title}</p>
          <p {...stylex.props(styles.message)}>{message}</p>
        </div>
        <div {...stylex.props(styles.actions)}>
          <button
            type="button"
            onClick={onConfirm}
            {...stylex.props(styles.button, styles.primaryButton)}>
            {confirmLabel}
          </button>
          <button
            type="button"
            onClick={onCancel}
            data-autofocus
            {...stylex.props(styles.button, styles.secondaryButton)}>
            {cancelLabel}
          </button>
        </div>
      </div>
    </Dialog>
  );
}

ConfirmDialog.displayName = 'ConfirmDialog';
