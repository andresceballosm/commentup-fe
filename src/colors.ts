import type { ColorButtonKey } from './interfaces';

export const gradientBgBase = 'bg-gradient-to-tr';
export const gradientBgPurplePink = `${gradientBgBase} from-indigo-400 via-pink-400 to-indigo-900`;
export const gradientBgDark = `${gradientBgBase} from-slate-700 via-slate-900 to-slate-800`;
export const gradientBgPinkRed = `${gradientBgBase} from-pink-400 via-red-500 to-yellow-500`;
export const gradientBgIndigo = `${gradientBgBase} from-indigo-200 via-red-300 to-blue-400`;

export const colorsBgLight = {
  white: 'bg-white text-black',
  light: 'bg-white text-black dark:bg-slate-900/70 dark:text-white',
  contrast: 'bg-gray-800 text-white dark:bg-white dark:text-black',
  success: 'bg-emerald-500 border-emerald-500 text-white',
  danger: 'bg-red-500 border-red-500 text-white',
  warning: 'bg-yellow-500 border-yellow-500 text-white',
  info: 'bg-indigo-900 border-indigo-900 text-white',
  purple: 'bg-indigo-400 border-indigo-600 text-white',
  blue: 'bg-blue-400 border-blue-600 text-white',
};

export const colorsText = {
  white: 'text-black dark:text-slate-100',
  light: 'text-gray-700 dark:text-slate-400',
  contrast: 'dark:text-white',
  success: 'text-emerald-500',
  danger: 'text-red-500',
  warning: 'text-yellow-500',
  info: 'text-indigo-900',
  purple: 'text-indigo-600',
  blue: 'text-blue-600',
};

export const colorsOutline = {
  white: [colorsText.white, 'border-gray-100'].join(' '),
  light: [colorsText.light, 'border-gray-100'].join(' '),
  contrast: [colorsText.contrast, 'border-gray-900 dark:border-slate-100'].join(' '),
  success: [colorsText.success, 'border-emerald-500'].join(' '),
  danger: [colorsText.danger, 'border-red-500'].join(' '),
  warning: [colorsText.warning, 'border-yellow-500'].join(' '),
  info: [colorsText.info, 'border-indigo-900'].join(' '),
  purple: [colorsText.purple, 'border-indigo-600'].join(' '),
};

