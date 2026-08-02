import React from 'react';
import styles from './ChatList.module.css';
import { useChatStore } from '../../entities/chat/model';

const ChatList = () => {
  const { chats, activeChatId, setActiveChat } = useChatStore();

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
        {chats.map(chat => (
          <div 
            key={chat.id} 
            className={`${styles.chatItem} ${activeChatId === chat.id ? styles.active : ''}`}
            onClick={() => setActiveChat(chat.id)}
          >
            <div className={styles.avatar}>{chat.avatarUrl || '👤'}</div>
            <div className={styles.info}>
              <span className={styles.name}>{chat.name}</span>
              <span className={styles.preview}>{chat.lastMessage?.text || 'No messages'}</span>
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
