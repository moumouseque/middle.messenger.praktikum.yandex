import Block from '../../../../utils/block';
import FormField from '../../../../components/form-field';
import Modal from '../../../../components/modal';
import Button from '../../../../components/button';
import validators from '../../../../validators';
import submitValidation from '../../../../utils/submit-validation';
import SettingsService from '../../services/settings-service';
import { PasswordData } from '../../../../api/types/user-types';

import './change-password-modal.css';

const template = require('./change-password-modal.hbs');

const fieldsData = [
  {
    label: 'Старый пароль',
    name: 'oldPassword',
    type: 'password',
    validator: validators.passwordValidator,
  },
  {
    label: 'Новый пароль',
    name: 'newPassword',
    type: 'password',
    validator: validators.passwordValidator,
  },
  {
    label: 'Повторите новый пароль',
    name: 'newPasswordRepeat',
    type: 'password',
    validator: validators.passwordValidator,
  },
];

const submit = new Button({
  text: 'Сохранить',
  type: 'submit',
});
const fields = fieldsData.map((item) => new FormField(item));

type Props = {
  submit: Button;
  fields: FormField[];
};

class Content extends Block<Props> {
  constructor(props: Props) {
    super(props);

    Object.assign(this.props, {
      events: {
        submit: (event: Event) => this.handelSubmit(event),
      },
    });
  }

  handelSubmit = (event: Event) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const formIsValid = submitValidation(formData, fieldsData, this.children.fields as Block[]);

    if (formIsValid) {
      SettingsService.changePassword(Object.fromEntries(formData) as PasswordData)
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        .then(() => modal.hide());
    }
  };

  render() {
    return this.compile(template, this.props);
  }
}

const content = new Content({
  submit,
  fields,
});

const modal = new Modal({ content });

export default modal;
