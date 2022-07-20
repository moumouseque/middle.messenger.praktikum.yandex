import formField from '../../../../components/form-field/form-field';
import modal from '../../../../components/modal';
import button from '../../../../components/button';

import template from './change-personal-data-modal.hbs';

import './change-personal-data-modal.css';

const fields = [
    {
        label: 'Почта',
        name: 'email',
        type: 'email',
    },
    {
        label: 'Логин',
        name: 'login',
        type: 'text',
    },
    {
        label: 'Имя',
        name: 'first_name',
        type: 'text',
    },
    {
        label: 'Фамилия',
        name: 'second_name',
        type: 'text',
    },
    {
        label: 'Имя в чате',
        name: 'display_name',
        type: 'text',
    },
    {
        label: 'Телефон',
        name: 'phone',
        type: 'tel',
    },
];

const submit = button({text: 'Сохранить', type: 'submit'});

const form = fields.map(field => formField(field));

const content = template({fields: form, submit});

export default modal({content});
