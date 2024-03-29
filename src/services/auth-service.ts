import authAPI from '../api/auth-api';
import store from '../utils/store';
import router from '../routing';
import Routes from '../enums/routes';

class AuthService {
  public checkAuth = () => authAPI.user()
    .then((response) => {
      if (response.status === 200) {
        store.set('user.data', JSON.parse(response.response));
      } else {
        throw response.response;
      }
    })
    .catch((error) => {
      router.go(Routes.Login);
      throw error;
    });
}

export default new AuthService();
