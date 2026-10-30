// src/components/buttons/__tests__/PublicSilentTogglePill.test.tsx
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { PublicSilentTogglePill } from '../PublicSilentTogglePill';

describe('PublicSilentTogglePill (React Native Component)', () => {
  it('renders type instead prompt when silent mode is false', () => {
    const html = renderToStaticMarkup(
      <PublicSilentTogglePill isSilentMode={false} />
    );
    expect(html).toContain('Type instead');
    expect(html).toContain('⌨️');
  });

  it('renders switch back to spoken drill when silent mode is true', () => {
    const html = renderToStaticMarkup(
      <PublicSilentTogglePill isSilentMode={true} />
    );
    expect(html).toContain('Switch back to Spoken Drill');
    expect(html).toContain('🎙️');
  });

  it('triggers onToggle callback when pressed', () => {
    const onToggle = jest.fn();
    const element = <PublicSilentTogglePill isSilentMode={false} onToggle={onToggle} />;
    const rendered = (PublicSilentTogglePill as any)(element.props);
    rendered.props.onPress();
    expect(onToggle).toHaveBeenCalledTimes(1);
  });
});
