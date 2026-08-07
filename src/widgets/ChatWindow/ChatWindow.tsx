import { useState } from 'react';
import styles from './ChatWindow.module.css';
import { useChatStore } from '../../entities/chat/model';
import { useAuthStore } from '../../entities/user/model';

const ChatWindow = () => {
  const { activeChatId, chats, messages, addMessage } = useChatStore();
  const currentUserId = useAuthStore((state) => state.session?.userId) ?? 'me';
  const [draft, setDraft] = useState('');
  const activeChat = chats.find(c => c.id === activeChatId);
  const currentMessages = activeChatId ? messages[activeChatId] || [] : [];

  const handleSend = () => {
    const text = draft.trim();
    if (!activeChatId || !text) return;

    addMessage(activeChatId, {
      id: crypto.randomUUID(),
      senderId: currentUserId,
      text,
      timestamp: Date.now(),
      status: 'sending',
    });
    setDraft('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  if (!activeChatId) {
    return <div className={styles.emptyState}>Select a chat to start messaging</div>;
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <div className={styles.user}>
          <div className={styles.avatar} />
          <span className={styles.name}>{activeChat?.name || 'Unknown User'}</span>
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
              {msg.text}
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
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button className={styles.sendButton} onClick={handleSend} disabled={!draft.trim()}>
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;
