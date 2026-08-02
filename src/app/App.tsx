import styles from './App.module.css';
import React, { useState } from 'react';
import Layout from '../shared/ui/Layout/Layout';
import ChatList from '../widgets/ChatList/ChatList';
import ChatWindow from '../widgets/ChatWindow/ChatWindow';
import SideNav from '../widgets/SideNav/SideNav';
import './../styles/global.css';

function App() {
  const [activeTab, setActiveTab] = useState('chats');

  return (
    <div className={styles.app}>
      <Layout>
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          height: '100%', 
          width: '350px',
          background: 'var(--color-bg-secondary)',
          borderRight: '1px solid var(--color-border)'
        }}>
          <div style={{ flex: 1, overflow: 'hidden' }}>
            {activeTab === 'chats' && <ChatList />}
            {activeTab === 'contacts' && <div style={{ padding: '20px', color: 'var(--color-text-primary)' }}>Contacts Page</div>}
            {activeTab === 'calls' && <div style={{ padding: '20px', color: 'var(--color-text-primary)' }}>Calls Page</div>}
            {activeTab === 'settings' && <div style={{ padding: '20px', color: 'var(--color-text-primary)' }}>Settings Page</div>}
          </div>
          <SideNav activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>
        
        <div style={{ flex: 1, height: '100%', overflow: 'hidden' }}>
          {activeTab === 'chats' ? <ChatWindow /> : (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', color: 'var(--color-text-secondary)' }}>
              Please select a tab
            </div>
          )}
        </div>
      </Layout>
    </div>
  );
}

export default App;
