import http from '../utils/http-transport';
import { SigninData, SignupData } from './types';

const BASE_URL = 'https://ya-praktikum.tech/api/v2/auth';

class AuthAPI {
  public signin(data: SigninData) {
    return http.post(`${BASE_URL}/signin`, { data });
  }

  public signup(data: SignupData) {
    return http.post(`${BASE_URL}/signup`, { data });
  }

  public logout() {
    return http.post(`${BASE_URL}/logout`);
  }

  public user() {
    return http.get(`${BASE_URL}/user`);
  }
}

export default new AuthAPI();
