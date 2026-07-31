import styles from './MainContent.module.css';
import ChatListPanel from '../ChatListPanel/ChatListPanel';
import ChatWindow from '../ChatWindow/ChatWindow';

const MainContent = () => {
    return (
        <div className={styles.wrapper}>
            <ChatListPanel />
            <ChatWindow />
        </div>
    )
}

export default MainContent;