import { createClient, MatrixClient } from 'matrix-js-sdk';
import type { UserSession } from '../../entities/user/types';

// Позже заменим на адрес нашего Synapse-сервера
const HOMESERVER_URL = 'https://matrix.org';

let client: MatrixClient | null = null;

export const getMatrixClient = (): MatrixClient | null => client;

export const initMatrixClient = (session: UserSession): MatrixClient => {
  client = createClient({
    baseUrl: session.homeServer,
    accessToken: session.accessToken,
    userId: session.userId,
    deviceId: session.deviceId,
  });
  return client;
};

export const loginWithPassword = async (
  username: string,
  password: string,
): Promise<UserSession> => {
  const tempClient = createClient({ baseUrl: HOMESERVER_URL });

  const response = await tempClient.loginWithPassword(username, password);

  const session: UserSession = {
    accessToken: response.access_token,
    userId: response.user_id,
    homeServer: HOMESERVER_URL,
    deviceId: response.device_id,
  };

  return session;
};
