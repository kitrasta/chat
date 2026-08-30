import { create } from 'zustand';
import * as matrix from '../../shared/lib/matrix';
import type { MatrixMessage } from '../../shared/lib/matrix';
import type { Message } from './types';

type MessageState = {
  messages: Record<string, Message[]>;
  isLoading: boolean;
  error: string | null;
  loadMessages: (roomId: string) => Promise<void>;
  sendMessage: (roomId: string, content: string) => Promise<void>;
  addMessage: (message: Message) => void;
};

const mapMessage = (message: MatrixMessage): Message => message;

export const useMessageStore = create<MessageState>((set) => ({
  messages: {},
  isLoading: false,
  error: null,

  loadMessages: async (roomId) => {
    set({ isLoading: true, error: null });

    try {
      const loaded = matrix.getMessages(roomId);

      set((state) => {
        const existing = state.messages[roomId] ?? [];
        const existingIds = new Set(existing.map((message) => message.id));
        const merged = [
          ...existing,
          ...loaded
            .map(mapMessage)
            .filter((message) => !existingIds.has(message.id)),
        ];
        merged.sort((a, b) => a.timestamp - b.timestamp);

        return {
          messages: { ...state.messages, [roomId]: merged },
          isLoading: false,
        };
      });
    } catch (error: unknown) {
      const message =
        error instanceof Error
          ? error.message
          : 'Ошибка загрузки сообщений';
      set({ isLoading: false, error: message });
    }
  },

  sendMessage: async (roomId, content) => {
    set({ error: null });

    try {
      await matrix.sendMessage(roomId, content);
    } catch (error: unknown) {
      const message =
        error instanceof Error
          ? error.message
          : 'Ошибка отправки сообщения';
      set({ error: message });
      throw error;
    }
  },

  addMessage: (message) => {
    set((state) => {
      const roomMessages = state.messages[message.roomId] ?? [];
      if (roomMessages.some((existing) => existing.id === message.id)) {
        return state;
      }

      const merged = [...roomMessages, message];
      merged.sort((a, b) => a.timestamp - b.timestamp);

      return {
        messages: {
          ...state.messages,
          [message.roomId]: merged,
        },
      };
    });
  },
}));
