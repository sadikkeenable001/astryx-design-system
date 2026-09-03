'use client';

/**
 * @file ShowcaseClient.tsx
 * @description Isolated interactive showcase page testing all Astryx Design System form controls
 * structured strictly matching the urn-keycloak application presentation, field layouts, and sharp styling.
 */

import { useState } from 'react';
import {
  SideNav,
  SideNavSection,
  SideNavItem,
  IconButton,
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
  formatDateWithWords,
  Button,
  Card,
  Badge,
  HStack,
  VStack,
  Text,
  Heading,
  Divider,
  CheckboxInput,
} from '@astryxdesign/core';

// Helper Icons for Wizard Sidebar
// Exact 1:1 Icons from urn-keycloak production
const CheckIcon = () => (
  <svg className="w-4 h-4 text-green-700 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
);

const LockIcon = () => (
  <svg className="w-4 h-4 text-slate-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 00-2 2zm10-10V7a4 4 0 00-8 0v4h8z" />
  </svg>
);

const UserStepIcon = ({ isCompleted, isActive }: { isCompleted?: boolean; isActive?: boolean }) => (
  <svg width="20" height="20" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12.2158 12.8806C12.1453 12.8705 12.0546 12.8705 11.9739 12.8806C10.2001 12.8202 8.78906 11.3688 8.78906 9.58488C8.78906 7.76063 10.2606 6.27905 12.0949 6.27905C13.9191 6.27905 15.4007 7.76063 15.4007 9.58488C15.3906 11.3688 13.9897 12.8202 12.2158 12.8806Z" stroke={isCompleted ? "#15803d" : isActive ? "#1453a3" : "#475569"} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M18.8874 19.5327C17.0934 21.1755 14.7148 22.1733 12.0943 22.1733C9.47387 22.1733 7.09529 21.1755 5.30127 19.5327C5.40206 18.5853 6.00678 17.6581 7.08521 16.9324C9.84678 15.0981 14.3621 15.0981 17.1035 16.9324C18.1819 17.6581 18.7866 18.5853 18.8874 19.5327Z" stroke={isCompleted ? "#15803d" : isActive ? "#1453a3" : "#475569"} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12.0944 22.1732C17.6607 22.1732 22.1731 17.6608 22.1731 12.0945C22.1731 6.52815 17.6607 2.01575 12.0944 2.01575C6.52803 2.01575 2.01562 6.52815 2.01562 12.0945C2.01562 17.6608 6.52803 22.1732 12.0944 22.1732Z" stroke={isCompleted ? "#15803d" : isActive ? "#1453a3" : "#475569"} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const IdCardStepIcon = ({ isCompleted, isActive }: { isCompleted?: boolean; isActive?: boolean }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M14 3.5H10C6.22876 3.5 4.34315 3.5 3.17157 4.67157C2 5.84315 2 7.72876 2 11.5V12.5C2 16.2712 2 18.1569 3.17157 19.3284C4.34315 20.5 6.22876 20.5 10 20.5H14C17.7712 20.5 19.6569 20.5 20.8284 19.3284C22 18.1569 22 16.2712 22 12.5V11.5C22 7.72876 22 5.84315 20.8284 4.67157C19.6569 3.5 17.7712 3.5 14 3.5Z" stroke={isCompleted ? "#15803d" : isActive ? "#1453a3" : "#475569"} strokeWidth="1.6" strokeLinejoin="round"/>
    <path d="M5 16C6.03569 13.4189 9.89616 13.2491 11 16" stroke={isCompleted ? "#15803d" : isActive ? "#1453a3" : "#475569"} strokeWidth="1.6" strokeLinecap="round"/>
    <path d="M9.75 9.75C9.75 10.7165 8.9665 11.5 8 11.5C7.0335 11.5 6.25 10.7165 6.25 9.75C6.25 8.7835 7.0335 8 8 8C8.9665 8 9.75 8.7835 9.75 9.75Z" stroke={isCompleted ? "#15803d" : isActive ? "#1453a3" : "#475569"} strokeWidth="1.6"/>
    <path d="M14 8.5H19M14 12H19M14 15.5H16.5" stroke={isCompleted ? "#15803d" : isActive ? "#1453a3" : "#475569"} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const GraduationStepIcon = ({ isCompleted, isActive }: { isCompleted?: boolean; isActive?: boolean }) => (
  <svg width="20" height="20" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.1731 4.89571V17.0608C22.1731 18.0283 21.387 18.9354 20.4194 19.0563L20.0868 19.0967C17.8896 19.389 14.5032 20.5077 12.568 21.576C12.306 21.7272 11.8726 21.7272 11.6005 21.576L11.5602 21.5559C9.62504 20.4976 6.24873 19.389 4.06164 19.0967L3.76932 19.0563C2.80176 18.9354 2.01562 18.0283 2.01562 17.0608V4.88562C2.01562 3.68625 2.99324 2.77918 4.19261 2.87997C6.30914 3.0513 9.51418 4.11968 11.3082 5.23842L11.5602 5.38956C11.8524 5.57098 12.3363 5.57098 12.6286 5.38956L12.7999 5.27871C13.4348 4.88564 14.2411 4.49256 15.118 4.13981V8.25195L17.1337 6.91146L19.1495 8.25195V2.99088C19.4216 2.94048 19.6837 2.91021 19.9256 2.89005H19.986C21.1854 2.78927 22.1731 3.68626 22.1731 4.89571Z" stroke={isCompleted ? "#15803d" : isActive ? "#1453a3" : "#475569"} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12.0947 5.72217V20.8403" stroke={isCompleted ? "#15803d" : isActive ? "#1453a3" : "#475569"} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const EyeStepIcon = ({ isCompleted, isActive }: { isCompleted?: boolean; isActive?: boolean }) => (
  <svg width="20" height="20" viewBox="0 0 24 26" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M11 20.4126H21" stroke={isCompleted ? "#15803d" : isActive ? "#1453a3" : "#475569"} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M11 13.4126H21" stroke={isCompleted ? "#15803d" : isActive ? "#1453a3" : "#475569"} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M11 6.4126H21" stroke={isCompleted ? "#15803d" : isActive ? "#1453a3" : "#475569"} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M3 6.4126L4 7.4126L7 4.4126" stroke={isCompleted ? "#15803d" : isActive ? "#1453a3" : "#475569"} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M3 13.4126L4 14.4126L7 11.4126" stroke={isCompleted ? "#15803d" : isActive ? "#1453a3" : "#475569"} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M3 20.4126L4 21.4126L7 18.4126" stroke={isCompleted ? "#15803d" : isActive ? "#1453a3" : "#475569"} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const InfoTrigger = ({ pdfUrl, isCompleted }: { pdfUrl: string; isCompleted?: boolean }) => (
  <IconButton
    label="Click for instructions"
    variant="ghost"
    size="sm"
    onClick={(e) => {
      e.stopPropagation();
      window.open(pdfUrl, '_blank');
    }}
    icon={
      <svg width="18" height="18" viewBox="0 0 568 568" fill="none" className="shrink-0">
        <circle cx="284" cy="284" r="284" fill={isCompleted ? "#15803d" : "#195893"}/>
        <path d="M252.321 252.5C242.321 256.5 217.321 285.167 211.321 294C204.921 296.4 200.655 295 199.321 294C189.822 287.5 208.323 238 276.321 214.5C344.319 191.001 346.821 233 342.321 252.5C337.821 272 295.821 384.5 289.821 396.5C283.821 408.5 288.321 412 295.821 411C303.321 410 323.321 389.5 334.821 374.5C346.321 359.5 354.821 370 350.821 384.5C317.321 437 274.321 459 228.821 454.5C192.421 450.9 207.321 395 219.321 367.5L255.321 278C261.988 264.5 262.321 248.5 252.321 252.5Z" fill="white"/>
        <path d="M370.322 153.5C370.322 175.315 352.638 193 330.822 193C309.007 193 291.322 175.315 291.322 153.5C291.322 131.685 312.007 112 333.822 112C355.638 112 370.322 131.685 370.322 153.5Z" fill="white"/>
      </svg>
    }
  />
);

function RegistrationStepperIllustration({ step }: { step: number }) {
  return (
    <div className="hidden md:flex flex-col items-center justify-center p-6 bg-gradient-to-br from-blue-50 to-slate-100 border border-[#d9e2f2] rounded-2xl h-full min-h-[340px]">
      <svg className="w-56 h-56 text-[#195992]" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="100" cy="100" r="80" fill="#EBF3FA" />
        <rect x="50" y="45" width="100" height="110" rx="12" fill="white" stroke="#195992" strokeWidth="4" />
        <circle cx="100" cy="75" r="18" fill="#195992" />
        <path d="M70 125C70 110 83 105 100 105C117 105 130 110 130 125" stroke="#195992" strokeWidth="4" strokeLinecap="round" />
        <rect x="65" y="133" width="70" height="6" rx="3" fill="#2563EB" />
        <rect x="75" y="143" width="50" height="4" rx="2" fill="#93C5FD" />
        {step >= 2 && (
          <g transform="translate(130, 40)">
            <circle cx="20" cy="20" r="22" fill="#2563EB" />
            <path d="M12 20L18 26L28 14" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          </g>
        )}
      </svg>
      <Text className="mt-4 font-bold text-[#195992] text-sm text-center">
        {step === 2 && "Email ID Verification & Security Check"}
        {step === 3 && "Mobile Number SMS Verification"}
        {step === 4 && "Password Security & Account Creation"}
      </Text>
    </div>
  );
}

function OtrAccountCreationView({ onProceedToRegistration }: { onProceedToRegistration: () => void }) {
  const [otrStep, setOtrStep] = useState<number>(1);
  
  // Step 1 states
  const [step1Accepted, setStep1Accepted] = useState(false);

  // Email states
  const [email, setEmail] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');
  const [emailOwnershipAccepted, setEmailOwnershipAccepted] = useState(false);
  const [isEmailOtpSent, setIsEmailOtpSent] = useState(false);
  const [emailOtp, setEmailOtp] = useState('');
  const [emailTimer, setEmailTimer] = useState(60);

  // Mobile states
  const [mobile, setMobile] = useState('');
  const [confirmMobile, setConfirmMobile] = useState('');
  const [mobileOwnershipAccepted, setMobileOwnershipAccepted] = useState(false);
  const [isMobileOtpSent, setIsMobileOtpSent] = useState(false);
  const [mobileOtp, setMobileOtp] = useState('');
  const [mobileTimer, setMobileTimer] = useState(60);

  // Password states
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordAccepted, setPasswordAccepted] = useState(false);
  const [otrId, setOtrId] = useState('');

  const steps = [
    { number: 1, label: 'Instructions' },
    { number: 2, label: 'Verify Email ID' },
    { number: 3, label: 'Verify Mobile Number' },
    { number: 4, label: 'Create Password' },
  ];

  return (
    <div className="space-y-6">
      {/* Registration Stepper Bar */}
      <Card className="bg-white border border-[#d9e2f2] rounded-2xl p-4 md:p-6 shadow-sm">
        <div className="relative">
          {/* Base grey line */}
          <div className="absolute left-[12%] right-[12%] top-[14px] h-[2px] bg-slate-300" />
          {/* Progress blue line */}
          <div
            className="absolute top-[14px] h-[2px] bg-[#0b4fb3] transition-all duration-300"
            style={{
              left: '12%',
              right: otrStep <= 1 ? '88%' : otrStep === 2 ? '62.7%' : otrStep === 3 ? '37.3%' : '12%',
            }}
          />

          <div className="relative flex items-start justify-between">
            {steps.map((step) => {
              const isCurrent = otrStep === step.number;
              const isCompleted = otrStep > step.number;

              return (
                <div key={step.number} className="flex flex-1 flex-col items-center">
                  <div
                    className={`relative z-10 flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold ${
                      isCurrent
                        ? 'bg-[#0b4fb3] text-white'
                        : isCompleted
                          ? 'bg-[#4CAF50] text-white'
                          : 'bg-white border-[4px] border-[#0b4fb3] text-slate-700'
                    }`}
                  >
                    {isCompleted ? '✓' : step.number}
                  </div>
                  <span className={`mt-2 text-center text-xs font-semibold md:text-sm ${isCurrent || isCompleted ? 'text-[#0b4fb3]' : 'text-slate-500'}`}>
                    {step.number}. {step.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </Card>

      {/* STEP 1: INSTRUCTIONS */}
      {otrStep === 1 && (
        <Card className="bg-white border border-[#d9e2f2] rounded-2xl p-6 md:p-8 shadow-md space-y-6">
          <div className="text-center">
            <Heading level={2} className="text-lg md:text-xl font-bold text-[#195992]">
              Step 1: Instructions for creating your account
            </Heading>
            <div className="mt-2 h-[2px] w-full bg-[#9aadc5]" />
          </div>

          <div className="mt-4 text-sm leading-relaxed text-[#111827] md:text-base">
            <ol className="list-decimal space-y-3 pl-5 text-slate-800">
              <li>
                You should have an email ID and mobile number for account creation over which you will receive OTP for verification.
              </li>
              <li>
                After successful verification of an email ID and mobile number, you have to create a password which shall be of minimum 8 characters long comprising at least one upper case (eg. A–Z) &amp; one lower case (eg. a–z) alphabet, one number (eg. 0–9) and one special character (eg. *, @, # etc.).
              </li>
              <li>
                All correspondence with and from UPSC will be made only through this email ID and mobile number. Therefore, you are advised to keep the details as your permanent record and ensure that both remain active and accessible at all times for all future applications.
              </li>
            </ol>
          </div>

          {/* Declaration Box using Astryx CheckboxInput with variant="card" */}
          <div className="mt-6">
            <CheckboxInput
              variant="card"
              boxedBgColor="#fff8e5"
              boxedBorderColor="#f0c36d"
              boxedHoverBgColor="#fff3cc"
              boxedHoverBorderColor="#f0a500"
              boxedRadius="12px"
              boxedPadding="12px 16px"
              label="I hereby declare that I have read and understood the above Instructions carefully and I accept all the terms and conditions mentioned hereinabove."
              value={step1Accepted}
              onChange={(checked) => setStep1Accepted(checked)}
              isRequired
            />
          </div>

          {/* Centered Astryx Button */}
          <div className="pt-4 flex items-center justify-center">
            <Button
              label="Proceed for Account Creation"
              variant="primary"
              isDisabled={!step1Accepted}
              onClick={() => setOtrStep(2)}
            />
          </div>
        </Card>
      )}

      {/* STEP 2: VERIFY EMAIL ID */}
      {otrStep === 2 && (
        <Card className="bg-white border border-[#d9e2f2] rounded-2xl p-6 md:p-8 shadow-md">
          <div className="grid gap-6 md:grid-cols-2 md:items-center">
            {/* Left Column: Illustration */}
            <RegistrationStepperIllustration step={2} />

            {/* Right Column: Form */}
            <div className="space-y-4">
              <div>
                <div className="flex justify-center md:justify-start">
                  <Heading level={2} className="text-lg md:text-xl font-bold text-[#195992]">
                    Step 2 : Verify Email ID
                  </Heading>
                </div>
                <div className="mt-2 h-[2px] w-full bg-[#9aadc5]" />
              </div>

              {/* Email ID Astryx TextInput */}
              <TextInput
                label="Email ID *"
                type="email"
                placeholder="Enter Email ID"
                value={email}
                isReadOnly={isEmailOtpSent}
                onChange={(val) => setEmail(val)}
                startIcon={
                  <svg className="h-5 w-5 text-[#195992]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <circle cx="12" cy="12" r="10" />
                    <circle cx="12" cy="9" r="3" />
                    <path d="M7 18c0-3 10-3 10 0" />
                  </svg>
                }
              />

              {/* Confirm Email ID Astryx TextInput */}
              <TextInput
                label="Confirm Email ID *"
                type="email"
                placeholder="Re-enter Email ID"
                value={confirmEmail}
                isReadOnly={isEmailOtpSent}
                onChange={(val) => setConfirmEmail(val)}
                startIcon={
                  <svg className="h-5 w-5 text-[#195992]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <circle cx="12" cy="12" r="10" />
                    <circle cx="12" cy="9" r="3" />
                    <path d="M7 18c0-3 10-3 10 0" />
                  </svg>
                }
              />

              {/* Captcha section before OTP sent */}
              {!isEmailOtpSent && (
                <div className="pt-1 space-y-3">
                  <CanvasCaptcha
                    label="CAPTCHA (as shown below) *"
                    codeLength={5}
                    onVerify={(isValid) => {}}
                  />
                </div>
              )}

              {/* OTP section when sent */}
              {isEmailOtpSent && (
                <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl space-y-4">
                  <Text className="text-sm font-semibold text-emerald-900">
                    ✓ 6-Digit Verification OTP sent to <b>{email}</b>
                  </Text>
                  <OtpInput
                    length={6}
                    value={emailOtp}
                    onChange={(val) => setEmailOtp(val)}
                    label="Enter 6-Digit Email OTP *"
                  />
                  <div className="flex items-center justify-between text-xs text-slate-600">
                    <span>Resend OTP available in: <b>{emailTimer}s</b></span>
                    <Button
                      label="Resend Email OTP"
                      variant="ghost"
                      size="sm"
                      isDisabled={emailTimer > 0}
                      onClick={() => setEmailTimer(60)}
                    />
                  </div>
                </div>
              )}

              {/* Yellow Declaration Box using Astryx CheckboxInput */}
              {!isEmailOtpSent && (
                <div className="p-3 rounded-xl border border-[#f0c36d] bg-[#fff8e5] hover:border-[#f0a500] hover:bg-[#fff3cc] transition-colors">
                  <CheckboxInput
                    label="I declare that the above e-Mail is owned by me and I have not created any account using this e-Mail ID on this portal. *"
                    value={emailOwnershipAccepted}
                    onChange={(checked) => setEmailOwnershipAccepted(checked)}
                    isRequired
                  />
                </div>
              )}

              {/* Centered Astryx Button */}
              <div className="pt-3 flex items-center justify-center">
                {!isEmailOtpSent ? (
                  <Button
                    label="Get OTP"
                    variant="primary"
                    isDisabled={!email || email !== confirmEmail || !emailOwnershipAccepted}
                    onClick={() => setIsEmailOtpSent(true)}
                  />
                ) : (
                  <Button
                    label="Verify Email & Proceed"
                    variant="primary"
                    isDisabled={emailOtp.length < 6}
                    onClick={() => setOtrStep(3)}
                  />
                )}
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* STEP 3: VERIFY MOBILE NUMBER */}
      {otrStep === 3 && (
        <Card className="bg-white border border-[#d9e2f2] rounded-2xl p-6 md:p-8 shadow-md">
          <div className="grid gap-6 md:grid-cols-2 md:items-center">
            {/* Left Column: Illustration */}
            <RegistrationStepperIllustration step={3} />

            {/* Right Column: Form */}
            <div className="space-y-4">
              <div>
                <div className="flex justify-center md:justify-start">
                  <Heading level={2} className="text-lg md:text-xl font-bold text-[#195992]">
                    Step 3 : Verify Mobile Number
                  </Heading>
                </div>
                <div className="mt-2 h-[2px] w-full bg-[#9aadc5]" />
              </div>

              {/* Mobile Number Astryx TextInput */}
              <TextInput
                label="Mobile Number *"
                placeholder="Enter 10-digit Mobile Number"
                value={mobile}
                isReadOnly={isMobileOtpSent}
                onChange={(val) => setMobile(val)}
                startIcon={
                  <svg className="h-5 w-5 text-[#195992]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <rect x="7" y="2" width="10" height="20" rx="2" ry="2" />
                    <line x1="11" y1="18" x2="13" y2="18" />
                  </svg>
                }
              />

              {/* Confirm Mobile Number Astryx TextInput */}
              <TextInput
                label="Confirm Mobile Number *"
                placeholder="Re-enter Mobile Number"
                value={confirmMobile}
                isReadOnly={isMobileOtpSent}
                onChange={(val) => setConfirmMobile(val)}
                startIcon={
                  <svg className="h-5 w-5 text-[#195992]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <rect x="7" y="2" width="10" height="20" rx="2" ry="2" />
                    <line x1="11" y1="18" x2="13" y2="18" />
                  </svg>
                }
              />

              {/* Captcha section before OTP sent */}
              {!isMobileOtpSent && (
                <div className="pt-1 space-y-3">
                  <CanvasCaptcha
                    label="CAPTCHA (as shown below) *"
                    codeLength={5}
                    onVerify={(isValid) => {}}
                  />
                </div>
              )}

              {/* OTP section when sent */}
              {isMobileOtpSent && (
                <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl space-y-4">
                  <Text className="text-sm font-semibold text-emerald-900">
                    ✓ 6-Digit Verification SMS OTP sent to <b>+91 {mobile}</b>
                  </Text>
                  <OtpInput
                    length={6}
                    value={mobileOtp}
                    onChange={(val) => setMobileOtp(val)}
                    label="Enter 6-Digit Mobile SMS OTP *"
                  />
                  <div className="flex items-center justify-between text-xs text-slate-600">
                    <span>Resend OTP available in: <b>{mobileTimer}s</b></span>
                    <Button
                      label="Resend SMS OTP"
                      variant="ghost"
                      size="sm"
                      isDisabled={mobileTimer > 0}
                      onClick={() => setMobileTimer(60)}
                    />
                  </div>
                </div>
              )}

              {/* Yellow Declaration Box using Astryx CheckboxInput */}
              {!isMobileOtpSent && (
                <div className="p-3 rounded-xl border border-[#f0c36d] bg-[#fff8e5] hover:border-[#f0a500] hover:bg-[#fff3cc] transition-colors">
                  <CheckboxInput
                    label="I declare that the above Mobile Number is owned by me and I have not created any account using this Mobile Number on this portal. *"
                    value={mobileOwnershipAccepted}
                    onChange={(checked) => setMobileOwnershipAccepted(checked)}
                    isRequired
                  />
                </div>
              )}

              {/* Centered Astryx Button */}
              <div className="pt-3 flex items-center justify-center">
                {!isMobileOtpSent ? (
                  <Button
                    label="Get OTP"
                    variant="primary"
                    isDisabled={!mobile || mobile !== confirmMobile || mobile.length < 10 || !mobileOwnershipAccepted}
                    onClick={() => setIsMobileOtpSent(true)}
                  />
                ) : (
                  <Button
                    label="Verify Mobile & Proceed"
                    variant="primary"
                    isDisabled={mobileOtp.length < 6}
                    onClick={() => setOtrStep(4)}
                  />
                )}
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* STEP 4: CREATE PASSWORD */}
      {otrStep === 4 && (
        <Card className="bg-white border border-[#d9e2f2] rounded-2xl p-6 md:p-8 shadow-md">
          <div className="grid gap-6 md:grid-cols-2 md:items-center">
            {/* Left Column: Illustration */}
            <RegistrationStepperIllustration step={4} />

            {/* Right Column: Form */}
            <div className="space-y-4">
              <div>
                <div className="flex justify-center md:justify-start">
                  <Heading level={2} className="text-lg md:text-xl font-bold text-[#195992]">
                    Step 4 : Create Account Password
                  </Heading>
                </div>
                <div className="mt-2 h-[2px] w-full bg-[#9aadc5]" />
              </div>

              {/* Password Astryx TextInput */}
              <TextInput
                label="Create Password *"
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={(val) => setPassword(val)}
                startIcon={
                  <svg className="h-5 w-5 text-[#195992]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0110 0v4" />
                  </svg>
                }
              />

              {/* Confirm Password Astryx TextInput */}
              <TextInput
                label="Confirm Password *"
                type="password"
                placeholder="Re-enter Password"
                value={confirmPassword}
                onChange={(val) => setConfirmPassword(val)}
                startIcon={
                  <svg className="h-5 w-5 text-[#195992]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0110 0v4" />
                  </svg>
                }
              />

              {/* Password Requirements Checklist */}
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2 text-xs text-slate-700">
                <Text className="font-semibold text-slate-900 text-sm">Password Security Guidelines:</Text>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pt-1">
                  <span className={password.length >= 8 && password.length <= 16 ? "text-emerald-700 font-semibold" : "text-slate-600"}>
                    • 8 to 16 characters long
                  </span>
                  <span className={/[A-Z]/.test(password) ? "text-emerald-700 font-semibold" : "text-slate-600"}>
                    • At least 1 uppercase letter (A-Z)
                  </span>
                  <span className={/[a-z]/.test(password) ? "text-emerald-700 font-semibold" : "text-slate-600"}>
                    • At least 1 lowercase letter (a-z)
                  </span>
                  <span className={/[0-9]/.test(password) ? "text-emerald-700 font-semibold" : "text-slate-600"}>
                    • At least 1 numeric digit (0-9)
                  </span>
                  <span className={/[!@#$%^&*()]/.test(password) ? "text-emerald-700 font-semibold" : "text-slate-600"}>
                    • At least 1 special character (@, #, $, %)
                  </span>
                </div>
              </div>

              {/* Yellow Declaration Box using Astryx CheckboxInput */}
              <div className="p-3 rounded-xl border border-[#f0c36d] bg-[#fff8e5] hover:border-[#f0a500] hover:bg-[#fff3cc] transition-colors">
                <CheckboxInput
                  label="I hereby declare that all the information provided above is true and correct to the best of my knowledge and I accept all terms. *"
                  value={passwordAccepted}
                  onChange={(checked) => setPasswordAccepted(checked)}
                  isRequired
                />
              </div>

              {/* Centered Astryx Button */}
              <div className="pt-3 flex items-center justify-center">
                <Button
                  label="Submit & Generate OTR ID"
                  variant="primary"
                  isDisabled={!password || password !== confirmPassword || password.length < 8 || !passwordAccepted}
                  onClick={() => {
                    const generatedId = `OTR2026${Math.floor(100000 + Math.random() * 900000)}`;
                    setOtrId(generatedId);
                    setOtrStep(5);
                  }}
                />
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* STEP 5: OTR ACCOUNT CREATED SUCCESS */}
      {otrStep === 5 && (
        <Card className="bg-white border border-[#d9e2f2] rounded-2xl p-8 shadow-md text-center space-y-6 max-w-2xl mx-auto">
          <div className="mx-auto w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-3xl font-bold">
            ✓
          </div>

          <div className="space-y-2">
            <Heading level={2} className="text-2xl font-bold text-slate-900">
              One-Time Registration (OTR) Account Created Successfully!
            </Heading>
            <Text className="text-slate-600 text-sm">
              Your credentials and OTR Profile Reference ID have been generated. You can now log in and complete your Universal Registration Scheme application.
            </Text>
          </div>

          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2 inline-block w-full">
            <Text className="text-xs uppercase tracking-wider text-slate-500 font-semibold">Your Candidate OTR Reference ID</Text>
            <div className="text-3xl font-extrabold text-[#195992] tracking-wider font-mono">
              {otrId || 'OTR2026987452'}
            </div>
            <Text className="text-xs text-slate-500 pt-1">
              (Save this OTR Reference ID for future logins and application tracking)
            </Text>
          </div>

          <div className="pt-2 flex justify-center">
            <Button
              label="Proceed to Universal Registration Wizard →"
              variant="primary"
              onClick={onProceedToRegistration}
            />
          </div>
        </Card>
      )}

      {/* STEP 5: OTR ACCOUNT CREATED SUCCESS */}
      {otrStep === 5 && (
        <Card className="bg-white border border-[#d9e2f2] rounded-2xl p-8 shadow-md text-center space-y-6 max-w-2xl mx-auto">
          <div className="mx-auto w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-3xl font-bold">
            ✓
          </div>

          <div className="space-y-2">
            <Heading level={2} className="text-2xl font-bold text-slate-900">
              One-Time Registration (OTR) Account Created Successfully!
            </Heading>
            <Text className="text-slate-600 text-sm">
              Your credentials and OTR Profile Reference ID have been generated. You can now log in and complete your Universal Registration Scheme application.
            </Text>
          </div>

          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2 inline-block w-full">
            <Text className="text-xs uppercase tracking-wider text-slate-500 font-semibold">Your Candidate OTR Reference ID</Text>
            <div className="text-3xl font-extrabold text-[#195992] tracking-wider font-mono">
              {otrId || 'OTR2026987452'}
              <span>Verified Mobile Number:</span>
              <span className="font-semibold text-slate-900">+91 {mobile || '9876543210'}</span>
            </div>
            <div className="flex justify-between">
              <span>Account Status:</span>
              <span className="font-semibold text-emerald-700">ACTIVE & VERIFIED</span>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-200 flex justify-center">
            <Button
              label="Proceed to Universal Registration Application Form"
              variant="primary"
              onClick={onProceedToRegistration}
            >
              Proceed to Universal Registration Wizard (5 Steps) →
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
}

export default function ShowcaseClient() {
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
  const [appMode, setAppMode] = useState<'otr' | 'registration'>('otr');

  const steps = [
    { label: '1. Auth & OTP' },
    { label: '2. Personal Identity' },
    { label: '3. Aadhaar & Photo ID' },
    { label: '4. Matriculation Board' },
    { label: '5. Review Summary' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 p-4 sm:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Top Header Card & Workflow Switcher */}
        <Card className="bg-white border border-slate-300 rounded-xl p-6 shadow-sm">
          <div className="flex flex-col gap-4">
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
              {appMode === 'registration' && (
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
              )}
            </div>

            {/* Workflow Mode Switcher Tabs */}
            <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-200">
              <Button
                label="1. First-Time Candidate OTR Account Creation"
                variant={appMode === 'otr' ? 'primary' : 'secondary'}
                onClick={() => setAppMode('otr')}
              >
                1. First-Time Candidate Account Creation (OTR Stepper)
              </Button>
              <Button
                label="2. Universal Registration Application Wizard"
                variant={appMode === 'registration' ? 'primary' : 'secondary'}
                onClick={() => setAppMode('registration')}
              >
                2. Universal Registration Wizard (5 Steps)
              </Button>
            </div>
          </div>
        </Card>

        {appMode === 'otr' ? (
          <OtrAccountCreationView onProceedToRegistration={() => setAppMode('registration')} />
        ) : (
          /* Main 2-Column Layout: Extended Astryx SideNav + Step Forms */
          <div className="flex flex-col lg:flex-row gap-6 items-start w-full">
            {/* Left Sidebar: Native Astryx SideNav in Card Variant */}
            <div className="shrink-0">
              <SideNav variant="card" collapsible={{ defaultIsCollapsed: false }}>
                <SideNavSection title="Universal Registration" headerVariant="banner">
                  <SideNavItem
                    label="Identity Profile"
                    variant="stepCard"
                    isSelected={activeStep === 0 || activeStep === 1}
                    isCompleted={activeStep > 1}
                    icon={<UserStepIcon isCompleted={activeStep > 1} isActive={activeStep === 0 || activeStep === 1} />}
                    infoSlot={<InfoTrigger pdfUrl="https://upsc.gov.in/sites/default/files/Instruction-OTR-Eng_0.pdf" isCompleted={activeStep > 1} />}
                    statusIcon={activeStep > 1 ? <CheckIcon /> : undefined}
                    onClick={() => setActiveStep(1)}
                  />
                <SideNavItem
                  label="Aadhaar / Photo ID"
                  variant="stepCard"
                  isSelected={activeStep === 2}
                  isCompleted={activeStep > 2}
                  isLocked={activeStep < 2}
                  icon={<IdCardStepIcon isCompleted={activeStep > 2} isActive={activeStep === 2} />}
                  infoSlot={<InfoTrigger pdfUrl="https://upsc.gov.in/sites/default/files/Instruction-OTR-Eng_0.pdf" isCompleted={activeStep > 2} />}
                  statusIcon={activeStep > 2 ? <CheckIcon /> : activeStep < 2 ? <LockIcon /> : undefined}
                  onClick={() => activeStep >= 1 && setActiveStep(2)}
                />
                <SideNavItem
                  label="Matriculation Board Profile"
                  variant="stepCard"
                  isSelected={activeStep === 3}
                  isCompleted={activeStep > 3}
                  isLocked={activeStep < 3}
                  icon={<GraduationStepIcon isCompleted={activeStep > 3} isActive={activeStep === 3} />}
                  infoSlot={<InfoTrigger pdfUrl="https://upsc.gov.in/sites/default/files/Instruction-OTR-Eng_0.pdf" isCompleted={activeStep > 3} />}
                  statusIcon={activeStep > 3 ? <CheckIcon /> : activeStep < 3 ? <LockIcon /> : undefined}
                  onClick={() => activeStep >= 2 && setActiveStep(3)}
                />
                <SideNavItem
                  label="Preview Universal Registration"
                  variant="stepCard"
                  isSelected={activeStep === 4}
                  isCompleted={activeStep === 4}
                  isLocked={activeStep < 4}
                  icon={<EyeStepIcon isCompleted={activeStep === 4} isActive={activeStep === 4} />}
                  infoSlot={<InfoTrigger pdfUrl="https://upsc.gov.in/sites/default/files/Instruction-OTR-Eng_0.pdf" isCompleted={activeStep === 4} />}
                  statusIcon={activeStep < 4 ? <LockIcon /> : <CheckIcon />}
                  onClick={() => activeStep >= 3 && setActiveStep(4)}
                />
              </SideNavSection>
            </SideNav>
          </div>

          {/* Right Main Content Area */}
          <div className="flex-1 min-w-0">

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
                  <Button
                    label="Mobile OTP Login"
                    variant={loginTab === 'mobile' ? 'primary' : 'ghost'}
                    onClick={() => setLoginTab('mobile')}
                  />
                  <Button
                    label="Email OTP Login"
                    variant={loginTab === 'email' ? 'primary' : 'ghost'}
                    onClick={() => setLoginTab('email')}
                  />
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
                  <RadioList
                    label="Do you possess Aadhaar Number / Virtual ID (VID)? *"
                    value={hasAadhaar}
                    onChange={(val) => setHasAadhaar(val as 'true' | 'false')}
                    orientation="horizontal"
                    isRequired
                  >
                    <RadioListItem label="Yes, I have Aadhaar" value="true" />
                    <RadioListItem label="No Aadhaar / Use Other Photo ID" value="false" />
                  </RadioList>

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
                  <Button
                    label="Marks Percentage (%)"
                    variant={gradingType === 'marks' ? 'primary' : 'ghost'}
                    size="sm"
                    onClick={() => setGradingType('marks')}
                  />
                  <Button
                    label="CGPA Grade Points"
                    variant={gradingType === 'cgpa' ? 'primary' : 'ghost'}
                    size="sm"
                    onClick={() => setGradingType('cgpa')}
                  />
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
                        <Button
                          label="Fetch 10th Certificate from DigiLocker"
                          variant="secondary"
                          size="sm"
                          onClick={() => alert('Fetching 10th Certificate from DigiLocker...')}
                        />
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
            <div className="bg-white border border-slate-300 rounded-xl p-5 shadow-sm">
              <Heading level={3} className="text-lg font-bold text-slate-900">
                Step 5: Review & Confirm Application Summary
              </Heading>
              <Text className="text-slate-600 text-sm mt-1">
                Verify all candidate information before locking and submitting URN application.
              </Text>
            </div>

            {/* Identity Summary Card */}
            <KeyValueGrid
              title="1. Personal Identity Details Summary"
              variant="table"
              headerVariant="banner"
              items={[
                {
                  type: 'colHeader',
                  label: 'Name',
                  colHeaderLabels: [
                    'Name',
                    'Name (Candidate Input)',
                    'Name as per 10th Class/ Matriculation/ Equivalent Board Passing Certificate'
                  ]
                },
                {
                  label: 'First Name',
                  value: firstName || 'RAHUL',
                  v2: confirmFirstName || firstName || 'RAHUL'
                },
                {
                  label: 'Middle Name',
                  value: middleName || '-',
                  v2: confirmMiddleName || middleName || '-'
                },
                {
                  label: 'Last Name',
                  value: lastName || 'SHARMA',
                  v2: confirmLastName || lastName || 'SHARMA'
                },
                ...(isSameAsCurrent === 'false' ? [
                  {
                    type: 'fullText' as const,
                    label: 'Provisional Name Change Declaration: Candidate changed name after matriculation.'
                  },
                  {
                    label: 'Gazette Notification Doc',
                    docPreview: {
                      fileName: gazetteDoc ? gazetteDoc.name : 'gazette_notification.pdf',
                      label: 'View Uploaded Document',
                      onView: () => alert('Viewing Gazette Notification Document')
                    }
                  }
                ] : []),
                {
                  type: 'subheader',
                  label: 'Other Identity Details'
                },
                {
                  label: 'Gender',
                  value: gender || 'MALE'
                },
                {
                  label: 'Date of Birth',
                  value: formatDateWithWords(dobVal || '15/08/1998')
                },
                {
                  label: 'Father\'s Name',
                  value: fatherName || 'SURESH SHARMA'
                },
                {
                  label: 'Mother\'s Name',
                  value: motherName || 'ANITA SHARMA'
                }
              ]}
            />

            {/* Aadhaar Summary Card */}
            <KeyValueGrid
              title="2. Aadhaar & Photo ID Details Summary"
              variant="table"
              headerVariant="banner"
              items={[
                {
                  label: 'Has Aadhaar Card issued to you?',
                  value: hasAadhaar === 'true'
                    ? 'Yes, I have Aadhaar Card and agree to authenticate with eKYC'
                    : 'No / Use Alternative Photo ID Card'
                },
                ...(hasAadhaar === 'true' ? [
                  {
                    type: 'subheader' as const,
                    label: 'Aadhaar eKYC Verified Details'
                  },
                  {
                    label: 'Masked Aadhaar Number',
                    value: aadhaarMasked || 'XXXX-XXXX-1234'
                  },
                  {
                    label: 'Virtual ID (VID)',
                    value: vidMasked || 'XXXX-XXXX-XXXX-5678'
                  },
                  {
                    label: 'Candidate Photograph',
                    docPreview: {
                      fileName: photoFile instanceof File ? photoFile.name : 'passport_photo.jpg',
                      label: 'View Uploaded Document',
                      onView: () => alert('Viewing candidate passport photo')
                    }
                  }
                ] : [
                  {
                    type: 'subheader' as const,
                    label: 'Alternative Photo ID Card Details'
                  },
                  {
                    label: 'Photo ID Card',
                    docPreview: {
                      fileName: photoIdFileName || 'id_card.jpg',
                      label: 'View Uploaded Document',
                      onView: () => alert('Viewing uploaded Photo ID card')
                    }
                  }
                ])
              ]}
            />

            {/* Matriculation Summary Card */}
            <KeyValueGrid
              title="3. Class 10th Board Examination Details Summary"
              variant="table"
              headerVariant="banner"
              items={[
                {
                  label: 'Class 10th Roll Number',
                  value: boardRollNo || '21639018'
                },
                {
                  label: 'Certificate Issue Date',
                  value: certIssueDate || '25/05/2014'
                },
                {
                  label: 'State / UT of School',
                  value: selectedState ? (selectedState === 'DL' ? 'Delhi (NCT)' : selectedState) : 'Delhi (NCT)'
                },
                {
                  label: 'Class 10th Education Board',
                  value: selectedBoard ? (selectedBoard === 'CBSE' ? 'Central Board of Secondary Education (CBSE)' : selectedBoard) : 'Central Board of Secondary Education (CBSE)'
                },
                {
                  label: 'Grading System & Score',
                  value: `${gradingType.toUpperCase()}: ${marksPercentage || '88.5'}${gradingType === 'marks' ? '%' : ' CGPA'}`
                },
                {
                  label: '10th Class Board Certificate',
                  docPreview: {
                    fileName: boardFileName || 'board_certificate.pdf',
                    label: 'View 10th Board Certificate',
                    onView: () => alert('Viewing 10th Board Certificate')
                  }
                }
              ]}
            />
          </div>
        )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
