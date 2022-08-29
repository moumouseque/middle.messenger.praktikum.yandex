import Block from '../../utils/block';
import Button from '../../components/button';
import SettingsItem from './components/settings-item';
import Avatar from './components/avatar';
import Link from '../../components/link';
import changePersonalDataModal from './components/change-personal-data-modal';
import changePasswordModal from './components/change-password-modal';
import changeAvatarModal from './components/change-avatar-modal';
import Routes from '../../enums/routes';
import SettingsService from './services/settings-service';
import connect from '../../utils/connect';
import { State } from '../../types';
import { UserData } from '../../api/types/user-types';
import convertUserToSettingsItems from './utils';
import authService from '../../services/auth-service';
import errorModal from '../../components/error-modal';

import template from './settings.hbs';

import './settings.css';

const toChatLink = new Link({ url: Routes.Messenger, text: '< К чатам' });
const avatar = new Avatar({
  events: {
    click: () => {
      changeAvatarModal.show();
    },
  },
});
const changePersonalDataButton = new Button({
  text: 'Изменить данные',
  theme: 'link',
  events: {
    click: () => {
      changePersonalDataModal.show();
    },
  },
});
const changePasswordButton = new Button({
  text: 'Изменить пароль',
  theme: 'link',
  events: {
    click: () => {
      changePasswordModal.show();
    },
  },
});
const logOutButton = new Button({
  theme: 'link',
  text: 'Выйти',
  className: 'settings__logout-button',
  events: {
    click: () => {
      SettingsService.logout();
    },
  },
});

type Props = {
  userData: UserData;
};

class Settings extends Block<Props> {
  constructor(props: Props) {
    super(props);

    Object.assign(this.children, {
      toChatLink,
      avatar,
      changePersonalDataButton,
      changePasswordButton,
      logOutButton,
      changePersonalDataModal,
      changePasswordModal,
      changeAvatarModal,
      errorModal,
    });
  }

  setSettingsData = (userData: UserData) => {
    const settingsItems = convertUserToSettingsItems(userData)
      ?.map((item) => new SettingsItem(item));
    Object.assign(this.children, {
      settingsItems,
    });
  };

  componentDidMount() {
    if (!this.props.userData) {
      authService.checkAuth();
    } else {
      this.setSettingsData(this.props.userData);
    }
  }

  componentDidUpdate(oldProps?: Props, newProps?: Props): boolean {
    if (oldProps?.userData !== newProps?.userData && newProps?.userData) {
      this.setSettingsData(newProps?.userData);
      return false;
    }
    return true;
  }

  render() {
    return this.compile(template, this.props);
  }
}

const mapStateToProps = (state: State) => ({
  userData: state?.user?.data,
  login: state?.user?.data?.login,
});

const ConnectedSettings = connect<Props, ReturnType<typeof mapStateToProps>>(
  Settings,
  mapStateToProps,
);
export default ConnectedSettings;
