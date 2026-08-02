import styles from './ChatWindow.module.css';
import { useChatStore } from '../../entities/chat/model';

const ChatWindow = () => {
  const { activeChatId, chats, messages } = useChatStore();
  const activeChat = chats.find(c => c.id === activeChatId);
  const currentMessages = activeChatId ? messages[activeChatId] || [] : [];

  if (!activeChatId) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', color: 'var(--color-text-secondary)' }}>
        Select a chat to start messaging
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <div className={styles.user}>
          <div className={styles.avatar} />
          <span className={styles.name}>{activeChat?.name || 'Unknown User'}</span>
        </div>
        <div className={styles.actions}>
          <span style={{ cursor: 'pointer' }}>Search</span>
          <span style={{ cursor: 'pointer' }}>More</span>
        </div>
      </div>

      <div className={styles.content}>
        {currentMessages.length > 0 ? (
          currentMessages.map(msg => (
            <div key={msg.id} className={`${styles.message} ${msg.senderId === 'me' ? styles.sent : styles.received}`}>
              {msg.text}
            </div>
          ))
        ) : (
          <div style={{ textAlign: 'center', color: 'var(--color-text-secondary)', marginTop: '20px' }}>
            No messages yet
          </div>
        )}
      </div>

      <div className={styles.inputArea}>
        <input className={styles.input} placeholder="Write a message..." />
        <button className={styles.sendButton}>Send</button>
      </div>
    </div>
  );
};

export default ChatWindow;
