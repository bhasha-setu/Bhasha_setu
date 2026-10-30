// src/components/chat/__tests__/WhatsAppVoiceBubble.test.tsx
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { WhatsAppVoiceBubble } from '../WhatsAppVoiceBubble';

describe('WhatsAppVoiceBubble (React Native Component)', () => {
  it('renders incoming Nani message bubble with duration and timestamp', () => {
    const html = renderToStaticMarkup(
      <WhatsAppVoiceBubble
        sender="nani"
        duration="0:04"
        hindiText="“नमस्ते बेटा! दिवाली की बहुत-बहुत शुभकामनाएँ।”"
        englishSubtext="“Greetings son! Happy Diwali.”"
        timestamp="10:14 AM"
      />
    );

    expect(html).toContain('नमस्ते बेटा!');
    expect(html).toContain('Greetings son!');
    expect(html).toContain('0:04');
    expect(html).toContain('10:14 AM');
  });

  it('renders outgoing User message bubble with fluency score and respect badge', () => {
    const html = renderToStaticMarkup(
      <WhatsAppVoiceBubble
        sender="user"
        duration="0:05"
        hindiText="“नमस्ते नानी! मैं कल सुबह आ रहा हूँ।”"
        englishSubtext="“Greetings Nani! I am coming tomorrow morning.”"
        fluencyScore={96}
        respectWord="आप"
        timestamp="10:15 AM"
      />
    );

    expect(html).toContain('नमस्ते नानी!');
    expect(html).toContain('96% Natural Fluency');
    expect(html).toContain('Respectful Tone');
    expect(html).toContain('आप');
  });
});
