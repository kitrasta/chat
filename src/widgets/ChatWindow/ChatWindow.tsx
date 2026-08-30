import { useCallback, useEffect, useState } from 'react';
import { useChatStore } from '../../entities/chat/model';
import { useMessageStore } from '../../entities/message/model';
import { useSessionStore } from '../../entities/session/session-store';
import styles from './ChatWindow.module.css';

const ChatWindow = () => {
  const activeChatId = useChatStore((state) => state.activeChatId);
  const chats = useChatStore((state) => state.chats);

  const messages = useMessageStore((state) =>
    activeChatId ? state.messages[activeChatId] : undefined
  );
  const loadMessages = useMessageStore((state) => state.loadMessages);
  const sendMessage = useMessageStore((state) => state.sendMessage);
  const isLoading = useMessageStore((state) => state.isLoading);

  const userId = useSessionStore((state) => state.user?.userId ?? null);

  const [text, setText] = useState('');

  const activeChat = chats.find((chat) => chat.id === activeChatId);

  useEffect(() => {
    if (!activeChatId) return;
    void loadMessages(activeChatId);
  }, [activeChatId, loadMessages]);

  const handleSend = useCallback(async () => {
    if (!activeChatId || !text.trim()) return;

    try {
      await sendMessage(activeChatId, text.trim());
      setText('');
    } catch {
      // Ошибка уже сохранена в сторе
    }
  }, [activeChatId, text, sendMessage]);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        void handleSend();
      }
    },
    [handleSend]
  );

  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <div className={styles.user}>
          <div className={styles.avatar} />
          <div className={styles.userInfo}>
            <span className={styles.name}>{activeChat?.name || 'Room Name'}</span>
            <span className={styles.status}>Online</span>
          </div>
        </div>
        <div className={styles.actions}>
          <span className={styles.actionItem}>🔍</span>
          <span className={styles.actionItem}>⋮</span>
        </div>
      </header>

      <div className={styles.content}>
        {isLoading && <div className={styles.emptyMessages}>Загрузка...</div>}

        {!isLoading && !messages?.length && (
          <div className={styles.emptyMessages}>Messages will appear here</div>
        )}

        {messages?.map((message) => {
          const isOwn = message.senderId === userId;

          return (
            <div
              key={message.id}
              className={`${styles.message} ${isOwn ? styles.sent : styles.received}`}
            >
              {message.content}
            </div>
          );
        })}
      </div>

      <div className={styles.inputArea}>
        <input
          className={styles.input}
          placeholder="Write a message..."
          value={text}
          onChange={(event) => setText(event.target.value)}
          onKeyDown={handleKeyDown}
          disabled={!activeChatId}
        />
        <button
          className={styles.sendButton}
          onClick={handleSend}
          disabled={!activeChatId || !text.trim()}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;