export const getButtonColor = (color: ColorButtonKey, isOutlined: boolean, hasHover: boolean, isActive = false) => {
  if (color === 'void') {
    return '';
  }

  const colors = {
    ring: {
      white: 'ring-gray-200 dark:ring-gray-500',
      whiteDark: 'ring-gray-200 dark:ring-gray-500',
      lightDark: 'ring-gray-200 dark:ring-gray-500',
      contrast: 'ring-gray-300 dark:ring-gray-400',
      success: 'ring-emerald-300 dark:ring-emerald-700',
      danger: 'ring-red-300 dark:ring-red-700',
      warning: 'ring-yellow-300 dark:ring-yellow-700',
      info: 'ring-indigo-500 dark:ring-indigo-950',
      purple: 'ring-indigo-600 dark:ring-indigo-550',
      blue: 'ring-blue-600 dark:ring-blue-550',
    },
    active: {
      white: 'bg-gray-100',
      whiteDark: 'bg-gray-100 dark:bg-slate-800',
      lightDark: 'bg-gray-200 dark:bg-slate-700',
      contrast: 'bg-gray-700 dark:bg-slate-100',
      success: 'bg-emerald-700 dark:bg-emerald-600',
      danger: 'bg-red-700 dark:bg-red-600',
      warning: 'bg-yellow-700 dark:bg-yellow-600',
      info: 'bg-indigo-950 dark:bg-indigo-900',
      purple: 'bg-indigo-650 dark:bg-indigo-700',
      blue: 'bg-blue-650 dark:bg-blue-700',
    },
    bg: {
      white: 'bg-white text-black',
      whiteDark: 'bg-white text-black dark:bg-slate-900 dark:text-white',
      lightDark: 'bg-gray-100 text-black dark:bg-slate-800 dark:text-white',
      contrast: 'bg-gray-800 text-white dark:bg-white dark:text-black',
      success: 'bg-emerald-600 dark:bg-emerald-500 text-white',
      danger: 'bg-red-600 dark:bg-red-500 text-white',
      warning: 'bg-yellow-600 dark:bg-yellow-500 text-white',
      info: 'bg-indigo-900 dark:bg-indigo-900 text-white',
      purple: 'bg-indigo-600 dark:bg-indigo-600 text-white',
      blue: 'bg-blue-600 dark:bg-blue-600 text-white',
    },
    bgHover: {
      white: 'hover:bg-gray-100',
      whiteDark: 'hover:bg-gray-100 hover:dark:bg-slate-800',
      lightDark: 'hover:bg-gray-200 hover:dark:bg-slate-700',
      contrast: 'hover:bg-gray-700 hover:dark:bg-slate-100',
      success: 'hover:bg-emerald-700 hover:border-emerald-700 hover:dark:bg-emerald-600 hover:dark:border-emerald-600',
      danger: 'hover:bg-red-700 hover:border-red-700 hover:dark:bg-red-600 hover:dark:border-red-600',
      warning: 'hover:bg-yellow-700 hover:border-yellow-700 hover:dark:bg-yellow-600 hover:dark:border-yellow-600',
      info: 'hover:bg-indigo-950 hover:border-indigo-950 hover:dark:bg-indigo-900 hover:dark:border-indigo-900',
      purple: 'hover:bg-indigo-650 hover:border-indigo-450 hover:dark:bg-indigo-600 hover:dark:border-indigo-600',
      blue: 'hover:bg-blue-650 hover:border-blue-450 hover:dark:bg-blue-600 hover:dark:border-blue-600',
    },
    borders: {
      white: 'border-white',
      whiteDark: 'border-white dark:border-slate-900',
      lightDark: 'border-gray-100 dark:border-slate-800',
      contrast: 'border-gray-800 dark:border-white',
      success: 'border-emerald-600 dark:border-emerald-500',
      danger: 'border-red-600 dark:border-red-500',
      warning: 'border-yellow-600 dark:border-yellow-500',
      info: 'border-indigo-600 dark:border-indigo-600',
      purple: 'border-indigo-400 dark:border-indigo-400',
      blue: 'border-blue-400 dark:border-blue-400',
    },
    text: {
      contrast: 'dark:text-slate-100',
      success: 'text-emerald-600 dark:text-emerald-500',
      danger: 'text-red-600 dark:text-red-500',
      warning: 'text-yellow-600 dark:text-yellow-500',
      info: 'text-indigo-600 dark:text-indigo-600',
      purple: 'text-indigo-400 dark:text-indigo-400',
    },
    outlineHover: {
      contrast: 'hover:bg-gray-800 hover:text-gray-100 hover:dark:bg-slate-100 hover:dark:text-black',
      success:
        'hover:bg-emerald-600 hover:text-white hover:text-white hover:dark:text-white hover:dark:border-emerald-600',
      danger: 'hover:bg-red-600 hover:text-white hover:text-white hover:dark:text-white hover:dark:border-red-600',
      warning:
        'hover:bg-yellow-600 hover:text-white hover:text-white hover:dark:text-white hover:dark:border-yellow-600',
      info: 'hover:bg-indigo-900 hover:text-white hover:dark:text-white hover:dark:border-indigo-900',
      purple: 'hover:bg-indigo-600 hover:text-white hover:dark:text-white hover:dark:border-indigo-600',
    },
  };

  const isOutlinedProcessed = isOutlined && ['white', 'whiteDark', 'lightDark'].indexOf(color) < 0;

  const base = [colors.borders[color], colors.ring[color]];

  if (isActive) {
    base.push(colors.active[color]);
  } else {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    base.push(isOutlinedProcessed ? colors.text[color] : colors.bg[color]);
  }

  if (hasHover) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    base.push(isOutlinedProcessed ? colors.outlineHover[color] : colors.bgHover[color]);
  }

  return base.join(' ');
};
