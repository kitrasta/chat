import React from 'react';
import { Users, Phone, MessageSquare, Settings } from 'lucide-react';
import styles from './SideNav.module.css';

interface SideNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const SideNav = ({ activeTab, setActiveTab }: SideNavProps) => {
  const navItems = [
    { id: 'contacts', icon: Users, label: 'Contacts' },
    { id: 'calls', icon: Phone, label: 'Calls' },
    { id: 'chats', icon: MessageSquare, label: 'Chats' },
    { id: 'settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <div className={styles.wrapper}>
      {navItems.map(({ id, icon: Icon }) => (
        <div 
          key={id} 
          className={`${styles.navItem} ${activeTab === id ? styles.active : ''}`}
          onClick={() => setActiveTab(id)}
        >
          <Icon size={22} strokeWidth={2} />
        </div>
      ))}
    </div>
  );
};

export default SideNav;
