// Copyright (c) Meta Platforms, Inc. and affiliates.

'use client';

/**
 * @file DateInput.tsx
 * @input Uses React, useId, useState, useCallback, useRef, Field, Icon, Calendar, usePopover, InputGroupContext
 * @output Exports DateInput component, DateInputProps
 * @position Core implementation; consumed by index.ts, tested by DateInput.test.tsx
 */

import {
  useId,
  useState,
  useCallback,
  useRef,
  useOptimistic,
  useTransition,
  useLayoutEffect,
} from 'react';
import * as stylex from '@stylexjs/stylex';
import {
  colorVars,
  sizeVars,
  radiusVars,
  typographyVars,
  typeScaleVars,
} from '../theme/tokens.stylex';
import {
  Field,
  InputClearButton,
  type InputStatus,
  inputWrapperStyles,
  inputStatusBorderStyles,
  inputStatusHoverShadowStyles,
  inputStatusFocusWithinStyles,
  type FieldStatusVariant,
} from '../Field';
import {Icon} from '../Icon';
import {VisuallyHidden} from '../VisuallyHidden';
import {useInputGroup} from '../InputGroup/InputGroupContext';
import {groupStyles} from '../InputGroup/groupStyles';
import {useSize} from '../SizeContext/SizeContext';
import {Spinner} from '../Spinner';
import {
  Calendar,
  type ISODateString,
  type CalendarHandle,
  type DayOfWeek,
  type DayOfWeekName,
} from '../Calendar';
import {useCalendarConstraints} from '../Calendar/hooks';
import {useInputStatusIcon} from '../hooks/useInputStatusIcon';
import {useMediaQuery} from '../hooks/useMediaQuery';
import {useResolvedRequired} from '../hooks/useResolvedRequired';
import {usePopover} from '../Popover';
import {NativeDateField} from './NativeDateField';
import {TouchDateField} from './TouchDateField';
import {useTooltip} from '../Tooltip';
import {getInputARIA, isImeKeyEvent, parseDateInput} from '../utils';
import {
  plainDateFromISO,
  plainDateToISO,
  formatSharedDate,
} from '../utils/plainDate';
import type {TimestampFormat} from '../Timestamp';
import {mergeProps, isFocusDetached} from '../utils';
import type {BaseProps} from '../BaseProps';
import type {SizeValue} from '../utils/types';
import {themeProps} from '../utils/themeProps';
import {focusOutlineStyles} from '../utils/focusOutline.stylex';
import {stableClassName} from '../naming';
import {useLocale, useTranslator} from '../i18n';
import {useMergedRefs} from '../hooks/useMergedRefs';

const styles = stylex.create({
  iconButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
    margin: 0,
    borderWidth: 0,
    borderStyle: 'none',
    backgroundColor: 'transparent',
    cursor: {
      default: 'pointer',
      ':is(:disabled,[aria-disabled="true"])': 'default',
    },
    borderRadius: radiusVars['--radius-element'],
  },
  iconButtonDisabled: {
    cursor: 'default',
  },
  input: {
    display: 'block',
    flex: 1,
    minWidth: 0,
    borderWidth: 0,
    borderStyle: 'none',
    padding: 0,
    fontFamily: typographyVars['--font-family-body'],
    fontSize: {
      default: typeScaleVars['--text-body-size'],
      '@media (pointer: coarse)': `max(1rem, ${typeScaleVars['--text-body-size']})`,
    },
    lineHeight: typeScaleVars['--text-body-leading'],
    color: colorVars['--color-text-primary'],
    backgroundColor: 'transparent',
    outline: 'none',
    '::placeholder': {
      color: colorVars['--color-text-secondary'],
    },
  },
  inputDisabled: {
    cursor: 'default',
  },
  inputInvalid: {
    color: colorVars['--color-text-secondary'],
  },
});

const sizeStyles = stylex.create({
  sm: {
    height: sizeVars['--size-element-sm'],
    minWidth: 180,
  },
  md: {
    height: sizeVars['--size-element-md'],
    minWidth: 180,
  },
  lg: {
    height: sizeVars['--size-element-lg'],
    minWidth: 180,
  },
});

