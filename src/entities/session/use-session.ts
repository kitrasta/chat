import { useSessionStore } from './session-store';

// Кастомный хук для удобства
export const useSession = () => {
  const { user, isLoggedIn, isLoading, error, login, logout, loadUser, clearError } = useSessionStore();
  
  return {
    user,
    isLoggedIn,
    isLoading,
    error,
    login,
    logout,
    loadUser,
    clearError,
    // Удобные геттеры
    displayName: user?.displayName || 'Гость',
    userId: user?.userId || null,
  };
};