// Copyright (c) Meta Platforms, Inc. and affiliates.

/** @type {import('@astryxdesign/cli/authoring').ComponentAnatomyElement[]} */
const anatomy = [
  {
    name: 'Strip',
    required: true,
    description: 'Full-width container that clips the scrolling track.',
  },
  {
    name: 'Track',
    required: true,
    description:
      'The animated row that scrolls leftward on an infinite loop; pauses on hover.',
  },
  {
    name: 'Message',
    required: true,
    description:
      'The announcement text, duplicated internally so the loop has no visible seam.',
  },
];

/** @type {import('@astryxdesign/cli/authoring').ComponentDoc} */

export const docs = {
  name: 'Marquee',
  displayName: 'Marquee',
  category: 'Feedback & Status',
  keywords: ["marquee","ticker","scrolling text","announcement","news ticker","alert strip"],
  props: [
    {
      name: 'text',
      type: 'string | string[]',
      description: 'The announcement text — a single string, or a list to scroll several messages through the same strip. The whole set is rendered twice internally for the seamless loop.',
      required: true,
    },
    {
      name: 'speed',
      type: 'number',
      description: 'Seconds for one full loop — lower is faster.',
      default: '25',
    },
    {
      name: 'color',
      type: 'string',
      description: 'Text color — any CSS color value (hex, named color, a token via var(), ...).',
      default: "colorVars['--color-error']",
    },
    {
      name: 'xstyle',
      type: 'StyleXStyles',
      description:
        'StyleX styles for layout customization (margins, positioning, sizing). Must be a stylex.create() value, not an inline style object like style={{}}.',
    },
  ],
  theming: {
    targets: [{className: 'astryx-marquee', visualProps: []}],
  },
  usage: {
    anatomy,
    description: 'A continuously scrolling announcement strip for a single, time-sensitive message — the kind a visitor should see even without scrolling down the page. Pauses on hover so a visitor can read or click it.',
    bestPractices: [
      { guidance: true, description: 'Use for one urgent, page-wide notice — a deadline, an outage, a policy change — not for general navigation or content.' },
      { guidance: true, description: 'Keep the message short enough to read in one pass; a marquee that never finishes a sentence before looping frustrates more than it informs.' },
      { guidance: false, description: 'Use more than one marquee on a page, or use it for content that updates frequently — a static Banner communicates better once the moment has passed.' },
      { guidance: false, description: 'Rely on the animation alone to convey urgency; the message text should say why it matters on its own.' },
    ],
  },
};

/** @type {import('@astryxdesign/cli/authoring').ComponentDoc} */
export const docsZh = {
  name: 'Marquee',
  displayName: 'Marquee',
  props: [
    {
      name: 'text',
      type: 'string',
      description: '公告文本。内部会渲染两次以实现无缝循环。',
      required: true,
    },
    {
      name: 'speed',
      type: 'number',
      description: '一次完整循环的秒数——数值越小滚动越快。',
      default: '25',
    },
    {
      name: 'xstyle',
      type: 'StyleXStyles',
      description:
        '用于布局自定义的 StyleX 样式（边距、定位、尺寸）。必须是 stylex.create() 的值，不能是 style={{}} 这样的内联样式对象。',
    },
  ],
  theming: {
    targets: [{className: 'astryx-marquee', visualProps: []}],
  },
  usage: {
    anatomy,
    description: '用于展示单条、具有时效性的公告的持续滚动条——访问者即使不下滑页面也应能看到。鼠标悬停时暂停，方便阅读或点击。',
    bestPractices: [
      { guidance: true, description: '仅用于一条紧急、全页级的通知——截止日期、故障、政策变更——不用于常规导航或内容。' },
      { guidance: true, description: '消息保持简短，能一遍读完；如果一句话还没读完就循环，会让人更困惑而非获得信息。' },
      { guidance: false, description: '在同一页面使用多个 marquee，或用于频繁更新的内容——一旦时效已过，静态 Banner 的沟通效果更好。' },
      { guidance: false, description: '仅依赖动画本身传达紧迫感；消息文本本身应说明为什么重要。' },
    ],
  },
};

/** @type {import('@astryxdesign/cli/authoring').ComponentTranslationDoc} */
export const docsDense = {
  description: 'continuously scrolling single-message announcement strip, pauses on hover',
  usage: {
    anatomy,
    description: 'A continuously scrolling announcement strip for a single, time-sensitive message. Pauses on hover so a visitor can read or click it.',
    bestPractices: [
      { guidance: true, description: 'One urgent, page-wide notice only — not navigation or general content.' },
      { guidance: true, description: 'Keep the message short enough to read in one pass.' },
      { guidance: false, description: 'Multiple marquees on one page, or frequently-updated content — use static Banner instead.' },
      { guidance: false, description: 'Relying on animation alone for urgency — say why it matters in the text.' },
    ],
  },
  propDescriptions: {
    text: 'announcement text, duplicated internally for seamless loop',
    speed: 'seconds per full loop — lower is faster',
    xstyle: 'StyleX styles for layout; must be stylex.create() value',
  },
};
