// src/components/dashboard/__tests__/MilestoneChestBar.test.tsx
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { MilestoneChestBar } from '../MilestoneChestBar';

describe('MilestoneChestBar (React Native Component)', () => {
  it('renders milestone chest title, target XP, and XP needed', () => {
    const html = renderToStaticMarkup(
      <MilestoneChestBar currentXp={480} targetXp={500} />
    );

    expect(html).toContain('Milestone Chest');
    expect(html).toContain('Unlocks at 500 XP (20 XP away)');
  });

  it('renders progress bar and calculations correctly', () => {
    const html = renderToStaticMarkup(
      <MilestoneChestBar currentXp={400} targetXp={500} />
    );

    expect(html).toContain('Unlocks at 500 XP (100 XP away)');
  });
});
