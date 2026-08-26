import { useEffect, useState } from 'react';
import styles from './ContactsList.module.css';
import { loadContacts } from '../../shared/api/matrix/rooms';
import type { User } from '../../entities/user/types';

const ContactsList = () => {
  const [contacts, setContacts] = useState<User[]>([]);

  useEffect(() => {
    void loadContacts().then(setContacts).catch(() => setContacts([]));
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <span className={styles.title}>Contacts</span>
      </div>
      <div className={styles.list}>
        {contacts.map(contact => (
          <div key={contact.id} className={styles.contactItem}>
            <div className={styles.avatar}>{contact.displayName[0] || '?'}</div>
            <div className={styles.info}>
              <span className={styles.name}>{contact.displayName}</span>
              <span className={styles.status}>
                <span className={`${styles.statusDot} ${contact.presence === 'online' ? styles.online : ''}`} />
                {contact.presence === 'online' ? 'Online' : 'Offline'}
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
