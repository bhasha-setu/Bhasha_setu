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
  setActiveScreen: (screen: string) => void;
  setXp: (xp: number) => void;
  setStreak: (streak: number) => void;
  setChatHistory: (history: ChatMessage[]) => void;
  addChatMessage: (message: ChatMessage) => void;
}

export const useFrontendStore = create<FrontendState>((set) => ({
  activeScreen: 'SplashLoadingScreen',
  xp: 480,
  streak: 7,
  chatHistory: [],
  setActiveScreen: (activeScreen) => set({ activeScreen }),
  setXp: (xp) => set({ xp }),
  setStreak: (streak) => set({ streak }),
  setChatHistory: (chatHistory) => set({ chatHistory }),
  addChatMessage: (message) =>
    set((state) => ({ chatHistory: [...state.chatHistory, message] })),
}));

