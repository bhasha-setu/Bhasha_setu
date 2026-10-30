// src/lib/services/__tests__/shareStatusService.test.ts
import { captureAndShareMilestone } from '../shareStatusService';
import * as Sharing from 'expo-sharing';
import { captureRef } from 'react-native-view-shot';

describe('shareStatusService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('captures view and opens native share sheet when available', async () => {
    const mockRef = { current: {} };
    const result = await captureAndShareMilestone(mockRef as any);

    expect(captureRef).toHaveBeenCalledWith(mockRef, {
      format: 'png',
      quality: 0.95,
    });
    expect(Sharing.shareAsync).toHaveBeenCalledWith(
      'file:///path/to/viewshot.png',
      expect.objectContaining({
        mimeType: 'image/png',
        dialogTitle: 'Share Milestone to WhatsApp Status',
      })
    );
    expect(result.success).toBe(true);
  });

  it('handles capture exception gracefully', async () => {
    (captureRef as jest.Mock).mockRejectedValueOnce(new Error('Capture failure'));
    const mockRef = { current: {} };

    const result = await captureAndShareMilestone(mockRef as any);
    expect(result.success).toBe(false);
    expect(result.error).toBe('Capture failure');
  });
});

