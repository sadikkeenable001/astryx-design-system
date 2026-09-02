// Copyright (c) Meta Platforms, Inc. and affiliates.

'use client';

/**
 * @file OtpInput.tsx
 * @input Uses React, Field, stylex, useId
 * @output Exports OtpInput component, OtpInputProps
 * @position Core implementation for multi-box OTP/PIN verification
 */

import {
  useRef,
  useId,
  useCallback,
  useEffect,
  type KeyboardEvent,
  type ClipboardEvent,
  type ChangeEvent,
} from 'react';
import * as stylex from '@stylexjs/stylex';
import {
  colorVars,
  spacingVars,
  radiusVars,
} from '../theme/tokens.stylex';
import {Field, type FieldStatusInput} from '../Field';

const styles = stylex.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: spacingVars['--spacing-2'],
  },
  boxRow: {
    display: 'flex',
    alignItems: 'center',
    gap: spacingVars['--spacing-2'],
  },
  otpBox: {
    width: '42px',
    height: '48px',
    textAlign: 'center',
    fontSize: '18px',
    fontWeight: '600',
    color: colorVars['--color-text-primary'],
    backgroundColor: 'transparent',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: colorVars['--color-border'],
    borderRadius: radiusVars['--radius-element'],
    outline: 'none',
    transitionProperty: 'border-color, box-shadow',
    transitionDuration: '150ms',
    ':focus': {
      borderColor: colorVars['--color-accent'],
    },
  },
  boxDisabled: {
    opacity: 0.5,
    cursor: 'not-allowed',
  },
  boxError: {
    borderColor: colorVars['--color-border-red'],
  },
});

export type OtpInputProps = {
  /** Number of OTP input digits (default 6) */
  length?: number;
  /** Current OTP value string */
  value?: string;
  /** Callback fired when OTP string changes */
  onChange?: (value: string) => void;
  /** Callback fired when all digits are completely entered */
  onComplete?: (value: string) => void;
  /** Auto-focus first input box on mount */
  autoFocus?: boolean;
  /** Disable all input boxes */
  isDisabled?: boolean;
  /** Field status indicator */
  status?: FieldStatusInput;
  /** Input mode: 'numeric' for numbers only, 'alphanumeric' for letters & numbers */
  type?: 'numeric' | 'alphanumeric';
  /** Optional Field Label */
  label?: string;
  /** Optional Helper text */
  helperText?: string;
};

export function OtpInput({
  length = 6,
  value = '',
  onChange,
  onComplete,
  autoFocus = false,
  isDisabled = false,
  status,
  type = 'numeric',
  label,
  helperText,
}: OtpInputProps) {
  const inputID = useId();
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  const digits = Array.from({length}, (_, i) => value[i] || '');

  const focusInput = (index: number) => {
    const target = inputsRef.current[index];
    if (target) {
      target.focus();
      target.select();
    }
  };

  useEffect(() => {
    if (autoFocus) {
      focusInput(0);
    }
  }, [autoFocus]);

  const handleChange = (index: number, e: ChangeEvent<HTMLInputElement>) => {
    const rawChar = e.target.value;
    if (!rawChar) return;

    const char = rawChar.slice(-1);
    const isValid =
      type === 'numeric' ? /[0-9]/.test(char) : /[a-zA-Z0-9]/.test(char);

    if (!isValid) return;

    const newDigits = [...digits];
    newDigits[index] = char;
    const newOtp = newDigits.join('');

    onChange?.(newOtp);

    if (newOtp.length === length) {
      onComplete?.(newOtp);
    } else if (index < length - 1) {
      focusInput(index + 1);
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace') {
      if (!digits[index] && index > 0) {
        focusInput(index - 1);
      } else {
        const newDigits = [...digits];
        newDigits[index] = '';
        const newOtp = newDigits.join('');
        onChange?.(newOtp);
      }
    } else if (e.key === 'ArrowLeft' && index > 0) {
      focusInput(index - 1);
    } else if (e.key === 'ArrowRight' && index < length - 1) {
      focusInput(index + 1);
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text/plain').trim();
    const regex = type === 'numeric' ? /^[0-9]+$/ : /^[a-zA-Z0-9]+$/;

    if (!regex.test(pastedData)) return;

    const sliced = pastedData.slice(0, length);
    onChange?.(sliced);

    if (sliced.length === length) {
      onComplete?.(sliced);
    } else {
      focusInput(sliced.length);
    }
  };

  const boxesNode = (
    <div {...stylex.props(styles.boxRow)}>
      {Array.from({length}).map((_, i) => (
        <input autoComplete="off"
          key={i}
          id={i === 0 ? inputID : undefined}
          ref={el => {
            inputsRef.current[i] = el;
          }}
          type={type === 'numeric' ? 'tel' : 'text'}
          inputMode={type === 'numeric' ? 'numeric' : 'text'}
          maxLength={1}
          value={digits[i]}
          disabled={isDisabled}
          onChange={e => handleChange(i, e)}
          onKeyDown={e => handleKeyDown(i, e)}
          onPaste={handlePaste}
          {...stylex.props(
            styles.otpBox,
            isDisabled && styles.boxDisabled,
            status?.type === 'error' && styles.boxError,
          )}
        />
      ))}
    </div>
  );

  if (label) {
    return (
      <Field label={label} inputID={inputID} description={helperText} status={status}>
        {boxesNode}
      </Field>
    );
  }

  return boxesNode;
}
