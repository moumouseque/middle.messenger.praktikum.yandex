import authApi from '../../../api/auth-api';
import router from '../../../routing';
import Routes from '../../../enums/routes';
import store from '../../../utils/store';
import { SigninData } from '../../../api/types/auth-types';

class LoginService {
  public static getUser = () => {
    authApi.user()
      .then((response) => {
        if (response.status === 200) {
          store.set('user.data', JSON.parse(response.response));
        } else {
          throw JSON.parse(response.response);
        }
      });
  };

  public static login = (data: SigninData) => {
    authApi.signin(data)
      .then((response) => {
        if (response.status === 200) {
          LoginService.getUser();
          store.set('user.errorMessage', '');
          router.go(Routes.Messenger);
        } else {
          throw JSON.parse(response.response);
        }
      })
      .catch((error) => {
        store.set('user.errorMessage', error.reason);
      });
  };
}

export default LoginService;
