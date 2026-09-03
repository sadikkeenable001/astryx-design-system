// Copyright (c) Meta Platforms, Inc. and affiliates.

'use client';

/**
 * @file CardFileUploader.tsx
 * @output Exports CardFileUploader component matching urn-keycloak document card uploaders 1:1.
 */

import {
  useState,
  useRef,
  useCallback,
  type ChangeEvent,
  type SVGProps,
  type ReactNode,
} from 'react';
import {Spinner} from '../Spinner';

// Predefined Border Radius Size Tokens
export type CardUploaderRadius =
  'none' | 'sm' | 'md' | 'lg' | 'xl' | 'pill' | 'full' | (string & {});

const RADIUS_MAP: Record<string, string> = {
  none: '0px',
  sm: '4px',
  md: '6px',
  lg: '8px',
  xl: '12px',
  pill: '9999px',
  full: '9999px',
};

function resolveRadius(
  radius?: CardUploaderRadius,
  defaultVal: string = '9999px',
): string {
  if (!radius) {return defaultVal;}
  const key = radius.toString().toLowerCase();
  return RADIUS_MAP[key] || radius;
}

// Default document placeholder SVG
const CertificatePlaceholderIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    width="40"
    height="40"
    {...props}>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
    />
  </svg>
);

// Green checkmark icon for uploaded state
const UploadSuccessCheckIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    width="40"
    height="40"
    {...props}>
    <circle cx="12" cy="12" r="10" fill="#86efac" />
    <path
      d="M8.5 12.5L11 15L15.5 9.5"
      stroke="#166534"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// Guidelines eye icon SVG
const GuidelinesIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.75}
    width="20"
    height="20"
    {...props}>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M2.036 12c.09-1.077.534-2.146 1.255-3.142 1.96-2.709 5.28-4.608 8.709-4.608 3.429 0 6.749 1.899 8.709 4.608.721.996 1.165 2.065 1.255 3.142-.09 1.077-.534 2.146-1.255 3.142-1.96 2.709-5.28 4.608-8.709 4.608-3.429 0-6.749-1.899-8.709-4.608-.721-.996-1.165-2.065-1.255-3.142z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
    />
  </svg>
);

export interface CardFileUploaderProps {
  id?: string;
  title?: string;
  fileName?: string;
  isUploading?: boolean;
  isUploaded?: boolean;
  canUpload?: boolean;
  downloadUrl?: string | null;
  accept?: string;
  disabled?: boolean;
  errorMessage?: string;
  notes?: string[] | ReactNode;
  uploadButtonText?: string;
  uploadWarningText?: string;
  guidelinesText?: string;
  selectStyle?: 'pill' | 'split';
  placeholderIcon?: ReactNode;
  previewIcon?: ReactNode;
  fileInputRef?: React.RefObject<HTMLInputElement>;

  // Validation Props
  requiredFileName?: string;
  allowedExtensions?: string[];
  minSizeKB?: number;
  maxSizeKB?: number;
  onValidate?: (file: File) => string | null;
  onValidationError?: (error: string) => void;

  // Customization Color & Radius Props
  cardBgColor?: string;
  cardBorderColor?: string;
  cardBorderRadius?: CardUploaderRadius;
  noteBgColor?: string;
  noteBorderColor?: string;
  noteTextColor?: string;
  noteBorderRadius?: CardUploaderRadius;
  uploadButtonBgColor?: string;
  uploadButtonTextColor?: string;
  uploadButtonHoverBgColor?: string;
  uploadButtonBorderRadius?: CardUploaderRadius;
  guidelinesTextColor?: string;
  guidelinesIconColor?: string;
  previewCardBgColor?: string;
  previewCardBorderColor?: string;
  previewCardUploadedBgColor?: string;
  previewCardTextColor?: string;
  previewCardBorderRadius?: CardUploaderRadius;

  // Slot for extra actions (e.g. DigiLocker button slot)
  extraActionsSlot?: ReactNode;

