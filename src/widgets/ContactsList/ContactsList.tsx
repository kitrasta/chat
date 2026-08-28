import styles from './ContactsList.module.css';
import type { User } from '../../entities/user/types';

const ContactsList = () => {
  // TODO: матрица не имеет "контактов" — будут direct-комнаты
  const contacts: User[] = [];

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <span className={styles.title}>Contacts</span>
      </div>
      <div className={styles.list}>
        {contacts.map((contact) => (
          <div key={contact.userId} className={styles.contactItem}>
            <div className={styles.avatar}>{contact.displayName[0] || '?'}</div>
            <div className={styles.info}>
              <span className={styles.name}>{contact.displayName}</span>
              <span className={styles.status}>
                <span className={`${styles.statusDot} ${contact.isOnline ? styles.online : ''}`} />
                {contact.isOnline ? 'Online' : 'Offline'}
              </span>
            </div>
          </div>
        ))}
        {contacts.length === 0 && <div className={styles.empty}>No contacts yet</div>}
      </div>
    </div>
  );
};

export default ContactsList;