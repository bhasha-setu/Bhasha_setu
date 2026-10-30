// src/store/useFrontendStore.ts
import { create } from 'zustand';
import { ApiClient } from '@/lib/api/client';

export interface ChatMessage {
  id: string;
  sender: 'nani' | 'user';
  hindiText: string;
  englishSubtext: string;
  duration: string;
  timestamp: string;
  fluencyScore?: number;
  respectWord?: string;
}

export interface QuestLevelData {
  id: string;
  levelNumber: number;
  slug: string;
  title: string;
  subtitle: string;
  tagOverline: string;
  icon: string;
  route: string;
  status: 'mastered' | 'active' | 'locked';
  stars: number;
  xpReward: number;
  ctaLabel?: string;
  isIndented?: boolean;
}

export interface QuestMapData {
  hud: {
    streakDays: number;
    xpPoints: number;
    currentLevel: string;
    isGoldenDiyaUnlocked: boolean;
  };
  riverTrail: {
    currentStage: number;
    totalStages: number;
    stages: Array<{
      stageNumber: number;
      name: string;
      subtitle: string;
      description: string;
      isCompleted: boolean;
    }>;
  };
  levels: QuestLevelData[];
  milestoneChest: {
    currentXp: number;
    targetXp: number;
    progressPercent: number;
  };
  heroCard: {
    unlockedArtifactIds: string[];
    dailyGoalTitle: string;
    dailyGoalSubtitle: string;
  };
}

export interface FrontendState {
  activeScreen: string;
  xp: number;
  streak: number;
  chatHistory: ChatMessage[];
  unlockedArtifacts: string[];
  completedLevels: string[];
  isGoldenDiyaUnlocked: boolean;
  playbackSpeed: 1.0 | 0.8 | 0.75;
  isSilentMode: boolean;
  questMapData: QuestMapData | null;
  isLoading: boolean;

  setActiveScreen: (screen: string) => void;
  setXp: (xp: number) => void;
  addXp: (amount: number) => void;
  setStreak: (streak: number) => void;
  incrementStreak: () => void;
  setChatHistory: (history: ChatMessage[]) => void;
  addChatMessage: (message: ChatMessage) => void;
  unlockArtifact: (artifactId: string) => void;
  completeLevel: (levelId: string) => void;
  setPlaybackSpeed: (speed: 1.0 | 0.8 | 0.75) => void;
  toggleSilentMode: () => void;
  setSilentMode: (val: boolean) => void;

  // Dynamic Backend Sync Actions
  fetchQuestMap: () => Promise<void>;
  fetchChatHistory: () => Promise<void>;
  fetchUserProfile: () => Promise<void>;
  syncWithBackend: () => Promise<void>;
}

export const INITIAL_CHAT_HISTORY: ChatMessage[] = [
  {
    id: 'nani-turn-1',
    sender: 'nani',
    duration: '0:04',
    hindiText: '“नमस्ते बेटा! दिवाली की बहुत-बहुत शुभकामनाएँ। घर कब आ रहे हो?”',
    englishSubtext: '“Greetings son! Happy Diwali. When are you coming home?”',
    timestamp: '10:14 AM',
  },
  {
    id: 'user-turn-2',
    sender: 'user',
    duration: '0:05',
    hindiText: '“नमस्ते नानी! मैं कल सुबह मिठाई लेकर आ रहा हूँ।”',
    englishSubtext: '“Greetings Nani! I am coming tomorrow morning with sweets.”',
    fluencyScore: 96,
    respectWord: 'आप',
    timestamp: '10:15 AM',
  },
  {
    id: 'nani-turn-3',
    sender: 'nani',
    duration: '0:03',
    hindiText: '“वाह! मैं तुम्हारी मनपसंद खीर बना के रखूँगी। 🪔”',
    englishSubtext: '“Wonderful! I will prepare your favorite kheer.”',
    timestamp: '10:15 AM',
  },
];

