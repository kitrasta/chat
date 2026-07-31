
import styles from './ChatWindow.module.css';
import WindowHeader from '../WindowHeader/WindowHeader';



const ChatWindow = () => {
    return (
        <div className={styles.wrapper}>
            <WindowHeader />
            <h2>Chat Window</h2>
            <p>This is the chat window area.</p>
        </div>
    )
}

export default ChatWindow;