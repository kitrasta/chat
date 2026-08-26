import {
  AuthType,
  ClientEvent,
  createClient,
  InteractiveAuth,
  type MatrixClient,
} from 'matrix-js-sdk';
import type { UserSession } from '../../../entities/user/types';

let client: MatrixClient | null = null;

const getHomeServer = (userId: string) => {
  const server = userId.split(':')[1];
  if (!server) {
    throw new Error('Некорректный Matrix ID');
  }

  return `https://${server}`;
};

const getLocalpart = (userId: string) => {
  const normalized = userId.startsWith('@') ? userId.slice(1) : userId;
  const separatorIndex = normalized.indexOf(':');
  if (separatorIndex <= 0) {
    throw new Error('Некорректный Matrix ID');
  }

  return normalized.slice(0, separatorIndex);
};

const startClient = (matrixClient: MatrixClient) => {
  matrixClient.startClient({ initialSyncLimit: 20 });
};

export const getMatrixClient = () => client;

export const login = async (
  username: string,
  password: string,
) => {
  const homeServer = getHomeServer(username);
  client?.stopClient();
  client = createClient({ baseUrl: homeServer });

  const response = await client.login('m.login.password', {
    identifier: {
      type: 'm.id.user',
      user: username,
    },
    password,
  });

  startClient(client);

  return response;
};

export const register = async (
  username: string,
  password: string,
  email: string,
  onEmailSent?: () => void,
) => {
  const homeServer = getHomeServer(username);
  client?.stopClient();
  client = createClient({ baseUrl: homeServer });

  const registrationClient = client;
  const auth = new InteractiveAuth({
    matrixClient: registrationClient,
    inputs: { emailAddress: email },
    supportedStages: [AuthType.Email],
    doRequest: (authData) => registrationClient.registerRequest({
      username: getLocalpart(username),
      password,
      auth: authData ?? undefined,
      refresh_token: true,
    }),
    requestEmailToken: (emailAddress, clientSecret, attempt) =>
      registrationClient.requestRegisterEmailToken(emailAddress, clientSecret, attempt),
    stateUpdated: (stage) => {
      if (stage === AuthType.Email) {
        onEmailSent?.();
      }
    },
  });

  const pollTimer = window.setInterval(() => {
    void auth.poll();
  }, 2000);

  let response;
  try {
    response = await auth.attemptAuth();
  } finally {
    window.clearInterval(pollTimer);
  }

  client = createClient({
    baseUrl: homeServer,
    accessToken: response.access_token,
    userId: response.user_id,
    deviceId: response.device_id,
  });
  startClient(client);

  return response;
};

export const restoreSession = (session: UserSession) => {
  if (client?.getUserId() === session.userId) {
    return client;
  }

  client?.stopClient();
  client = createClient({
    baseUrl: session.homeServer,
    accessToken: session.accessToken,
    userId: session.userId,
    deviceId: session.deviceId,
  });
  startClient(client);
  return client;
};

export const waitForInitialSync = async () => {
  if (!client) {
    throw new Error('Matrix client не инициализирован');
  }

  if (client.getSyncState() === 'PREPARED') {
    return;
  }

  await new Promise<void>((resolve) => {
    const handleSync = (state: string) => {
      if (state !== 'PREPARED') return;
      client?.off(ClientEvent.Sync, handleSync);
      resolve();
    };

    client?.on(ClientEvent.Sync, handleSync);
  });
};

export const logout = async () => {
  if (!client) return;

  try {
    await client.logout(true);
  } finally {
    client.stopClient();
    client = null;
  }
};