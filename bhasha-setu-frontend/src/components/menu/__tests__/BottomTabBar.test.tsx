// src/components/menu/__tests__/BottomTabBar.test.tsx
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { BottomTabBar } from '../BottomTabBar';

describe('BottomTabBar (React Native Component)', () => {
  it('renders Quest Map, Artifacts, and Profile tabs', () => {
    const html = renderToStaticMarkup(<BottomTabBar activeTab="quest" />);

    expect(html).toContain('Quest Map');
    expect(html).toContain('Artifacts');
    expect(html).toContain('Profile');
    expect(html).toContain('🧭');
    expect(html).toContain('✨');
    expect(html).toContain('👤');
  });

  it('triggers onTabPress when a tab is pressed', () => {
    const onTabPress = jest.fn();
    const element = <BottomTabBar activeTab="quest" onTabPress={onTabPress} />;
    const rendered = (BottomTabBar as any)(element.props);
    // Find Artifacts tab button (second tab)
    const bar = rendered.props.children;
    const artifactsTab = bar.props.children[1];
    artifactsTab.props.onPress();

    expect(onTabPress).toHaveBeenCalledWith('artifacts');
  });
});
