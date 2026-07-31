
import styles from './WindowHeader.module.css'
import { LuPhoneCall, LuVideo } from "react-icons/lu";

const WindowHeader = () => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.user_info}>
                <div className={styles.avatar_user}>
                    <img src="/path/to/avatar.jpg" alt="User Avatar" />
                </div>
                <div className={styles.user_text}>
                    <span className={styles.name_user}>Alex Johnson</span>
                    <span className={styles.status_user}>Online</span>
                </div>
            </div>

            <div className={styles.right_elems}>
                <button className={styles.right_elem}>
                    <LuPhoneCall size={20} />
                </button>
                <button className={styles.right_elem}>
                    <LuVideo size={20} />
                </button>
                <button className={styles.right_elem}>Button 3</button>
                <button className={styles.right_elem}>Button 4</button>
            </div>
        </div>
    )
}

export default WindowHeader;