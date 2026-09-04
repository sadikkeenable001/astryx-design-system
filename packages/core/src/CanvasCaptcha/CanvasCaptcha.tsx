// Copyright (c) Meta Platforms, Inc. and affiliates.

'use client';

/**
 * @file CanvasCaptcha.tsx
 * @input Uses React, useRef, useEffect, TextInput, Button, stylex, useId
 * @output Exports CanvasCaptcha component, CanvasCaptchaProps
 * @position Core implementation for visual CAPTCHA rendering
 */

import {
  useRef,
  useState,
  useEffect,
  useCallback,
  useId,
  type ChangeEvent,
} from 'react';
import * as stylex from '@stylexjs/stylex';
import {colorVars, spacingVars, radiusVars} from '../theme/tokens.stylex';
import {Field, type FieldStatusInput} from '../Field';
import {TextInput} from '../TextInput';
import {IconButton} from '../IconButton';

const styles = stylex.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: spacingVars['--spacing-2'],
  },
  captchaRow: {
    display: 'flex',
    alignItems: 'center',
    gap: spacingVars['--spacing-3'],
    width: '100%',
  },
  canvasBox: {
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: colorVars['--color-border'],
    borderRadius: radiusVars['--radius-element'],
    backgroundColor: '#f1f5f9',
    flexShrink: 0,
  },
  inputWrapper: {
    flex: 1,
    minWidth: 0,
  },
});

export type CanvasCaptchaProps = {
  /** Length of generated captcha code (default 6) */
  codeLength?: number;
  /** Current user input string */
  value?: string;
  /** Callback fired when user input changes */
  onChange?: (value: string) => void;
  /** Callback fired when captcha validity status changes */
  onVerify?: (isValid: boolean) => void;
  /** Label for field */
  label?: string;
  /** Helper or validation text */
  helperText?: string;
  /** Status indicator */
  status?: FieldStatusInput;
  /** Canvas width in px (default 150) */
  canvasWidth?: number;
  /** Canvas height in px (default 40) */
  canvasHeight?: number;
};

export function CanvasCaptcha({
  codeLength = 6,
  value: propValue,
  onChange,
  onVerify,
  label = 'Security Captcha',
  helperText,
  status,
  canvasWidth = 150,
  canvasHeight = 40,
}: CanvasCaptchaProps) {
  const inputID = useId();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [captchaText, setCaptchaText] = useState('');
  const [internalValue, setInternalValue] = useState('');

  const currentValue = propValue !== undefined ? propValue : internalValue;

  const generateCaptchaText = useCallback(() => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let result = '';
    for (let i = 0; i < codeLength; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }, [codeLength]);

  const drawCaptcha = useCallback(
    (text: string) => {
      const canvas = canvasRef.current;
      if (!canvas) {return;}
      const ctx = canvas.getContext('2d');
      if (!ctx) {return;}

      ctx.clearRect(0, 0, canvasWidth, canvasHeight);

      ctx.fillStyle = '#f8fafc';
      ctx.fillRect(0, 0, canvasWidth, canvasHeight);

      for (let i = 0; i < 5; i++) {
        ctx.strokeStyle = `rgba(15, 79, 179, ${0.15 + Math.random() * 0.25})`;
        ctx.lineWidth = 1 + Math.random();
        ctx.beginPath();
        ctx.moveTo(Math.random() * canvasWidth, Math.random() * canvasHeight);
        ctx.lineTo(Math.random() * canvasWidth, Math.random() * canvasHeight);
        ctx.stroke();
      }

      ctx.font = 'bold 22px sans-serif';
      ctx.textBaseline = 'middle';

      const charWidth = (canvasWidth - 20) / text.length;

      for (let i = 0; i < text.length; i++) {
        const char = text[i];
        ctx.save();
        const x = 12 + i * charWidth;
        const y = canvasHeight / 2;

        ctx.translate(x, y);
        ctx.rotate((Math.random() - 0.5) * 0.35);

        ctx.fillStyle = i % 2 === 0 ? '#153c73' : '#0b5ed7';
        ctx.fillText(char, 0, 0);
        ctx.restore();
      }
    },
    [canvasWidth, canvasHeight],
  );

  const refreshCaptcha = useCallback(() => {
    const newText = generateCaptchaText();
    setCaptchaText(newText);
    drawCaptcha(newText);
    setInternalValue('');
    onChange?.('');
    onVerify?.(false);
  }, [generateCaptchaText, drawCaptcha, onChange, onVerify]);

  useEffect(() => {
    refreshCaptcha();
  }, []);

  const handleInputChange = (
    val: string,
    _e: ChangeEvent<HTMLInputElement>,
  ) => {
    const upperVal = val.slice(0, codeLength).toUpperCase();
    setInternalValue(upperVal);
    onChange?.(upperVal);
    const isValid = upperVal === captchaText;
    onVerify?.(isValid);
  };

  return (
    <Field
      label={label}
      inputID={inputID}
      description={helperText}
      status={status}>
      <div {...stylex.props(styles.container)}>
        <div {...stylex.props(styles.captchaRow)}>
          <canvas
            ref={canvasRef}
            width={canvasWidth}
            height={canvasHeight}
            {...stylex.props(styles.canvasBox)}
          />
          <IconButton
            icon={
              <svg
                className="h-5 w-5 text-[#195992]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
            }
            label="Refresh Captcha"
            size="md"
            variant="ghost"
            onClick={refreshCaptcha}
            type="button"
          />
          <div {...stylex.props(styles.inputWrapper)}>
            <TextInput
              id={inputID}
              label="Captcha Code"
              isLabelHidden
              value={currentValue}
              onChange={handleInputChange}
              placeholder="Enter captcha text"
            />
          </div>
        </div>
      </div>
    </Field>
  );
}
