import * as sdk from "matrix-js-sdk";
import { MATRIX_CONFIG } from "./config";

// ===== Тип сессии =====
export interface SessionData {
  accessToken: string;
  userId: string;
  deviceId: string;
}

// ===== Состояние =====
let client: sdk.MatrixClient | null = null;

// ===== Получение клиента =====
export const getClient = (): sdk.MatrixClient => {
  if (!client) {
    throw new Error('Клиент не инициализирован');
  }
  return client;
};

// ===== Восстановление сессии =====
export const restoreSession = (session: SessionData) => {
  client = sdk.createClient({
    baseUrl: MATRIX_CONFIG.baseUrl,
    accessToken: session.accessToken,
    userId: session.userId,
    deviceId: session.deviceId,
  });
};

// ===== Вход =====
export const login = async (username: string, password: string) => {
  // Создаём временный клиент для авторизации (не зависит от глобального)
  const authClient = sdk.createClient({
    baseUrl: MATRIX_CONFIG.baseUrl,
  });

  const response = await authClient.login('m.login.password', {
    identifier: {
      type: 'm.id.user',
      user: username,
    },
    password,
  });

  // Заменяем глобальный клиент на авторизованный
  client = sdk.createClient({
    baseUrl: MATRIX_CONFIG.baseUrl,
    accessToken: response.access_token,
    userId: response.user_id,
    deviceId: response.device_id,
  });

  return {
    userId: response.user_id,
    accessToken: response.access_token,
    deviceId: response.device_id,
  };
};

// ===== Выход =====
export const logout = async () => {
  if (!client) return;

  try {
    await client.logout();
  } catch {
    // Игнорируем ошибки logout — главное остановить клиент
  } finally {
    client.stopClient();
    client = null;
  }
};

// ===== Синхронизация =====
export const sync = async () => {
  const currentClient = getClient();
  await currentClient.startClient({
    initialSyncLimit: MATRIX_CONFIG.initialSyncLimit,
  });
};

// ===== Комнаты =====
export const getRooms = () => {
  const currentClient = getClient();
  return currentClient.getRooms();
};

// ===== Отправка сообщения =====
export const sendMessage = async (roomId: string, text: string) => {
  const currentClient = getClient();
  await currentClient.sendTextMessage(roomId, text);
};

// ===== Получить пользователя =====
export const getUser = async () => {
  const currentClient = getClient();
  const userId = currentClient.getUserId();

  if (!userId) return null;

  let displayName = userId;
  try {
    const profile = await currentClient.getProfileInfo(userId);
    if (profile?.displayname) displayName = profile.displayname;
  } catch {
    // Оставляем userId как fallback
  }

  return {
    userId,
    displayName,
  };
};

// ===== Проверка статуса =====
export const isLoggedIn = (): boolean => {
  return !!client && !!client.getUserId();
};

