import { PhoneIncoming, PhoneOutgoing, PhoneMissed } from 'lucide-react';
import styles from './CallsList.module.css';
import { MOCK_CALLS } from '../../shared/api/mockData';
import { formatTime } from '../../shared/lib/formatTime';

const typeConfig = {
  incoming: { icon: PhoneIncoming, className: styles.incoming, label: 'Входящий' },
  outgoing: { icon: PhoneOutgoing, className: styles.outgoing, label: 'Исходящий' },
  missed: { icon: PhoneMissed, className: styles.missed, label: 'Пропущенный' },
} as const;

const CallsList = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <span className={styles.title}>Calls</span>
      </div>
      <div className={styles.list}>
        {MOCK_CALLS.map(call => {
          const { icon: Icon, className, label } = typeConfig[call.type];
          return (
            <div key={call.id} className={styles.callItem}>
              <div className={`${styles.iconWrapper} ${className}`}>
                <Icon size={18} />
              </div>
              <div className={styles.info}>
                <span className={styles.name}>{call.name}</span>
                <span className={styles.details}>
                  {label} · {formatTime(call.timestamp)}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CallsList;
