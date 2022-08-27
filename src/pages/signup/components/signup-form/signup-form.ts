import Block from '../../../../utils/block';
import FormField, { FormFieldItemData } from '../../../../components/form-field';
import Button from '../../../../components/button';
import validators from '../../../../validators';
import submitValidation from '../../../../utils/submit-validation';

import template from './signup-form.hbs';

import './signup-form.css';
import SignupService from '../../services/signup-service';
import { SignupData } from '../../../../api/types/auth-types';

const fieldsData: FormFieldItemData[] = [
  {
    label: 'Почта',
    name: 'email',
    type: 'email',
    validator: validators.emailValidator,
  },
  {
    label: 'Фамилия',
    name: 'second_name',
    type: 'text',
    validator: validators.nameValidator,
  },
  {
    label: 'Имя',
    name: 'first_name',
    type: 'text',
    validator: validators.nameValidator,
  },
  {
    label: 'Логин',
    name: 'login',
    type: 'text',
    validator: validators.loginValidator,
  },
  {
    label: 'Телефон',
    name: 'phone',
    type: 'tel',
    validator: validators.phoneValidator,
  },
  {
    label: 'Пароль',
    name: 'password',
    type: 'password',
    validator: validators.passwordValidator,
  },
  {
    label: 'Пароль еще раз',
    name: 'password_again',
    type: 'password',
    validator: validators.passwordValidator,
  },
];

type Props = {
  fields: FormField[];
  button: Button;
};

class SignupForm extends Block<Props> {
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
      SignupService.signup(Object.fromEntries(formData) as SignupData);
    }
  };

  render() {
    return this.compile(template);
  }
}

export default new SignupForm({
  fields: fieldsData.map((field) => new FormField(field)),
  button: new Button({
    text: 'Зарегистрироваться',
    type: 'submit',
  }),
});
