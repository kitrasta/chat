import { create } from 'zustand';
import type { Chat, Message } from './types';
import { MOCK_CHATS, MOCK_MESSAGES } from '../../shared/api/mockData';

interface ChatState {
  chats: Chat[];
  activeChatId: string | null;
  messages: Record<string, Message[]>;
  isDevMode: boolean;
  
  setActiveChat: (id: string | null) => void;
  addMessage: (chatId: string, message: Message) => void;
  setChats: (chats: Chat[]) => void;
  toggleDevMode: () => void;
}

export const useChatStore = create<ChatState>((set) => ({
  chats: MOCK_CHATS, // Initial load for dev
  activeChatId: null,
  messages: MOCK_MESSAGES,
  isDevMode: true,

  setActiveChat: (id) => set({ activeChatId: id }),
  
  addMessage: (chatId, message) => set((state) => ({
    messages: {
      ...state.messages,
      [chatId]: [...(state.messages[chatId] || []), message]
    }
  })),

  setChats: (chats) => set({ chats }),
  toggleDevMode: () => set((state) => ({ isDevMode: !state.isDevMode })),
}));
