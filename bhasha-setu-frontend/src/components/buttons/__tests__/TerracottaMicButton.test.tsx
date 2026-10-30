// src/components/buttons/__tests__/TerracottaMicButton.test.tsx
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { TerracottaMicButton } from '../TerracottaMicButton';

describe('TerracottaMicButton (React Native Component)', () => {
  it('renders circular terracotta microphone button', () => {
    const html = renderToStaticMarkup(
      <TerracottaMicButton size={64} isListening={false} />
    );

    expect(html).toContain('🎙️');
    expect(html).toContain('data-component="TouchableOpacity"');
  });

  it('renders pulse and ripple animations when isListening is true', () => {
    const html = renderToStaticMarkup(
      <TerracottaMicButton size={64} isListening={true} />
    );

    expect(html).toContain('data-component="Animated.View"');
  });
});
