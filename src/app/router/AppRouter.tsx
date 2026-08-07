import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from '../../shared/ui/Layout/Layout';
import ChatPage from '../../pages/ChatPage/ChatPage';
import ContactsPage from '../../pages/ContactsPage/ContactsPage';
import CallsPage from '../../pages/CallsPage/CallsPage';
import SettingsPage from '../../pages/SettingsPage/SettingsPage';
import AuthPage from '../../pages/AuthPage/AuthPage';
import { useAuthStore } from '../../entities/user/model';

const AppRouter = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return (
    <Routes>
      <Route
        path="/auth"
        element={isAuthenticated ? <Navigate to="/chats" replace /> : <AuthPage />}
      />
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
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRouter;
