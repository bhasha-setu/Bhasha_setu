// src/components/chat/__tests__/StadiumRoarMeterCard.test.tsx
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { StadiumRoarMeterCard } from '../StadiumRoarMeterCard';

describe('StadiumRoarMeterCard (React Native Component)', () => {
  it('renders title and 92% Wankhede Decibels text', () => {
    const html = renderToStaticMarkup(
      <StadiumRoarMeterCard decibelPercent={92} />
    );
    expect(html).toContain('Stadium Roar Meter');
    expect(html).toContain('92% Wankhede Decibels');
  });

  it('renders Gully Whispers and Match-Winning Decibels labels', () => {
    const html = renderToStaticMarkup(
      <StadiumRoarMeterCard decibelPercent={85} />
    );
    expect(html).toContain('Gully Whispers');
    expect(html).toContain('Match-Winning Decibels 🔥');
  });

  it('renders LinearGradient meter component', () => {
    const html = renderToStaticMarkup(
      <StadiumRoarMeterCard decibelPercent={92} />
    );
    expect(html).toContain('LinearGradient');
  });
});
