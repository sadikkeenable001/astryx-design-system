// Copyright (c) Meta Platforms, Inc. and affiliates.

/** @type {import('@astryxdesign/cli/authoring').ComponentAnatomyElement[]} */
const anatomy = [
  {
    name: 'Grid',
    required: true,
    description: 'Responsive row of cards — 4 columns, 2 below 991px, 1 below 576px.',
  },
  {
    name: 'Card',
    required: true,
    description: 'One card per feature — icon, title, numbered link list. Lifts on hover.',
  },
  {
    name: 'Icon',
    required: true,
    description: 'Badge above the title, typically a numbered icon image.',
  },
  {
    name: 'Title',
    required: true,
    description: 'Card title.',
  },
  {
    name: 'Link list',
    required: true,
    description: 'Numbered (decimal) list of links under the title.',
  },
];

/** @type {import('@astryxdesign/cli/authoring').ComponentDoc} */

export const docs = {
  name: 'DashboardCards',
  displayName: 'Dashboard Cards',
  category: 'Layout',
  keywords: ["dashboard cards","feature grid","numbered card","getting started grid","step cards"],
  props: [
    {
      name: 'features',
      type: 'DashboardCardFeature[]',
      description: 'The cards to render, in order.',
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
    targets: [{className: 'astryx-dashboard-cards', visualProps: []}],
  },
  usage: {
    anatomy,
    description: 'A responsive grid of numbered feature cards for a "getting started" style dashboard — account creation, applications, recruitment, and similar multi-step entry points. Each card has an icon, a title, and a numbered list of links; a link can navigate directly or run an onClick (e.g. a "please login first" prompt) instead.',
    bestPractices: [
      { guidance: true, description: 'Keep each card to 2-4 links — this is an entry-point grid, not a full sitemap.' },
      { guidance: true, description: 'Use onClick (not href) for a link that needs to intercept the click, e.g. to show a confirmation before navigating.' },
      { guidance: false, description: 'Use DashboardCards for a single step-by-step wizard with a current/completed state — that is Stepper, not this.' },
    ],
  },
};

/** @type {import('@astryxdesign/cli/authoring').ComponentDoc} */
export const docsZh = {
  name: 'DashboardCards',
  displayName: 'Dashboard Cards',
  props: [
    {
      name: 'features',
      type: 'DashboardCardFeature[]',
      description: '要渲染的卡片列表，按顺序排列。',
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
    targets: [{className: 'astryx-dashboard-cards', visualProps: []}],
  },
  usage: {
    anatomy,
    description: '用于"快速开始"风格仪表盘的一组带编号的功能卡片网格——账户创建、申请、招聘等多步骤入口。每张卡片包含图标、标题和一组带编号的链接；链接可以直接跳转，也可以先执行 onClick（例如"请先登录"提示）。',
    bestPractices: [
      { guidance: true, description: '每张卡片保持 2-4 个链接——这是入口网格，不是完整站点地图。' },
      { guidance: true, description: '需要拦截点击的链接用 onClick（而非 href）——例如跳转前先弹出确认框。' },
      { guidance: false, description: '带当前/已完成状态的单一分步向导请用 Stepper，而非本组件。' },
    ],
  },
};

/** @type {import('@astryxdesign/cli/authoring').ComponentTranslationDoc} */
export const docsDense = {
  description: 'responsive grid of numbered feature cards: icon + title + numbered link list per card',
  usage: {
    anatomy,
    description: 'Grid of numbered feature cards for getting-started dashboards. Links can href or onClick.',
    bestPractices: [
      { guidance: true, description: '2-4 links per card.' },
      { guidance: true, description: 'onClick for intercepted clicks (e.g. login prompts).' },
      { guidance: false, description: 'Single wizard w/ current/completed state -> Stepper.' },
    ],
  },
  propDescriptions: {
    features: 'cards to render, in order',
    xstyle: 'StyleX styles for layout; must be stylex.create() value',
  },
};
