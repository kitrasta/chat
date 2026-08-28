import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import * as matrix from '../../shared/lib/matrix';

type User = {
  userId: string;
  displayName: string;
};

type SessionStore = {
  // Состояние
  user: User | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  error: string | null;
  
  // Действия
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
          // 1. Инициализируем клиент
          matrix.initClient();
          
          // 2. Входим
          await matrix.login(username, password);
          
          // 3. Синхронизируемся
          await matrix.sync();
          
          // 4. Загружаем пользователя
          const userData = await matrix.getUser();
          
          if (userData) {
            set({
              user: userData,
              isLoggedIn: true,
              isLoading: false,
              error: null,
            });
            console.log('✅ Пользователь вошел:', userData.displayName);
          } else {
            throw new Error('Не удалось загрузить данные пользователя');
          }
          
        } catch (error: any) {
          console.error('❌ Ошибка входа:', error.message);
          set({
            isLoading: false,
            error: error.message || 'Ошибка при входе',
            isLoggedIn: false,
          });
          throw error;
        }
      },

      // Выход
      logout: () => {
        matrix.logout();
        set({
          user: null,
          isLoggedIn: false,
          error: null,
        });
        console.log('👋 Пользователь вышел');
      },

      // Загрузить пользователя (для проверки сессии)
      loadUser: async () => {
        try {
          const userData = await matrix.getUser();
          
          if (userData) {
            set({
              user: userData,
              isLoggedIn: true,
            });
          } else {
            set({
              user: null,
              isLoggedIn: false,
            });
          }
        } catch (error) {
          console.error('Ошибка загрузки пользователя:', error);
          set({
            user: null,
            isLoggedIn: false,
          });
        }
      },

      // Очистить ошибку
      clearError: () => {
        set({ error: null });
      },
    }),
    {
      name: 'capsa-session', // ключ в localStorage
      partialize: (state) => ({
        user: state.user,        // сохраняем только пользователя
        isLoggedIn: state.isLoggedIn,
      }),
    }
  )
);