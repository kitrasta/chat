import styles from './Layout.module.css';
import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className={styles.layout}>
        {children}
    </div>
  );
};

export default Layout;
