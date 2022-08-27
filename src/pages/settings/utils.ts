import { UserData } from '../../api/types/user-types';

const convertUserToSettingsItems = (data: UserData) => [
  {
    title: 'Почта',
    value: data.email,
  },
  {
    title: 'Логин',
    value: data.login,
  },
  {
    title: 'Имя',
    value: data.first_name,
  },
  {
    title: 'Фамилия',
    value: data.second_name,
  },
  {
    title: 'Имя в чате',
    value: data.display_name,
  },
  {
    title: 'Телефон',
    value: data.phone,
  },
];

export default convertUserToSettingsItems;
