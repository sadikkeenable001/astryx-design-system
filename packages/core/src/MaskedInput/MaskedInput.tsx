// Copyright (c) Meta Platforms, Inc. and affiliates.

'use client';

/**
 * @file MaskedInput.tsx
 * @input Uses React, TextInput, Field, stylex
 * @output Exports MaskedInput component, MaskedInputProps
 * @position Core implementation for pattern-masked input fields
 */

import {
  useState,
  useCallback,
  useEffect,
  type ChangeEvent,
} from 'react';
import {TextInput, type TextInputProps} from '../TextInput';

export type MaskedInputProps = Omit<TextInputProps, 'onChange' | 'value'> & {
  /**
   * Mask pattern format (e.g. '####-####-####' for 12 digits or 'a-####-a' for alphanumeric).
   * '#' = Digit (0-9)
   * 'a' = Letter (A-Z, a-z)
   * '*' = Alphanumeric
   */
  mask?: string;
  /** Mask placeholder character for empty slots (default '_') */
  maskChar?: string;
  /** Current raw unmasked or masked string value */
  value?: string;
  /** Callback fired when raw or masked value changes */
  onChange?: (value: string, rawValue: string) => void;
};

/**
 * Helper to apply mask pattern to raw input string.
 */
export function applyMask(
  raw: string,
  mask: string,
  maskChar: string = '_',
): {masked: string; unmasked: string} {
  if (!mask) return {masked: raw, unmasked: raw};

  let unmasked = '';
  let masked = '';
  let rawIdx = 0;

  // Clean raw input to keep only valid pattern characters
  const cleanRaw = raw.replace(/[^a-zA-Z0-9]/g, '');

  for (let i = 0; i < mask.length; i++) {
    const maskSymbol = mask[i];
    const isSlot = maskSymbol === '#' || maskSymbol === 'a' || maskSymbol === '*';

    if (isSlot) {
      if (rawIdx < cleanRaw.length) {
        const char = cleanRaw[rawIdx];
        let isValid = false;

        if (maskSymbol === '#' && /[0-9]/.test(char)) isValid = true;
        else if (maskSymbol === 'a' && /[a-zA-Z]/.test(char)) isValid = true;
        else if (maskSymbol === '*' && /[a-zA-Z0-9]/.test(char)) isValid = true;

        if (isValid) {
          unmasked += char;
          masked += char;
          rawIdx++;
        } else {
          rawIdx++;
          i--;
        }
      } else {
        masked += maskChar;
      }
    } else {
      masked += maskSymbol;
      if (rawIdx < cleanRaw.length && cleanRaw[rawIdx] === maskSymbol) {
        rawIdx++;
      }
    }
  }

  return {masked, unmasked};
}

export function MaskedInput({
  mask = '####-####-####',
  maskChar = '_',
  value = '',
  onChange,
  placeholder,
  ...restProps
}: MaskedInputProps) {
  const [internalValue, setInternalValue] = useState(() => {
    return applyMask(value, mask, maskChar).masked;
  });

  useEffect(() => {
    const {masked} = applyMask(value, mask, maskChar);
    setInternalValue(masked);
  }, [value, mask, maskChar]);

  const handleChange = useCallback(
    (_val: string, e: ChangeEvent<HTMLInputElement>) => {
      const inputVal = e.target.value;
      const {masked, unmasked} = applyMask(inputVal, mask, maskChar);
      setInternalValue(masked);
      onChange?.(masked, unmasked);
    },
    [mask, maskChar, onChange],
  );

  return (
    <TextInput
      {...restProps}
      value={internalValue}
      onChange={handleChange}
      placeholder={placeholder ?? mask.replace(/#/g, maskChar)}
    />
  );
}