export type DateInputSize = keyof typeof sizeStyles;
export type DateInputNativePicker = 'touch' | 'always' | 'never';
export type DateInputFormat =
  | Extract<
      TimestampFormat,
      'date' | 'date_long' | 'date_weekday' | 'system_date'
    >
  | 'DD/MM/YYYY'
  | 'MM/DD/YYYY'
  | 'YYYY-MM-DD'
  | 'raw';

export type {
  InputStatus as DateInputStatus,
  InputStatusType as DateInputStatusType,
} from '../Field';

export interface DateInputProps extends Omit<BaseProps, 'onChange' | 'defaultValue'> {
  ref?: React.Ref<HTMLInputElement>;
  label: string;
  isLabelHidden?: boolean;
  description?: string;
  isOptional?: boolean;
  isRequired?: boolean;
  isDisabled?: boolean;
  disabledMessage?: string;
  value?: ISODateString;
  onChange?: (value: ISODateString | undefined) => void;
  changeAction?: (value: ISODateString | undefined) => void | Promise<void>;
  isLoading?: boolean;

  /** Minimum selectable date in ISO format or Date object */
  min?: ISODateString;
  minDate?: ISODateString | Date;

  /** Maximum selectable date in ISO format or Date object */
  max?: ISODateString;
  maxDate?: ISODateString | Date;

  /** Whether future dates are allowed. Default true. If false, max date is constrained to today. */
  allowFutureDates?: boolean;

  /** Whether past dates are allowed. Default true. If false, min date is constrained to today. */
  allowPastDates?: boolean;

  /** Minimum allowed year (e.g. 1900) */
  minYear?: number;

  /** Maximum allowed year (e.g. 2030) */
  maxYear?: number;

  /** Custom date constraint functions. Date is disabled if ANY function returns false. */
  dateConstraints?: ReadonlyArray<(date: Date) => boolean>;

  /** Placeholder text shown when no date is selected. Defaults to "__/__/____" */
  placeholder?: string;

  /** Size of input */
  size?: DateInputSize;
  status?: InputStatus;
  statusVariant?: FieldStatusVariant;
  width?: SizeValue;
  labelTooltip?: string;

  /** Whether to show clear button when value is set */
  hasClear?: boolean;

  numberOfMonths?: 1 | 2;
  weekStartsOn?: DayOfWeek | DayOfWeekName;

  /** Format pattern or function for displaying committed date. Default "DD/MM/YYYY". Alias: displayFormat */
  format?: DateInputFormat | ((value: ISODateString) => string);
  displayFormat?: DateInputFormat | ((value: ISODateString) => string);

  nativePicker?: DateInputNativePicker;

  /** Display calendar icon button. Default false. Alias: showCalendarIcon */
  hasCalendar?: boolean;
  showCalendarIcon?: boolean;

  /** Allow calendar popover on click. Default false. */
  allowCalendarPopover?: boolean;

  footer?: React.ReactNode;
  footerCheckbox?: {
    label: string;
    value: boolean;
    onChange: (checked: boolean) => void;
  };
}

const TOUCH_POINTER_QUERY = '(pointer: coarse)';

const DATE_MASK = '__/__/____';
const SLOT_INDEXES = DATE_MASK.split('')
  .map((ch, idx) => (ch === '_' ? idx : -1))
  .filter(idx => idx !== -1);

function normalizeMaskedValue(value: string) {
  const v = value ?? '';
  if (!v) return DATE_MASK;
  if (/^[\d_]{2}\/[\d_]{2}\/[\d_]{4}$/.test(v)) return v;

  const digits = v.replace(/\D/g, '').slice(0, 8);
  const result = DATE_MASK.split('');
  let di = 0;
  for (let i = 0; i < result.length && di < digits.length; i++) {
    if (result[i] === '_') result[i] = digits[di++];
  }
  return result.join('');
}

function toSlots(masked: string) {
  return SLOT_INDEXES.map(pos => {
    const ch = masked[pos] ?? '_';
    return /\d/.test(ch) ? ch : '_';
  });
}

function fromSlots(slots: string[]) {
  const out = DATE_MASK.split('');
  SLOT_INDEXES.forEach((pos, idx) => {
    out[pos] = /\d/.test(slots[idx] ?? '') ? String(slots[idx]) : '_';
  });
  return out.join('');
}

