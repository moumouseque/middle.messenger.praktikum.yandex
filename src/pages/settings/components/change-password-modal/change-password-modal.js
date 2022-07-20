import formField from '../../../../components/form-field/form-field';
import modal from '../../../../components/modal';
import button from '../../../../components/button';

import template from './change-password-modal.hbs';

import './change-password-modal.css';

const fields = [
    {
        label: 'Старый пароль',
        name: 'oldPassword',
        type: 'password',
    },
    {
        label: 'Новый пароль',
        name: 'newPassword',
        type: 'password',
    },
    {
        label: 'Повторите новый пароль',
        name: 'newPasswordRepeat',
        type: 'password',
    },
];

const submit = button({text: 'Сохранить', type: 'submit'});

const form = fields.map(field => formField(field));

const content = template({fields: form, submit});

export default modal({content});
