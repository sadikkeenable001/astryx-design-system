// Copyright (c) Meta Platforms, Inc. and affiliates.

'use client';

/**
 * @file DocumentUploader.tsx
 * @output Exports DocumentUploader component matching Angular Recruitment Library specification 1:1.
 */

import { useState, useCallback, useRef, useEffect, type ChangeEvent, type SVGProps } from 'react';
import { Button } from '../Button';
import { Spinner } from '../Spinner';

const UploadIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
    width="20"
    height="20"
    {...props}>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
    />
  </svg>
);

const CheckIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={3}
    width="12"
    height="12"
    {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
);

export interface DocumentUploaderProps {
  id?: string;
  label?: string;
  instructionText?: string;
  required?: boolean;
  acceptedFileTypes?: string;
  maxFileSizeKB?: number;
  minFileSizeKB?: number;
  errorMessage?: string;
  requiredFileName?: string;
  isUploading?: boolean;
  uploadSuccess?: boolean;
  isPreviewLoading?: boolean;
  previewUrl?: string | null;
  isInlinePreview?: boolean;
  currentFileName?: string | null;

  value?: File | { name: string } | null;
  onChange?: (file: File | null) => void;
  onFileSelected?: (file: File) => void;
  onUploadClicked?: (file: File) => void;
  onPreviewClicked?: () => void;
  onClearClicked?: () => void;
  onErrorChange?: (error: string | null) => void;
}

