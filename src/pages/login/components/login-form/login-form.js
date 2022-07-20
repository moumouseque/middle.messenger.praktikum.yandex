import formField from '../../../../components/form-field';
import button from '../../../../components/button';
import {registerEventListener} from '../../../../utils/register-event';
import template from './login-form.hbs';

import './login-form.css';

const fields = [
    {
        label: 'Логин',
        name: 'login',
        type: 'text',
    },
    {
        label: 'Пароль',
        name: 'password',
        type: 'password',
    }
];

const form = template({
        button: button({text: 'Войти', type: 'submit'}),
        fields: fields.map(field => formField(field)),
});

registerEventListener({
    selector: '.login-form',
    eventType: 'submit',
    handler: (event) => {
        event.preventDefault();
        console.log('login');
        window.location.hash = '#chat';
        // window.history.replaceState(undefined, undefined, '#chat');
        // console.log(Array.from(new FormData(loginForm).entries()));
    }
});


export default form;