function isSlotsStateValid(slots: string[]) {
  const [d1, d2, m1, m2] = slots;

  if (d1 !== '_' && Number(d1) > 3) return false;
  if (d1 !== '_' && d2 !== '_') {
    const dd = Number(`${d1}${d2}`);
    if (dd < 1 || dd > 31) return false;
  }

  if (m1 !== '_' && Number(m1) > 1) return false;
  if (m1 !== '_' && m2 !== '_') {
    const mm = Number(`${m1}${m2}`);
    if (mm < 1 || mm > 12) return false;
  }

  if (d1 === '0' && d2 === '0') return false;
  if (m1 === '0' && m2 === '0') return false;

  return true;
}

function getSlotIndexAtOrAfterCaret(caretPos: number) {
  const idx = SLOT_INDEXES.findIndex(pos => pos >= caretPos);
  return idx === -1 ? SLOT_INDEXES.length : idx;
}

function getSlotIndexBeforeCaret(caretPos: number) {
  for (let i = SLOT_INDEXES.length - 1; i >= 0; i--) {
    if (SLOT_INDEXES[i] < caretPos) return i;
  }
  return -1;
}

function getCaretAfterSlot(slotIndex: number) {
  if (slotIndex < 0) return SLOT_INDEXES[0] ?? 0;
  if (slotIndex >= SLOT_INDEXES.length - 1) return DATE_MASK.length;
  return SLOT_INDEXES[slotIndex + 1];
}

function clearSelectionSlots(slots: string[], start: number, end: number) {
  let changed = false;
  for (let i = 0; i < SLOT_INDEXES.length; i++) {
    const pos = SLOT_INDEXES[i];
    if (pos >= start && pos < end) {
      if (slots[i] !== '_') {
        slots[i] = '_';
        changed = true;
      }
    }
  }
  return changed;
}


