// Copyright (c) Meta Platforms, Inc. and affiliates.

'use client';

/**
 * @file RegistrationStepper.tsx
 * @input Uses React, StyleX
 * @output Exports RegistrationStepper component and RegistrationStepperProps
 * @position A 4-step progress indicator (Instructions / Verify Email ID /
 *   Verify Mobile Number / Create Password) for a multi-step account
 *   creation flow — a grey base line with a blue progress fill, each step a
 *   circle (upcoming: outlined, current: filled with an eye glyph, done:
 *   filled with a checkmark) plus a numbered label below.
 *
 * SYNC: When modified, update these files to stay in sync:
 * - /packages/core/src/RegistrationStepper/RegistrationStepper.doc.mjs
 * - /packages/core/src/RegistrationStepper/index.ts
 */

import * as stylex from '@stylexjs/stylex';
import type {BaseProps} from '../BaseProps';
import {mergeProps} from '../utils';
import {themeProps} from '../utils/themeProps';

// =============================================================================
// Styles
// =============================================================================
//
// Self-contained plain elements reproducing a specific external reference's
// stepper (literal, non-token hex values and a percentage-based progress
// fill) — same reasoning as InfoDialog/ConfirmDialog: this is a one-off
// pixel-match, not a generic token-driven pattern.

const styles = stylex.create({
  root: {
    paddingBlock: 12,
    paddingInline: 16,
    marginBlockEnd: 24,
  },
  track: {
    position: 'relative',
  },
  baseLine: {
    position: 'absolute',
    insetInlineStart: '12%',
    insetInlineEnd: '12%',
    insetBlockStart: 14,
    height: 2,
    backgroundColor: '#cbd5e1',
  },
  progressLine: {
    position: 'absolute',
    insetBlockStart: 14,
    height: 2,
    backgroundColor: '#0b4fb3',
    transitionProperty: 'inset-inline-end',
    transitionDuration: '300ms',
  },
  row: {
    position: 'relative',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  stepCol: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  circle: {
    position: 'relative',
    zIndex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 28,
    height: 28,
    borderRadius: 9999,
  },
  circleCurrent: {
    backgroundColor: '#0b4fb3',
  },
  circleCompleted: {
    backgroundColor: '#4caf50',
  },
  circleUpcoming: {
    backgroundColor: '#ffffff',
    borderWidth: 6,
    borderStyle: 'solid',
    borderColor: '#0b4fb3',
  },
  label: {
    marginBlockStart: 8,
    textAlign: 'center',
    fontSize: 12,
    fontWeight: 600,
    lineHeight: 1.2,
    color: '#0b4fb3',
    '@media (min-width: 768px)': {
      fontSize: 14,
    },
  },
});

const STEPS = [
  {number: 1, label: 'Instructions'},
  {number: 2, label: 'Verify Email ID'},
  {number: 3, label: 'Verify Mobile Number'},
  {number: 4, label: 'Create Password'},
] as const;

function rightForStep(currentStep: number): string {
  if (currentStep <= 1) {
    return '88%';
  }
  if (currentStep === 2) {
    return '62.7%';
  }
  if (currentStep === 3) {
    return '37.3%';
  }
  return '12%';
}

export interface RegistrationStepperProps extends BaseProps<HTMLDivElement> {
  /** Ref forwarded to the root element */
  ref?: React.Ref<HTMLDivElement>;
  /** 1-based index of the active step (5 shows the track fully complete). */
  currentStep: number;
}

export function RegistrationStepper({
  currentStep,
  ref,
  xstyle,
  className,
  style,
  ...props
}: RegistrationStepperProps) {
  return (
    <div
      ref={ref}
      {...props}
      {...mergeProps(
        themeProps('registration-stepper'),
        stylex.props(styles.root, xstyle),
        className,
        style,
      )}>
      <div {...stylex.props(styles.track)}>
        <div {...stylex.props(styles.baseLine)} />
        <div
          {...stylex.props(styles.progressLine)}
          style={{
            insetInlineStart: '12%',
            insetInlineEnd: rightForStep(currentStep),
          }}
        />
        <div {...stylex.props(styles.row)}>
          {STEPS.map(step => {
            const isCurrent = currentStep === step.number;
            const isCompleted = currentStep > step.number;
            return (
              <div key={step.number} {...stylex.props(styles.stepCol)}>
                <div
                  {...stylex.props(
                    styles.circle,
                    isCurrent
                      ? styles.circleCurrent
                      : isCompleted
                        ? styles.circleCompleted
                        : styles.circleUpcoming,
                  )}>
                  {isCompleted ? (
                    <svg width="11" height="11" viewBox="0 0 16 16" fill="none">
                      <path
                        d="M2 8.5 6 12.5 14 3.5"
                        stroke="#ffffff"
                        strokeWidth={2.5}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  ) : isCurrent ? (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z"
                        stroke="#ffffff"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <circle
                        cx="12"
                        cy="12"
                        r="3"
                        stroke="#ffffff"
                        strokeWidth={2}
                      />
                    </svg>
                  ) : null}
                </div>
                <span {...stylex.props(styles.label)}>
                  {step.number}.{step.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

RegistrationStepper.displayName = 'RegistrationStepper';
