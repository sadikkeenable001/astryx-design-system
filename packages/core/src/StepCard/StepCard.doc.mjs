// Copyright (c) Meta Platforms, Inc. and affiliates.

/** @type {import('@astryxdesign/cli/authoring').ComponentAnatomyElement[]} */
const anatomy = [
  {
    name: 'Card',
    required: true,
    description: 'The outer Card container — border, background, elevation.',
  },
  {
    name: 'Icon',
    required: true,
    description: 'Badge above the title, typically a numbered icon image.',
  },
  {
    name: 'Title',
    required: true,
    description: 'Heading identifying the step.',
  },
  {
    name: 'List',
    required: true,
    description: 'Numbered (decimal) list of related links or actions for the step.',
  },
];

/** @type {import('@astryxdesign/cli/authoring').ComponentDoc} */

export const docs = {
  name: 'StepCard',
  displayName: 'Step Card',
  category: 'Layout',
  keywords: ["step card","numbered card","process card","stage card","onboarding card"],
  props: [
    {
      name: 'icon',
      type: 'ReactNode',
      description: 'Badge shown above the title — typically a numbered icon (an <img> or <Image>), but any element works.',
      required: true,
    },
    {
      name: 'title',
      type: 'string',
      description: 'Card title.',
      required: true,
    },
    {
      name: 'items',
      type: 'StepCardItem[]',
      description: 'Numbered (decimal) list of links/actions rendered under the title.',
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
    targets: [{className: 'astryx-step-card', visualProps: []}],
  },
  usage: {
    anatomy,
    description: 'A card for one step in a numbered, multi-stage process — a badge, a title, and a numbered list of related links or actions. Use in a grid to lay out an onboarding or application flow (e.g. "1. Create Account", "2. Universal Registration", "3. Common Application Form").',
    bestPractices: [
      { guidance: true, description: 'Keep item labels short — they render as plain link text, not full sentences.' },
      { guidance: true, description: 'Lay several StepCards out in a responsive grid (Grid or a flex row) rather than stacking them vertically; that’s left to the caller, not built into this component.' },
      { guidance: false, description: 'Use StepCard for a single linear progress indicator with a current/completed state — use Stepper for that instead.' },
      { guidance: false, description: 'Put more than a handful of items in one card; split into another step card or a different pattern.' },
    ],
  },
};

/** @type {import('@astryxdesign/cli/authoring').ComponentDoc} */
export const docsZh = {
  name: 'StepCard',
  displayName: 'Step Card',
  props: [
    {
      name: 'icon',
      type: 'ReactNode',
      description: '标题上方显示的徽标——通常是带数字的图标（<img> 或 <Image>），但任意元素均可。',
      required: true,
    },
    {
      name: 'title',
      type: 'string',
      description: '卡片标题。',
      required: true,
    },
    {
      name: 'items',
      type: 'StepCardItem[]',
      description: '标题下方渲染的编号（十进制）链接/操作列表。',
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
    targets: [{className: 'astryx-step-card', visualProps: []}],
  },
  usage: {
    anatomy,
    description: '用于多阶段流程中某一步骤的卡片——徽标、标题，以及标题下方一组带编号的相关链接或操作。适合以网格布局排列多个步骤，构成一个引导或申请流程。',
    bestPractices: [
      { guidance: true, description: '条目标签保持简短——它们渲染为纯链接文本，而非完整句子。' },
      { guidance: true, description: '将多个 StepCard 以响应式网格（Grid 或 flex 行）排列，而非纵向堆叠；布局由调用方决定，组件本身不内置。' },
      { guidance: false, description: '用于带有当前/已完成状态的单一线性进度指示——那种场景请用 Stepper。' },
      { guidance: false, description: '在一张卡片中放入过多条目；应拆分为另一张卡片或使用其他模式。' },
    ],
  },
};

/** @type {import('@astryxdesign/cli/authoring').ComponentTranslationDoc} */
export const docsDense = {
  description: 'composed card: numbered icon badge + title + decimal-numbered link list',
  usage: {
    anatomy,
    description: 'Card for one step in a numbered, multi-stage process. Lay several out in a grid for onboarding/application flows.',
    bestPractices: [
      { guidance: true, description: 'Keep item labels short.' },
      { guidance: true, description: 'Grid layout is left to the caller, not built in.' },
      { guidance: false, description: 'Single linear progress w/ current/completed state -> use Stepper.' },
      { guidance: false, description: 'Too many items in one card -> split.' },
    ],
  },
  propDescriptions: {
    icon: 'badge above title, typically numbered icon image',
    title: 'card title',
    items: 'decimal-numbered list of links/actions under title',
    xstyle: 'StyleX styles for layout; must be stylex.create() value',
  },
};
