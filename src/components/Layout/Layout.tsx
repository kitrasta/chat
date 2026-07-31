import styles from './Layout.module.css';
import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className={styles.layout}>
      <div className={styles.main}>
        {children}
      </div>
    </div>
  );
};

export default Layout;
