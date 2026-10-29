// src/lib/services/hapticsService.ts
// Wraps expo-haptics to trigger tactile vibrations on key press & star unlocks

import * as Haptics from 'expo-haptics';
import { Platform } from 'react-native';

export function triggerKeycapHaptic(): void {
  try {
    if (Platform.OS !== 'web') {
      void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
  } catch {
    // Graceful fallback when haptics are unsupported
  }
}

export function triggerSuccessHaptic(): void {
  try {
    if (Platform.OS !== 'web') {
      void Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }
  } catch {
    // Graceful fallback
  }
}

export function triggerWarningHaptic(): void {
  try {
    if (Platform.OS !== 'web') {
      void Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
    }
  } catch {
    // Graceful fallback
  }
}
