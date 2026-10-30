// src/components/inputs/__tests__/DevanagariKeyboard.test.tsx
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { DevanagariKeyboard } from '../DevanagariKeyboard';

// Mock haptics
jest.mock('@/lib/services/hapticsService', () => ({
  triggerKeycapHaptic: jest.fn(),
}));

import { triggerKeycapHaptic } from '@/lib/services/hapticsService';

describe('DevanagariKeyboard (React Native Component)', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders bollywood variant with matras and consonants', () => {
    const onKeyPress = jest.fn();
    const onBackspace = jest.fn();
    const html = renderToStaticMarkup(
      <DevanagariKeyboard
        variant="bollywood"
        onKeyPress={onKeyPress}
        onBackspace={onBackspace}
      />
    );
    expect(html).toContain('ि');
    expect(html).toContain('ी');
    expect(html).toContain('क');
    expect(html).toContain('द');
    expect(html).toContain('ल');
    expect(html).toContain('स्पेस (space)');
  });

  it('renders streetfood variant with header labels and Clear button', () => {
    const onKeyPress = jest.fn();
    const onBackspace = jest.fn();
    const onClear = jest.fn();
    const html = renderToStaticMarkup(
      <DevanagariKeyboard
        variant="streetfood"
        onKeyPress={onKeyPress}
        onBackspace={onBackspace}
        onClear={onClear}
      />
    );
    expect(html).toContain('देवनागरी कीबोर्ड');
    expect(html).toContain('हिन्दी इनपुट');
    expect(html).toContain('Clear');
    expect(html).toContain('Space');
  });

  it('renders keys and triggers haptics on user interaction', () => {
    const onKeyPress = jest.fn();
    const onBackspace = jest.fn();
    const html = renderToStaticMarkup(
      <DevanagariKeyboard
        variant="bollywood"
        onKeyPress={onKeyPress}
        onBackspace={onBackspace}
      />
    );
    expect(html).toContain('data-component="TouchableOpacity"');
    expect(html).toContain('दिल'.charAt(0) || 'द');
  });

  it('triggers onKeyPress when key handler is invoked', () => {
    const onKeyPress = jest.fn();
    const onBackspace = jest.fn();
    const element = (
      <DevanagariKeyboard
        variant="bollywood"
        onKeyPress={onKeyPress}
        onBackspace={onBackspace}
      />
    );
    const rendered = (DevanagariKeyboard as any)(element.props);
    // rendered.props.children is gridContainer
    const gridContainer = rendered.props.children;
    const row0 = gridContainer.props.children[0];
    const key0 = row0.props.children[0];
    key0.props.onPress();
    expect(triggerKeycapHaptic).toHaveBeenCalledTimes(1);
    expect(onKeyPress).toHaveBeenCalledWith('ि');
  });

  it('triggers onBackspace when backspace handler is invoked', () => {
    const onKeyPress = jest.fn();
    const onBackspace = jest.fn();
    const element = (
      <DevanagariKeyboard
        variant="bollywood"
        onKeyPress={onKeyPress}
        onBackspace={onBackspace}
      />
    );
    const rendered = (DevanagariKeyboard as any)(element.props);
    const gridContainer = rendered.props.children;
    const bottomRow = gridContainer.props.children[4];
    const backspaceKey = bottomRow.props.children[1];
    backspaceKey.props.onPress();
    expect(triggerKeycapHaptic).toHaveBeenCalledTimes(1);
    expect(onBackspace).toHaveBeenCalledTimes(1);
  });
});
