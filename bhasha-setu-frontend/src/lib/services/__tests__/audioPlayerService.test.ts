// src/lib/services/__tests__/audioPlayerService.test.ts
// Unit tests for the AudioPlayerService

import { AudioPlayerService } from '../audioPlayerService';

describe('AudioPlayerService.playClip', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    AudioPlayerService.stopCurrentClip(); // clean up before each
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('returns status "playing"', async () => {
    const result = await AudioPlayerService.playClip('test-clip');
    expect(result.status).toBe('playing');
  });

  it('returns the correct clipId', async () => {
    const result = await AudioPlayerService.playClip('bollywood-melody');
    expect(result.clipId).toBe('bollywood-melody');
  });

  it('returns the requested playback speed', async () => {
    const result = await AudioPlayerService.playClip('test', 0.75);
    expect(result.speed).toBe(0.75);
  });

  it('defaults speed to 1.0', async () => {
    const result = await AudioPlayerService.playClip('test');
    expect(result.speed).toBe(1.0);
  });

  it('calls onFinish after base duration at 1.0x speed (~2800ms)', async () => {
    const onFinish = jest.fn();
    await AudioPlayerService.playClip('test', 1.0, onFinish);
    expect(onFinish).not.toHaveBeenCalled();
    jest.advanceTimersByTime(2800);
    expect(onFinish).toHaveBeenCalledTimes(1);
  });

  it('at 0.75x speed, onFinish fires later (~3733ms)', async () => {
    const onFinish = jest.fn();
    await AudioPlayerService.playClip('test', 0.75, onFinish);
    jest.advanceTimersByTime(2800);
    expect(onFinish).not.toHaveBeenCalled(); // not yet
    jest.advanceTimersByTime(1000); // total 3800ms
    expect(onFinish).toHaveBeenCalledTimes(1);
  });

  it('at 0.8x speed, onFinish fires later (~3500ms)', async () => {
    const onFinish = jest.fn();
    await AudioPlayerService.playClip('test', 0.8, onFinish);
    jest.advanceTimersByTime(2800);
    expect(onFinish).not.toHaveBeenCalled(); // not yet
    jest.advanceTimersByTime(800); // total 3600ms (3500ms effective)
    expect(onFinish).toHaveBeenCalledTimes(1);
  });

  it('playing a second clip cancels the first onFinish', async () => {
    const onFinish1 = jest.fn();
    const onFinish2 = jest.fn();
    await AudioPlayerService.playClip('clip1', 1.0, onFinish1);
    await AudioPlayerService.playClip('clip2', 1.0, onFinish2);
    jest.advanceTimersByTime(3000);
    expect(onFinish1).not.toHaveBeenCalled(); // cancelled
    expect(onFinish2).toHaveBeenCalledTimes(1);
  });
});

describe('AudioPlayerService.stopCurrentClip', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('does not throw when no clip is playing', () => {
    expect(() => AudioPlayerService.stopCurrentClip()).not.toThrow();
  });

  it('prevents onFinish from firing after stop', async () => {
    const onFinish = jest.fn();
    await AudioPlayerService.playClip('test', 1.0, onFinish);
    AudioPlayerService.stopCurrentClip();
    jest.advanceTimersByTime(5000);
    expect(onFinish).not.toHaveBeenCalled();
  });

  it('can be called multiple times without error', () => {
    expect(() => {
      AudioPlayerService.stopCurrentClip();
      AudioPlayerService.stopCurrentClip();
    }).not.toThrow();
  });
});

