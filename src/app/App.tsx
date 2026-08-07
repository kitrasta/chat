import { useAuthStore } from '../entities/user/model';
import AuthPage from '../pages/AuthPage/AuthPage';
import AppRouter from './router/AppRouter';
import './../styles/global.css';

function App() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  if (!isAuthenticated) {
    return <AuthPage />;
  }

  return <AppRouter />;
}

export default App;