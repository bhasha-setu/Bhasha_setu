// src/components/menu/__tests__/TopScreenBar.test.tsx
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { TopScreenBar } from '../TopScreenBar';
import { mockRouter } from '../../../../__mocks__/expo-router';

describe('TopScreenBar (React Native Component)', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders screen title and default BHASHA SETU subtitle', () => {
    const html = renderToStaticMarkup(
      <TopScreenBar title="Zen Bollywood Studio" />
    );
    expect(html).toContain('Zen Bollywood Studio');
    expect(html).toContain('BHASHA SETU');
  });

  it('renders back button when showBack is true', () => {
    const html = renderToStaticMarkup(
      <TopScreenBar title="Cricket Commentary" showBack={true} />
    );
    expect(html).toContain('←');
  });

  it('hides back button when showBack is false', () => {
    const html = renderToStaticMarkup(
      <TopScreenBar title="Quest Map" showBack={false} />
    );
    expect(html).not.toContain('←');
  });

  it('triggers onBack callback when provided', () => {
    const onBack = jest.fn();
    const element = <TopScreenBar title="Test" onBack={onBack} />;
    const rendered = (TopScreenBar as any)(element.props);
    // Find back button
    const backBtn = rendered.props.children[0].props.children[0];
    backBtn.props.onPress();
    expect(onBack).toHaveBeenCalledTimes(1);
  });

  it('calls router.back() when onBack is not provided', () => {
    const element = <TopScreenBar title="Test" />;
    const rendered = (TopScreenBar as any)(element.props);
    const backBtn = rendered.props.children[0].props.children[0];
    backBtn.props.onPress();
    expect(mockRouter.back).toHaveBeenCalledTimes(1);
  });

  it('renders streak badge when streak prop is provided', () => {
    const html = renderToStaticMarkup(
      <TopScreenBar title="Street Food" streak={7} />
    );
    expect(html).toContain('🔥 7');
  });
});
