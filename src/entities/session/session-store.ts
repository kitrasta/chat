import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import * as matrix from '../../shared/lib/matrix';
import type { UserSession } from '../user/types';

type SessionStore = UserSession & {
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  loadUser: () => Promise<void>;
  clearError: () => void;
};

export const useSessionStore = create<SessionStore>()(
  persist(
    (set, get) => ({
      // Начальное состояние
      user: null,
      isLoggedIn: false,
      isLoading: false,
      error: null,

      // Вход
      login: async (username: string, password: string) => {
        set({ isLoading: true, error: null });

        try {
          // 1. Входим — ЛОВИМ токен (раньше выбрасывали)
          const auth = await matrix.login(username, password);

          // 2. Синхронизируемся
          await matrix.sync();

          // 3. Загружаем профиль
          const userData = await matrix.getUser();

          if (userData) {
            set({
              user: {
                ...userData,
                accessToken: auth.accessToken,  // ← сохраняем токен!
                deviceId: auth.deviceId,        // ← и deviceId
              },
              isLoggedIn: true,
              isLoading: false,
              error: null,
            });
          } else {
            throw new Error('Не удалось загрузить данные пользователя');
          }
        } catch (error: unknown) {
          const message = error instanceof Error ? error.message : 'Ошибка при входе';
          set({ isLoading: false, error: message, isLoggedIn: false });
          throw error;
        }
      },

      // Выход
      logout: () => {
        void matrix.logout();
        set({ user: null, isLoggedIn: false, error: null });
      },

      // Загрузить пользователя (для проверки сессии)
      loadUser: async () => {
        try {
          const userData = await matrix.getUser();
          if (userData) {
            // Не теряем токен при перезагрузке — берём из текущего стора
            const current = get().user;
            set({
              user: {
                ...userData,
                accessToken: current?.accessToken,
                deviceId: current?.deviceId,
              },
              isLoggedIn: true,
            });
          } else {
            set({ user: null, isLoggedIn: false });
          }
        } catch {
          set({ user: null, isLoggedIn: false });
        }
      },

      // Очистить ошибку
      clearError: () => {
        set({ error: null });
      },
    }),
    {
      name: 'capsa-session',
      partialize: (state) => ({
        user: state.user,        // user теперь содержит accessToken ✓
        isLoggedIn: state.isLoggedIn,
      }),
    }
  )
);