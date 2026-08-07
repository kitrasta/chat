import { create } from 'zustand';
import type { UserSession } from './types';

const STORAGE_KEY = 'matrix_session';

interface AuthState {
  session: UserSession | null;
  isAuthenticated: boolean;
  login: (session: UserSession) => void;
  mockLogin: (username: string) => Promise<void>;
  logout: () => void;
}

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

  mockLogin: async (username) => {
    await new Promise(resolve => setTimeout(resolve, 800));
    const fakeSession: UserSession = {
      accessToken: 'mock-token-atlas-123',
      userId: `@${username.replace('@', '')}:matrix.org`,
      homeServer: 'https://matrix.org',
      deviceId: 'mock-device-id',
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(fakeSession));
    set({ session: fakeSession, isAuthenticated: true });
  },

  logout: () => {
    localStorage.removeItem(STORAGE_KEY);
    set({ session: null, isAuthenticated: false });
  },
}));
