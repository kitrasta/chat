import { Outlet, useLocation } from 'react-router-dom';
import styles from './Layout.module.css';
import SideNav from '../../../widgets/SideNav/SideNav';
import ChatsList from '../../../widgets/ChatsList/ChatsList';
import SettingsMenu from '../../../widgets/SettingsMenu/SettingsMenu';
import CallsList from '../../../widgets/CallsList/CallsList';
import ContactsList from '../../../widgets/ContactsList/ContactsList';
import { useEffect } from 'react';
import { useChatStore } from '../../../entities/chat/model';
import { useMessageStore } from '../../../entities/message/model';
import { useSessionStore } from '../../../entities/session/session-store';
import * as matrix from '../../../shared/lib/matrix';

const Layout = () => {
  const loadRooms = useChatStore((state) => state.load);
  const user = useSessionStore((state) => state.user);
  const addMessage = useMessageStore((state) => state.addMessage);
  const location = useLocation();
  const path = location.pathname;

  useEffect(() => {
    if (!user) return;

    // Если в сторе есть токен — восстанавливаем клиент и запускаем синхронизацию
    if (user.accessToken) {
      matrix.restoreSession({
        accessToken: user.accessToken,
        userId: user.userId,
        deviceId: user.deviceId ?? '',
      });
      void matrix.sync();
    }

    const unsubscribe = matrix.listenToMessages((message) => {
      addMessage(message);
    });

    void loadRooms();

    return () => {
      unsubscribe();
    };
  }, [user, loadRooms, addMessage]);

  const renderLeftColumn = () => {
    if (path.startsWith('/chats')) return <ChatsList />;
    if (path.startsWith('/settings')) return <SettingsMenu />;
    if (path.startsWith('/calls')) return <CallsList />;
    if (path.startsWith('/contacts')) return <ContactsList />;
    return null;
  };

  return (
    <div className={styles.layout}>
      <div className={styles.leftColumn}>
        <div className={styles.contentArea}>
          {renderLeftColumn()}
        </div>
        <SideNav />
      </div>

      {/* ПРАВАЯ КОЛОНКА */}
      <div className={styles.rightColumn}>
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;