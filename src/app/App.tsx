import styles from './App.module.css';
import Layout from '../shared/ui/Layout/Layout';
import ChatList from '../widgets/ChatList/ChatList';
import ChatWindow from '../widgets/ChatWindow/ChatWindow';
import './../styles/global.css';

function App() {
  return (
    <div className={styles.app}>
      <Layout>
        <ChatList />
        <ChatWindow />
      </Layout>
    </div>
  );
}

export default App;
