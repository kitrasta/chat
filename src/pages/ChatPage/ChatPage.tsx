import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ChatWindow from '../../widgets/ChatWindow/ChatWindow';
import { useChatStore } from '../../entities/chat/model';
import styles from './ChatPage.module.css';

const ChatPage = () => {
  const { chatId } = useParams();
  const setActiveChat = useChatStore((state) => state.setActiveChat);

  // URL — единственный источник правды: синхронизируем стор с роутером
  useEffect(() => {
    setActiveChat(chatId ?? null);
  }, [chatId, setActiveChat]);

  return (
    <div className={styles.wrapper}>
      <ChatWindow />
    </div>
  );
};

export default ChatPage;
