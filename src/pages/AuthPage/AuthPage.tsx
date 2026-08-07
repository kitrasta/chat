import React, { useState } from 'react';
import styles from './AuthPage.module.css';
import { useAuthStore } from '../../entities/user/model';

const AuthPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const mockLogin = useAuthStore((state) => state.mockLogin);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await mockLogin(username, password);
    } catch (err) {
      setError('Произошла ошибка при входе. Попробуйте снова.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <h1 className={styles.title}>Atlas</h1>
        <p className={styles.subtitle}>Войдите в свою учётную запись</p>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor="username">Имя пользователя</label>
            <input
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="@user:matrix.org"
              autoComplete="username"
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="password">Пароль</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              autoComplete="current-password"
              required
            />
          </div>

          {error && <div className={styles.error}>{error}</div>}

          <button 
            type="submit" 
            className={styles.submitButton}
            disabled={isLoading}
          >
            {isLoading ? 'Входим...' : 'Войти'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AuthPage;
