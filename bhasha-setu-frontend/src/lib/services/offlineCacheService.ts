// src/lib/services/offlineCacheService.ts
// MMKV local storage for offline lesson state

export interface LessonProgressCache {
  levelId: string;
  completedStages: number;
  totalStages: number;
  starsEarned: number;
  unlockedArtifacts: string[];
}

export function saveLessonProgress(_progress: LessonProgressCache): void {
  // TODO: Persist lesson progress and offline state into react-native-mmkv storage
}

export function getCachedLessonProgress(_levelId: string): LessonProgressCache | null {
  // TODO: Retrieve cached lesson progress from react-native-mmkv storage
  return null;
}

export function clearOfflineCache(): void {
  // TODO: Clear cached lesson progress from react-native-mmkv storage
}

