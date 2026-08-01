import React from 'react';
import styles from './ChatList.module.css';

const MOCK_CHATS = [
  { id: '1', name: ' la lufa', lastMsg: 'Привет! Как там архитектура?', avatar: '🔵' },
  { id: '2', name: 'Frontend Dev', lastMsg: 'Смотри, тут CSS Modules лучше', avatar: '🟢' },
  { id: '3', name: 'Backend Bro', lastMsg: 'Matrix API обновили, чекни', avatar: '🔴' },
  { id: '4', name: 'Project Manager', lastMsg: 'Когда будет готово?', avatar: '🟡' },
];

const ChatList = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <span className={styles.title}>Chats</span>
      </div>
      
      <input 
        className={styles.searchBar} 
        placeholder="Search chats..." 
        type="text" 
      />

      <div className={styles.list}>
        {MOCK_CHATS.map(chat => (
          <div key={chat.id} className={styles.chatItem}>
            <div className={styles.avatar}>{chat.avatar}</div>
            <div className={styles.info}>
              <span className={styles.name}>{chat.name}</span>
              <span className={styles.preview}>{chat.lastMsg}</span>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.footer}>
        <button className={styles.profileButton}>My Profile</button>
      </div>
    </div>
  );
};

export default ChatList;
