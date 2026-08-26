import React, { useState } from 'react';
import styles from './AuthPage.module.css';
import { useAuthStore } from '../../entities/user/model';
import { validateMatrixUsername } from '../../shared/lib/validators';
import {
  login as matrixLogin,
  register as matrixRegister,
} from '../../shared/api/matrix/matrixClient';

const AuthPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isRegistration, setIsRegistration] = useState(false);
  const [email, setEmail] = useState('');
  const [isEmailSent, setIsEmailSent] = useState(false);
  const saveSession = useAuthStore((state) => state.login);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsEmailSent(false);

    const validationError = validateMatrixUsername(username);
    if (validationError) {
      setError(validationError);
      return;
    }

    if (isRegistration && !/^\S+@\S+\.\S+$/.test(email)) {
      setError('Введите корректный email');
      return;
    }

    setIsLoading(true);

    try {
      const response = isRegistration
        ? await matrixRegister(username.trim(), password, email.trim(), () => setIsEmailSent(true))
        : await matrixLogin(username.trim(), password);
      if (!response.access_token || !response.device_id) {
        throw new Error('Регистрация требует дополнительного подтверждения');
      }

      saveSession({
        accessToken: response.access_token,
        userId: response.user_id,
        homeServer: `https://${response.user_id.split(':')[1]}`,
        deviceId: response.device_id,
      });
    } catch (error: unknown) {
      const matrixError = error as { httpStatus?: number; errcode?: string; message?: string };

      if (matrixError.httpStatus === 403 || matrixError.errcode === 'M_FORBIDDEN') {
        setError('Регистрация запрещена этим Matrix-сервером или требует подтверждения.');
      } else {
        setError(matrixError.message || 'Произошла ошибка. Попробуйте снова.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <h1 className={styles.title}>Atlas</h1>
        <p className={styles.subtitle}>
          {isRegistration ? 'Создайте учётную запись' : 'Войдите в свою учётную запись'}
        </p>

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

          {isRegistration && (
            <div className={styles.inputGroup}>
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                autoComplete="email"
                required
              />
            </div>
          )}

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

          {isEmailSent && !error && (
            <div className={styles.emailNotice}>
              Письмо отправлено. Перейдите по ссылке в письме, чтобы завершить регистрацию.
            </div>
          )}

          <button
            type="submit" 
            className={styles.submitButton}
            disabled={isLoading}
          >
            {isLoading ? 'Подождите...' : isRegistration ? 'Зарегистрироваться' : 'Войти'}
          </button>

          <button
            type="button"
            className={styles.switchButton}
            onClick={() => {
              setIsRegistration((value) => !value);
              setError('');
            }}
            disabled={isLoading}
          >
            {isRegistration ? 'Уже есть аккаунт? Войти' : 'Создать аккаунт'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AuthPage;
