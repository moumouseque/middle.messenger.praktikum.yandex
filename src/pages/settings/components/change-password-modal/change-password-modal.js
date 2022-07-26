import formField from '../../../../components/form-field/form-field';
import modal from '../../../../components/modal';
import button from '../../../../components/button';
import {registerEventListener} from '../../../../utils/register-event';

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

const closeClassName = 'change-password-modal__close';
const modalClassName = 'change-password-modal__modal';

const closeModalHandler = (event) => {
    event.preventDefault();
    const node = document.querySelector(`.${modalClassName}`);
    node.classList.remove('visible');
};

registerEventListener({
    selector: `.${closeClassName}`,
    eventType: 'click',
    handler: closeModalHandler,
});

registerEventListener({
    selector: `.change-password-modal__form`,
    eventType: 'submit',
    handler: closeModalHandler,
});

export default () => modal({
    content,
    closeClassName,
    className: modalClassName,
});
