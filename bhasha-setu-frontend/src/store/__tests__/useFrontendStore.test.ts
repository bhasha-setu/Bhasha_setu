// src/store/__tests__/useFrontendStore.test.ts
// Unit tests for the Zustand frontend store

import { useFrontendStore, INITIAL_CHAT_HISTORY, ChatMessage } from '../useFrontendStore';

// Reset store state before each test
beforeEach(() => {
  const store = useFrontendStore.getState();
  store.setXp(480);
  store.setStreak(7);
  store.setSilentMode(false);
  store.setPlaybackSpeed(1.0);
  store.setActiveScreen('SplashLoadingScreen');
});

describe('useFrontendStore - XP', () => {
  it('initializes with 480 XP', () => {
    expect(useFrontendStore.getState().xp).toBe(480);
  });

  it('addXp increases xp by the given amount', () => {
    useFrontendStore.getState().addXp(20);
    expect(useFrontendStore.getState().xp).toBe(500);
  });

  it('addXp can be called multiple times cumulatively', () => {
    useFrontendStore.getState().addXp(50);
    useFrontendStore.getState().addXp(50);
    expect(useFrontendStore.getState().xp).toBe(580);
  });

  it('setXp sets xp to an exact value', () => {
    useFrontendStore.getState().setXp(1000);
    expect(useFrontendStore.getState().xp).toBe(1000);
  });

  it('addXp with negative value decreases XP (penalty)', () => {
    useFrontendStore.getState().addXp(-20);
    expect(useFrontendStore.getState().xp).toBe(460);
  });
});

describe('useFrontendStore - Streak', () => {
  it('initializes with streak of 7', () => {
    expect(useFrontendStore.getState().streak).toBe(7);
  });

  it('incrementStreak adds 1 to streak', () => {
    useFrontendStore.getState().incrementStreak();
    expect(useFrontendStore.getState().streak).toBe(8);
  });

  it('setStreak sets streak to exact value', () => {
    useFrontendStore.getState().setStreak(30);
    expect(useFrontendStore.getState().streak).toBe(30);
  });
});

describe('useFrontendStore - Silent Mode', () => {
  it('initializes with isSilentMode false', () => {
    expect(useFrontendStore.getState().isSilentMode).toBe(false);
  });

  it('toggleSilentMode flips from false to true', () => {
    useFrontendStore.getState().toggleSilentMode();
    expect(useFrontendStore.getState().isSilentMode).toBe(true);
  });

  it('toggleSilentMode flips back to false', () => {
    useFrontendStore.getState().toggleSilentMode();
    useFrontendStore.getState().toggleSilentMode();
    expect(useFrontendStore.getState().isSilentMode).toBe(false);
  });

  it('setSilentMode sets exact value', () => {
    useFrontendStore.getState().setSilentMode(true);
    expect(useFrontendStore.getState().isSilentMode).toBe(true);
  });
});

describe('useFrontendStore - Playback Speed', () => {
  it('initializes with playback speed 1.0', () => {
    expect(useFrontendStore.getState().playbackSpeed).toBe(1.0);
  });

  it('setPlaybackSpeed switches to 0.75x (Bollywood screen)', () => {
    useFrontendStore.getState().setPlaybackSpeed(0.75);
    expect(useFrontendStore.getState().playbackSpeed).toBe(0.75);
  });

  it('setPlaybackSpeed switches to 0.8x (Street Food screen)', () => {
    useFrontendStore.getState().setPlaybackSpeed(0.8);
    expect(useFrontendStore.getState().playbackSpeed).toBe(0.8);
  });
});

