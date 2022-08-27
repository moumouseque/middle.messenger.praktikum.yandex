import http from '../utils/http-transport';
import { PasswordData, ProfileData } from './types';

const BASE_URL = 'https://ya-praktikum.tech/api/v2/user';

class UsersAPI {
  public changeProfile(data: ProfileData) {
    return http.put(`${BASE_URL}/profile`, { data });
  }

  public changePassword(data: PasswordData) {
    return http.put(`${BASE_URL}/password`, { data });
  }

  public changeAvatar(data: FormData) {
    return http.put(`${BASE_URL}/profile/avatar`, {
      data,
    });
  }
}

export default new UsersAPI();
