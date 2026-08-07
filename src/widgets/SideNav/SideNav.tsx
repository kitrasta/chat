import { NavLink } from 'react-router-dom';
import { Users, Phone, MessageSquare, Settings } from 'lucide-react';
import styles from './SideNav.module.css';

const navItems = [
  { to: '/contacts', icon: Users, label: 'Contacts' },
  { to: '/calls', icon: Phone, label: 'Calls' },
  { to: '/chats', icon: MessageSquare, label: 'Chats' },
  { to: '/settings', icon: Settings, label: 'Settings' },
];

const SideNav = () => {
  return (
    <nav className={styles.wrapper}>
      {navItems.map(({ to, icon: Icon, label }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) => `${styles.navItem} ${isActive ? styles.active : ''}`}
          aria-label={label}
          title={label}
        >
          <Icon size={22} strokeWidth={1} />
        </NavLink>
      ))}
    </nav>
  );
};

export default SideNav;
