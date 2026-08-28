import * as sdk from "matrix-js-sdk";
import { MATRIX_CONFIG } from "./config";



// ===== Состояние =====
let client: sdk.MatrixClient | null = null;

// ===== Инициализация =====
export const initClient = () => {
  if (client) {
    console.log('⚠️ Клиент уже инициализирован');
    return;
  }

  client = sdk.createClient({
    baseUrl: MATRIX_CONFIG.baseUrl,
  });

  console.log('✅ Matrix клиент инициализирован');
};

// ===== Получение клиента =====
export const getClient = (): sdk.MatrixClient => {
  if (!client) {
    throw new Error('❌ Клиент не инициализирован');
  }
  return client;
};

// ===== Вход =====
export const login = async (username: string, password: string) => {
  try {
    const tempClient = getClient();
    
    const response = await tempClient.login('m.login.password', {
      user: username,
      password: password,
      device_id: MATRIX_CONFIG.deviceId,
    });

    client = sdk.createClient({
      baseUrl: MATRIX_CONFIG.baseUrl,
      accessToken: response.access_token,
      userId: response.user_id,
      deviceId: response.device_id,
    });

    console.log('✅ Вход выполнен:', response.user_id);
    
    return {
      userId: response.user_id,
      accessToken: response.access_token,
      deviceId: response.device_id,
    };
  } catch (error: any) {
    console.error('❌ Ошибка входа:', error.message);
    throw error;
  }
};

// ===== Выход =====
export const logout = () => {
  if (client) {
    client.stopClient();
    client = null;
  }
  console.log('👋 Выход выполнен');
};

// ===== Синхронизация =====
export const sync = async () => {
  const currentClient = getClient();
  await currentClient.startClient({
    initialSyncLimit: MATRIX_CONFIG.initialSyncLimit,
  });
  console.log('🔄 Синхронизация завершена');
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
  } catch (error) {
    console.warn('Не удалось получить display name:', error);
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