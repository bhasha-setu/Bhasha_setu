// src/components/chat/__tests__/DailyFlipBanner.test.tsx
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { DailyFlipBanner } from '../DailyFlipBanner';

describe('DailyFlipBanner (React Native Component)', () => {
  it('renders default daily flip phrase and English meaning', () => {
    const html = renderToStaticMarkup(<DailyFlipBanner />);
    expect(html).toContain('Daily Flip');
    expect(html).toContain('“आख़िरी मिनट पर”');
    expect(html).toContain('At the last minute');
  });

  it('renders custom phrase and meaning when passed as props', () => {
    const html = renderToStaticMarkup(
      <DailyFlipBanner
        hindiPhrase="“चार चाँद लगाना”"
        englishMeaning="To add elegance/charm"
      />
    );
    expect(html).toContain('“चार चाँद लगाना”');
    expect(html).toContain('To add elegance/charm');
  });
});
