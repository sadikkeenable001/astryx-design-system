// Copyright (c) Meta Platforms, Inc. and affiliates.

/** @type {import('@astryxdesign/cli/authoring').ComponentDoc} */

export const docs = {
  name: 'RegistrationStepper',
  displayName: 'Registration Stepper',
  category: 'Navigation',
  keywords: ['registration stepper', 'account creation progress', 'multi-step form progress'],
  props: [
    {
      name: 'currentStep',
      type: 'number',
      description: '1-based index of the active step (5 shows the track fully complete).',
      required: true,
    },
    {
      name: 'xstyle',
      type: 'StyleXStyles',
      description:
        'StyleX styles for layout customization (margins, positioning, sizing). Must be a stylex.create() value, not an inline style object like style={{}}.',
    },
  ],
  theming: {
    targets: [{className: 'astryx-registration-stepper', visualProps: []}],
  },
  usage: {
    description:
      'A fixed 4-step progress indicator for an account-creation flow: Instructions, Verify Email ID, Verify Mobile Number, Create Password. A grey base line fills blue up to the active step; each circle is outlined (upcoming), filled blue with an eye glyph (current), or filled green with a checkmark (done).',
    bestPractices: [
      {guidance: true, description: 'Use only for this fixed 4-step account-creation flow — the step set is not configurable.'},
      {guidance: false, description: 'Use for a generic multi-step flow with a different step count — use Stepper instead.'},
    ],
  },
};

/** @type {import('@astryxdesign/cli/authoring').ComponentTranslationDoc} */
export const docsDense = {
  description: 'fixed 4-step account-creation progress indicator (Instructions/Email/Mobile/Password)',
  usage: {
    description: '4-step progress bar for account creation. Not configurable — for a generic stepper use Stepper.',
    bestPractices: [
      {guidance: true, description: 'Use only for the fixed account-creation flow.'},
      {guidance: false, description: 'Different step count -> use Stepper.'},
    ],
  },
  propDescriptions: {
    currentStep: '1-based active step index',
    xstyle: 'StyleX styles for layout; must be stylex.create() value',
  },
};
