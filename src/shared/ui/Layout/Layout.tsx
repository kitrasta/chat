import { Outlet, useLocation } from 'react-router-dom';
import styles from './Layout.module.css';
import SideNav from '../../../widgets/SideNav/SideNav';
import SideBar from '../../../widgets/SideBar/SideBar';
import ChatsList from '../../../widgets/ChatsList/ChatsList';
import SettingsMenu from '../../../widgets/SettingsMenu/SettingsMenu';
import CallsList from '../../../widgets/CallsList/CallsList';
import ContactsList from '../../../widgets/ContactsList/ContactsList';

const Layout = () => {
  const location = useLocation();
  const path = location.pathname;
  const isChatSection = path.startsWith('/chats');

  const renderLeftColumn = () => {
    if (isChatSection) return <ChatsList />;
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
        {isChatSection && <SideBar />}
      </div>

      {/* ПРАВАЯ КОЛОНКА */}
      <div className={styles.rightColumn}>
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
