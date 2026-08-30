import styles from './ChatWindow.module.css';

const ChatWindow = () => {
  return (
    <div className={styles.wrapper}>
      {/* Хедер комнаты */}
      <header className={styles.header}>
        <div className={styles.user}>
          <div className={styles.avatar} />
          <div className={styles.userInfo}>
            <span className={styles.name}>Room Name</span>
            <span className={styles.status}>Online</span>
          </div>
        </div>
        <div className={styles.actions}>
          <span className={styles.actionItem}>🔍</span>
          <span className={styles.actionItem}>⋮</span>
        </div>
      </header>

      {/* Область сообщений */}
      <div className={styles.content}>
        <div className={styles.emptyMessages}>
          Messages will appear here
        </div>
      </div>

      {/* Ввод сообщения */}
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