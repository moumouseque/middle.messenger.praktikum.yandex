import {registerEventListener} from '../../utils/register-event';
import template from './settings.hbs';
import settingsItem from './components/settings-item';
import avatar from './components/avatar';
import link from '../../components/link';
import changePersonalDataModal from './components/change-personal-data-modal';
import changePasswordModal from './components/change-password-modal';

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
const toChatLink = link({url: '/chat', text: 'Назад к чату'});
const changePersonalDataLink = link({
    url: '#changePersonalData',
    text: 'Изменить данные',
    className: 'settings__change-pdata',
});
const changePasswordLink = link({
    url: '#changePassword',
    text: 'Изменить пароль',
    className: 'settings__change-password',
});
const logOutLink = link({url: '/login', text: 'Выйти', className: 'settings__logout-link'});

const settings = template({
    toChatLink,
    avatar,
    login: items[2].value,
    settingsItems,
    changePersonalDataLink,
    changePasswordLink,
    logOutLink,
    changePersonalDataModal: changePersonalDataModal(),
    changePasswordModal: changePasswordModal(),
});

registerEventListener({
    selector: `.settings__change-pdata`,
    eventType: 'click',
    handler: (event) => {
        event.preventDefault();
        const node = document.querySelector('.change-personal-data-modal__modal');
        node.classList.add('visible');
    },
});

registerEventListener({
    selector: `.settings__change-password`,
    eventType: 'click',
    handler: (event) => {
        event.preventDefault();
        const node = document.querySelector('.change-password-modal__modal');
        node.classList.add('visible');
    },
});

export default settings;
