import { useState } from 'react';
import styles from './ChatWindow.module.css';
import { useChatStore } from '../../entities/rooms/model';
import { useAuthStore } from '../../entities/user/model';
import { sendMessage } from '../../shared/api/matrix/rooms';

const ChatWindow = () => {


  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <div className={styles.user}>
          <div className={styles.avatar} />
          <span className={styles.name}></span>
        </div>
        <div className={styles.actions}>
          <span className={styles.actionItem}>Search</span>
          <span className={styles.actionItem}>More</span>
        </div>
      </div>

      <div className={styles.content}>
        {currentMessages.length > 0 ? (
          currentMessages.map(msg => (
            <div
              key={msg.id}
              className={`${styles.message} ${msg.senderId === currentUserId ? styles.sent : styles.received}`}
            >
              
            </div>
          ))
        ) : (
          <div className={styles.emptyMessages}>No messages yet</div>
        )}
      </div>

      <div className={styles.inputArea}>
        <input
          className={styles.input}
          placeholder="Write a message..."

        />
        <button className={styles.sendButton}>
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;