describe('useFrontendStore - Artifacts', () => {
  it('initializes with 3 unlocked artifacts', () => {
    expect(useFrontendStore.getState().unlockedArtifacts).toHaveLength(3);
    expect(useFrontendStore.getState().unlockedArtifacts).toContain('vintage-mic');
    expect(useFrontendStore.getState().unlockedArtifacts).toContain('cricket-ball');
    expect(useFrontendStore.getState().unlockedArtifacts).toContain('chai-kulhad');
  });

  it('unlockArtifact adds a new artifact', () => {
    useFrontendStore.getState().unlockArtifact('new-item');
    expect(useFrontendStore.getState().unlockedArtifacts).toContain('new-item');
  });

  it('unlockArtifact does not duplicate an already-unlocked artifact', () => {
    const countBefore = useFrontendStore.getState().unlockedArtifacts.length;
    useFrontendStore.getState().unlockArtifact('vintage-mic');
    expect(useFrontendStore.getState().unlockedArtifacts).toHaveLength(countBefore);
  });

  it('unlocking golden-diya sets isGoldenDiyaUnlocked to true', () => {
    useFrontendStore.setState({ isGoldenDiyaUnlocked: false });
    useFrontendStore.getState().unlockArtifact('golden-diya');
    expect(useFrontendStore.getState().isGoldenDiyaUnlocked).toBe(true);
    useFrontendStore.setState({ isGoldenDiyaUnlocked: true });
  });

  it('unlocking a non-golden-diya artifact does not change isGoldenDiyaUnlocked', () => {
    useFrontendStore.setState({ isGoldenDiyaUnlocked: false });
    useFrontendStore.getState().unlockArtifact('some-other-artifact');
    expect(useFrontendStore.getState().isGoldenDiyaUnlocked).toBe(false);
    useFrontendStore.setState({ isGoldenDiyaUnlocked: true });
  });
});

describe('useFrontendStore - Levels', () => {
  it('initializes with LEVEL_1 and LEVEL_2 completed', () => {
    expect(useFrontendStore.getState().completedLevels).toContain('LEVEL_1');
    expect(useFrontendStore.getState().completedLevels).toContain('LEVEL_2');
  });

  it('completeLevel adds a new level', () => {
    useFrontendStore.getState().completeLevel('LEVEL_3');
    expect(useFrontendStore.getState().completedLevels).toContain('LEVEL_3');
  });

  it('completeLevel does not duplicate already-completed levels', () => {
    const countBefore = useFrontendStore.getState().completedLevels.length;
    useFrontendStore.getState().completeLevel('LEVEL_1');
    expect(useFrontendStore.getState().completedLevels).toHaveLength(countBefore);
  });
});

describe('useFrontendStore - Chat History', () => {
  it('initializes with INITIAL_CHAT_HISTORY (3 messages)', () => {
    expect(useFrontendStore.getState().chatHistory).toHaveLength(INITIAL_CHAT_HISTORY.length);
  });

  it('addChatMessage appends a message to the end', () => {
    const initialLength = useFrontendStore.getState().chatHistory.length;
    const newMsg: ChatMessage = {
      id: 'test-msg-1',
      sender: 'user',
      hindiText: 'नमस्ते',
      englishSubtext: 'Hello',
      duration: '0:02',
      timestamp: '10:20 AM',
      fluencyScore: 90,
    };
    useFrontendStore.getState().addChatMessage(newMsg);
    const history = useFrontendStore.getState().chatHistory;
    expect(history).toHaveLength(initialLength + 1);
    expect(history[history.length - 1]).toEqual(newMsg);
  });

  it('setChatHistory replaces entire history', () => {
    const newHistory: ChatMessage[] = [
      {
        id: 'only-msg',
        sender: 'nani',
        hindiText: 'बेटा',
        englishSubtext: 'Son',
        duration: '0:01',
        timestamp: '11:00 AM',
      },
    ];
    useFrontendStore.getState().setChatHistory(newHistory);
    expect(useFrontendStore.getState().chatHistory).toHaveLength(1);
    expect(useFrontendStore.getState().chatHistory[0].id).toBe('only-msg');
    // Restore
    useFrontendStore.getState().setChatHistory(INITIAL_CHAT_HISTORY);
  });

  it('INITIAL_CHAT_HISTORY has nani as first message sender', () => {
    expect(INITIAL_CHAT_HISTORY[0].sender).toBe('nani');
  });

  it('INITIAL_CHAT_HISTORY user message has fluencyScore', () => {
    const userMsg = INITIAL_CHAT_HISTORY.find((m) => m.sender === 'user');
    expect(userMsg?.fluencyScore).toBeDefined();
    expect(userMsg?.fluencyScore).toBeGreaterThan(0);
  });
});

describe('useFrontendStore - Active Screen', () => {
  it('initializes on SplashLoadingScreen', () => {
    expect(useFrontendStore.getState().activeScreen).toBe('SplashLoadingScreen');
  });

  it('setActiveScreen changes the active screen', () => {
    useFrontendStore.getState().setActiveScreen('QuestMapScreen');
    expect(useFrontendStore.getState().activeScreen).toBe('QuestMapScreen');
  });
});
