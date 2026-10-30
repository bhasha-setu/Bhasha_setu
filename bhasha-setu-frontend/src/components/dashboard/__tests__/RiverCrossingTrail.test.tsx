// src/components/dashboard/__tests__/RiverCrossingTrail.test.tsx
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { RiverCrossingTrail } from '../RiverCrossingTrail';

describe('RiverCrossingTrail (React Native Component)', () => {
  it('renders section title and stage 3 of 4 indicator', () => {
    const html = renderToStaticMarkup(
      <RiverCrossingTrail currentStage={3} totalStages={4} />
    );

    expect(html).toContain('The River Crossing Path');
    expect(html).toContain('Stage 3 of 4');
  });
});
