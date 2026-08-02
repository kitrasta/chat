import React, { useState } from 'react';
import styles from './App.module.css';
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
        <div className={styles.sidePanel}>
          <div className={styles.panelContent}>
            {activeTab === 'chats' && <ChatList />}
            {activeTab === 'contacts' && (
              <div className={styles.placeholder}>Contacts Page</div>
            )}
            {activeTab === 'calls' && (
              <div className={styles.placeholder}>Calls Page</div>
            )}
            {activeTab === 'settings' && (
              <div className={styles.placeholder}>Settings Page</div>
            )}
          </div>
          <SideNav activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>
        
        <div className={styles.mainArea}>
          {activeTab === 'chats' ? <ChatWindow /> : (
            <div className={styles.placeholder}>
              Please select a chat to start messaging
            </div>
          )}
        </div>
      </Layout>
    </div>
  );
}

export default App;
