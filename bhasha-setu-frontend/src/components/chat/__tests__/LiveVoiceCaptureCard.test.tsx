// src/components/chat/__tests__/LiveVoiceCaptureCard.test.tsx
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { LiveVoiceCaptureCard } from '../LiveVoiceCaptureCard';

describe('LiveVoiceCaptureCard (React Native Component)', () => {
  it('renders clarity percentage, captured quote, and pitch description', () => {
    const html = renderToStaticMarkup(
      <LiveVoiceCaptureCard
        clarityPercent={90}
        capturedText="“...गेंद पर शानदार छक्का!”"
        highlightWord="छक्का!"
        xpBonus={35}
      />
    );

    expect(html).toContain('90% Clear • natural cadence');
    expect(html).toContain('+35 XP');
    expect(html).toContain('छक्का!');
    expect(html).toContain('Microphone detected pitch: Crisp');
  });

  it('handles captured text without highlight cleanly', () => {
    const html = renderToStaticMarkup(
      <LiveVoiceCaptureCard
        capturedText="नमस्ते दुनिया"
        highlightWord=""
      />
    );

    expect(html).toContain('नमस्ते दुनिया');
  });
});
