// src/theme/zenTheme.ts
// Centralized visual design system and tokens for Bhasha Setu (भाषा सेतु)

export const zenColors = {
  bgCream: '#FAF6F0',
  cardWhite: '#FFFFFF',
  surfaceSand: '#F5EBE1',
  surfaceInput: '#FDF6EE',
  surfaceMint: '#EBF5F3',
  terracotta: '#8C4A08',
  ochreAccent: '#C46215',
  sageTeal: '#3B9B8E',
  espressoText: '#2C1A0E',
  mutedBrown: '#7A6455',
  borderWarm: '#EAE0D5',
  goldStar: '#F39C12',
  successGreen: '#27AE60',
} as const;

export const zenGradients = {
  loadingAndRoarMeter: ['#C46215', '#3B9B8E'] as const,
  primaryAction: ['#3B9B8E', '#2D7D72'] as const,
  warmOchre: ['#C46215', '#8C4A08'] as const,
} as const;

export const zenRadius = {
  sm: 8,
  md: 16,
  lg: 22,
  pill: 999,
} as const;

export const zenSpacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
  xxxl: 48,
} as const;

export const zenTypography = {
  fonts: {
    devanagariRegular: 'NotoSansDevanagari_400Regular',
    devanagariBold: 'NotoSansDevanagari_700Bold',
    latinRegular: 'PlusJakartaSans_400Regular',
    latinMedium: 'PlusJakartaSans_500Medium',
    latinSemiBold: 'PlusJakartaSans_600SemiBold',
    latinBold: 'PlusJakartaSans_700Bold',
  },
  sizes: {
    caption: 12,
    bodySm: 14,
    body: 16,
    h3: 18,
    h2: 22,
    h1: 28,
    hero: 34,
  },
  lineHeights: {
    caption: 16,
    bodySm: 20,
    body: 24,
    h3: 26,
    h2: 30,
    h1: 36,
    hero: 42,
  },
  weights: {
    regular: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
} as const;

export const zenTheme = {
  colors: zenColors,
  gradients: zenGradients,
  radius: zenRadius,
  spacing: zenSpacing,
  typography: zenTypography,
} as const;

export type ZenColors = typeof zenColors;
export type ZenGradients = typeof zenGradients;
export type ZenRadius = typeof zenRadius;
export type ZenSpacing = typeof zenSpacing;
export type ZenTypography = typeof zenTypography;
export type ZenTheme = typeof zenTheme;

export default zenTheme;

