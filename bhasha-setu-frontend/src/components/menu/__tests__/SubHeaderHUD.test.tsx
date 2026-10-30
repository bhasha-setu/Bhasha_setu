// src/components/menu/__tests__/SubHeaderHUD.test.tsx
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { SubHeaderHUD } from '../SubHeaderHUD';

describe('SubHeaderHUD (React Native Component)', () => {
  it('renders lesson title and BHASHA SETU overline', () => {
    const html = renderToStaticMarkup(
      <SubHeaderHUD
        lessonTitle="Bollywood Studio"
        categoryOverline="BHASHA SETU"
        streakDays={7}
        xpPoints={480}
      />
    );

    expect(html).toContain('Bollywood Studio');
    expect(html).toContain('BHASHA SETU');
    expect(html).toContain('7d Streak');
    expect(html).toContain('480 XP');
  });

  it('renders combo label when passed', () => {
    const html = renderToStaticMarkup(
      <SubHeaderHUD
        lessonTitle="Bollywood Studio"
        comboLabel="+20 XP • 2x Combo"
      />
    );

    expect(html).toContain('+20 XP • 2x Combo');
  });
});
