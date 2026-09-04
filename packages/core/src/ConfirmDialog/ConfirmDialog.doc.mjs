// Copyright (c) Meta Platforms, Inc. and affiliates.

/** @type {import('@astryxdesign/cli/authoring').ComponentAnatomyElement[]} */
const anatomy = [
  {
    name: 'Icon',
    required: false,
    description: 'A colored circle glyph above the title (warning/error/success/info/question).',
  },
  {
    name: 'Title',
    required: true,
    description: 'Small bold heading above the message.',
  },
  {
    name: 'Message',
    required: true,
    description: 'The main question/consequence text.',
  },
  {
    name: 'Confirm button',
    required: true,
    description: 'Solid blue button. Renders first (left).',
  },
  {
    name: 'Cancel button',
    required: false,
    description: 'Solid red button. Renders second (right). Takes initial focus. Omitted for a single-button popup.',
  },
];

/** @type {import('@astryxdesign/cli/authoring').ComponentDoc} */

export const docs = {
  name: 'ConfirmDialog',
  displayName: 'Confirm Dialog',
  category: 'Overlays',
  keywords: ['confirm dialog', 'alert popup', 'login prompt', 'warning popup'],
  props: [
    {
      name: 'isOpen',
      type: 'boolean',
      description: 'Whether the dialog is open.',
      required: true,
    },
    {
      name: 'title',
      type: 'string',
      description: 'Small heading above the message (e.g. "Warning").',
      required: true,
    },
    {
      name: 'message',
      type: 'string',
      description: 'The main question/consequence text (e.g. "Please login to see this feature.").',
      required: true,
    },
    {
      name: 'icon',
      type: "'warning' | 'error' | 'success' | 'info' | 'question'",
      description: 'Colored icon circle above the title.',
    },
    {
      name: 'confirmLabel',
      type: 'string',
      description: 'Confirm button label.',
      required: true,
    },
    {
      name: 'cancelLabel',
      type: 'string',
      description: 'Cancel button label. Omit (with onCancel) for a single-button popup — e.g. a plain success/warning/error acknowledgement.',
    },
    {
      name: 'onConfirm',
      type: '() => unknown',
      description: 'Called when the confirm button is clicked. Does NOT auto-close.',
      required: true,
    },
    {
      name: 'onCancel',
      type: '() => unknown',
      description: 'Called when the cancel button is clicked. Omit (with cancelLabel) for a single-button popup. Does NOT auto-close.',
    },
    {
      name: 'isDismissible',
      type: 'boolean',
      default: 'false',
      description: 'Whether Escape or a backdrop click closes the dialog (calling onCancel, falling back to onConfirm for a single-button popup).',
    },
    {
      name: 'width',
      type: 'number | string',
      description: 'Dialog width.',
      default: '560',
    },
    {
      name: 'xstyle',
      type: 'StyleXStyles',
      description:
        'StyleX styles for layout customization (margins, positioning, sizing). Must be a stylex.create() value, not an inline style object like style={{}}.',
    },
  ],
  theming: {
    targets: [{className: 'astryx-confirm-dialog', visualProps: []}],
  },
  usage: {
    anatomy,
    description:
      'A centered icon + title + message confirm/cancel popup. For guarding an action behind a yes/no decision (e.g. "please login to continue") where the visual weight of a colored icon and centered bold text is called for. Not dismissible via Escape or a backdrop click — only the two buttons close it. For destructive/irreversible actions with token-driven styling, use AlertDialog instead.',
    bestPractices: [
      {guidance: true, description: 'Use for a yes/no decision that blocks the current action until answered.'},
      {guidance: true, description: 'Keep title and message short — both are centered and bold.'},
      {guidance: false, description: 'Use ConfirmDialog for destructive/irreversible actions — use AlertDialog instead, which follows the design system\'s token-driven styling and WAI-ARIA alertdialog pattern.'},
    ],
  },
};

/** @type {import('@astryxdesign/cli/authoring').ComponentTranslationDoc} */
export const docsDense = {
  description: 'centered icon + title + message confirm/cancel popup; not dismissible via Escape/backdrop',
  usage: {
    anatomy,
    description: 'Confirm/cancel popup for yes/no decisions (e.g. login prompt). Not for destructive actions -> use AlertDialog.',
    bestPractices: [
      {guidance: true, description: 'Use for blocking yes/no decisions.'},
      {guidance: true, description: 'Keep title/message short.'},
      {guidance: false, description: 'Destructive/irreversible action -> AlertDialog.'},
    ],
  },
  propDescriptions: {
    isOpen: 'whether dialog is open',
    title: 'small heading above message',
    message: 'main question/consequence text',
    icon: 'colored icon circle above title',
    confirmLabel: 'confirm button label',
    cancelLabel: 'cancel button label',
    onConfirm: 'called on confirm click',
    onCancel: 'called on cancel click',
    isDismissible: 'whether Escape/backdrop click closes it',
    width: 'dialog width',
    xstyle: 'StyleX styles for layout; must be stylex.create() value',
  },
};
