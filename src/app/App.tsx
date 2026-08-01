import styles from './App.module.css';
import Layout from '../shared/ui/Layout/Layout';
import './../styles/global.css';

function App() {
  return (
    <div className={styles.app}>
      <Layout>
        {/* Сюда позже добавим Widgets: ChatList и ChatWindow */}
        <div style={{ color: 'white', padding: '20px' }}>
          <h1>Atlas Chat v1.0 (FSD)</h1>
          <p>Структура готова. Ждем компонентов.</p>
        </div>
      </Layout>
    </div>
  );
}

export default App;
