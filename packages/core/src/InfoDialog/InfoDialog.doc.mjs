// Copyright (c) Meta Platforms, Inc. and affiliates.

/** @type {import('@astryxdesign/cli/authoring').ComponentAnatomyElement[]} */
const anatomy = [
  {
    name: 'Header bar',
    required: true,
    description: 'Colored bar with the title and a close button.',
  },
  {
    name: 'Body',
    required: true,
    description: 'White content area below the header.',
  },
];

/** @type {import('@astryxdesign/cli/authoring').ComponentDoc} */

export const docs = {
  name: 'InfoDialog',
  displayName: 'Info Dialog',
  category: 'Overlays',
  keywords: ["info dialog","help popup","contact info modal","read-only dialog"],
  props: [
    {
      name: 'open',
      type: 'boolean',
      description: 'Whether the dialog is open.',
      required: true,
    },
    {
      name: 'onClose',
      type: '() => void',
      description: 'Called when the dialog requests to close (X button, Escape, or backdrop click).',
      required: true,
    },
    {
      name: 'title',
      type: 'string',
      description: 'Header bar title.',
      required: true,
    },
    {
      name: 'headerColor',
      type: 'string',
      description: 'Header bar background color.',
      default: "'#195893'",
    },
    {
      name: 'width',
      type: 'number | string',
      description: 'Dialog width.',
      default: '500',
    },
    {
      name: 'children',
      type: 'ReactNode',
      description: 'Body content.',
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
    targets: [{className: 'astryx-info-dialog', visualProps: []}],
  },
  usage: {
    anatomy,
    description: 'A read-only info popup — a colored header bar (title + close button) and a white body below. For contact info, help text, terms — anything the visitor just reads and dismisses. Not for forms or confirm/cancel actions (use AlertDialog for that).',
    bestPractices: [
      { guidance: true, description: 'Use for static, read-only content the visitor dismisses — not for a flow requiring input or a decision.' },
      { guidance: true, description: 'Keep the title short — it sits in a single-line header bar with the close button.' },
      { guidance: false, description: 'Use InfoDialog for a confirm/cancel action or destructive operation — use AlertDialog instead.' },
    ],
  },
};

/** @type {import('@astryxdesign/cli/authoring').ComponentDoc} */
export const docsZh = {
  name: 'InfoDialog',
  displayName: 'Info Dialog',
  props: [
    {
      name: 'open',
      type: 'boolean',
      description: '弹窗是否打开。',
      required: true,
    },
    {
      name: 'onClose',
      type: '() => void',
      description: '弹窗请求关闭时调用（关闭按钮、Esc 键或点击背景）。',
      required: true,
    },
    {
      name: 'title',
      type: 'string',
      description: '头部标题。',
      required: true,
    },
    {
      name: 'headerColor',
      type: 'string',
      description: '头部背景色。',
      default: "'#195893'",
    },
    {
      name: 'width',
      type: 'number | string',
      description: '弹窗宽度。',
      default: '500',
    },
    {
      name: 'children',
      type: 'ReactNode',
      description: '正文内容。',
      required: true,
    },
    {
      name: 'xstyle',
      type: 'StyleXStyles',
      description:
        '用于布局自定义的 StyleX 样式（边距、定位、尺寸）。必须是 stylex.create() 的值，不能是 style={{}} 这样的内联样式对象。',
    },
  ],
  theming: {
    targets: [{className: 'astryx-info-dialog', visualProps: []}],
  },
  usage: {
    anatomy,
    description: '只读信息弹窗——带标题和关闭按钮的彩色头部条，下方是白色正文区域。用于联系方式、帮助文本、条款等访问者只需阅读并关闭的内容，而非需要输入或做决定的流程。',
    bestPractices: [
      { guidance: true, description: '用于静态、只读、可直接关闭的内容——不用于需要输入或决策的流程。' },
      { guidance: true, description: '标题保持简短——它与关闭按钮共处同一行头部条。' },
      { guidance: false, description: '确认/取消操作或危险操作请用 AlertDialog，而非 InfoDialog。' },
    ],
  },
};

/** @type {import('@astryxdesign/cli/authoring').ComponentTranslationDoc} */
export const docsDense = {
  description: 'read-only info popup: colored header bar (title + close) + white body',
  usage: {
    anatomy,
    description: 'Info popup for static read-only content (contact info, help text). Not for confirm/cancel -> use AlertDialog.',
    bestPractices: [
      { guidance: true, description: 'Static read-only content only.' },
      { guidance: true, description: 'Keep title short.' },
      { guidance: false, description: 'Confirm/cancel or destructive action -> AlertDialog.' },
    ],
  },
  propDescriptions: {
    open: 'whether dialog is open',
    onClose: 'called on close request',
    title: 'header bar title',
    headerColor: 'header bar background color',
    width: 'dialog width',
    children: 'body content',
    xstyle: 'StyleX styles for layout; must be stylex.create() value',
  },
};
