// src/store/useFrontendStore.ts
import { create } from 'zustand';

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

export const useFrontendStore = create<FrontendState>((set) => ({
  activeScreen: 'SplashLoadingScreen',
  xp: 480,
  streak: 7,
  chatHistory: INITIAL_CHAT_HISTORY,
  unlockedArtifacts: ['vintage-mic', 'cricket-ball', 'chai-kulhad'],
  completedLevels: ['LEVEL_1', 'LEVEL_2'],
  isGoldenDiyaUnlocked: true,
  playbackSpeed: 1.0,
  isSilentMode: false,

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
}));
