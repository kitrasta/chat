import { create } from 'zustand';
import * as matrix from '../../shared/lib/matrix';
import type { ChatState, Room } from './types';

export const useChatStore = create<ChatState>((set) => ({
  chats: [],
  activeChatId: null,
  load: async () => {
    const rooms = matrix.getRooms();

    const chats: Room[] = rooms.map((room) => ({
        id: room.roomId,
        name: room.name,
        unreadCount: room.getUnreadNotificationCount(),
    }));

    set({ chats });
  },
  setActiveChat: (id) => set({ activeChatId: id }),
}));