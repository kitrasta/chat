import styles from './BottomNavLeft.module.css'

import { LuMessageSquareText, LuUserRound, LuUsersRound, LuPhone,  } from "react-icons/lu";

const BottomNavLeft = () => {
    return (
        /* потом переделать батоны на линк */
<div className={styles.bottom_nav_left}>
    <button className={styles.nav_button}>
        <LuMessageSquareText size={24}/>
        <span className={styles.nav_button_text}>Chats</span>   
    </button>
    <button className={styles.nav_button}>
        <LuUserRound size={24}/>
        <span className={styles.nav_button_text}>Users</span>
    </button>
    <button className={styles.nav_button}>
        <LuUsersRound size={24}/>
        <span className={styles.nav_button_text}>Groups</span>
    </button>
    <button className={styles.nav_button}>
        <LuPhone size={24}/>
        <span className={styles.nav_button_text}>Call</span>
    </button>
</div>
    )
}

export default BottomNavLeft;