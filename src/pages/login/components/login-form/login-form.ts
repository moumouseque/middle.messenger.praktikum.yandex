import Block from '../../../../utils/block';
import FormField, { FormFieldItemData } from '../../../../components/form-field';
import Button from '../../../../components/button';
import submitValidation from '../../../../utils/submit-validation';
import validators from '../../../../validators';
import LoginService from '../../services/login-service';
import { SigninData } from '../../../../api/types/auth-types';

import './login-form.css';

const template = require('./login-form.hbs');

const fieldsData: FormFieldItemData[] = [
  {
    label: 'Логин',
    name: 'login',
    type: 'text',
    validator: validators.loginValidator,
  },
  {
    label: 'Пароль',
    name: 'password',
    type: 'password',
    validator: validators.passwordValidator,
  },
];

type Props = {
  fields: FormField[];
  button: Button;
};

class LoginForm extends Block<Props> {
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
      LoginService.login(Object.fromEntries(formData) as SigninData);
    }
  };

  render() {
    return this.compile(template);
  }
}

export default new LoginForm({
  fields: fieldsData.map((field) => new FormField(field)),
  button: new Button({
    text: 'Войти',
    type: 'submit',
  }),
});
