'use client';

/**
 * @file page.tsx
 * @description Isolated interactive showcase page testing all Astryx Design System form controls
 * structured strictly matching the urn-keycloak application presentation, field layouts, and sharp styling.
 */

import { useState } from 'react';
import {
  TextInput,
  MaskedInput,
  OtpInput,
  DateInput,
  ImageUploader,
  CardFileUploader,
  CanvasCaptcha,
  Selector,
  RadioList,
  RadioListItem,
  KeyValueGrid,
  Button,
  Card,
  Badge,
  HStack,
  VStack,
  Text,
  Heading,
  Divider,
} from '@astryxdesign/core';

export default function ShowcasePage() {
  const [activeStep, setActiveStep] = useState(0);

  // --- Step 1 State: Auth & OTP ---
  const [loginTab, setLoginTab] = useState<'mobile' | 'email'>('mobile');
  const [mobileVal, setMobileVal] = useState('');
  const [emailVal, setEmailVal] = useState('');
  const [otpVal, setOtpVal] = useState('');
  const [captchaInput, setCaptchaInput] = useState('');
  const [isCaptchaValid, setIsCaptchaValid] = useState(false);

  // --- Step 2 State: Personal Identity ---
  const [firstName, setFirstName] = useState('');
  const [confirmFirstName, setConfirmFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [confirmMiddleName, setConfirmMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [confirmLastName, setConfirmLastName] = useState('');

  const [gender, setGender] = useState('');
  const [confirmGender, setConfirmGender] = useState('');
  const [dobVal, setDobVal] = useState('');
  const [confirmDobVal, setConfirmDobVal] = useState('');

  const [fatherName, setFatherName] = useState('');
  const [confirmFatherName, setConfirmFatherName] = useState('');
  const [motherName, setMotherName] = useState('');
  const [confirmMotherName, setConfirmMotherName] = useState('');

  const [isSameAsCurrent, setIsSameAsCurrent] = useState<'true' | 'false'>('true');
  const [gazetteDoc, setGazetteDoc] = useState<File | null>(null);

  // --- Step 3 State: Aadhaar & Photo ID ---
  const [hasAadhaar, setHasAadhaar] = useState<'true' | 'false'>('true');
  const [aadhaarMasked, setAadhaarMasked] = useState('');
  const [confirmAadhaarMasked, setConfirmAadhaarMasked] = useState('');
  const [vidMasked, setVidMasked] = useState('');
  const [photoFile, setPhotoFile] = useState<File | string | null>(null);

  // CardFileUploader Demo State
  const [photoIdFileName, setPhotoIdFileName] = useState('');
  const [isPhotoIdUploading, setIsPhotoIdUploading] = useState(false);
  const [isPhotoIdUploaded, setIsPhotoIdUploaded] = useState(false);

  const [gazetteFileName, setGazetteFileName] = useState('');
  const [isGazetteUploading, setIsGazetteUploading] = useState(false);
  const [isGazetteUploaded, setIsGazetteUploaded] = useState(false);

  const [boardFileName, setBoardFileName] = useState('');
  const [isBoardDocUploading, setIsBoardDocUploading] = useState(false);
  const [isBoardDocUploaded, setIsBoardDocUploaded] = useState(false);

  // --- Step 4 State: Matriculation ---
  const [boardRollNo, setBoardRollNo] = useState('');
  const [confirmBoardRollNo, setConfirmBoardRollNo] = useState('');
  const [certIssueDate, setBoardIssueDate] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedBoard, setSelectedBoard] = useState('');
  const [gradingType, setGradingType] = useState<'marks' | 'cgpa'>('marks');
  const [marksPercentage, setMarksPercentage] = useState('');
  const [boardDoc, setBoardDoc] = useState<File | null>(null);

  const steps = [
    { label: '1. Auth & OTP' },
    { label: '2. Personal Identity' },
    { label: '3. Aadhaar & Photo ID' },
    { label: '4. Matriculation Board' },
    { label: '5. Review Summary' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 p-4 sm:p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Top Header Card */}
        <Card className="bg-white border border-slate-300 rounded-xl p-6 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-3">
                <Heading level={2} className="text-xl font-bold text-slate-900">
                  Universal Registration Scheme (URN) Form Controls Showcase
                </Heading>
                <Badge label="@astryxdesign/core v0.5.2" />
              </div>
              <Text className="mt-1 text-slate-600 text-sm">
                Isolated interactive environment testing all generic Astryx components with exact UPSC / Keycloak UI styling.
              </Text>
            </div>
            <HStack gap={2}>
              <Button
                label="Previous Step"
                variant="secondary"
                isDisabled={activeStep === 0}
                onClick={() => setActiveStep((prev) => Math.max(0, prev - 1))}
              >
                Back
              </Button>
              <Button
                label="Next Step"
                variant="primary"
                isDisabled={activeStep === steps.length - 1}
                onClick={() => setActiveStep((prev) => Math.min(steps.length - 1, prev + 1))}
              >
                Next
              </Button>
            </HStack>
          </div>
        </Card>

        {/* Step Stepper Navigation Bar */}
        <Card className="bg-white border border-slate-300 rounded-xl p-2 shadow-sm">
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            {steps.map((step, idx) => (
              <button
                key={idx}
                onClick={() => setActiveStep(idx)}
                className={`py-2.5 px-3 rounded-lg text-sm font-semibold transition-all text-center ${
                  activeStep === idx
                    ? 'bg-blue-600 text-white shadow-sm ring-2 ring-blue-600/30'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {step.label}
              </button>
            ))}
          </div>
        </Card>

        {/* =============================================================================
            STEP 1: AUTH & SECURITY OTP CONTROLS
            ============================================================================= */}
        {activeStep === 0 && (
          <div className="space-y-6">
            <Card className="bg-white border border-slate-300 rounded-xl p-6 shadow-sm">
              <VStack gap={4}>
                <div className="border-b pb-3">
                  <Heading level={3} className="text-lg font-bold text-slate-900">
                    Step 1: Mobile / Email OTP & Security Captcha Verification
                  </Heading>
                  <Text className="text-slate-600 text-sm">
                    Enter your registered mobile or email to generate OTP and verify security captcha code.
                  </Text>
                </div>

                {/* Login Tab Selector Buttons */}
                <div className="flex gap-2 border-b pb-4">
                  <button
                    onClick={() => setLoginTab('mobile')}
                    className={`px-4 py-2 text-sm font-semibold rounded-md transition-all ${
                      loginTab === 'mobile'
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-300'
                    }`}
                  >
                    Mobile OTP Login
                  </button>
                  <button
                    onClick={() => setLoginTab('email')}
                    className={`px-4 py-2 text-sm font-semibold rounded-md transition-all ${
                      loginTab === 'email'
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-300'
                    }`}
                  >
                    Email OTP Login
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {loginTab === 'mobile' ? (
                    <div>
                      <MaskedInput
                        label="Mobile Number *"
                        mask="#####-#####"
                        value={mobileVal}
                        onChange={(masked) => setMobileVal(masked)}
                        placeholder="10-digit mobile number"
                      />
                    </div>
                  ) : (
                    <div>
                      <TextInput
                        label="Email Address *"
                        type="email"
                        value={emailVal}
                        onChange={(val) => setEmailVal(val)}
                        placeholder="candidate@example.com"
                      />
                    </div>
                  )}

                  {/* Canvas Captcha Control */}
                  <div>
                    <CanvasCaptcha
                      value={captchaInput}
                      onChange={(val) => setCaptchaInput(val)}
                      onVerify={(isValid) => setIsCaptchaValid(isValid)}
                      helperText={
                        captchaInput
                          ? isCaptchaValid
                            ? '✅ Captcha code matched'
                            : '❌ Incorrect captcha code'
                          : 'Enter the 6-character code shown above'
                      }
                    />
                  </div>
                </div>

                <Divider />

                {/* OTP Input Primitive */}
                <div>
                  <label className="block text-sm font-semibold text-slate-800 mb-2">
                    Enter 6-Digit Verification OTP <span className="text-red-600">*</span>
                  </label>
                  <OtpInput
                    value={otpVal}
                    onChange={(val) => setOtpVal(val)}
                    onComplete={(val) => alert(`OTP complete: ${val}`)}
                    helperText={otpVal.length === 6 ? '✅ 6-digit OTP verified successfully' : 'Supports auto-advancing focus, paste, and backspace navigation'}
                  />
                </div>
              </VStack>
            </Card>

            {/* Field State Inspector */}
            <Card className="bg-white border border-slate-300 rounded-xl p-4 shadow-sm">
              <Heading level={4} className="text-sm font-bold text-slate-800">
                Live State Inspection
              </Heading>
              <div className="mt-2 p-3 bg-slate-900 text-slate-100 font-mono text-xs rounded-md space-y-1">
                <div>Login Mode: {loginTab}</div>
                <div>Mobile Number: "{mobileVal}"</div>
                <div>Email Address: "{emailVal}"</div>
                <div>OTP Code: "{otpVal}" (Length: {otpVal.length})</div>
                <div>Captcha Code: "{captchaInput}" | Valid: {isCaptchaValid ? 'TRUE' : 'FALSE'}</div>
              </div>
            </Card>
          </div>
        )}

        {/* =============================================================================
            STEP 2: PERSONAL IDENTITY FORM FIELDS
            ============================================================================= */}
        {activeStep === 1 && (
          <div className="space-y-6">
            <Card className="bg-white border border-slate-300 rounded-xl p-6 shadow-sm">
              <VStack gap={4}>
                <div className="border-b pb-3">
                  <Heading level={3} className="text-lg font-bold text-slate-900">
                    Step 2: Personal Identity Details
                  </Heading>
                  <Text className="text-slate-600 text-sm">
                    Provide your full legal name as printed on 10th Board Certificate along with confirmation fields.
                  </Text>
                </div>

                {/* Candidate Name Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <TextInput
                      label="First Name (as per 10th Class) *"
                      value={firstName}
                      onChange={(val) => setFirstName(val)}
                      placeholder="Enter First Name"
                    />
                  </div>
                  <div>
                    <TextInput
                      label="Confirm First Name *"
                      value={confirmFirstName}
                      onChange={(val) => setConfirmFirstName(val)}
                      placeholder="Re-enter First Name"
                    />
                  </div>

                  <div>
                    <TextInput
                      label="Middle Name (Optional)"
                      value={middleName}
                      onChange={(val) => setMiddleName(val)}
                      placeholder="Enter Middle Name"
                    />
                  </div>
                  <div>
                    <TextInput
                      label="Confirm Middle Name"
                      value={confirmMiddleName}
                      onChange={(val) => setConfirmMiddleName(val)}
                      placeholder="Re-enter Middle Name"
                    />
                  </div>

                  <div>
                    <TextInput
                      label="Last Name / Surname"
                      value={lastName}
                      onChange={(val) => setLastName(val)}
                      placeholder="Enter Last Name"
                    />
                  </div>
                  <div>
                    <TextInput
                      label="Confirm Last Name / Surname"
                      value={confirmLastName}
                      onChange={(val) => setConfirmLastName(val)}
                      placeholder="Re-enter Last Name"
                    />
                  </div>
                </div>

                <Divider />

                {/* Gender & DOB Pair Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Selector
                      label="Gender *"
                      placeholder="Select Gender..."
                      hasSearch={true}
                      searchPlaceholder="Search gender..."
                      options={[
                        { label: 'Male', value: 'M' },
                        { label: 'Female', value: 'F' },
                        { label: 'Transgender', value: 'T' },
                      ]}
                      value={gender}
                      onChange={(val) => setGender(val ?? '')}
                      status={gender ? { type: 'success' } : undefined}
                      isValid={Boolean(gender)}
                      showSuccessIcon={Boolean(gender)}
                      showSuccessBorder={Boolean(gender)}
                      checkmarkVariant="check"
                    />
                  </div>
                  <div>
                    <Selector
                      label="Confirm Gender *"
                      placeholder="Select Confirm Gender..."
                      hasSearch={true}
                      searchPlaceholder="Search gender..."
                      options={[
                        { label: 'Male', value: 'M' },
                        { label: 'Female', value: 'F' },
                        { label: 'Transgender', value: 'T' },
                      ]}
                      value={confirmGender}
                      onChange={(val) => setConfirmGender(val ?? '')}
                      status={confirmGender ? { type: 'success' } : undefined}
                      isValid={Boolean(confirmGender)}
                      showSuccessIcon={Boolean(confirmGender)}
                      showSuccessBorder={Boolean(confirmGender)}
                      checkmarkVariant="check"
                    />
                  </div>

                  <div>
                    <DateInput
                      label="Date of Birth *"
                      value={dobVal as any}
                      onChange={(val) => setDobVal(val ? String(val) : '')}
                      placeholder="__/__/____"
                      showCalendarIcon={false}
                      allowCalendarPopover={false}
                      displayFormat="DD/MM/YYYY"
                      allowFutureDates={false}
                      allowPastDates={true}
                      minYear={1900}
                      maxYear={new Date().getFullYear()}
                      description="Real-time auto-slash masking (__/__/____) in enter-only mode"
                    />
                  </div>
                  <div>
                    <DateInput
                      label="Confirm Date of Birth *"
                      value={confirmDobVal as any}
                      onChange={(val) => setConfirmDobVal(val ? String(val) : '')}
                      placeholder="__/__/____"
                      showCalendarIcon={false}
                      allowCalendarPopover={false}
                      displayFormat="DD/MM/YYYY"
                      allowFutureDates={false}
                      allowPastDates={true}
                      minYear={1900}
                      maxYear={new Date().getFullYear()}
                      description="Must match Date of Birth exactly"
                    />
                  </div>
                </div>

                <Divider />

                {/* Parents Name Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <TextInput
                      label="Father's Name *"
                      value={fatherName}
                      onChange={(val) => setFatherName(val)}
                      placeholder="Enter Father's Name"
                    />
                  </div>
                  <div>
                    <TextInput
                      label="Confirm Father's Name *"
                      value={confirmFatherName}
                      onChange={(val) => setConfirmFatherName(val)}
                      placeholder="Re-enter Father's Name"
                    />
                  </div>

                  <div>
                    <TextInput
                      label="Mother's Name *"
                      value={motherName}
                      onChange={(val) => setMotherName(val)}
                      placeholder="Enter Mother's Name"
                    />
                  </div>
                  <div>
                    <TextInput
                      label="Confirm Mother's Name *"
                      value={confirmMotherName}
                      onChange={(val) => setConfirmMotherName(val)}
                      placeholder="Re-enter Mother's Name"
                    />
                  </div>
                </div>

                <Divider />

                {/* Name Change Radio & Gazette PDF Upload */}
                <div className="space-y-4">
                    <RadioList
                      label="Is the above name the same as the name printed on the 10th Class/ Matriculation/ Equivalent Board Examination Certificate issued by the Examination Board? *"
                      variant="boxed"
                      labelPosition="left"
                      orientation="horizontal"
                      value={isSameAsCurrent}
                      onChange={(val) => setIsSameAsCurrent(val as 'true' | 'false')}
                      boxedBgColor="#F1F6FF"
                      boxedBorderColor="#2b66b1"
                    >
                      <RadioListItem label="Yes" value="true" />
                      <RadioListItem label="No" value="false" />
                    </RadioList>

                  {isSameAsCurrent === 'false' && (
                    <div className="space-y-3 pt-2">
                      <CardFileUploader
                        title="Change Name Gazette document"
                        selectStyle="pill"
                        fileName={gazetteFileName}
                        isUploading={isGazetteUploading}
                        isUploaded={isGazetteUploaded}
                        notes={[
                          'Allowed Document size : 50 KB to 300 KB, File format: pdf',
                          'File name should be name_change',
                        ]}
                        allowedExtensions={['pdf']}
                        requiredFileName="name_change"
                        minSizeKB={50}
                        maxSizeKB={300}
                        uploadButtonText="Upload Gazette document"
                        uploadWarningText="Please Press the button to upload Gazette Document"
                        guidelinesText="View guidelines for uploading Gazette document"
                        onFileSelect={(file) => {
                          setGazetteFileName(file ? file.name : '');
                          setIsGazetteUploaded(false);
                        }}
                        onUpload={() => {
                          setIsGazetteUploading(true);
                          setTimeout(() => {
                            setIsGazetteUploading(false);
                            setIsGazetteUploaded(true);
                          }, 1000);
                        }}
                        onViewGuidelines={() => alert('Viewing Gazette document upload guidelines')}
                      />
                    </div>
                  )}
                </div>
              </VStack>
            </Card>

            {/* Field State Inspector */}
            <Card className="bg-white border border-slate-300 rounded-xl p-4 shadow-sm">
              <Heading level={4} className="text-sm font-bold text-slate-800">
                Live State Inspection
              </Heading>
              <div className="mt-2 p-3 bg-slate-900 text-slate-100 font-mono text-xs rounded-md space-y-1">
                <div>Full Name: "{firstName} {middleName} {lastName}"</div>
                <div>Confirmed Name: "{confirmFirstName} {confirmMiddleName} {confirmLastName}"</div>
                <div>Gender: "{gender}" | Confirmed Gender: "{confirmGender}"</div>
                <div>DOB: "{dobVal}" | Confirmed DOB: "{confirmDobVal}"</div>
                <div>Parents: Father="{fatherName}", Mother="{motherName}"</div>
                <div>Gazette Upload: {gazetteDoc ? `${gazetteDoc.name} (${(gazetteDoc.size / 1024).toFixed(1)} KB)` : 'None'}</div>
              </div>
            </Card>
          </div>
        )}

        {/* =============================================================================
            STEP 3: AADHAAR & PHOTO ID CONTROLS
            ============================================================================= */}
        {activeStep === 2 && (
          <div className="space-y-6">
            <Card className="bg-white border border-slate-300 rounded-xl p-6 shadow-sm">
              <VStack gap={4}>
                <div className="border-b pb-3">
                  <Heading level={3} className="text-lg font-bold text-slate-900">
                    Step 3: Aadhaar Masked Verification & Candidate Photo Upload
                  </Heading>
                  <Text className="text-slate-600 text-sm">
                    Enter 12-digit Aadhaar / 16-digit Virtual ID (VID) and upload recent passport photo.
                  </Text>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-800 mb-2">
                      Do you possess Aadhaar Number / Virtual ID (VID)? <span className="text-red-600">*</span>
                    </label>
                    <div className="flex gap-6 items-center">
                      <label className="flex items-center gap-2 cursor-pointer font-medium text-sm text-slate-800">
                        <input
                          type="radio"
                          name="hasAadhaar"
                          checked={hasAadhaar === 'true'}
                          onChange={() => setHasAadhaar('true')}
                          className="w-4 h-4 text-blue-600"
                        />
                        Yes, I have Aadhaar
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer font-medium text-sm text-slate-800">
                        <input
                          type="radio"
                          name="hasAadhaar"
                          checked={hasAadhaar === 'false'}
                          onChange={() => setHasAadhaar('false')}
                          className="w-4 h-4 text-blue-600"
                        />
                        No Aadhaar / Use Other Photo ID
                      </label>
                    </div>
                  </div>

                  {hasAadhaar === 'true' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                      <div>
                        <MaskedInput
                          label="12-Digit Aadhaar Number *"
                          mask="####-####-####"
                          value={aadhaarMasked}
                          onChange={(masked) => setAadhaarMasked(masked)}
                          placeholder="XXXX-XXXX-XXXX"
                        />
                      </div>
                      <div>
                        <MaskedInput
                          label="Confirm 12-Digit Aadhaar Number *"
                          mask="####-####-####"
                          value={confirmAadhaarMasked}
                          onChange={(masked) => setConfirmAadhaarMasked(masked)}
                          placeholder="XXXX-XXXX-XXXX"
                        />
                      </div>

                      <div className="md:col-span-2">
                        <MaskedInput
                          label="Alternative 16-Digit Virtual ID (VID)"
                          mask="####-####-####-####"
                          value={vidMasked}
                          onChange={(masked) => setVidMasked(masked)}
                          placeholder="XXXX-XXXX-XXXX-XXXX"
                        />
                      </div>
                    </div>
                  )}
                </div>

                <Divider />

                {/* Candidate Image Uploader */}
                <div>
                  <label className="block text-sm font-semibold text-slate-800 mb-2">
                    Candidate Passport Photo Upload <span className="text-red-600">*</span>
                  </label>
                  <ImageUploader
                    value={photoFile}
                    onChange={(file) => setPhotoFile(file)}
                    accept="image/jpeg, image/png, image/jpg"
                    minSizeKB={20}
                    maxSizeKB={300}
                    guidelineSlot={
                      <div className="p-3 bg-blue-50 border border-blue-200 rounded-md text-blue-900 text-xs mb-3">
                        📷 <strong>Photo Guidelines:</strong> Recent colored passport photo with clear white background. File size between 20 KB and 300 KB.
                      </div>
                    }
                    helperText="Drag & drop or click to upload photo. Click thumbnail to preview full image."
                  />
                </div>

                <Divider />

                {/* Candidate Photo ID Card Uploader (Boxed Card Uploader) */}
                <div>
                  <CardFileUploader
                    title="Upload Photo ID Card"
                    selectStyle="pill"
                    fileName={photoIdFileName}
                    isUploading={isPhotoIdUploading}
                    isUploaded={isPhotoIdUploaded}
                    notes={[
                      'Allowed Photo ID Card size : 20 KB to 200 KB, File format: jpg',
                      'File name should be id_card',
                    ]}
                    allowedExtensions={['jpg', 'jpeg']}
                    requiredFileName="id_card"
                    minSizeKB={20}
                    maxSizeKB={200}
                    uploadButtonText="Upload Photo ID Card"
                    uploadWarningText="Please press this button Upload Photo ID Card"
                    guidelinesText="View guidelines for uploading Photo ID Card"
                    onFileSelect={(file) => {
                      setPhotoIdFileName(file ? file.name : '');
                      setIsPhotoIdUploaded(false);
                    }}
                    onUpload={() => {
                      setIsPhotoIdUploading(true);
                      setTimeout(() => {
                        setIsPhotoIdUploading(false);
                        setIsPhotoIdUploaded(true);
                      }, 1000);
                    }}
                    onViewGuidelines={() => alert('Viewing Photo ID Card upload guidelines')}
                  />
                </div>
              </VStack>
            </Card>

            {/* Field State Inspector */}
            <Card className="bg-white border border-slate-300 rounded-xl p-4 shadow-sm">
              <Heading level={4} className="text-sm font-bold text-slate-800">
                Live State Inspection
              </Heading>
              <div className="mt-2 p-3 bg-slate-900 text-slate-100 font-mono text-xs rounded-md space-y-1">
                <div>Has Aadhaar: {hasAadhaar}</div>
                <div>Aadhaar Display: "{aadhaarMasked}" | Confirmed: "{confirmAadhaarMasked}"</div>
                <div>Virtual ID (VID): "{vidMasked}"</div>
                <div>Photo File: {photoFile instanceof File ? `${photoFile.name} (${(photoFile.size / 1024).toFixed(1)} KB)` : 'None'}</div>
              </div>
            </Card>
          </div>
        )}

        {/* =============================================================================
            STEP 4: MATRICULATION BOARD FIELDS
            ============================================================================= */}
        {activeStep === 3 && (
          <div className="space-y-6">
            <Card className="bg-white border border-slate-300 rounded-xl p-6 shadow-sm">
              <VStack gap={4}>
                <div className="border-b pb-3">
                  <Heading level={3} className="text-lg font-bold text-slate-900">
                    Step 4: Matriculation / Class 10th Board Details
                  </Heading>
                  <Text className="text-slate-600 text-sm">
                    Enter 10th class roll number, education board, and upload scanned 10th certificate PDF.
                  </Text>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <TextInput
                      label="Class 10th Roll Number *"
                      value={boardRollNo}
                      onChange={(val) => setBoardRollNo(val)}
                      placeholder="e.g. 21639018"
                    />
                  </div>
                  <div>
                    <TextInput
                      label="Confirm Class 10th Roll Number *"
                      value={confirmBoardRollNo}
                      onChange={(val) => setConfirmBoardRollNo(val)}
                      placeholder="Re-enter 10th Roll Number"
                    />
                  </div>

                  <div>
                    <DateInput
                      label="Certificate / Marksheet Issue Date *"
                      value={certIssueDate as any}
                      onChange={(val) => setBoardIssueDate(val ? String(val) : '')}
                      placeholder="__/__/____"
                      showCalendarIcon={false}
                      allowCalendarPopover={false}
                      displayFormat="DD/MM/YYYY"
                      allowFutureDates={false}
                      allowPastDates={true}
                      description="Date printed on 10th Board certificate"
                    />
                  </div>

                  <div>
                    <Selector
                      label="State / UT of School *"
                      placeholder="Select State..."
                      hasSearch={true}
                      searchPlaceholder="Search State..."
                      options={[
                        { label: 'Delhi (NCT)', value: 'DL' },
                        { label: 'Maharashtra', value: 'MH' },
                        { label: 'Uttar Pradesh', value: 'UP' },
                        { label: 'Karnataka', value: 'KA' },
                        { label: 'Tamil Nadu', value: 'TN' },
                        { label: 'Central Board / Others', value: 'CBSE' },
                      ]}
                      value={selectedState}
                      onChange={(val) => setSelectedState(val ?? '')}
                      isValid={Boolean(selectedState)}
                      showSuccessIcon={Boolean(selectedState)}
                      showSuccessBorder={Boolean(selectedState)}
                    />
                  </div>

                  <div className="md:col-span-2">
                    <Selector
                      label="Class 10th Education Board *"
                      placeholder="Select Education Board..."
                      hasSearch={true}
                      searchPlaceholder="Search Education Board..."
                      options={[
                        { label: 'Central Board of Secondary Education (CBSE)', value: 'CBSE' },
                        { label: 'Indian Certificate of Secondary Education (ICSE)', value: 'ICSE' },
                        { label: 'National Institute of Open Schooling (NIOS)', value: 'NIOS' },
                        { label: 'State Board of High School and Intermediate Education', value: 'STATE' },
                      ]}
                      value={selectedBoard}
                      onChange={(val) => setSelectedBoard(val ?? '')}
                      isValid={Boolean(selectedBoard)}
                      showSuccessIcon={Boolean(selectedBoard)}
                      showSuccessBorder={Boolean(selectedBoard)}
                    />
                  </div>
                </div>

                <div className="flex gap-4 items-center border p-3.5 rounded-lg bg-slate-50 border-slate-300">
                  <Text className="font-semibold text-sm text-slate-800">Grading System:</Text>
                  <button
                    onClick={() => setGradingType('marks')}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${
                      gradingType === 'marks'
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-100'
                    }`}
                  >
                    Marks Percentage (%)
                  </button>
                  <button
                    onClick={() => setGradingType('cgpa')}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${
                      gradingType === 'cgpa'
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-100'
                    }`}
                  >
                    CGPA Grade Points
                  </button>
                </div>

                <div>
                  <TextInput
                    label={gradingType === 'marks' ? 'Percentage of Marks Obtained (%) *' : 'Cumulative Grade Point Average (CGPA) *'}
                    value={marksPercentage}
                    onChange={(val) => setMarksPercentage(val)}
                    placeholder={gradingType === 'marks' ? 'e.g. 88.5' : 'e.g. 9.2'}
                  />
                </div>

                <Divider />

                {/* Class 10th Board Certificate Card Uploader */}
                <div>
                  <CardFileUploader
                    title="10th Class/ Matriculation/ Equivalent Board Examination Certificate"
                    selectStyle="pill"
                    fileName={boardFileName}
                    isUploading={isBoardDocUploading}
                    isUploaded={isBoardDocUploaded}
                    notes={[
                      'Allowed 10th Class/ Matriculation/ Equivalent Board Examination Certificate file size : 50 KB to 300 KB, File format : pdf',
                      'File name should be board_certificate.pdf',
                    ]}
                    allowedExtensions={['pdf']}
                    requiredFileName="board_certificate"
                    minSizeKB={50}
                    maxSizeKB={300}
                    uploadButtonText={isBoardDocUploaded ? 'Update Certificate' : 'Upload Certificate'}
                    uploadWarningText="Please press this button to upload 10th Certificate"
                    guidelinesText="View guidelines for uploading 10th Certificate"
                    extraActionsSlot={
                      <div className="flex flex-col items-center gap-2 mt-3 pt-2">
                        <span className="text-xs font-bold text-red-600 font-mono">'OR'</span>
                        <button
                          type="button"
                          onClick={() => alert('Fetching 10th Certificate from DigiLocker...')}
                          className="px-5 py-2 bg-[#2b66b1] hover:bg-[#1e4e8c] text-white rounded-full text-xs font-semibold shadow-sm transition-all flex items-center gap-2"
                        >
                          <span className="text-sm">🔒</span> Fetch 10th Class/ Matriculation/ Equivalent Board Certificate from DigiLocker
                        </button>
                      </div>
                    }
                    onFileSelect={(file) => {
                      setBoardFileName(file ? file.name : '');
                      setIsBoardDocUploaded(false);
                    }}
                    onUpload={() => {
                      setIsBoardDocUploading(true);
                      setTimeout(() => {
                        setIsBoardDocUploading(false);
                        setIsBoardDocUploaded(true);
                      }, 1000);
                    }}
                    onViewGuidelines={() => alert('Viewing 10th Board Certificate guidelines')}
                  />
                </div>
              </VStack>
            </Card>

            {/* Field State Inspector */}
            <Card className="bg-white border border-slate-300 rounded-xl p-4 shadow-sm">
              <Heading level={4} className="text-sm font-bold text-slate-800">
                Live State Inspection
              </Heading>
              <div className="mt-2 p-3 bg-slate-900 text-slate-100 font-mono text-xs rounded-md space-y-1">
                <div>Roll Number: "{boardRollNo}" | Confirmed: "{confirmBoardRollNo}"</div>
                <div>Issue Date: "{certIssueDate}"</div>
                <div>State: "{selectedState}" | Board: "{selectedBoard}"</div>
                <div>Score: {gradingType.toUpperCase()} = "{marksPercentage}"</div>
                <div>Board Certificate File: {boardDoc ? `${boardDoc.name} (${(boardDoc.size / 1024).toFixed(1)} KB)` : 'None'}</div>
              </div>
            </Card>
          </div>
        )}

        {/* =============================================================================
            STEP 5: CONSOLIDATED REVIEW SUMMARY GRID
            ============================================================================= */}
        {activeStep === 4 && (
          <div className="space-y-6">
            <Card className="bg-white border border-slate-300 rounded-xl p-6 shadow-sm">
              <VStack gap={4}>
                <div className="border-b pb-3">
                  <Heading level={3} className="text-lg font-bold text-slate-900">
                    Step 5: Review & Confirm Application Summary
                  </Heading>
                  <Text className="text-slate-600 text-sm">
                    Verify all candidate information before locking and submitting URN application.
                  </Text>
                </div>

                {/* Identity Summary Card */}
                <KeyValueGrid
                  title="1. Personal Identity Details"
                  columns={3}
                  actionSlot={
                    <Button label="Edit Identity" size="sm" variant="secondary" onClick={() => setActiveStep(1)}>
                      Edit Section
                    </Button>
                  }
                  items={[
                    { label: 'First Name', value: firstName || '-' },
                    { label: 'Middle Name', value: middleName || '-' },
                    { label: 'Last Name', value: lastName || '-' },
                    { label: 'Gender', value: gender || '-' },
                    { label: 'Date of Birth', value: dobVal || '-' },
                    { label: 'Father\'s Name', value: fatherName || '-' },
                    { label: 'Mother\'s Name', value: motherName || '-' },
                    { label: 'Name Same as 10th', value: isSameAsCurrent === 'true' ? 'Yes' : 'No' },
                    { label: 'Gazette Proof', value: gazetteDoc ? gazetteDoc.name : 'Not Uploaded' },
                  ]}
                />

                {/* Aadhaar Summary Card */}
                <KeyValueGrid
                  title="2. Aadhaar & Photo ID Details"
                  columns={2}
                  actionSlot={
                    <Button label="Edit Aadhaar" size="sm" variant="secondary" onClick={() => setActiveStep(2)}>
                      Edit Section
                    </Button>
                  }
                  items={[
                    { label: 'Has Aadhaar', value: hasAadhaar === 'true' ? 'Yes' : 'No' },
                    { label: 'Aadhaar Number', value: aadhaarMasked || '-' },
                    { label: 'Virtual ID (VID)', value: vidMasked || '-' },
                    { label: 'Candidate Photo', value: photoFile instanceof File ? photoFile.name : 'Not Uploaded' },
                  ]}
                />

                {/* Matriculation Summary Card */}
                <KeyValueGrid
                  title="3. Class 10th Board Details"
                  columns={3}
                  actionSlot={
                    <Button label="Edit Matriculation" size="sm" variant="secondary" onClick={() => setActiveStep(3)}>
                      Edit Section
                    </Button>
                  }
                  items={[
                    { label: 'Roll Number', value: boardRollNo || '-' },
                    { label: 'Issue Date', value: certIssueDate || '-' },
                    { label: 'State of School', value: selectedState || '-' },
                    { label: 'Education Board', value: selectedBoard || '-' },
                    { label: 'Score System', value: `${gradingType.toUpperCase()}: ${marksPercentage || '-'}` },
                    { label: 'Board Certificate', value: boardDoc ? boardDoc.name : 'Not Uploaded' },
                  ]}
                />
              </VStack>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
