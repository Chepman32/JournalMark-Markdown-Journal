// Visual System - Design Tokens

export const Colors = {
  light: {
    primary: '#007AFF',
    secondary: '#5856D6',
    success: '#34C759',
    warning: '#FF9500',
    error: '#FF3B30',
    info: '#5AC8FA',

    background: '#FFFFFF',
    surface: '#F2F2F7',
    surfaceVariant: '#E5E5EA',

    text: '#000000',
    textSecondary: '#3C3C43',
    textTertiary: '#8E8E93',
    textDisabled: '#C7C7CC',

    border: '#C6C6C8',
    divider: '#E5E5EA',

    overlay: 'rgba(0, 0, 0, 0.4)',
    shadow: 'rgba(0, 0, 0, 0.15)',
  },
  dark: {
    primary: '#0A84FF',
    secondary: '#5E5CE6',
    success: '#32D74B',
    warning: '#FF9F0A',
    error: '#FF453A',
    info: '#64D2FF',

    background: '#000000',
    surface: '#1C1C1E',
    surfaceVariant: '#2C2C2E',

    text: '#FFFFFF',
    textSecondary: '#EBEBF5',
    textTertiary: '#AEAEB2',
    textDisabled: '#48484A',

    border: '#38383A',
    divider: '#2C2C2E',

    overlay: 'rgba(0, 0, 0, 0.6)',
    shadow: 'rgba(0, 0, 0, 0.3)',
  },
};

export const Typography = {
  largeTitle: {
    fontSize: 34,
    lineHeight: 41,
    fontWeight: '700' as const,
    letterSpacing: 0.37,
  },
  title1: {
    fontSize: 28,
    lineHeight: 34,
    fontWeight: '700' as const,
    letterSpacing: 0.36,
  },
  title2: {
    fontSize: 22,
    lineHeight: 28,
    fontWeight: '700' as const,
    letterSpacing: 0.35,
  },
  title3: {
    fontSize: 20,
    lineHeight: 25,
    fontWeight: '600' as const,
    letterSpacing: 0.38,
  },
  headline: {
    fontSize: 17,
    lineHeight: 22,
    fontWeight: '600' as const,
    letterSpacing: -0.41,
  },
  body: {
    fontSize: 17,
    lineHeight: 22,
    fontWeight: '400' as const,
    letterSpacing: -0.41,
  },
  callout: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: '400' as const,
    letterSpacing: -0.32,
  },
  subheadline: {
    fontSize: 15,
    lineHeight: 20,
    fontWeight: '400' as const,
    letterSpacing: -0.24,
  },
  footnote: {
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '400' as const,
    letterSpacing: -0.08,
  },
  caption1: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '400' as const,
    letterSpacing: 0,
  },
  caption2: {
    fontSize: 11,
    lineHeight: 13,
    fontWeight: '400' as const,
    letterSpacing: 0.06,
  },
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
  xxxl: 64,
};

export const BorderRadius = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999,
};

export const Shadows = {
  sm: {
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.30,
    shadowRadius: 4.65,
    elevation: 8,
  },
  xl: {
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 8},
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 16,
  },
};

export const HitSlop = {
  sm: {top: 8, bottom: 8, left: 8, right: 8},
  md: {top: 12, bottom: 12, left: 12, right: 12},
  lg: {top: 16, bottom: 16, left: 16, right: 16},
};

export const AnimationTimings = {
  fast: 200,
  normal: 300,
  slow: 500,
};

export const SpringConfigs = {
  gentle: {
    stiffness: 180,
    damping: 14,
  },
  normal: {
    stiffness: 240,
    damping: 18,
  },
  bouncy: {
    stiffness: 320,
    damping: 22,
  },
};
