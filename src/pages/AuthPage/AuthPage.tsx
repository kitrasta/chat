import React, { useState } from 'react';
import styles from './AuthPage.module.css';
import { useSessionStore } from '../../entities/session/session-store';
import { validateMatrixUsername } from '../../shared/lib/validators';

const AuthPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Всё берём из стора — он источник правды
  const login = useSessionStore((s) => s.login);
  const error = useSessionStore((s) => s.error);
  const isLoading = useSessionStore((s) => s.isLoading);
  const clearError = useSessionStore((s) => s.clearError);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();

    // Валидация остаётся на форме
    const validationError = validateMatrixUsername(username);
    if (validationError) {
      // показываем ошибку валидации
      return;
    }

    await login(username.trim(), password);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <h1 className={styles.title}>Capsa</h1>
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

          <button type="submit" className={styles.submitButton} disabled={isLoading}>
            {isLoading ? 'Подождите...' : 'Войти'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AuthPage;