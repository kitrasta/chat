const MATRIX_ID_REGEX = /^@?[a-z0-9._=/-]+:[a-z0-9.-]+\.[a-z]{2,}$/i;

/**
 * Валидация Matrix-username.
 * Допускает формат `@user:server.org` и `user:server.org` (без @).
 * Возвращает текст ошибки или null, если имя корректно.
 */
export const validateMatrixUsername = (username: string): string | null => {
  const trimmed = username.trim();

  if (!trimmed) {
    return 'Введите имя пользователя';
  }

  if (/\s/.test(trimmed)) {
    return 'Имя пользователя не должно содержать пробелы';
  }

  if (trimmed.length < 3) {
    return 'Имя пользователя слишком короткое';
  }

  if (!MATRIX_ID_REGEX.test(trimmed)) {
    return 'Формат: @user:server.org';
  }

  return null;
};
