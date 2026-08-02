import { create } from 'zustand';
import type { UserSession } from './types';

interface AuthState {
  session: UserSession | null;
  isAuthenticated: boolean;
  login: (session: UserSession) => void;
  logout: () => void;
}

const STORAGE_KEY = 'matrix_session';

const loadSession = (): UserSession | null => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) as UserSession : null;
  } catch {
    return null;
  }
};

export const useAuthStore = create<AuthState>((set) => ({
  session: loadSession(),
  isAuthenticated: loadSession() !== null,

  login: (session) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
    set({ session, isAuthenticated: true });
  },

  logout: () => {
    localStorage.removeItem(STORAGE_KEY);
    set({ session: null, isAuthenticated: false });
  },
}));
