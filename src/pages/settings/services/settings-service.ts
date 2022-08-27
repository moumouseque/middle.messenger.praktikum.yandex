import authAPI from '../../../api/auth-api';
import router from '../../../routes';
import Routes from '../../../enums/routes';
import store from '../../../utils/store';
import { PasswordData, ProfileData } from '../../../api/types/user-types';
import usersAPI from '../../../api/users-api';

class SettingsService {
  public static logout = () => {
    authAPI.logout()
      .then(() => router.go(Routes.Login));
  };

  public static getUserData = () => {
    authAPI.user()
      .then((response) => {
        if (response.status === 200) {
          store.set('user.data', JSON.parse(response.response));
        } else {
          throw JSON.parse(response.response);
        }
      });
  };

  public static changeProfile = (data: ProfileData) => usersAPI.changeProfile(data)
    .then((response) => {
      if (response.status === 200) {
        store.set('user.data', JSON.parse(response.response));
      } else {
        throw JSON.parse(response.response);
      }
    });

  public static changePassword = (data: PasswordData) => usersAPI.changePassword(data);

  public static changeAvatar = (data: FormData) => usersAPI.changeAvatar(data)
    .then((response) => {
      if (response.status === 200) {
        store.set('user.data', JSON.parse(response.response));
      } else {
        throw JSON.parse(response.response);
      }
    });
}

export default SettingsService;
