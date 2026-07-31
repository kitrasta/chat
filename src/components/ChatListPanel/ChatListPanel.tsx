
import styles from './ChatListPanel.module.css'
import ChatLists from '../ChatLists/ChatLists'
import NoConversionsChat from '../../entities/NoConversionsChat/NoConversionsChat';
import BottomNavLeft from '../BottomNavLeft/BottomNavLeft';

const ChatListPanel = () => {
    return (
        <div className={styles.wrapper}>
          <div className={styles.header_chat}>
            <h3 className={styles.title}>Chats</h3>
          </div>
            <div className={styles.chatlists}>
                <NoConversionsChat />
                <BottomNavLeft />
            </div>
        </div>
    )
}

export default ChatListPanel;   