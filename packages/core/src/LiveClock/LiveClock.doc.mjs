// Copyright (c) Meta Platforms, Inc. and affiliates.

/** @type {import('@astryxdesign/cli/authoring').ComponentDoc} */

export const docs = {
  name: 'LiveClock',
  displayName: 'Live Clock',
  category: 'Data Display',
  keywords: ['live clock', 'date time', 'ticking clock', 'utility bar clock'],
  props: [
    {
      name: 'format',
      type: '(date: Date) => string',
      description:
        'Formats the ticking date into the displayed string.',
      default: 'A full "Weekday, Month D, YYYY at H:MM:SS AM/PM" string',
    },
    {
      name: 'intervalMs',
      type: 'number',
      description: 'How often the display updates, in milliseconds.',
      default: '1000',
    },
    {
      name: 'xstyle',
      type: 'StyleXStyles',
      description:
        'StyleX styles for layout customization (margins, positioning, sizing). Must be a stylex.create() value, not an inline style object like style={{}}.',
    },
  ],
  theming: {
    targets: [{className: 'astryx-live-clock', visualProps: []}],
  },
  usage: {
    description:
      'A self-updating clock: an icon followed by a formatted date/time string that ticks on its own. Renders a non-breaking space until mounted, so server and client markup match — the current time can\'t be known on the server without a hydration mismatch.',
    bestPractices: [
      {guidance: true, description: 'Use in a utility bar or header strip where a live date/time is useful context.'},
      {guidance: true, description: 'Pass `format` to customize the string (e.g. time-only) without losing the ticking behavior.'},
      {guidance: false, description: 'Use for anything time-critical (e.g. a countdown or scheduling deadline) — it is a display-only clock, not a timer.'},
    ],
  },
};

/** @type {import('@astryxdesign/cli/authoring').ComponentTranslationDoc} */
export const docsDense = {
  description: 'self-updating clock icon + formatted date/time string, ticks once a second by default',
  usage: {
    description: 'Ticking clock for a utility bar/header strip. Renders a non-breaking space until mounted to avoid a hydration mismatch. Not for time-critical countdowns.',
    bestPractices: [
      {guidance: true, description: 'Use in a utility bar/header for live date/time context.'},
      {guidance: true, description: 'Customize via `format` without losing the tick.'},
      {guidance: false, description: 'Not a timer/countdown — display only.'},
    ],
  },
  propDescriptions: {
    format: 'formats the ticking date into a string',
    intervalMs: 'update interval in ms',
    xstyle: 'StyleX styles for layout; must be stylex.create() value',
  },
};
