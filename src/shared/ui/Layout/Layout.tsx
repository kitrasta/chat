import { Outlet, useLocation } from 'react-router-dom';
import styles from './Layout.module.css';
import SideNav from '../../../widgets/SideNav/SideNav';
import ChatsList from '../../../widgets/ChatsList/ChatsList';
import SettingsMenu from '../../../widgets/SettingsMenu/SettingsMenu';
import CallsList from '../../../widgets/CallsList/CallsList';
import ContactsList from '../../../widgets/ContactsList/ContactsList';
import { useEffect } from 'react';
import { useChatStore } from '../../../entities/rooms/model';
import { useAuthStore } from '../../../entities/types/user/model';
import { restoreSession } from '../../../shared/api/matrix/matrixClient';

const Layout = () => {
  const loadRooms = useChatStore((state) => state.load);
  const session = useAuthStore((state) => state.session);
  const location = useLocation();
  const path = location.pathname;

  useEffect(() => {
    if (!session) return;

    restoreSession(session);
    void loadRooms();
  }, [loadRooms, session]);

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
