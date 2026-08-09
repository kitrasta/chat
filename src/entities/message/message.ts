

export interface Message {
  eventId: string;
  roomId: string;
  senderId: string;
  text: string;
  timestamp: number;
  type: MessageType;
  status: MessageStatus;
}

export type MessageType =
  | 'text'
  | 'image'
  | 'file'
  | 'audio'
  | 'video';

export type MessageStatus =
  | 'sending'
  | 'sent'
  | 'failed';