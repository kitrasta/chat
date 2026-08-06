import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from '../../shared/ui/Layout/Layout';
import ChatPage from '../../pages/ChatPage/ChatPage';
import ContactsPage from '../../pages/ContactsPage/ContactsPage';
import CallsPage from '../../pages/CallsPage/CallsPage';
import SettingsPage from '../../pages/SettingsPage/SettingsPage';

const AppRouter = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/chats" element={<ChatPage />} />
        <Route path="/chats/:chatId" element={<ChatPage />} />
        <Route path="/contacts" element={<ContactsPage />} />
        <Route path="/calls" element={<CallsPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/" element={<Navigate to="/chats" replace />} />
      </Route>
    </Routes>
  );
};

export default AppRouter;