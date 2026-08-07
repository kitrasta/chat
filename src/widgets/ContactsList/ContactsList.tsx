import styles from './ContactsList.module.css';
import { MOCK_CONTACTS } from '../../shared/api/mockData';

const ContactsList = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <span className={styles.title}>Contacts</span>
      </div>
      <div className={styles.list}>
        {MOCK_CONTACTS.map(contact => (
          <div key={contact.id} className={styles.contactItem}>
            <div className={styles.avatar}>{contact.displayName[0]}</div>
            <div className={styles.info}>
              <span className={styles.name}>{contact.displayName}</span>
              <span className={styles.status}>
                <span className={`${styles.statusDot} ${contact.status === 'online' ? styles.online : ''}`} />
                {contact.status === 'online' ? 'Online' : 'Offline'}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContactsList;
