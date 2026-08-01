import React from 'react';
import styles from './ChatWindow.module.css';

const MOCK_MESSAGES = [
  { id: '1', text: 'Привет! Как там наша архитектура?', type: 'received' },
  { id: '2', text: 'Всё чётко, переехал на FSD', type: 'sent' },
  { id: '3', text: 'О, это правильно. Теперь будет проще масштабировать', type: 'received' },
  { id: '4', text: 'Точно. Сейчас как раз полирую UI по референсам', type: 'sent' },
];

const ChatWindow = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <div className={styles.user}>
          <div className={styles.avatar} />
          <span className={styles.name}> la lufa</span>
        </div>
        <div className={styles.actions}>
          <span>Search</span>
          <span>More</span>
        </div>
      </div>

      <div className={styles.content}>
        {MOCK_MESSAGES.map(msg => (
          <div key={msg.id} className={`${styles.message} ${styles[msg.type]}`}>
            {msg.text}
          </div>
        ))}
      </div>

      <div className={styles.inputArea}>
        <input className={styles.input} placeholder="Write a message..." />
        <button className={styles.sendButton}>Send</button>
      </div>
    </div>
  );
};

export default ChatWindow;
