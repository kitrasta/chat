import { Routes, Route, Navigate, BrowserRouter } from 'react-router-dom';

import { useAuthStore } from '../entities/user/model';


import ChatPage from '../pages/ChatPage/ChatPage';
import SettingsPage from '../pages/SettingsPage/SettingsPage';
import ContactsPage from '../pages/ContactsPage/ContactsPage';
import CallsPage from '../pages/CallsPage/CallsPage';
import AuthPage from '../pages/AuthPage/AuthPage';

import './../styles/global.css';

function App() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);


  if (!isAuthenticated) {
    return <AuthPage />;
  }


  return (
    <>
      <BrowserRouter>

          <Routes>

            <Route path="/chats" element={<ChatPage />} />

            <Route path="/chats/:chatId" element={<ChatPage />} />
            

            <Route path="/contacts" element={<ContactsPage />} />
            <Route path="/calls" element={<CallsPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            

            <Route path="/" element={<Navigate to="/chats" replace />} />
          </Routes>

      </BrowserRouter>
    </>
  );
}

export default App;