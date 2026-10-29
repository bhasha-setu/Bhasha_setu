// src/lib/services/shareStatusService.ts
// Captures view shot for WhatsApp Status sharing using react-native-view-shot and expo-sharing

import type { RefObject } from 'react';
import { Platform, Linking, Alert } from 'react-native';
import * as Sharing from 'expo-sharing';
import { captureRef } from 'react-native-view-shot';

export async function captureAndShareMilestone(
  viewRef: RefObject<any>
): Promise<{ success: boolean; error?: string }> {
  try {
    if (viewRef.current) {
      const uri = await captureRef(viewRef, {
        format: 'png',
        quality: 0.95,
      });

      const canShare = await Sharing.isAvailableAsync();
      if (canShare) {
        await Sharing.shareAsync(uri, {
          mimeType: 'image/png',
          dialogTitle: 'Share Milestone to WhatsApp Status',
          UTI: 'public.png',
        });
        return { success: true };
      }
    }

    // Fallback: share text via WhatsApp deep link
    const whatsappText = encodeURIComponent(
      '🏆 I just unlocked the Golden Diya on Bhasha Setu (भाषा सेतु)! 🪔\nSpontaneous Hindi Mastery unlocked with 100% Active Recall!'
    );
    const whatsappUrl = `whatsapp://send?text=${whatsappText}`;

    const canOpen = await Linking.canOpenURL(whatsappUrl);
    if (canOpen) {
      await Linking.openURL(whatsappUrl);
      return { success: true };
    } else {
      if (Platform.OS === 'web') {
        window.open(`https://api.whatsapp.com/send?text=${whatsappText}`, '_blank');
        return { success: true };
      }
      Alert.alert(
        'Milestone Ready to Share',
        '🏆 Golden Diya Unlocked! +100 Cultural XP on Bhasha Setu (भाषा सेतु)!'
      );
      return { success: true };
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown share error';
    return { success: false, error: message };
  }
}
