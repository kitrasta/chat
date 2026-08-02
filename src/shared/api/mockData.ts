import { Chat, Message } from '../../entities/chat/types';

export const MOCK_CHATS: Chat[] = [
  {
    id: '1',
    name: 'Frontend Master',
    avatarUrl: '🔵',
    unreadCount: 2,
    lastMessage: {
      id: 'm1',
      senderId: 'user2',
      text: 'Check out the new FSD structure!',
      timestamp: Date.now(),
      status: 'delivered',
    },
    members: [],
  },
  {
    id: '2',
    name: 'Backend Guru',
    avatarUrl: '🟢',
    unreadCount: 0,
    lastMessage: {
      id: 'm2',
      senderId: 'user3',
      text: 'Matrix server is almost ready',
      timestamp: Date.now(),
      y: 0, // This was just to be a mock, actual type is Message
      status: 'read',
    },
    members: [],
  },
  {
    id: '3',
    name: 'Design Lead',
    avatarUrl: '🔴',
    unreadCount: 5,
    lastMessage: {
      id: 'm3',
      senderId: 'user4',
      text: 'The colors are looking great',
      timestamp: Date.now(),
      status: 'sent',
    },
    members: [],
  },
];

export const MOCK_MESSAGES: Record<string, Message[]> = {
  '1': [
    { id: 'm1-1', senderId: 'user2', text: 'Hey! How is the project going?', timestamp: Date.now() - 100000, status: 'read' },
    { id: 'm1-2', senderId: 'me', text: 'Going great, implementing FSD right now', timestamp: Date.now(), status: 'read' },
  ],
  '2': [
    { id: 'm2-1', senderId: 'user3', text: 'Did you check the latest Matrix SDK?', timestamp: Date.now() - 50000, status: 'delivered' },
  ],
  '3': [
    { id: 'm3-1', senderId: 'user4', text: 'The color palette is amazing', timestamp: Date.now() - 20000, status: 'read' },
    { id: 'm3-2', senderId: 'me', text: 'Thanks! I used a professional reference', timestamp: Date.now(), status: 'sent' },
  ],
};
