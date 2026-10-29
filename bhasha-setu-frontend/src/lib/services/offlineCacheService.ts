// src/lib/services/offlineCacheService.ts
// MMKV local storage for offline lesson state with graceful memory fallback

export interface LessonProgressCache {
  levelId: string;
  completedStages: number;
  totalStages: number;
  starsEarned: number;
  unlockedArtifacts: string[];
}

const memoryStore = new Map<string, string>();

let mmkvInstance: {
  getString: (key: string) => string | undefined;
  set: (key: string, value: string) => void;
  clearAll: () => void;
} | null = null;

try {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { MMKV } = require('react-native-mmkv');
  mmkvInstance = new MMKV({ id: 'bhasha-setu-offline-cache' });
} catch {
  // Safe in-memory fallback for web and environments without native MMKV binary
  mmkvInstance = {
    getString: (key: string) => memoryStore.get(key),
    set: (key: string, value: string) => {
      memoryStore.set(key, value);
    },
    clearAll: () => {
      memoryStore.clear();
    },
  };
}

const STORAGE_PREFIX = 'bhasha_setu_lesson_';

export function saveLessonProgress(progress: LessonProgressCache): void {
  try {
    const key = `${STORAGE_PREFIX}${progress.levelId}`;
    mmkvInstance?.set(key, JSON.stringify(progress));
  } catch (err) {
    console.warn('[offlineCache] Failed to save progress:', err);
  }
}

export function getCachedLessonProgress(levelId: string): LessonProgressCache | null {
  try {
    const key = `${STORAGE_PREFIX}${levelId}`;
    const raw = mmkvInstance?.getString(key);
    if (!raw) return null;
    return JSON.parse(raw) as LessonProgressCache;
  } catch (err) {
    console.warn('[offlineCache] Failed to read progress:', err);
    return null;
  }
}

export function clearOfflineCache(): void {
  try {
    mmkvInstance?.clearAll();
  } catch (err) {
    console.warn('[offlineCache] Failed to clear cache:', err);
  }
}
