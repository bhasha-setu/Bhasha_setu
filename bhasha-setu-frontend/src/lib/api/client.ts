// src/lib/api/client.ts
import { AudioPlayerService } from '@/lib/services/audioPlayerService';

export const ApiClient = {
  // Evaluates typed Devanagari answers on Screen 2 (दिल) & Screen 4 (तीखा)
  async checkDevanagariAnswer(levelId: string, typedWord: string, expectedWord: string) {
    const isNormalizedMatch = typedWord.trim() === expectedWord.trim();
    return {
      isCorrect: isNormalizedMatch,
      xpAwarded: levelId === 'BOLLYWOOD' ? 20 : 50,
      comboMultiplier: 2,
    };
  },

  // Requests audio playback or plays local cached asset at 1.0x / 0.75x / 0.8x
  async playPromptAudio(
    clipId: string,
    speed: 1.0 | 0.8 | 0.75 = 1.0,
    onFinish?: () => void
  ) {
    return AudioPlayerService.playClip(clipId, speed, onFinish);
  },

  // Initiates Bolna Voice AI session for Screen 3 & Screen 5
  async initBolnaClientSession(agentKey: 'CRICKET_AGENT' | 'NANI_BOSS_AGENT') {
    return {
      sessionId: `session_${Date.now()}`,
      wsEndpoint: `wss://api.bolna.ai/v1/ws?agent=${agentKey}`,
    };
  },
};
