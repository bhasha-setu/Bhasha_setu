// src/components/buttons/__tests__/AudioSpeedPills.test.tsx
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { AudioSpeedPills } from '../AudioSpeedPills';

describe('AudioSpeedPills (React Native Component)', () => {
  it('renders default melody label and duration', () => {
    const html = renderToStaticMarkup(
      <AudioSpeedPills label="Play melody" duration="0:05" />
    );
    expect(html).toContain('Play melody (0:05)');
    expect(html).toContain('0.75x');
  });

  it('renders playing state with pause symbol', () => {
    const html = renderToStaticMarkup(
      <AudioSpeedPills isPlaying={true} duration="0:03" />
    );
    expect(html).toContain('⏸');
  });

  it('renders tag label when provided', () => {
    const html = renderToStaticMarkup(
      <AudioSpeedPills tagLabel="1976 CLASSIC" playbackSpeed={0.75} />
    );
    expect(html).toContain('1976 CLASSIC');
  });

  it('handles playback speed cycle callback', () => {
    const onToggleSpeed = jest.fn();
    const element = (
      <AudioSpeedPills
        playbackSpeed={0.75}
        onToggleSpeed={onToggleSpeed}
      />
    );
    const rendered = (AudioSpeedPills as any)(element.props);
    // Find the speed button in the left pills container
    const leftPills = rendered.props.children[0];
    const speedButton = leftPills.props.children[1];
    speedButton.props.onPress();
    expect(onToggleSpeed).toHaveBeenCalledWith(0.8);
  });
});
