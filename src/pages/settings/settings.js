import template from './settings.hbs';
import settingsItem from './components/settings-item';
import avatar from './components/avatar';
import link from '../../components/link';

import './settings.css';

const items = [
    {
        title: 'Почта',
        value: 'test@test.ru',
    },
    {
        title: 'Логин',
        value: 'konstantin',
    },
    {
        title: 'Имя',
        value: 'Константин',
    },
    {
        title: 'Фамилия',
        value: 'Константинов',
    },
    {
        title: 'Имя в чате',
        value: 'costa',
    },
    {
        title: 'Телефон',
        value: '+7 945 822 45 09',
    },
];

const settingsItems = items.map(settingsItem);
const toChatLink = link({url: '#chat', text: 'Назад к чату'});
const changePersonalDataLink = link({url: '#', text: 'Изменить данные'});
const changePasswordLink = link({url: '#', text: 'Изменить пароль'});
const logOutLink = link({url: '#login', text: 'Выйти', className: 'settings__logout-link'});

const settings = template({
    toChatLink,
    avatar,
    login: items[2].value,
    settingsItems,
    changePersonalDataLink,
    changePasswordLink,
    logOutLink,
});

export default settings;
