import { useState } from 'react';
import { Plus } from 'lucide-react';
import styles from './ChatList.module.css';
import { useChatStore } from '../../entities/chat/model';
import CreateChatModal from '../../features/CreateChat/CreateChatModal';

const ChatList = () => {
  const { chats, activeChatId, setActiveChat } = useChatStore();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <span className={styles.title}>Chats</span>
        <button 
          className={styles.createButton} 
          onClick={() => setIsModalOpen(true)}
          aria-label="Создать чат"
        >
          <Plus size={20} />
        </button>
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

      <CreateChatModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
};

export default ChatList;