function PointerDateField({
  label,
  isLabelHidden = false,
  description,
  isOptional = false,
  isRequired = false,
  isDisabled = false,
  disabledMessage,
  value,
  onChange,
  changeAction,
  isLoading = false,
  min: minProp,
  minDate,
  max: maxProp,
  maxDate,
  allowFutureDates = true,
  allowPastDates = true,
  minYear,
  maxYear,
  dateConstraints: dateConstraintsProp,
  placeholder: placeholderFromProps,
  size: sizeProp,
  status,
  statusVariant = 'attached',
  labelTooltip,
  hasClear = false,
  numberOfMonths = 1,
  weekStartsOn,
  format,
  displayFormat,
  hasCalendar: hasCalendarProp,
  showCalendarIcon,
  allowCalendarPopover,
  footer,
  footerCheckbox,
  width,
  xstyle,
  className,
  style,
  ref,
  ...rest
}: DateInputProps) {
  const t = useTranslator();
  const locale = useLocale();
  const isEffectivelyRequired = useResolvedRequired({isRequired, isOptional});

  // Calendar icon & popover visibility controls (default to false unless explicitly enabled)
  const renderCalendarIcon = showCalendarIcon === true || (showCalendarIcon === undefined && hasCalendarProp === true);
  const effectiveHasCalendar = allowCalendarPopover === true && renderCalendarIcon;

  // Placeholder default
  const placeholder = placeholderFromProps ?? '__/__/____';

  const size = useSize(sizeProp, 'md');
  const id = useId();
  const inputLabelID = useId();
  const descriptionID = useId();
  const statusMessageID = useId();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const calendarRef = useRef<CalendarHandle | null>(null);
  const lastFiredValueRef = useRef<ISODateString | undefined>(undefined);
  const inputGroup = useInputGroup();

  const [, startTransition] = useTransition();
  const [optimisticValue, setOptimisticValue] = useOptimistic(value);
  const isBusy = isLoading || optimisticValue !== value;
  const isEffectivelyDisabled = isDisabled || isBusy;

  // Compute effective min / max dates considering allowFutureDates & allowPastDates
  const todayISO = new Date().toISOString().split('T')[0] as ISODateString;

  const parseToISOString = (val?: ISODateString | Date): ISODateString | undefined => {
    if (!val) return undefined;
    if (val instanceof Date) {
      const yyyy = val.getFullYear();
      const mm = String(val.getMonth() + 1).padStart(2, '0');
      const dd = String(val.getDate()).padStart(2, '0');
      return `${yyyy}-${mm}-${dd}` as ISODateString;
    }
    return val as ISODateString;
  };

  const computedMinISO: ISODateString | undefined =
    parseToISOString(minDate) ?? minProp ?? (allowPastDates === false ? todayISO : undefined);
  const computedMaxISO: ISODateString | undefined =
    parseToISOString(maxDate) ?? maxProp ?? (allowFutureDates === false ? todayISO : undefined);

  // Additional date constraints for minYear / maxYear
  const dateConstraints = [
    ...(dateConstraintsProp ?? []),
    ...(minYear !== undefined ? [(d: Date) => d.getFullYear() >= minYear] : []),
    ...(maxYear !== undefined ? [(d: Date) => d.getFullYear() <= maxYear] : []),
  ];

  const showsDisabledMessage = isDisabled && !!disabledMessage;
  const disabledMessageTooltip = useTooltip({
    placement: 'above',
    focusTrigger: 'always',
    isEnabled: showsDisabledMessage,
  });

  const {isDateDisabled} = useCalendarConstraints({
    min: computedMinISO,
    max: computedMaxISO,
    dateConstraints,
  });

  const {statusIcon, describedBy: statusTooltipDescribedBy} = useInputStatusIcon({
    status,
    statusVariant,
    isInGroup: !!inputGroup,
  });

  const {ariaLabelledBy, ariaDescribedBy} = getInputARIA(
    inputLabelID,
    [
      description ? descriptionID : null,
      statusVariant !== 'tooltip' && status?.message ? statusMessageID : null,
      statusTooltipDescribedBy,
      showsDisabledMessage ? disabledMessageTooltip.describedBy : null,
    ],
    inputGroup,
  );

  const [pendingInput, setPendingInput] = useState<string | null>(null);

  const prevValueRef = useRef(value);
  if (value !== prevValueRef.current) {
    prevValueRef.current = value;
    if (value !== lastFiredValueRef.current) {
      lastFiredValueRef.current = undefined;
      if (pendingInput !== null) {
        setPendingInput(null);
      }
    }
  }

  const activeFormat = displayFormat ?? format ?? 'DD/MM/YYYY';

  const formatCommittedValue = useCallback(
    (iso: ISODateString): string => {
      if (typeof activeFormat === 'function') {
        return activeFormat(iso);
      }
      if (activeFormat === 'raw' || activeFormat === 'DD/MM/YYYY') {
        if (!iso || !/^\d{4}-\d{2}-\d{2}$/.test(iso)) return iso || '';
        const [yyyy, mm, dd] = iso.split('-');
        return `${dd}/${mm}/${yyyy}`;
      }
      if (activeFormat === 'MM/DD/YYYY') {
        if (!iso || !/^\d{4}-\d{2}-\d{2}$/.test(iso)) return iso || '';
        const [yyyy, mm, dd] = iso.split('-');
        return `${mm}/${dd}/${yyyy}`;
      }
      if (activeFormat === 'YYYY-MM-DD') {
        return iso;
      }
      return formatSharedDate(
        plainDateFromISO(iso),
        activeFormat as Extract<
          TimestampFormat,
          'date' | 'date_long' | 'date_weekday' | 'system_date'
        >,
        locale,
      );
    },
    [activeFormat, locale],
  );

  const displayValue =
    pendingInput !== null
      ? pendingInput
      : optimisticValue && /^\d{4}-\d{2}-\d{2}$/.test(optimisticValue)
        ? formatCommittedValue(optimisticValue)
        : '';

  const isInputValid =
    pendingInput === null || !pendingInput.trim()
      ? true
      : parseDateInput(pendingInput, locale) !== null;

  const pendingCaretPosRef = useRef<number | null>(null);

  const queueCaret = useCallback((pos: number) => {
    pendingCaretPosRef.current = pos;
    const input = inputRef.current;
    if (input && document.activeElement === input) {
      input.setSelectionRange(pos, pos);
    }
  }, []);

  useLayoutEffect(() => {
    const pos = pendingCaretPosRef.current;
    const input = inputRef.current;
    if (pos == null || !input) return;
    if (document.activeElement === input) {
      input.setSelectionRange(pos, pos);
    }
  }, [pendingInput, displayValue]);

  const popover = usePopover({
    dialogLabel: t('@astryx.dateInput.dialogLabel'),
    closeButtonLabel: t('@astryx.dateInput.closeCalendar'),
    onHide: () => {
      if (isFocusDetached()) {
        inputRef.current?.focus();
      }
    },
  });

  const handleToggle = useCallback(() => {
    if (!isEffectivelyDisabled && effectiveHasCalendar) {
      if (popover.isOpen) {
        popover.hide();
      } else {
        popover.show();
      }
    }
  }, [isEffectivelyDisabled, effectiveHasCalendar, popover]);

  const handleFocus = useCallback((e: React.FocusEvent<HTMLInputElement>) => {
    const val = e.currentTarget.value;
    if (!val || val === DATE_MASK || !/\d/.test(val)) {
      setPendingInput(DATE_MASK);
      queueCaret(0);
    }
  }, [queueCaret]);

  const handleInputClick = useCallback((e: React.MouseEvent<HTMLInputElement>) => {
    if (!isEffectivelyDisabled && effectiveHasCalendar && !popover.isOpen) {
      popover.show({skipAutoFocus: true});
    }
    const val = e.currentTarget.value;
    if (!val || val === DATE_MASK || !/\d/.test(val)) {
      if (pendingInput === null) {
        setPendingInput(DATE_MASK);
      }
      queueCaret(0);
    }
  }, [isEffectivelyDisabled, effectiveHasCalendar, popover, pendingInput, queueCaret]);

  const fireChange = useCallback(
    (newValue: ISODateString | undefined) => {
      if (isBusy) return;
      onChange?.(newValue);
      if (changeAction) {
        startTransition(async () => {
          setOptimisticValue(newValue);
          await changeAction(newValue);
        });
      }
    },
    [isBusy, onChange, changeAction, startTransition, setOptimisticValue],
  );

  const handleClear = useCallback(() => {
    fireChange(undefined);
    inputRef.current?.focus();
  }, [fireChange]);

  const handleDateSelect = useCallback(
    (selectedDate: ISODateString) => {
      fireChange(selectedDate);
      setPendingInput(null);
      popover.hide();
    },
    [fireChange, popover],
  );

  const commitPendingInput = useCallback(() => {
    if (pendingInput === null) return;

    const digits = pendingInput.replace(/\D/g, '');
    if (!digits) {
      if (value !== undefined) {
        fireChange(undefined);
      }
      setPendingInput(null);
      return;
    }

    if (digits.length === 8) {
      const parsed = parseDateInput(pendingInput, locale);
      if (parsed && !isDateDisabled(parsed)) {
        const parsedISO = plainDateToISO(parsed);
        if (parsedISO !== value) {
          fireChange(parsedISO);
        }
      } else {
        setPendingInput(null);
      }
    } else {
      setPendingInput(null);
    }
  }, [pendingInput, value, fireChange, isDateDisabled, locale]);

  const handleBlur = useCallback(() => {
    commitPendingInput();
  }, [commitPendingInput]);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (isEffectivelyDisabled) return;
      const raw = e.target.value;
      const next = normalizeMaskedValue(raw);
      setPendingInput(next);
    },
    [isEffectivelyDisabled],
  );

  const handleInputKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (isImeKeyEvent(e.nativeEvent)) return;

      if (e.key === 'Escape' && popover.isOpen) {
        e.preventDefault();
        popover.hide();
        return;
      }
      if (
        (e.key === 'ArrowDown' || (e.altKey && e.key === 'ArrowDown')) &&
        !popover.isOpen
      ) {
        e.preventDefault();
        if (!isEffectivelyDisabled && effectiveHasCalendar) {
          popover.show({skipAutoFocus: true});
        }
        return;
      }

      if (e.key === 'Enter') {
        e.preventDefault();
        commitPendingInput();
        return;
      }

      const input = e.currentTarget;
      const start = input.selectionStart ?? 0;
      const end = input.selectionEnd ?? start;
      const isDigit = /^\d$/.test(e.key);
      const isBackspace = e.key === 'Backspace';
      const isDelete = e.key === 'Delete';
      const isNav =
        e.key === 'ArrowLeft' ||
        e.key === 'ArrowRight' ||
        e.key === 'Tab' ||
        e.key === 'Home' ||
        e.key === 'End';

      if (isNav || e.ctrlKey || e.metaKey || e.altKey) {
        return;
      }

      if (!isDigit && !isBackspace && !isDelete) {
        e.preventDefault();
        return;
      }

      e.preventDefault();

      const currentVal =
        pendingInput ??
        (optimisticValue && /^\d{4}-\d{2}-\d{2}$/.test(optimisticValue)
          ? formatCommittedValue(optimisticValue)
          : DATE_MASK);
      const masked = normalizeMaskedValue(currentVal);
      const slots = toSlots(masked);

      if (isDigit) {
        let targetIdx = getSlotIndexAtOrAfterCaret(start);
        const work = [...slots];

        if (start !== end) {
          clearSelectionSlots(work, start, end);
          targetIdx = getSlotIndexAtOrAfterCaret(start);
        }

        if (targetIdx >= SLOT_INDEXES.length) {
          queueCaret(DATE_MASK.length);
          return;
        }

        const prev = work[targetIdx];
        work[targetIdx] = e.key;

        if (!isSlotsStateValid(work)) {
          work[targetIdx] = prev;
          queueCaret(SLOT_INDEXES[targetIdx] ?? DATE_MASK.length);
          return;
        }

        const nextMasked = fromSlots(work);
        setPendingInput(nextMasked);

        if (work.every(ch => /\d/.test(ch))) {
          const parsed = parseDateInput(nextMasked, locale);
          if (parsed && !isDateDisabled(parsed)) {
            const parsedISO = plainDateToISO(parsed);
            lastFiredValueRef.current = parsedISO;
            fireChange(parsedISO);
          }
        }

        queueCaret(getCaretAfterSlot(targetIdx));
        return;
      }

      if (isBackspace || isDelete) {
        const work = [...slots];
        if (start !== end) {
          const changed = clearSelectionSlots(work, start, end);
          if (changed) {
            setPendingInput(fromSlots(work));
          }
          queueCaret(SLOT_INDEXES[getSlotIndexAtOrAfterCaret(start)] ?? DATE_MASK.length);
          return;
        }

        const targetIdx = isBackspace
          ? getSlotIndexBeforeCaret(start)
          : getSlotIndexAtOrAfterCaret(start);

        if (targetIdx < 0 || targetIdx >= SLOT_INDEXES.length) return;

        if (slots[targetIdx] !== '_') {
          work[targetIdx] = '_';
          setPendingInput(fromSlots(work));
        }

        queueCaret(SLOT_INDEXES[targetIdx] ?? DATE_MASK.length);
      }
    },
    [
      popover,
      commitPendingInput,
      isEffectivelyDisabled,
      effectiveHasCalendar,
      pendingInput,
      optimisticValue,
      formatCommittedValue,
      queueCaret,
      locale,
      isDateDisabled,
      fireChange,
    ],
  );

  const inputWrapper = (
    <div
      ref={el => {
        popover.triggerRef(el);
        disabledMessageTooltip.ref(el);
      }}
      {...rest}
      {...mergeProps(
        themeProps('date-input', {
          size,
          status: status?.type ?? null,
          disabled: isDisabled ? 'disabled' : null,
        }),
        stylex.props(
          inputWrapperStyles.base,
          sizeStyles[size],
          isEffectivelyDisabled && inputWrapperStyles.disabled,
          status && inputStatusBorderStyles[status.type],
          status &&
            !isEffectivelyDisabled &&
            inputStatusHoverShadowStyles[status.type],
          status && inputStatusFocusWithinStyles[status.type],
          inputGroup && groupStyles.inGroup,
          xstyle,
        ),
        className,
        style,
      )}>
      {inputGroup && <VisuallyHidden id={inputLabelID}>{label}</VisuallyHidden>}
      {renderCalendarIcon && (
        <button
          type="button"
          onClick={handleToggle}
          disabled={isEffectivelyDisabled || !allowCalendarPopover}
          aria-label={
            popover.isOpen
              ? t('@astryx.dateInput.toggleCalendarClose')
              : t('@astryx.dateInput.openCalendar')
          }
          {...stylex.props(
            focusOutlineStyles.focusVisible,
            styles.iconButton,
            (isEffectivelyDisabled || !allowCalendarPopover) && styles.iconButtonDisabled,
          )}>
          <Icon
            icon="calendar"
            size="sm"
            color="secondary"
            {...themeProps('date-input-toggle-icon', {
              state: popover.isOpen ? 'expanded' : 'collapsed',
            })}
          />
        </button>
      )}
      <input
        ref={useMergedRefs(ref, inputRef)}
        id={id}
        type="text"
        role="combobox"
        value={displayValue}
        onChange={handleInputChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onClick={handleInputClick}
        onKeyDown={handleInputKeyDown}
        placeholder={placeholder}
        maxLength={10}
        disabled={isEffectivelyDisabled && !showsDisabledMessage}
        aria-disabled={showsDisabledMessage ? 'true' : undefined}
        readOnly={showsDisabledMessage || undefined}
        aria-labelledby={ariaLabelledBy}
        aria-describedby={ariaDescribedBy}
        aria-required={isEffectivelyRequired ? 'true' : undefined}
        aria-invalid={
          status?.type === 'error' || !isInputValid ? 'true' : undefined
        }
        aria-busy={isBusy || undefined}
        aria-expanded={effectiveHasCalendar ? popover.isOpen : undefined}
        aria-haspopup={effectiveHasCalendar ? 'dialog' : undefined}
        aria-controls={effectiveHasCalendar && popover.isOpen ? popover.id : undefined}
        aria-autocomplete="none"
        autoComplete="off"
        {...stylex.props(
          styles.input,
          isEffectivelyDisabled && styles.inputDisabled,
          !isInputValid && styles.inputInvalid,
        )}
      />
      <VisuallyHidden as="div" role="alert" aria-live="assertive">
        {!isInputValid ? t('@astryx.dateInput.invalidDate') : ''}
      </VisuallyHidden>
      {hasClear && value !== undefined && !isEffectivelyDisabled && (
        <InputClearButton
          label={t('@astryx.dateInput.clear', {label})}
          onClick={handleClear}
          iconClassName={stableClassName('date-input-clear-icon')}
        />
      )}
      {isBusy && <Spinner size="sm" />}
      {statusIcon}
      {effectiveHasCalendar &&
        popover.render(
          <Calendar
            handleRef={calendarRef}
            mode="single"
            value={optimisticValue}
            onChange={handleDateSelect}
            min={computedMinISO}
            max={computedMaxISO}
            dateConstraints={dateConstraints}
            numberOfMonths={numberOfMonths}
            weekStartsOn={weekStartsOn}
            footer={
              footerCheckbox ? (
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '13px', padding: '4px' }}>
                  <input
                    type="checkbox"
                    checked={footerCheckbox.value}
                    onChange={(e) => footerCheckbox.onChange(e.target.checked)}
                  />
                  <span>{footerCheckbox.label}</span>
                </label>
              ) : footer
            }
          />,
          {placement: 'below', alignment: 'start'},
        )}
      {showsDisabledMessage &&
        disabledMessageTooltip.renderTooltip(disabledMessage)}
    </div>
  );

  if (inputGroup) {
    return inputWrapper;
  }

  return (
    <Field
      label={label}
      isLabelHidden={isLabelHidden}
      description={description}
      inputID={id}
      descriptionID={description ? descriptionID : undefined}
      isOptional={isOptional}
      isRequired={isRequired}
      isDisabled={isDisabled}
      status={
        status
          ? {
              type: status.type,
              message: status.message,
              messageID: status.message ? statusMessageID : undefined,
            }
          : undefined
      }
      statusVariant={statusVariant}
      labelTooltip={labelTooltip}
      width={width}>
      {inputWrapper}
    </Field>
  );
}

PointerDateField.displayName = 'PointerDateField';

export function DateInput(props: DateInputProps) {
  const isTouch = useMediaQuery(TOUCH_POINTER_QUERY);
  const nativePicker = props.nativePicker ?? 'touch';

  if (nativePicker === 'always' || (nativePicker === 'touch' && isTouch)) {
    return <NativeDateField {...props} />;
  }
  return isTouch ? (
    <TouchDateField {...props} />
  ) : (
    <PointerDateField {...props} />
  );
}

DateInput.displayName = 'DateInput';
