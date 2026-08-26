import styles from './CallsList.module.css';

const CallsList = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <span className={styles.title}>Calls</span>
      </div>
      <div className={styles.list}>
        <div className={styles.empty}>No calls yet</div>
      </div>
    </div>
  );
};

export default CallsList;