export const useFrontendStore = create<FrontendState>((set, get) => ({
  activeScreen: 'SplashLoadingScreen',
  xp: 480,
  streak: 7,
  chatHistory: INITIAL_CHAT_HISTORY,
  unlockedArtifacts: ['vintage-mic', 'cricket-ball', 'chai-kulhad'],
  completedLevels: ['LEVEL_1', 'LEVEL_2'],
  isGoldenDiyaUnlocked: true,
  playbackSpeed: 1.0,
  isSilentMode: false,
  questMapData: null,
  isLoading: false,

  setActiveScreen: (activeScreen) => set({ activeScreen }),
  setXp: (xp) => set({ xp }),
  addXp: (amount) => set((state) => ({ xp: state.xp + amount })),
  setStreak: (streak) => set({ streak }),
  incrementStreak: () => set((state) => ({ streak: state.streak + 1 })),
  setChatHistory: (chatHistory) => set({ chatHistory }),
  addChatMessage: (message) =>
    set((state) => ({ chatHistory: [...state.chatHistory, message] })),
  unlockArtifact: (artifactId) =>
    set((state) => ({
      unlockedArtifacts: state.unlockedArtifacts.includes(artifactId)
        ? state.unlockedArtifacts
        : [...state.unlockedArtifacts, artifactId],
      isGoldenDiyaUnlocked:
        artifactId === 'golden-diya' ? true : state.isGoldenDiyaUnlocked,
    })),
  completeLevel: (levelId) =>
    set((state) => ({
      completedLevels: state.completedLevels.includes(levelId)
        ? state.completedLevels
        : [...state.completedLevels, levelId],
    })),
  setPlaybackSpeed: (playbackSpeed) => set({ playbackSpeed }),
  toggleSilentMode: () => set((state) => ({ isSilentMode: !state.isSilentMode })),
  setSilentMode: (isSilentMode) => set({ isSilentMode }),

  // Fetch full dynamic Quest Map from backend
  fetchQuestMap: async () => {
    try {
      const data = await ApiClient.getQuestMap();
      if (data) {
        set({
          questMapData: data,
          xp: data.hud?.xpPoints ?? get().xp,
          streak: data.hud?.streakDays ?? get().streak,
          isGoldenDiyaUnlocked: data.hud?.isGoldenDiyaUnlocked ?? get().isGoldenDiyaUnlocked,
          unlockedArtifacts: data.heroCard?.unlockedArtifactIds ?? get().unlockedArtifacts,
          completedLevels: data.levels
            ?.filter((l: QuestLevelData) => l.status === 'mastered')
            .map((l: QuestLevelData) => l.id) ?? get().completedLevels,
        });
      }
    } catch {
      // Keep existing store state on network failure
    }
  },

  // Fetch dynamic Nani WhatsApp Chat History from backend
  fetchChatHistory: async () => {
    try {
      const data = await ApiClient.getNaniChatHistory();
      if (data?.messages && data.messages.length > 0) {
        set({ chatHistory: data.messages });
      }
    } catch {
      // Keep initial chat history
    }
  },

  // Fetch user profile stats from backend
  fetchUserProfile: async () => {
    try {
      const data = await ApiClient.getUserProfile();
      if (data) {
        set({
          xp: data.profile?.xp ?? get().xp,
          streak: data.profile?.streak ?? get().streak,
          isSilentMode: data.preferences?.isSilentMode ?? get().isSilentMode,
          playbackSpeed: data.preferences?.playbackSpeed ?? get().playbackSpeed,
          completedLevels: data.completedLevels ?? get().completedLevels,
          unlockedArtifacts: data.unlockedArtifacts ?? get().unlockedArtifacts,
          isGoldenDiyaUnlocked: data.profile?.isGoldenDiyaUnlocked ?? get().isGoldenDiyaUnlocked,
        });
      }
    } catch {
      // Keep existing store state
    }
  },

  syncWithBackend: async () => {
    set({ isLoading: true });
    try {
      await Promise.allSettled([
        get().fetchQuestMap(),
        get().fetchUserProfile(),
        get().fetchChatHistory(),
      ]);
    } finally {
      set({ isLoading: false });
    }
  },
}));
