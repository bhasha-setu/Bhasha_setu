// src/lib/services/__tests__/hapticsService.test.ts
// Unit tests for the HapticsService

// Mock expo-haptics
jest.mock('expo-haptics', () => ({
  ImpactFeedbackStyle: { Light: 'Light', Medium: 'Medium', Heavy: 'Heavy' },
  NotificationFeedbackType: { Success: 'Success', Warning: 'Warning', Error: 'Error' },
  impactAsync: jest.fn().mockResolvedValue(undefined),
  notificationAsync: jest.fn().mockResolvedValue(undefined),
}));

// Mock react-native Platform
jest.mock('react-native', () => ({
  Platform: { OS: 'android' },
}));

import * as Haptics from 'expo-haptics';
import {
  triggerKeycapHaptic,
  triggerSuccessHaptic,
  triggerWarningHaptic,
} from '../hapticsService';

describe('triggerKeycapHaptic', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('does not throw on android', () => {
    expect(() => triggerKeycapHaptic()).not.toThrow();
  });

  it('calls Haptics.impactAsync with Light style on android', () => {
    triggerKeycapHaptic();
    expect(Haptics.impactAsync).toHaveBeenCalledWith(Haptics.ImpactFeedbackStyle.Light);
  });
});

describe('triggerSuccessHaptic', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('does not throw on android', () => {
    expect(() => triggerSuccessHaptic()).not.toThrow();
  });

  it('calls Haptics.notificationAsync with Success type on android', () => {
    triggerSuccessHaptic();
    expect(Haptics.notificationAsync).toHaveBeenCalledWith(
      Haptics.NotificationFeedbackType.Success
    );
  });
});

describe('triggerWarningHaptic', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('does not throw on android', () => {
    expect(() => triggerWarningHaptic()).not.toThrow();
  });

  it('calls Haptics.notificationAsync with Warning type on android', () => {
    triggerWarningHaptic();
    expect(Haptics.notificationAsync).toHaveBeenCalledWith(
      Haptics.NotificationFeedbackType.Warning
    );
  });
});

describe('HapticsService on web platform', () => {
  const originalOS = jest.requireMock('react-native').Platform.OS;

  beforeEach(() => {
    jest.clearAllMocks();
    jest.requireMock('react-native').Platform.OS = 'web';
  });

  afterEach(() => {
    jest.requireMock('react-native').Platform.OS = originalOS;
  });

  it('triggerKeycapHaptic does NOT call Haptics on web', () => {
    triggerKeycapHaptic();
    expect(Haptics.impactAsync).not.toHaveBeenCalled();
  });

  it('triggerSuccessHaptic does NOT call Haptics on web', () => {
    triggerSuccessHaptic();
    expect(Haptics.notificationAsync).not.toHaveBeenCalled();
  });

  it('triggerWarningHaptic does NOT call Haptics on web', () => {
    triggerWarningHaptic();
    expect(Haptics.notificationAsync).not.toHaveBeenCalled();
  });
});

