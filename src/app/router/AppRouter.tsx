import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from '../../shared/ui/Layout/Layout';
import AuthLayout from '../../shared/ui/AuthLayout/AuthLayout'; // Твой новый лейаут
import { useAuthStore } from '../../entities/user/model';

import ChatPage from '../../pages/ChatPage/ChatPage';
import ContactsPage from '../../pages/ContactsPage/ContactsPage';
import CallsPage from '../../pages/CallsPage/CallsPage';
import SettingsPage from '../../pages/SettingsPage/SettingsPage';
import AuthPage from '../../pages/AuthPage/AuthPage';

const AppRouter = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return (
    <Routes>
      {/* 1. ПУБЛИЧНАЯ ЗОНА (Auth) */}
      <Route element={<AuthLayout />}>
        <Route 
          path="/auth" 
          element={isAuthenticated ? <Navigate to="/chats" replace /> : <AuthPage />} 
        />
      </Route>

      {/* 2. ПРИВАТНАЯ ЗОНА (Main App) */}
      <Route 
        element={isAuthenticated ? <Layout /> : <Navigate to="/auth" replace />}
      >
        <Route path="/chats" element={<ChatPage />} />
        <Route path="/chats/:chatId" element={<ChatPage />} />
        <Route path="/contacts" element={<ContactsPage />} />
        <Route path="/calls" element={<CallsPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/" element={<Navigate to="/chats" replace />} />
      </Route>

      {/* 3. Обработка всех остальных путей */}
      <Route path="*" element={<Navigate to={isAuthenticated ? "/chats" : "/auth"} replace />} />
    </Routes>
  );
};

export default AppRouter;
