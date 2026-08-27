import * as sdk from "matrix-js-sdk";
import { MATRIX_CONFIG } from "../shared/lib/matrix/config";

// состояние

let client: sdk.MatrixClient | any = null;

// инициализация

export const getMatrixClient = () => {
    if (client) {
        console.log('Клиент уже создан')
        return;
    }
    client = sdk.createClient({
        baseUrl: MATRIX_CONFIG.baseUrl,
    });

    console.log('Клиент создан:');
};

// получение

export const getClient = () => {
    if (!client) {
        throw new Error('Клиент не инициализирован');
    }
    return client;
}

// вход

export const login = async (username: string, password: string, email: string) => {
    try {
        const tempClient = getClient();

        const response = await tempClient.login('m.login.password', {
            user: username,
            password: password,
            device_id: MATRIX_CONFIG.deviceId,
        });

        //новый клиент с токеном доступа

        client = sdk.createClient({
            baseUrl: MATRIX_CONFIG.baseUrl,
            accessToken: response.access_token,
            userId: response.user_id,
            deviceId: response.device_id,
        });
        console.log('Вход выполнен успешно:' response.user_id);

        return {
            accessToken: response.access_token,
            userId: response.user_id,
            deviceId: response.device_id,
        };
    } catch (error) {
        if (error instanceof sdk.MatrixError) {
            console.error('Ошибка входа в Matrix:', error.message);
            throw new Error(`Ошибка входа в Matrix: ${error.message}`);
        } else {
            console.error('Неизвестная ошибка входа в Matrix:', error);
            throw new Error('Неизвестная ошибка входа в Matrix');
        }
    }
};

// выход

export const logOut = async () => {
    if (!client) {
        try {
            client.stopClient();
            console.log('Выход выполнен успешно');

        } catch (error) {
            if (error instanceof sdk.MatrixError) {
                console.error('Ошибка выхода из Matrix:', error.message);
                throw new Error(`Ошибка выхода из Matrix: ${error.message}`);
            } else {
                console.error('Неизвестная ошибка выхода из Matrix:', error);
                throw new Error('Неизвестная ошибка выхода из Matrix');
            }
        }
    }
}

// синхронизация

export const  sync = async () => {
    try {
        const currentClient = getClient();
        await currentClient.startClient({
            initialSyncLimit: MATRIX_CONFIG.initialSyncLimit,
        });
        console.log('Синхронизация выполнена успешно');
    } catch (error: any) {
        console.error('Ошибка синхронизации с Matrix:', error.message);
        throw new Error(`Ошибка синхронизации с Matrix: ${error.message}`);
    }
};

// комнаты

export const getRooms = () => {
    try {
        const currentClient = getClient();
        const rooms = currentClient.getRooms();
        console.log('загружено комнат:', rooms.length);
        return rooms;

    } catch (error: any) {
        console.error('Ошибка получения комнат из Matrix:', error.message);
        throw new Error(`Ошибка получения комнат из Matrix: ${error.message}`);
        return [];
    }
}

// отправка сообщений 


export const sendMessage = async (roomId: string, text: string) => {
    try {
        const currentClient = getClient();
        await currentClient.sendTextMessage(roomId, text);
        console.log(`Сообщение отправлено успешно в ${roomId}`);
    } catch (error: any) {
        console.error('Ошибка отправки сообщения в Matrix:', error.message);
        throw new Error(`Ошибка отправки сообщения в Matrix: ${error.message}`);
    }
};

// подписка на события
export const onEvent = (eventType: string, callback: (event: any) => void) => {
  try {
    const currentClient = getClient();
    currentClient.on(eventType, callback);
    console.log(`👂 Подписка на событие: ${eventType}`);
  } catch (error: any) {
    console.error('❌ Ошибка подписки:', error.message);
  }
};

// отписка от событий
export const offEvent = (eventType: string, callback: (event: any) => void) => {
  try {
    const currentClient = getClient();
    currentClient.off(eventType, callback);
    console.log(`🔇 Отписка от события: ${eventType}`);
  } catch (error: any) {
    console.error('❌ Ошибка отписки:', error.message);
  }
};

// проверка статуса
export const isLoggedIn = () => {
  return !!client && !!client.getUserId();
};

// получить текущего пользователя 
export const getUserId = () => {
  try {
    const currentClient = getClient();
    return currentClient.getUserId();
  } catch {
    return null;
  }
};
// инфа о пользователе
export const getUser = () => {
try {
    const currentClient = getClient();
    const userId = currentClient.getUserId();
    if (!userId) return null;
}
// получаем имя

let displayName = userId;
try {
const name = await currentClient.getDisplayName(userId);
if (name) displayName = name;
} catch (error) {
    console.warn('Не удалось получить имя пользователя:', error);
}
    return {
      userId,
      displayName,
    };
  } catch (error: any) {
    console.error('❌ Ошибка получения пользователя:', error.message);
    return null;
  }
};
}



    


