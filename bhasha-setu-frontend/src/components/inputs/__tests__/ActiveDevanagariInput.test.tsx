// src/components/inputs/__tests__/ActiveDevanagariInput.test.tsx
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { ActiveDevanagariInput } from '../ActiveDevanagariInput';

describe('ActiveDevanagariInput (React Native Component)', () => {
  it('renders typed Devanagari text correctly', () => {
    const html = renderToStaticMarkup(
      <ActiveDevanagariInput value="दिल" />
    );
    expect(html).toContain('दिल');
  });

  it('renders placeholder when value is empty', () => {
    const html = renderToStaticMarkup(
      <ActiveDevanagariInput value="" placeholder="Type missing word..." />
    );
    expect(html).toContain('Type missing word...');
  });

  it('renders clear/backspace button when value is present and onBackspace provided', () => {
    const onBackspace = jest.fn();
    const html = renderToStaticMarkup(
      <ActiveDevanagariInput value="तीखा" onBackspace={onBackspace} />
    );
    expect(html).toContain('तीखा');
    expect(html).toContain('⌫');
  });

  it('renders disabled non-editable mode cleanly', () => {
    const html = renderToStaticMarkup(
      <ActiveDevanagariInput value="तीखा" editable={false} />
    );
    expect(html).toContain('तीखा');
  });
});
