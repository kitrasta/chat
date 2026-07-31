import styles from './ChatLists.module.css'

const ChatLists = () => {
    return (
        <div className={styles.chatitem}>
<div className={styles.avatar_user}>
    <img src="/path/to/avatar.jpg" alt="User Avatar" /> 
    </div>
    <span className={styles.username}>Username</span>
    <span className={styles.timestamp}>12:34 PM</span>
    <span className={styles.lastmessage}>Last message preview...</span>
<span className={styles.unreadcount}>3</span>
           
    </div>


           
    )
}

export default ChatLists