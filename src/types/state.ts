import { UserData } from '../api/types/user-types';

import { ChatData, ChatMessage } from '../api/types/chat-types';

export interface State extends Record<string, any> {
  user: {
    errorMessage: string;
    data: UserData;
  },
  chat: {
    chats: ChatData[];
    current: {
      messages: ChatMessage[];
      id: number;
    }
  }
}
