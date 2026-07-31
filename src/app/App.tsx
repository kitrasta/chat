
import styles from './App.module.css';
import Layout from '../components/Layout/Layout';
import MainContent from '../components/MainContent/MainContent';

function App() {
  return (
    <div className={styles.app}>
      <Layout>
        <MainContent />
      </Layout>
    </div>
  );
}

export default App;
