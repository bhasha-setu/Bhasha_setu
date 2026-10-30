// src/components/buttons/__tests__/DockedTealButton.test.tsx
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { DockedTealButton } from '../DockedTealButton';

describe('DockedTealButton (React Native Component)', () => {
  it('renders correctly with given label', () => {
    const onPress = jest.fn();
    const html = renderToStaticMarkup(
      <DockedTealButton label="Check Answer • +20 XP →" onPress={onPress} />
    );
    expect(html).toContain('Check Answer • +20 XP →');
  });

  it('renders loading state with ActivityIndicator and hides label', () => {
    const onPress = jest.fn();
    const html = renderToStaticMarkup(
      <DockedTealButton
        label="Check Answer"
        onPress={onPress}
        isLoading={true}
      />
    );
    expect(html).toContain('ActivityIndicator');
    expect(html).not.toContain('Check Answer');
  });

  it('renders custom icon alongside label when provided', () => {
    const onPress = jest.fn();
    const customIcon = <span id="test-icon">🔍</span>;
    const html = renderToStaticMarkup(
      <DockedTealButton
        label="Search Word"
        onPress={onPress}
        icon={customIcon}
      />
    );
    expect(html).toContain('test-icon');
    expect(html).toContain('Search Word');
  });

  it('attaches the onPress callback prop to the TouchableOpacity', () => {
    const onPress = jest.fn();
    const element = (
      <DockedTealButton label="Submit" onPress={onPress} disabled={false} />
    );
    // Directly invoke the component function to inspect returned React element tree
    const rendered = (DockedTealButton as any)(element.props);
    expect(rendered.props.onPress).toBe(onPress);
    rendered.props.onPress();
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('disables the button when disabled prop is true', () => {
    const onPress = jest.fn();
    const element = (
      <DockedTealButton label="Disabled Button" onPress={onPress} disabled={true} />
    );
    const rendered = (DockedTealButton as any)(element.props);
    expect(rendered.props.disabled).toBe(true);
  });
});
