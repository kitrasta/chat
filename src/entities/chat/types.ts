export interface User {
  id: string;
  displayName: string;
  avatarUrl?: string;
  status: 'online' | 'offline' 
}

export interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: number;
  status: 'sending' | 'sent' | 'delivered' | 'read';
}

export interface Chat {
  id: string;
  name: string;
  avatarUrl?: string;
  lastMessage?: Message;
  members: User[];
  unreadCount: number;
}

export interface Call {
  id: string;
  name: string;
  type: 'incoming' | 'outgoing' | 'missed';
  timestamp: number;
}
