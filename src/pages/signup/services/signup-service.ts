import authApi from '../../../api/auth-api';
import { router } from '../../../utils/router';
import Routes from '../../../enums/routes';
import store from '../../../utils/store';
import { SignupData } from '../../../api/types/auth-types';

class SignupService {
  public static signup = (data: SignupData) => {
    authApi.signup(data)
      .then((response) => {
        if (response.status === 200) {
          router.go(Routes.Messenger);
          store.set('user.errorMessage', '');
        } else {
          throw JSON.parse(response.response);
        }
      })
      .catch((error) => {
        store.set('user.errorMessage', error.reason);
      });
  };
}

export default SignupService;
