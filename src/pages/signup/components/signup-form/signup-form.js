import formField from '../../../../components/form-field';
import button from '../../../../components/button';
import {registerEventListener} from '../../../../utils/register-event';
import template from './signup-form.hbs';

import './signup-form.css';

const fields = [
    {
        label: 'Почта',
        name: 'email',
        type: 'email',
    },
    {
        label: 'Фамилия',
        name: 'second_name',
        type: 'text',
    },
    {
        label: 'Имя',
        name: 'first_name',
        type: 'text',
    },
    {
        label: 'Логин',
        name: 'login',
        type: 'text',
    },
    {
        label: 'Телефон',
        name: 'phone',
        type: 'tel',
    },
    {
        label: 'Пароль',
        name: 'password',
        type: 'password',
    },
    {
        label: 'Пароль еще раз',
        name: 'password_again',
        type: 'password',
    }
];

const form = template({
        button: button({text: 'Зарегистрироваться', type: 'submit'}),
        fields: fields.map(field => formField(field)),
});

registerEventListener({
    selector: '.signup-form',
    eventType: 'submit',
    handler: (event) => {
        event.preventDefault();
        window.location.href = '/chat';
        console.log('signup');
    }
})

export default form;