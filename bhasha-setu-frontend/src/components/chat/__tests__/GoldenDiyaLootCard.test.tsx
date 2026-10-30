// src/components/chat/__tests__/GoldenDiyaLootCard.test.tsx
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { GoldenDiyaLootCard } from '../GoldenDiyaLootCard';

describe('GoldenDiyaLootCard (React Native Component)', () => {
  it('renders Golden Diya unlock title, XP amount, and WhatsApp share button', () => {
    const html = renderToStaticMarkup(
      <GoldenDiyaLootCard culturalXp={100} />
    );

    expect(html).toContain('Golden Diya Unlocked!');
    expect(html).toContain('+100 Cultural XP • Conversational Mastery');
    expect(html).toContain('Share Milestone to WhatsApp Status');
    expect(html).toContain('Next Quest: Bargaining at Jaipur Bazaar →');
  });

  it('renders with next quest button when callback is provided', () => {
    const onNextQuest = jest.fn();
    const html = renderToStaticMarkup(
      <GoldenDiyaLootCard onNextQuest={onNextQuest} />
    );
    expect(html).toContain('Next Quest: Bargaining at Jaipur Bazaar →');
  });
});
