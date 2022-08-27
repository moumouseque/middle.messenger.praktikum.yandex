import { UserData } from './user-types';

export type ChatData = {
  avatar: string | null;
  created_by: number;
  id: number;
  last_message: {
    content: string;
    id: number;
    time: string;
    user: Omit<UserData, 'id'>;
  };
  title: string;
  unread_count: number;
};

export type AddUserRequestData = {
  users: number[];
  chatId: number;
};

export type ChatMessage = {
  chat_id: 'number',
  time: 'string',
  type: 'string',
  user_id: 'string',
  content: 'string',
  file?: {
    id: 'number',
    user_id: 'number',
    path: 'string',
    filename: 'string',
    content_type: 'string',
    content_size: 'number',
    upload_date: 'string',
  }
};
