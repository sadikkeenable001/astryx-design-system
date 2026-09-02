// Copyright (c) Meta Platforms, Inc. and affiliates.

'use client';

/**
 * @file ImageUploader.tsx
 * @input Uses React, Field, stylex, Dialog, Button, useId
 * @output Exports ImageUploader component, ImageUploaderProps
 * @position Core implementation for photo, signature, and image ID uploading
 */

import {
  useState,
  useRef,
  useId,
  type ChangeEvent,
  type DragEvent,
  type ReactNode,
} from 'react';
import * as stylex from '@stylexjs/stylex';
import {
  colorVars,
  spacingVars,
  radiusVars,
} from '../theme/tokens.stylex';
import {Field, type FieldStatusInput} from '../Field';
import {Button} from '../Button';
import {Dialog} from '../Dialog';

const styles = stylex.create({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: spacingVars['--spacing-3'],
  },
  dropzone: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacingVars['--spacing-6'],
    borderWidth: '2px',
    borderStyle: 'dashed',
    borderColor: colorVars['--color-border'],
    borderRadius: radiusVars['--radius-container'],
    backgroundColor: 'transparent',
    cursor: 'pointer',
    transitionProperty: 'border-color, background-color',
    transitionDuration: '200ms',
    ':hover': {
      borderColor: colorVars['--color-accent'],
    },
  },
  dropzoneDragOver: {
    borderColor: colorVars['--color-accent'],
  },
  dropzoneError: {
    borderColor: colorVars['--color-border-red'],
  },
  previewContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: spacingVars['--spacing-4'],
    padding: spacingVars['--spacing-3'],
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: colorVars['--color-border'],
    borderRadius: radiusVars['--radius-element'],
  },
  thumbnail: {
    width: '80px',
    height: '100px',
    objectFit: 'cover',
    borderRadius: radiusVars['--radius-inner'],
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: colorVars['--color-border'],
  },
  previewInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: spacingVars['--spacing-1'],
    flex: 1,
  },
  fileName: {
    fontSize: '14px',
    fontWeight: '500',
    color: colorVars['--color-text-primary'],
  },
  fileSize: {
    fontSize: '12px',
    color: colorVars['--color-text-secondary'],
  },
  actions: {
    display: 'flex',
    gap: spacingVars['--spacing-2'],
  },
  guidelineSlot: {
    fontSize: '12px',
    color: colorVars['--color-text-secondary'],
  },
  modalImage: {
    maxWidth: '100%',
    maxHeight: '70vh',
    objectFit: 'contain',
    borderRadius: radiusVars['--radius-container'],
  },
});

export type ImageUploaderProps = {
  /** Label for the image upload field */
  label?: string;
  /** Helper or validation message */
  helperText?: string;
  /** Validation status */
  status?: FieldStatusInput;
  /** Acceptable MIME types (default "image/jpeg, image/png, image/jpg") */
  accept?: string;
  /** Minimum file size in KB (default 20 KB) */
  minSizeKB?: number;
  /** Maximum file size in KB (default 300 KB) */
  maxSizeKB?: number;
  /** Currently selected File or Image URL string */
  value?: File | string | null;
  /** Callback fired when image is selected or cleared */
  onChange?: (file: File | null) => void;
  /** Optional guidelines / instructions slot */
  guidelineSlot?: ReactNode;
  /** Is input disabled */
  isDisabled?: boolean;
};

export function ImageUploader({
  label,
  helperText,
  status,
  accept = 'image/jpeg, image/jpg, image/png',
  minSizeKB = 20,
  maxSizeKB = 300,
  value = null,
  onChange,
  guidelineSlot,
  isDisabled = false,
}: ImageUploaderProps) {
  const inputID = useId();
  const [isDragOver, setIsDragOver] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [previewModalOpen, setPreviewModalOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const previewUrl =
    typeof value === 'string'
      ? value
      : value instanceof File
      ? URL.createObjectURL(value)
      : null;

  const validateAndSetFile = (file: File) => {
    setErrorMsg(null);
    const sizeKB = file.size / 1024;

    if (sizeKB < minSizeKB) {
      setErrorMsg(`File size must be at least ${minSizeKB} KB.`);
      return;
    }
    if (sizeKB > maxSizeKB) {
      setErrorMsg(`File size cannot exceed ${maxSizeKB} KB.`);
      return;
    }

    onChange?.(file);
  };

  const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) validateAndSetFile(file);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    if (isDisabled) return;
    const file = e.dataTransfer.files?.[0];
    if (file) validateAndSetFile(file);
  };

  const isError = Boolean(errorMsg || status?.type === 'error');

  const contentNode = (
    <div {...stylex.props(styles.wrapper)}>
      {guidelineSlot && <div {...stylex.props(styles.guidelineSlot)}>{guidelineSlot}</div>}

      {!previewUrl ? (
        <div
          {...stylex.props(
            styles.dropzone,
            isDragOver && styles.dropzoneDragOver,
            isError ? styles.dropzoneError : null,
          )}
          onClick={() => !isDisabled && fileInputRef.current?.click()}
          onDragOver={e => {
            e.preventDefault();
            setIsDragOver(true);
          }}
          onDragLeave={() => setIsDragOver(false)}
          onDrop={handleDrop}
        >
          <input autoComplete="off"
            id={inputID}
            ref={fileInputRef}
            type="file"
            accept={accept}
            disabled={isDisabled}
            style={{display: 'none'}}
            onChange={handleFileSelect}
          />
          <div style={{fontWeight: 600, fontSize: '14px', marginBottom: '4px'}}>
            Click or drag & drop photo here
          </div>
          <div style={{fontSize: '12px', color: '#64748b'}}>
            Formats: JPEG, PNG ({minSizeKB} KB to {maxSizeKB} KB)
          </div>
        </div>
      ) : (
        <div {...stylex.props(styles.previewContainer)}>
          <img src={previewUrl} alt="Upload Preview" {...stylex.props(styles.thumbnail)} />
          <div {...stylex.props(styles.previewInfo)}>
            <span {...stylex.props(styles.fileName)}>
              {value instanceof File ? value.name : 'Uploaded Photo'}
            </span>
            <span {...stylex.props(styles.fileSize)}>
              {value instanceof File ? `${(value.size / 1024).toFixed(1)} KB` : 'Verified Image'}
            </span>
          </div>
          <div {...stylex.props(styles.actions)}>
            <Button label="Preview" size="sm" variant="secondary" onClick={() => setPreviewModalOpen(true)}>
              Preview
            </Button>
            <Button
              label="Remove"
              size="sm"
              variant="destructive"
              onClick={() => {
                onChange?.(null);
                if (fileInputRef.current) fileInputRef.current.value = '';
              }}
            >
              Remove
            </Button>
          </div>
        </div>
      )}

      {previewModalOpen && previewUrl && (
        <Dialog isOpen={previewModalOpen} onOpenChange={setPreviewModalOpen}>
          <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', padding: '16px'}}>
            <h3 style={{fontSize: '18px', fontWeight: 600}}>Image Preview</h3>
            <img src={previewUrl} alt="Full Preview" {...stylex.props(styles.modalImage)} />
            <Button label="Close" onClick={() => setPreviewModalOpen(false)}>Close</Button>
          </div>
        </Dialog>
      )}
    </div>
  );

  if (label) {
    return (
      <Field
        label={label}
        inputID={inputID}
        description={helperText}
        status={errorMsg ? {type: 'error', message: errorMsg} : status}
      >
        {contentNode}
      </Field>
    );
  }

  return contentNode;
}
