import styles from './NoConversionsChat.module.css'

const NoConversionsChat = () => {
    return (
        <div className={styles.wrapper}>

                <div className={styles.no_content}>
                    <div className={styles.icons}>
                        <div className={styles.icon}>
                            <div className={styles.skelet_icon}></div>
                        </div>
                        <div className={styles.icon}>
                            <div className={styles.skelet_icon}></div>
                        </div>
                        <div className={styles.icon}>
                            <div className={styles.skelet_icon}></div>
                        </div>
                    </div>
                <h4 className={styles.title}>No Conversations Yet</h4>
                <p className={styles.description}>Start a new conversation to see it here.</p>
            </div>
        </div>
    
    )
        
        
}

export default NoConversionsChat