export function DocumentUploader({
  id = 'uploader-' + Math.random().toString(36).substring(2, 11),
  label = 'Upload document',
  instructionText = '',
  required = false,
  acceptedFileTypes = '.pdf',
  maxFileSizeKB = 300,
  minFileSizeKB = 0,
  errorMessage = '',
  requiredFileName = '',
  isUploading = false,
  uploadSuccess = false,
  isPreviewLoading = false,
  previewUrl = null,
  isInlinePreview = false,
  currentFileName = null,

  value,
  onChange,
  onFileSelected,
  onUploadClicked,
  onPreviewClicked,
  onClearClicked,
  onErrorChange,
}: DocumentUploaderProps) {
  const [internalFile, setInternalFile] = useState<File | { name: string } | null>(
    value ?? (currentFileName ? { name: currentFileName } : null),
  );
  const [internalError, setInternalError] = useState<string | null>(errorMessage || null);
  const [localPreviewUrl, setLocalPreviewUrl] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (value !== undefined) {
      setInternalFile(value);
    } else if (currentFileName && !internalFile) {
      setInternalFile({ name: currentFileName });
    }
  }, [value, currentFileName]);

  useEffect(() => {
    if (errorMessage !== undefined) {
      setInternalError(errorMessage || null);
    }
  }, [errorMessage]);

  const activeFile = value !== undefined ? value : internalFile;
  const activeError = errorMessage || internalError;

  const getFileNameWithoutExtension = (filename: string): string => {
    const base = filename.split(/[/\\]/).pop() || filename;
    const dotIndex = base.lastIndexOf('.');
    return dotIndex === -1 ? base : base.substring(0, dotIndex);
  };

  const handleValidationError = useCallback(
    (message: string) => {
      setInternalError(message);
      onErrorChange?.(message);
      if (value === undefined) {
        setInternalFile(null);
      }
      onChange?.(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    },
    [onChange, onErrorChange, value],
  );

  const triggerFileSelect = useCallback(() => {
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
      fileInputRef.current.click();
    }
  }, []);

  const handleFileChange = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      setInternalError(null);
      onErrorChange?.(null);

      if (localPreviewUrl) {
        URL.revokeObjectURL(localPreviewUrl);
        setLocalPreviewUrl(null);
      }

      if (!file) return;

      // 1. Validate File Format
      const accepted = (acceptedFileTypes || '').toLowerCase();
      const extension = '.' + (file.name.split('.').pop() || '').toLowerCase();
      const typeMatches = accepted.split(',').some((type) => {
        const trimmed = type.trim();
        if (trimmed.startsWith('.')) {
          return trimmed === extension;
        }
        if (trimmed.endsWith('/*')) {
          return file.type.startsWith(trimmed.slice(0, -1));
        }
        return trimmed === file.type;
      });

      if (accepted && !typeMatches) {
        handleValidationError(`Invalid file format. Only ${acceptedFileTypes} files are allowed.`);
        return;
      }

      // 2. Validate File Size
      const fileSizeKB = file.size / 1024;
      if (minFileSizeKB > 0 && fileSizeKB < minFileSizeKB) {
        handleValidationError(`File is too small. Minimum size is ${minFileSizeKB}KB.`);
        return;
      }

      if (fileSizeKB > maxFileSizeKB) {
        handleValidationError(`File is too large. Maximum size is ${maxFileSizeKB}KB.`);
        return;
      }

      // 3. Validate File Name
      const requiredName = (requiredFileName || '').trim();
      if (requiredName) {
        const selectedBase = getFileNameWithoutExtension(file.name);
        const requiredBase = getFileNameWithoutExtension(requiredName);
        if (selectedBase.toLowerCase() !== requiredBase.toLowerCase()) {
          handleValidationError(`Invalid file name. The file must be named "${requiredName}".`);
          return;
        }
      }

      if (file.type.startsWith('image/')) {
        setLocalPreviewUrl(URL.createObjectURL(file));
      }

      if (value === undefined) {
        setInternalFile(file);
      }
      onChange?.(file);
      onFileSelected?.(file);
    },
    [
      acceptedFileTypes,
      minFileSizeKB,
      maxFileSizeKB,
      requiredFileName,
      localPreviewUrl,
      handleValidationError,
      onChange,
      onFileSelected,
      onErrorChange,
      value,
    ],
  );

  const handleUploadClick = useCallback(() => {
    if (activeFile && activeFile instanceof File) {
      onUploadClicked?.(activeFile);
    }
  }, [activeFile, onUploadClicked]);

  const handlePreviewClick = useCallback(() => {
    const effectiveUrl = localPreviewUrl || previewUrl;
    if (effectiveUrl) {
      window.open(effectiveUrl, '_blank');
    }
    onPreviewClicked?.();
  }, [localPreviewUrl, previewUrl, onPreviewClicked]);

  const clearSelection = useCallback(() => {
    if (value === undefined) {
      setInternalFile(null);
    }
    setInternalError(null);
    onErrorChange?.(null);
    if (localPreviewUrl) {
      URL.revokeObjectURL(localPreviewUrl);
      setLocalPreviewUrl(null);
    }
    onChange?.(null);
    onClearClicked?.();
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, [localPreviewUrl, onChange, onClearClicked, onErrorChange, value]);

  const effectivePreviewUrl = localPreviewUrl || previewUrl;
  const showInlinePreview = (isInlinePreview || localPreviewUrl) && effectivePreviewUrl;

  const instructionId = id + '-instruction';
  const errorId = id + '-error';

  return (
    <div id={id} style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
      {/* Instruction Label */}
      {instructionText && (
        <p
          id={instructionId}
          style={{
            margin: 0,
            marginBottom: '8px',
            fontSize: '14px',
            fontWeight: 500,
            color: 'var(--color-text-primary, #f8fafc)',
            lineHeight: 1.4,
          }}>
          {instructionText}
          {required && <span style={{ color: '#ef4444', fontWeight: 'bold' }}> *</span>}
        </p>
      )}

      {/* Image Inline Preview */}
      {showInlinePreview && (
        <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: '12px' }}>
          <div
            style={{
              padding: '4px',
              backgroundColor: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.15)',
              borderRadius: '8px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            }}>
            <img
              src={effectivePreviewUrl}
              alt="Uploaded Document Preview"
              style={{
                height: '7rem',
                width: '7rem',
                objectFit: 'contain',
                borderRadius: '6px',
                display: 'block',
              }}
            />
          </div>
        </div>
      )}

      {/* Main Trigger Button */}
      <div style={{ position: 'relative', width: '100%' }}>
        <button
          type="button"
          aria-label={`Select document for ${label}`}
          aria-describedby={`${instructionId} ${activeError ? errorId : ''}`}
          onClick={triggerFileSelect}
          title="Click or press Enter/Space to select file"
          style={{
            appearance: 'none',
            display: 'block',
            width: '100%',
            backgroundColor: 'rgba(255,255,255,0.02)',
            border: activeError ? '2px dashed #ef4444' : '2px dashed #3b82f6',
            borderRadius: '8px',
            cursor: 'pointer',
            padding: '12px 16px',
            textAlign: 'left',
            color: 'inherit',
            font: 'inherit',
            transition: 'background-color 0.2s, border-color 0.2s',
          }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden', flexGrow: 1 }}>
              <span
                style={{
                  fontSize: '14px',
                  fontWeight: activeFile ? 700 : 400,
                  color: activeFile ? 'var(--color-text-primary, #f8fafc)' : '#94a3b8',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}>
                {activeFile ? activeFile.name : label}
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8' }}>
              <UploadIcon />
            </div>
          </div>
        </button>

        {/* Hidden File Input */}
        <input
          ref={fileInputRef}
          type="file"
          accept={acceptedFileTypes}
          onChange={handleFileChange}
          onClick={(e) => e.stopPropagation()}
          style={{ display: 'none' }}
        />
      </div>

      {/* Error Message */}
      {activeError && (
        <div
          id={errorId}
          role="alert"
          style={{
            marginTop: '4px',
            fontSize: '14px',
            fontWeight: 500,
            color: '#ef4444',
          }}
          dangerouslySetInnerHTML={{ __html: activeError }}
        />
      )}

      {/* Action Controls */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center', marginTop: '12px' }}>
        <Button
          label={isUploading ? 'Uploading...' : uploadSuccess ? 'Uploaded' : 'Upload'}
          variant="primary"
          isDisabled={!activeFile || uploadSuccess || !!activeError || isUploading || !(activeFile instanceof File)}
          onClick={handleUploadClick}>
          {isUploading ? (
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
              <Spinner size="sm" /> Uploading...
            </span>
          ) : uploadSuccess ? (
            'Uploaded'
          ) : (
            'Upload'
          )}
        </Button>

        {uploadSuccess && !activeError && (
          <Button
            label={isPreviewLoading ? 'Loading...' : 'Preview'}
            variant="secondary"
            isDisabled={isPreviewLoading}
            onClick={handlePreviewClick}>
            {isPreviewLoading ? (
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                <Spinner size="sm" /> Loading...
              </span>
            ) : (
              'Preview'
            )}
          </Button>
        )}

        {activeFile && !isUploading && (
          <Button label="Clear" variant="secondary" onClick={clearSelection}>
            Clear
          </Button>
        )}
      </div>

      {/* Success Banner */}
      {uploadSuccess && !activeError && (
        <div
          aria-live="polite"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            marginTop: '12px',
            padding: '4px 10px',
            fontSize: '12px',
            fontWeight: 500,
            color: '#ffffff',
            backgroundColor: '#22c55e',
            borderRadius: '4px',
            width: 'fit-content',
          }}>
          <CheckIcon /> Document uploaded successfully
        </div>
      )}
    </div>
  );
}
