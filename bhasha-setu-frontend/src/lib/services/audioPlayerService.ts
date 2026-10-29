// src/lib/services/audioPlayerService.ts
// Audio player service handling melody playback, speed adjustments and UI sound effects

export interface AudioPlaybackState {
  clipId: string;
  playbackSpeed: 1.0 | 0.8 | 0.75;
  isPlaying: boolean;
  currentTimeMs: number;
  durationMs: number;
}

let activePlaybackTimer: ReturnType<typeof setTimeout> | null = null;

export const AudioPlayerService = {
  async playClip(
    clipId: string,
    speed: 1.0 | 0.8 | 0.75 = 1.0,
    onFinish?: () => void
  ): Promise<{ status: 'playing'; clipId: string; speed: number }> {
    if (activePlaybackTimer) {
      clearTimeout(activePlaybackTimer);
      activePlaybackTimer = null;
    }

    // Dynamic duration based on playback speed (slower = longer)
    const baseDurationMs = 2800;
    const effectiveDurationMs = Math.round(baseDurationMs / speed);

    activePlaybackTimer = setTimeout(() => {
      onFinish?.();
      activePlaybackTimer = null;
    }, effectiveDurationMs);

    return {
      status: 'playing',
      clipId,
      speed,
    };
  },

  stopCurrentClip(): void {
    if (activePlaybackTimer) {
      clearTimeout(activePlaybackTimer);
      activePlaybackTimer = null;
    }
  },
};

