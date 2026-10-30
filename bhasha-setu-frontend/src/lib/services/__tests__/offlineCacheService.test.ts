// src/lib/services/__tests__/offlineCacheService.test.ts
import {
  saveLessonProgress,
  getCachedLessonProgress,
  clearOfflineCache,
  LessonProgressCache,
} from '../offlineCacheService';

describe('offlineCacheService', () => {
  beforeEach(() => {
    clearOfflineCache();
  });

  it('saves and retrieves lesson progress', () => {
    const progress: LessonProgressCache = {
      levelId: 'LEVEL_1',
      completedStages: 2,
      totalStages: 3,
      starsEarned: 3,
      unlockedArtifacts: ['vintage-mic'],
    };

    saveLessonProgress(progress);
    const retrieved = getCachedLessonProgress('LEVEL_1');

    expect(retrieved).not.toBeNull();
    expect(retrieved?.levelId).toBe('LEVEL_1');
    expect(retrieved?.completedStages).toBe(2);
    expect(retrieved?.starsEarned).toBe(3);
    expect(retrieved?.unlockedArtifacts).toEqual(['vintage-mic']);
  });

  it('returns null for nonexistent level key', () => {
    const result = getCachedLessonProgress('NON_EXISTENT_LEVEL');
    expect(result).toBeNull();
  });

  it('clears offline cache properly', () => {
    saveLessonProgress({
      levelId: 'LEVEL_2',
      completedStages: 1,
      totalStages: 1,
      starsEarned: 3,
      unlockedArtifacts: ['cricket-ball'],
    });

    clearOfflineCache();
    const result = getCachedLessonProgress('LEVEL_2');
    expect(result).toBeNull();
  });
});
