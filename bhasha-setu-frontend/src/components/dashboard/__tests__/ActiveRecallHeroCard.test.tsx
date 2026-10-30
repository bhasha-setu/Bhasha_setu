// src/components/dashboard/__tests__/ActiveRecallHeroCard.test.tsx
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { ActiveRecallHeroCard } from '../ActiveRecallHeroCard';

describe('ActiveRecallHeroCard (React Native Component)', () => {
  it('renders 100% ACTIVE RECALL badge and hero description', () => {
    const html = renderToStaticMarkup(<ActiveRecallHeroCard />);
    expect(html).toContain('100% ACTIVE RECALL');
    expect(html).toContain('Bridge from script to spontaneous speech');
    expect(html).toContain('Craft complete Hindi thoughts natively');
  });

  it('renders all 4 artifact items', () => {
    const html = renderToStaticMarkup(<ActiveRecallHeroCard />);
    expect(html).toContain('Vintage Mic');
    expect(html).toContain('Cricket Ball');
    expect(html).toContain('Chai Kulhad');
    expect(html).toContain('Golden Diya');
  });

  it('shows unlocked state for unlocked artifacts', () => {
    const html = renderToStaticMarkup(
      <ActiveRecallHeroCard unlockedArtifactIds={['vintage-mic', 'cricket-ball']} />
    );
    expect(html).toContain('✓');
  });
});
