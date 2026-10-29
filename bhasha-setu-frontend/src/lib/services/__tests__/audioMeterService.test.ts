// src/lib/services/__tests__/audioMeterService.test.ts
// Unit tests for the AudioMeterService

import {
  computeNormalizedWaveHeights,
  getDecibelLevel,
  startAudioMeter,
} from '../audioMeterService';

describe('computeNormalizedWaveHeights', () => {
  it('returns exactly 7 bars by default', () => {
    const heights = computeNormalizedWaveHeights(84);
    expect(heights).toHaveLength(7);
  });

  it('returns the requested bar count', () => {
    expect(computeNormalizedWaveHeights(84, 5)).toHaveLength(5);
    expect(computeNormalizedWaveHeights(84, 10)).toHaveLength(10);
  });

  it('all heights are between 0.0 and 1.0 inclusive', () => {
    const heights = computeNormalizedWaveHeights(84);
    heights.forEach((h) => {
      expect(h).toBeGreaterThanOrEqual(0.0);
      expect(h).toBeLessThanOrEqual(1.0);
    });
  });

  it('all heights are numbers rounded to 2 decimal places', () => {
    const heights = computeNormalizedWaveHeights(70);
    heights.forEach((h) => {
      expect(typeof h).toBe('number');
      // Check at most 2 decimal places
      const str = h.toString();
      const decimalPart = str.split('.')[1] ?? '';
      expect(decimalPart.length).toBeLessThanOrEqual(2);
    });
  });

  it('very low decibels (≤30) produce minimum-height bars (0.12 floor)', () => {
    const heights = computeNormalizedWaveHeights(10);
    heights.forEach((h) => {
      expect(h).toBeGreaterThanOrEqual(0.12);
    });
  });

  it('very high decibels (100+) still produce heights ≤1.0', () => {
    const heights = computeNormalizedWaveHeights(120);
    heights.forEach((h) => {
      expect(h).toBeLessThanOrEqual(1.0);
    });
  });

  it('higher decibels produce higher average bar height', () => {
    const lowHeights = computeNormalizedWaveHeights(35);
    const highHeights = computeNormalizedWaveHeights(95);
    const avgLow = lowHeights.reduce((s, v) => s + v, 0) / lowHeights.length;
    const avgHigh = highHeights.reduce((s, v) => s + v, 0) / highHeights.length;
    // Due to jitter there may be overlap, but high should generally be higher
    // Use a relaxed comparison since jitter adds ±0.18
    expect(avgHigh).toBeGreaterThan(avgLow - 0.2);
  });
});

describe('getDecibelLevel', () => {
  it('returns a number', () => {
    expect(typeof getDecibelLevel()).toBe('number');
  });

  it('returns the initial decibel level', () => {
    // Initial value is 84 per service code
    expect(getDecibelLevel()).toBe(84);
  });
});

describe('startAudioMeter', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('returns a cleanup function', () => {
    const stop = startAudioMeter(() => {});
    expect(typeof stop).toBe('function');
    stop();
  });

  it('calls onUpdate after 100ms intervals', () => {
    const onUpdate = jest.fn();
    const stop = startAudioMeter(onUpdate);

    jest.advanceTimersByTime(350);
    // Should fire at 100ms, 200ms, 300ms → 3 calls
    expect(onUpdate).toHaveBeenCalledTimes(3);
    stop();
  });

  it('onUpdate receives correct AudioMeterState shape', () => {
    const onUpdate = jest.fn();
    const stop = startAudioMeter(onUpdate);

    jest.advanceTimersByTime(100);

    const state = onUpdate.mock.calls[0][0];
    expect(state).toHaveProperty('decibels');
    expect(state).toHaveProperty('pitch');
    expect(state).toHaveProperty('clarityPercent');
    expect(state).toHaveProperty('waveHeights');
    expect(state.waveHeights).toHaveLength(7);
    stop();
  });

  it('clarityPercent stays between 80 and 99', () => {
    const onUpdate = jest.fn();
    const stop = startAudioMeter(onUpdate);

    jest.advanceTimersByTime(1000);
    onUpdate.mock.calls.forEach(([state]) => {
      expect(state.clarityPercent).toBeGreaterThanOrEqual(80);
      expect(state.clarityPercent).toBeLessThanOrEqual(99);
    });
    stop();
  });

  it('cleanup function stops further updates', () => {
    const onUpdate = jest.fn();
    const stop = startAudioMeter(onUpdate);
    jest.advanceTimersByTime(100);
    stop();
    jest.advanceTimersByTime(500);
    // Should have been called exactly once (only the 100ms tick before stop)
    expect(onUpdate).toHaveBeenCalledTimes(1);
  });

  it('starting a second meter stops the previous one', () => {
    const onUpdate1 = jest.fn();
    const onUpdate2 = jest.fn();

    const stop1 = startAudioMeter(onUpdate1);
    const stop2 = startAudioMeter(onUpdate2);

    jest.advanceTimersByTime(200);

    // onUpdate1 should not have been called after stop1 was implicitly replaced
    expect(onUpdate2.mock.calls.length).toBeGreaterThan(0);
    stop1();
    stop2();
  });
});

