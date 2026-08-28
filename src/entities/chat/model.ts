import { create } from 'zustand';
import type { ChatState } from './types';

export const useChatStore = create<ChatState>((set) => ({
  chats: [],
  activeChatId: null,
  load: async () => {
    // TODO: matrix.getRooms() → set({ chats })
  },
  setActiveChat: (id) => set({ activeChatId: id }),
}));