export type Room = {
  id: string;
  name: string;
  avatarUrl?: string;
  lastMessage?: string;
  unreadCount?: number;
};

export type ChatState = {
  chats: Room[];
  activeChatId: string | null;
  load: () => Promise<void>;
  setActiveChat: (id: string | null) => void;
};