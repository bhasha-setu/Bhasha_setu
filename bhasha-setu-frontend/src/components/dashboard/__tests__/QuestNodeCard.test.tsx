// src/components/dashboard/__tests__/QuestNodeCard.test.tsx
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { QuestNodeCard } from '../QuestNodeCard';

describe('QuestNodeCard (React Native Component)', () => {
  it('renders mastered quest card with stars and tag', () => {
    const html = renderToStaticMarkup(
      <QuestNodeCard
        status="mastered"
        title="Zen Bollywood Studio"
        subtitle="Dialogue & Spontaneous Enunciation"
        tagOverline="LEVEL 1 • MASTERED"
        stars={3}
      />
    );

    expect(html).toContain('Zen Bollywood Studio');
    expect(html).toContain('Spontaneous Enunciation');
    expect(html).toContain('LEVEL 1 • MASTERED');
    expect(html).toContain('★');
  });

  it('renders active quest card with CTA button and XP badge', () => {
    const onPress = jest.fn();
    const html = renderToStaticMarkup(
      <QuestNodeCard
        status="active"
        title="Level 3: Street Food Masterchef"
        subtitle="Order authentic chaat and negotiate portions"
        tagOverline="ACTIVE QUEST • NOW PLAYING"
        xpReward={50}
        ctaLabel="Play Quest • +50 XP →"
        onPress={onPress}
      />
    );

    expect(html).toContain('Level 3: Street Food Masterchef');
    expect(html).toContain('ACTIVE QUEST • NOW PLAYING');
    expect(html).toContain('+50 XP');
    expect(html).toContain('Play Quest • +50 XP →');
  });

  it('renders locked quest card with locked badge', () => {
    const html = renderToStaticMarkup(
      <QuestNodeCard
        status="locked"
        title="Diwali WhatsApp Call with Nani"
        subtitle="Master 3-Minute Live Dialogue Flow"
        tagOverline="BOSS QUEST • FINAL BRIDGE"
      />
    );

    expect(html).toContain('Diwali WhatsApp Call with Nani');
    expect(html).toContain('BOSS QUEST • FINAL BRIDGE');
    expect(html).toContain('Locked');
  });
});
