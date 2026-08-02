import { create } from 'zustand';
import { Chat, Message } from './types';

interface ChatState {
  chats: Chat[];
  activeChatId: string | null;
  messages: Record<string, Message[]>; // ChatId -> Messages[]
  
  // Actions
  setActiveChat: (id: string | null) => void;
  addMessage: (chatId: string, message: Message) => void;
  setChats: (chats: Chat[]) => void;
}

export const useChatStore = create<ChatState>((set) => ({
  chats: [],
  activeChatId: null,
  messages: {},

  setActiveChat: (id) => set({ activeChatId: id }),
  
  addMessage: (chatId, message) => set((state) => ({
    messages: {
      ...state.messages,
      [chatId]: [...(state.messages[chatId] || []), message]
    }
  })),

  setChats: (chats) => set({ chats }),
}));
