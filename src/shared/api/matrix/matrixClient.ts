import { createClient } from 'matrix-js-sdk';

const client = createClient({
  baseUrl: 'https://matrix.org',
});

export const login = async (
  username: string,
  password: string,
) => {
  const response = await client.login('m.login.password', {
    user: username,
    password,
  });

  console.log('LOGIN:', response);

  await client.startClient({
    initialSyncLimit: 10,
  });

  client.on('event', (event) => {
    if (event.getType() !== 'm.room.message') {
      return;
    }

    console.log('MESSAGE:', {
      sender: event.getSender(),
      text: event.getContent().body,
      timestamp: event.getTs(),
    });
  });

  client.on('sync', (state) => {
    console.log('SYNC:', state);

    if (state === 'PREPARED') {
      console.log('ROOMS:', client.getRooms());
    }
  });

  return response;
};