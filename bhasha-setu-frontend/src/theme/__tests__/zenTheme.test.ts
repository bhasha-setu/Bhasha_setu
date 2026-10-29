// src/theme/__tests__/zenTheme.test.ts
// Unit tests for Zen design system tokens

import zenTheme, {
  zenColors,
  zenGradients,
  zenRadius,
  zenSpacing,
  zenTypography,
} from '../zenTheme';

const HEX_REGEX = /^#[0-9A-Fa-f]{6}$/;

describe('zenColors', () => {
  it('has all required color tokens', () => {
    const requiredTokens = [
      'bgCream',
      'cardWhite',
      'surfaceSand',
      'surfaceInput',
      'surfaceMint',
      'terracotta',
      'ochreAccent',
      'sageTeal',
      'espressoText',
      'mutedBrown',
      'borderWarm',
      'goldStar',
      'successGreen',
    ];
    requiredTokens.forEach((token) => {
      expect(zenColors).toHaveProperty(token);
    });
  });

  it('all color values are valid 6-digit hex strings', () => {
    Object.entries(zenColors).forEach(([key, value]) => {
      expect(value).toMatch(HEX_REGEX);
    });
  });

  it('bgCream is the cream splash background', () => {
    expect(zenColors.bgCream).toBe('#FAF6F0');
  });

  it('sageTeal is the primary action color', () => {
    expect(zenColors.sageTeal).toBe('#3B9B8E');
  });

  it('terracotta is the Hindi brand color', () => {
    expect(zenColors.terracotta).toBe('#8C4A08');
  });

  it('espressoText is the primary text color', () => {
    expect(zenColors.espressoText).toBe('#2C1A0E');
  });

  it('successGreen is correct', () => {
    expect(zenColors.successGreen).toBe('#27AE60');
  });
});

describe('zenGradients', () => {
  it('has loadingAndRoarMeter gradient', () => {
    expect(zenGradients.loadingAndRoarMeter).toEqual(['#C46215', '#3B9B8E']);
  });

  it('primaryAction gradient starts with sageTeal', () => {
    expect(zenGradients.primaryAction[0]).toBe('#3B9B8E');
  });

  it('warmOchre gradient ends with terracotta', () => {
    expect(zenGradients.warmOchre[1]).toBe('#8C4A08');
  });

  it('every gradient has exactly 2 stops', () => {
    Object.entries(zenGradients).forEach(([, value]) => {
      expect(value).toHaveLength(2);
    });
  });
});

describe('zenRadius', () => {
  it('has all radius tokens', () => {
    expect(zenRadius).toHaveProperty('sm');
    expect(zenRadius).toHaveProperty('md');
    expect(zenRadius).toHaveProperty('lg');
    expect(zenRadius).toHaveProperty('pill');
  });

  it('radius values are in ascending order', () => {
    expect(zenRadius.sm).toBeLessThan(zenRadius.md);
    expect(zenRadius.md).toBeLessThan(zenRadius.lg);
    expect(zenRadius.lg).toBeLessThan(zenRadius.pill);
  });

  it('pill radius is very large (for capsule shapes)', () => {
    expect(zenRadius.pill).toBeGreaterThanOrEqual(999);
  });
});

describe('zenSpacing', () => {
  it('has all spacing tokens', () => {
    const keys = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl', 'xxxl'];
    keys.forEach((k) => expect(zenSpacing).toHaveProperty(k));
  });

  it('spacing values increase monotonically', () => {
    expect(zenSpacing.xs).toBeLessThan(zenSpacing.sm);
    expect(zenSpacing.sm).toBeLessThan(zenSpacing.md);
    expect(zenSpacing.md).toBeLessThan(zenSpacing.lg);
    expect(zenSpacing.lg).toBeLessThan(zenSpacing.xl);
    expect(zenSpacing.xl).toBeLessThan(zenSpacing.xxl);
    expect(zenSpacing.xxl).toBeLessThan(zenSpacing.xxxl);
  });

  it('xs spacing is 4px', () => {
    expect(zenSpacing.xs).toBe(4);
  });
});

describe('zenTypography', () => {
  it('has devanagari and latin font families', () => {
    expect(zenTypography.fonts.devanagariRegular).toBe('NotoSansDevanagari_400Regular');
    expect(zenTypography.fonts.devanagariBold).toBe('NotoSansDevanagari_700Bold');
    expect(zenTypography.fonts.latinRegular).toBe('PlusJakartaSans_400Regular');
    expect(zenTypography.fonts.latinBold).toBe('PlusJakartaSans_700Bold');
  });

  it('has hero font size larger than h1', () => {
    expect(zenTypography.sizes.hero).toBeGreaterThan(zenTypography.sizes.h1);
  });

  it('caption size is the smallest', () => {
    const allSizes = Object.values(zenTypography.sizes);
    expect(zenTypography.sizes.caption).toBe(Math.min(...allSizes));
  });

  it('line heights are always larger than their corresponding font sizes', () => {
    const pairs = [
      ['caption', 'caption'],
      ['bodySm', 'bodySm'],
      ['body', 'body'],
    ] as const;
    pairs.forEach(([sizeKey, lhKey]) => {
      expect(zenTypography.lineHeights[lhKey]).toBeGreaterThan(zenTypography.sizes[sizeKey]);
    });
  });
});

describe('zenTheme (composite)', () => {
  it('exports colors, gradients, radius, spacing, and typography', () => {
    expect(zenTheme.colors).toBe(zenColors);
    expect(zenTheme.gradients).toBe(zenGradients);
    expect(zenTheme.radius).toBe(zenRadius);
    expect(zenTheme.spacing).toBe(zenSpacing);
    expect(zenTheme.typography).toBe(zenTypography);
  });

  it('contains valid theme tokens', () => {
    expect(zenTheme).toBeDefined();
    expect(zenTheme.colors.bgCream).toBe('#FAF6F0');
  });
});

