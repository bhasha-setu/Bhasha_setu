// src/components/menu/__tests__/BrandLogoBadge.test.tsx
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { BrandLogoBadge, SoundwaveBars } from '../BrandLogoBadge';

describe('BrandLogoBadge and SoundwaveBars (React Native Component)', () => {
  it('renders BrandLogoBadge image container', () => {
    const html = renderToStaticMarkup(<BrandLogoBadge size={40} />);
    expect(html).toContain('data-component="Image"');
  });

  it('renders SoundwaveBars with 7 vertical bars', () => {
    const html = renderToStaticMarkup(<SoundwaveBars size="lg" isAnimating={false} />);
    expect(html).toContain('data-component="Animated.View"');
  });
});
