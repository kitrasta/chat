export interface Room {
  roomId: string;
  name: string;
  avatarUrl: string;
  lastMessage: string;
  lastMessageTimestamp: number;
  unreadCount: number;
}
