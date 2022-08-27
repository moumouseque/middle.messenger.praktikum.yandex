import http from '../utils/http-transport';
import { AddUserRequestData } from './types/chat-types';

const BASE_URL = 'https://ya-praktikum.tech/api/v2/chats';

class ChatsAPI {
  public request() {
    return http.get(`${BASE_URL}`);
  }

  public create(title: string) {
    return http.post(`${BASE_URL}`, { data: { title } });
  }

  public addUserToChat(data: AddUserRequestData) {
    return http.put(`${BASE_URL}/users`, { data });
  }

  public deleteUserFromChat(data: AddUserRequestData) {
    return http.delete(`${BASE_URL}/users`, { data });
  }

  public getToken(id: number) {
    return http.post(`${BASE_URL}/token/${id}`);
  }
}

export default new ChatsAPI();
