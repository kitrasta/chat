import { User, Bell, Lock, Info, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import styles from './SettingsMenu.module.css';
import { useAuthStore } from '../../entities/user/model';

const menuItems = [
  { id: 'profile', label: 'Профиль', icon: User },
  { id: 'notifications', label: 'Уведомления', icon: Bell },
  { id: 'privacy', label: 'Приватность', icon: Lock },
  { id: 'about', label: 'О приложении', icon: Info },
];

const SettingsMenu = () => {
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/auth', { replace: true });
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <span className={styles.title}>Settings</span>
      </div>
      <div className={styles.list}>
        {menuItems.map(({ id, label, icon: Icon }) => (
          <button key={id} className={styles.menuItem}>
            <div className={styles.iconWrapper}>
              <Icon size={18} />
            </div>
            <span className={styles.label}>{label}</span>
          </button>
        ))}
        <button className={`${styles.menuItem} ${styles.logout}`} onClick={handleLogout}>
          <div className={styles.iconWrapper}>
            <LogOut size={18} />
          </div>
          <span className={styles.label}>Выйти</span>
        </button>
      </div>
    </div>
  );
};

export default SettingsMenu;