  // Event Handlers
  onFileSelect?: (file: File | null) => void;
  onUpload?: () => void;
  onPreview?: () => void;
  onViewGuidelines?: () => void;
  className?: string;
}

export function CardFileUploader({
  id = 'card-uploader-' + Math.random().toString(36).substring(2, 11),
  title = 'Upload Document',
  fileName = '',
  isUploading = false,
  isUploaded = false,
  canUpload = true,
  downloadUrl = null,
  accept,
  disabled = false,
  errorMessage = '',
  notes,
  uploadButtonText,
  uploadWarningText,
  guidelinesText,
  selectStyle = 'pill',
  placeholderIcon,
  previewIcon,
  fileInputRef: externalInputRef,

  // Validation Props
  requiredFileName,
  allowedExtensions,
  minSizeKB,
  maxSizeKB,
  onValidate,
  onValidationError,

  // Customization Radius & Colors (matching urn-keycloak primary blue)
  cardBgColor = '#ffffff',
  cardBorderColor = '#e2e8f0',
  cardBorderRadius = 'lg',
  noteBgColor = '#fff7ed',
  noteBorderColor = '#fb923c',
  noteTextColor = '#c2410c',
  noteBorderRadius = 'xl',
  uploadButtonBgColor = '#2b66b1',
  uploadButtonTextColor = '#ffffff',
  uploadButtonHoverBgColor = '#1e4e8c',
  uploadButtonBorderRadius = 'pill',
  guidelinesTextColor = '#2b66b1',
  guidelinesIconColor = '#2b66b1',
  previewCardBgColor = '#f8fafc',
  previewCardBorderColor = '#cbd5e1',
  previewCardUploadedBgColor = '#f1f5f9',
  previewCardTextColor = '#174b82',
  previewCardBorderRadius = 'lg',

  extraActionsSlot,

  onFileSelect,
  onUpload,
  onPreview,
  onViewGuidelines,
  className = '',
}: CardFileUploaderProps) {
  const internalInputRef = useRef<HTMLInputElement>(null);
  const inputRef = externalInputRef || internalInputRef;

  const [validationError, setValidationError] = useState<string>('');
  const [isHoveredUpload, setIsHoveredUpload] = useState<boolean>(false);

  // Resolve radius values from token preset ('sm', 'md', 'lg', 'xl', 'pill') or custom string
  const resolvedCardRadius = resolveRadius(cardBorderRadius, '8px');
  const resolvedNoteRadius = resolveRadius(noteBorderRadius, '10px');
  const resolvedPreviewCardRadius = resolveRadius(
    previewCardBorderRadius,
    '8px',
  );
  const resolvedUploadBtnRadius = resolveRadius(
    uploadButtonBorderRadius,
    '9999px',
  );

  // Derive accept string if allowedExtensions is provided
  const computedAccept =
    accept ||
    (allowedExtensions
      ? allowedExtensions.map(e => (e.startsWith('.') ? e : `.${e}`)).join(',')
      : undefined);

  const handleChooseFileClick = useCallback(() => {
    if (disabled || isUploading) {return;}
    if (inputRef.current) {
      inputRef.current.click();
    }
  }, [disabled, isUploading, inputRef]);

  // Validation Logic
  const validateFile = useCallback(
    (file: File): string | null => {
      if (!file) {return null;}

      // 1. Extension Check
      if (allowedExtensions && allowedExtensions.length > 0) {
        const ext = file.name.split('.').pop()?.toLowerCase() || '';
        const cleanAllowed = allowedExtensions.map(e =>
          e.toLowerCase().replace('.', ''),
        );
        if (!cleanAllowed.includes(ext)) {
          return `Invalid file format (.${ext}). Allowed format(s): ${cleanAllowed.join(', ')}`;
        }
      }

      // 2. Required Filename Check
      if (requiredFileName) {
        const cleanReq = requiredFileName.toLowerCase().trim();
        const actualFullName = file.name.toLowerCase();
        const baseName =
          actualFullName.substring(0, actualFullName.lastIndexOf('.')) ||
          actualFullName;

        if (
          cleanReq !== actualFullName &&
          cleanReq !== baseName &&
          !baseName.includes(cleanReq)
        ) {
          return `Invalid file name "${file.name}". Required file name should be ${requiredFileName}`;
        }
      }

      // 3. File Size Check
      const sizeKB = file.size / 1024;
      if (minSizeKB != null && sizeKB < minSizeKB) {
        return `File size (${sizeKB.toFixed(1)} KB) is smaller than required minimum of ${minSizeKB} KB`;
      }
      if (maxSizeKB != null && sizeKB > maxSizeKB) {
        return `File size (${sizeKB.toFixed(1)} KB) exceeds maximum allowed size of ${maxSizeKB} KB`;
      }

      // 4. Custom Validator
      if (onValidate) {
        const customErr = onValidate(file);
        if (customErr) {return customErr;}
      }

      return null;
    },
    [allowedExtensions, requiredFileName, minSizeKB, maxSizeKB, onValidate],
  );

  const handleInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0] ?? null;

      if (file) {
        const err = validateFile(file);
        if (err) {
          setValidationError(err);
          onValidationError?.(err);
          onFileSelect?.(null);
          if (inputRef.current) {inputRef.current.value = '';}
          return;
        }
      }

      setValidationError('');
      onFileSelect?.(file);
    },
    [validateFile, onValidationError, onFileSelect, inputRef],
  );

  const handlePreviewClick = useCallback(() => {
    if (!isUploaded) {return;}
    if (onPreview) {
      onPreview();
      return;
    }
    if (downloadUrl) {
      window.open(downloadUrl, '_blank', 'noopener,noreferrer');
    }
  }, [isUploaded, onPreview, downloadUrl]);

  const defaultNotes = [
    'Allowed Document size : 20 KB to 300 KB',
    'File name should be as per requirements',
  ];

  const effectiveNotes = notes ?? defaultNotes;
  const effectiveUploadBtnText =
    uploadButtonText ||
    (isUploaded
      ? 'Update Certificate'
      : title.toLowerCase().includes('gazette')
        ? 'Upload Gazette document'
        : title.toLowerCase().includes('10th') ||
            title.toLowerCase().includes('certificate')
          ? 'Upload Certificate'
          : 'Upload Document');

  const effectiveWarningText =
    uploadWarningText ||
    `Please press this button to ${effectiveUploadBtnText}`;
  const effectiveErrorMessage = errorMessage || validationError;

  const isBtnDisabled =
    disabled ||
    isUploading ||
    !canUpload ||
    !fileName ||
    Boolean(effectiveErrorMessage);

  // Active hover background color calculation
  const currentUploadBtnBg =
    isHoveredUpload && !isBtnDisabled
      ? uploadButtonHoverBgColor
      : uploadButtonBgColor;

  return (
    <div
      id={id}
      data-testid={id}
      className={`rounded-lg border p-5 shadow-sm ${className}`}
      style={{
        borderRadius: resolvedCardRadius,
        border: `1px solid ${cardBorderColor}`,
        backgroundColor: cardBgColor,
        padding: '20px',
      }}>
      {/* Title */}
      {title && (
        <div style={{textAlign: 'center', marginBottom: '16px'}}>
          <h6
            style={{
              fontSize: '14px',
              fontWeight: 700,
              color: '#1e293b',
              margin: 0,
            }}>
            {title}
          </h6>
        </div>
      )}

      {/* Main 2-Column Layout */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'flex-start',
          gap: '16px',
          flexWrap: 'wrap',
        }}>
        {/* Left Preview Box */}
        <div
          id={`${id}-preview-card`}
          data-testid={`${id}-preview-card`}
          role={isUploaded ? 'button' : undefined}
          tabIndex={isUploaded ? 0 : undefined}
          onClick={handlePreviewClick}
          onKeyDown={e => {
            if ((e.key === 'Enter' || e.key === ' ') && isUploaded) {
              e.preventDefault();
              handlePreviewClick();
            }
          }}
          style={{
            width: '160px',
            height: '140px',
            flexShrink: 0,
            borderRadius: resolvedPreviewCardRadius,
            border: `1px solid ${previewCardBorderColor}`,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            backgroundColor: isUploaded
              ? previewCardUploadedBgColor
              : previewCardBgColor,
            cursor: isUploaded ? 'pointer' : 'default',
            transition: 'background-color 0.2s, border-color 0.2s',
          }}>
          {!isUploaded ? (
            placeholderIcon ? (
              placeholderIcon
            ) : (
              <CertificatePlaceholderIcon style={{color: '#94a3b8'}} />
            )
          ) : (
            <>
              {previewIcon ? previewIcon : <UploadSuccessCheckIcon />}
              <span
                style={{
                  fontSize: '14px',
                  fontWeight: 600,
                  color: previewCardTextColor,
                }}>
                Preview
              </span>
            </>
          )}
        </div>

        {/* Right Column */}
        <div style={{flex: 1, minWidth: '240px'}}>
          {/* Rules / Notes Callout Box */}
          <div
            style={{
              marginBottom: '12px',
              width: '100%',
              borderRadius: resolvedNoteRadius,
              border: `1px solid ${noteBorderColor}`,
              backgroundColor: noteBgColor,
              padding: '10px 14px',
              fontSize: '12px',
              color: noteTextColor,
              lineHeight: 1.5,
            }}>
            {Array.isArray(effectiveNotes)
              ? effectiveNotes.map((note, idx) => (
                  <div
                    key={idx}
                    style={{fontWeight: note.startsWith('NOTE') ? 500 : 400}}>
                    {note.startsWith('NOTE') ? (
                      note
                    ) : (
                      <span>
                        <strong>NOTE {idx + 1}:-</strong> {note}
                      </span>
                    )}
                  </div>
                ))
              : effectiveNotes}
          </div>

          {/* Hidden File Input */}
          <input
            ref={inputRef}
            type="file"
            accept={computedAccept}
            disabled={disabled || isUploading}
            onChange={handleInputChange}
            style={{display: 'none'}}
          />

          {/* File Selection + Upload Button */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              gap: '12px',
            }}>
            {selectStyle === 'pill' ? (
              /* Pill Capsule Trigger */
              <div
                id={`${id}-choose-file-trigger`}
                data-testid={`${id}-choose-file-trigger`}
                onClick={handleChooseFileClick}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  borderRadius: '9999px',
                  border: isUploaded
                    ? '1px solid #22c55e'
                    : '1px solid #cbd5e1',
                  backgroundColor: '#ffffff',
                  padding: '6px 16px',
                  fontSize: '14px',
                  cursor: disabled || isUploading ? 'not-allowed' : 'pointer',
                  flex: 1,
                  minWidth: '180px',
                  transition: 'background-color 0.15s, border-color 0.15s',
                }}>
                <span
                  style={{fontWeight: 600, color: '#1e293b', flexShrink: 0}}>
                  Choose File
                </span>
                <span
                  style={{
                    color: '#64748b',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    flex: 1,
                  }}>
                  {fileName || 'No file chosen'}
                </span>
              </div>
            ) : (
              /* Split Style Button + Box */
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  flex: 1,
                  minWidth: '220px',
                }}>
                <button
                  type="button"
                  disabled={disabled || isUploading}
                  onClick={handleChooseFileClick}
                  style={{
                    borderRadius: '6px',
                    border: '1px solid #cbd5e1',
                    backgroundColor: '#f8fafc',
                    padding: '8px 16px',
                    fontSize: '14px',
                    fontWeight: 600,
                    color: '#1e293b',
                    cursor: disabled || isUploading ? 'not-allowed' : 'pointer',
                    whiteSpace: 'nowrap',
                  }}>
                  Choose File
                </button>
                <div
                  style={{
                    flex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    borderRadius: '6px',
                    border: isUploaded
                      ? '1px solid #22c55e'
                      : '1px solid #cbd5e1',
                    backgroundColor: '#ffffff',
                    padding: '8px 12px',
                    fontSize: '14px',
                    color: '#475569',
                  }}>
                  <span
                    style={{
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}>
                    {fileName || 'No file chosen'}
                  </span>
                </div>
              </div>
            )}

            {/* Custom Solid Primary Blue Upload Button */}
            <div
              style={{
                position: 'relative',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
              }}>
              <button
                id={`${id}-upload-button`}
                data-testid={`${id}-upload-button`}
                type="button"
                className={
                  resolvedUploadBtnRadius === '9999px' ? 'rounded-full' : ''
                }
                aria-disabled={isBtnDisabled}
                onClick={isBtnDisabled ? undefined : onUpload}
                onMouseEnter={() => setIsHoveredUpload(true)}
                onMouseLeave={() => setIsHoveredUpload(false)}
                style={{
                  borderRadius: resolvedUploadBtnRadius,
                  border: 'none',
                  backgroundColor: currentUploadBtnBg,
                  color: uploadButtonTextColor,
                  padding: '9px 24px',
                  fontSize: '14px',
                  fontWeight: 600,
                  cursor: isBtnDisabled ? 'not-allowed' : 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  boxShadow: isBtnDisabled
                    ? 'none'
                    : '0 2px 4px rgba(43, 102, 177, 0.25)',
                  transition: 'background-color 0.2s, opacity 0.2s',
                  opacity: isBtnDisabled ? 0.65 : 1,
                  WebkitAppearance: 'none',
                }}>
                {isUploading ? (
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                    }}>
                    <Spinner size="sm" /> Uploading...
                  </span>
                ) : (
                  effectiveUploadBtnText
                )}
              </button>

              {/* Pulsing Warning / Prompt Bubble */}
              {fileName &&
                !isUploaded &&
                !isUploading &&
                !effectiveErrorMessage && (
                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      animation:
                        'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                    }}>
                    <div
                      style={{
                        width: 0,
                        height: 0,
                        borderTop: '6px solid transparent',
                        borderBottom: '6px solid transparent',
                        borderRight: '8px solid #fef3c7',
                      }}
                    />
                    <div
                      style={{
                        borderRadius: '6px',
                        border: '1px solid rgba(252, 211, 77, 0.6)',
                        backgroundColor: '#fef3c7',
                        padding: '4px 10px',
                        fontSize: '11px',
                        fontWeight: 500,
                        color: '#b45309',
                        boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
                        whiteSpace: 'nowrap',
                      }}>
                      {effectiveWarningText}
                    </div>
                  </div>
                )}
            </div>
          </div>

          {/* Validation Error Message */}
          {effectiveErrorMessage && (
            <div
              style={{
                marginTop: '8px',
                fontSize: '12px',
                fontWeight: 600,
                color: '#dc2626',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
              }}>
              ⚠️ {effectiveErrorMessage}
            </div>
          )}

          {/* Guidelines Link */}
          {guidelinesText && (
            <button
              id={`${id}-guidelines-button`}
              data-testid={`${id}-guidelines-button`}
              type="button"
              onClick={onViewGuidelines}
              style={{
                marginTop: '16px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: 'none',
                border: 'none',
                padding: 0,
                fontSize: '14px',
                fontWeight: 500,
                color: guidelinesTextColor,
                cursor: 'pointer',
                textDecoration: 'none',
              }}
              onMouseEnter={e =>
                (e.currentTarget.style.textDecoration = 'underline')
              }
              onMouseLeave={e =>
                (e.currentTarget.style.textDecoration = 'none')
              }>
              <GuidelinesIcon style={{color: guidelinesIconColor}} />
              {guidelinesText}
            </button>
          )}
        </div>
      </div>

      {/* Extra Actions Slot (Full width below uploader row, e.g. DigiLocker button slot) */}
      {extraActionsSlot && (
        <div
          style={{
            marginTop: '16px',
            paddingTop: '8px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
          }}>
          {extraActionsSlot}
        </div>
      )}
    </div>
  );
}
