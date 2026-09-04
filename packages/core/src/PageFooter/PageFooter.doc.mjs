// Copyright (c) Meta Platforms, Inc. and affiliates.

/** @type {import('@astryxdesign/cli/authoring').ComponentAnatomyElement[]} */
const anatomy = [
  {
    name: 'Link row',
    required: true,
    description: 'A row of contact/utility links (email, phone, ...) with optional leading icons.',
  },
  {
    name: 'Divider',
    required: false,
    description: 'Rendered only when caption is set.',
  },
  {
    name: 'Caption',
    required: false,
    description: 'Centered content below the divider — typically the org/site name.',
  },
];

/** @type {import('@astryxdesign/cli/authoring').ComponentDoc} */

export const docs = {
  name: 'PageFooter',
  displayName: 'Page Footer',
  category: 'Layout',
  keywords: ["footer","site footer","contact links","bottom bar"],
  props: [
    {
      name: 'links',
      type: 'PageFooterLink[]',
      description: 'Contact/utility links shown in a row across the top.',
      required: true,
    },
    {
      name: 'caption',
      type: 'ReactNode',
      description: 'Centered content below the divider — typically the org/site name.',
    },
    {
      name: 'xstyle',
      type: 'StyleXStyles',
      description:
        'StyleX styles for layout customization (margins, positioning, sizing). Must be a stylex.create() value, not an inline style object like style={{}}.',
    },
  ],
  theming: {
    targets: [{className: 'astryx-page-footer', visualProps: []}],
  },
  usage: {
    anatomy,
    description: 'A site-wide footer: a row of contact/utility links, a divider, and a centered caption. Text uses the on-dark color pairing — the background is a caller-supplied brand color (via style or className), not baked into the component, since a footer’s brand color varies per site.',
    bestPractices: [
      { guidance: true, description: 'Set the background via style={{backgroundColor}} or className — the component only owns the on-dark text color.' },
      { guidance: true, description: 'Keep the link row short — 2-4 contact/utility links, not a full sitemap.' },
      { guidance: false, description: 'Use PageFooter for a full sitemap footer with many columns of links — compose Grid/Stack directly for that.' },
    ],
  },
};

/** @type {import('@astryxdesign/cli/authoring').ComponentDoc} */
export const docsZh = {
  name: 'PageFooter',
  displayName: 'Page Footer',
  props: [
    {
      name: 'links',
      type: 'PageFooterLink[]',
      description: '顶部一行显示的联系/功能链接。',
      required: true,
    },
    {
      name: 'caption',
      type: 'ReactNode',
      description: '分隔线下方居中显示的内容——通常是机构/站点名称。',
    },
    {
      name: 'xstyle',
      type: 'StyleXStyles',
      description:
        '用于布局自定义的 StyleX 样式（边距、定位、尺寸）。必须是 stylex.create() 的值，不能是 style={{}} 这样的内联样式对象。',
    },
  ],
  theming: {
    targets: [{className: 'astryx-page-footer', visualProps: []}],
  },
  usage: {
    anatomy,
    description: '站点级页脚：一行联系/功能链接、一条分隔线，以及居中的说明文字。文字使用 on-dark 配色——背景色由调用方通过品牌色提供（style 或 className），组件本身不内置背景色，因为不同站点的品牌色不同。',
    bestPractices: [
      { guidance: true, description: '通过 style={{backgroundColor}} 或 className 设置背景色——组件本身只负责 on-dark 文字颜色。' },
      { guidance: true, description: '链接行保持简短——2-4 个联系/功能链接，而非完整站点地图。' },
      { guidance: false, description: '不要用 PageFooter 做多栏的完整站点地图页脚——那种场景直接组合 Grid/Stack。' },
    ],
  },
};

/** @type {import('@astryxdesign/cli/authoring').ComponentTranslationDoc} */
export const docsDense = {
  description: 'site footer: contact link row + divider + centered caption, on-dark text, bg via style/className',
  usage: {
    anatomy,
    description: 'Site-wide footer with a link row, divider, and centered caption. Background is caller-supplied.',
    bestPractices: [
      { guidance: true, description: 'Set background via style/className.' },
      { guidance: true, description: 'Keep link row to 2-4 items.' },
      { guidance: false, description: 'Full sitemap footer -> compose Grid/Stack instead.' },
    ],
  },
  propDescriptions: {
    links: 'contact/utility links in top row',
    caption: 'centered content below divider, e.g. org name',
    xstyle: 'StyleX styles for layout; must be stylex.create() value',
  },
};
