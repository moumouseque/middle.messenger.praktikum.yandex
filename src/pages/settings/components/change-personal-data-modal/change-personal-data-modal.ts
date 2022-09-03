import Block from '../../../../utils/block';
import FormField, { FormFieldItemData } from '../../../../components/form-field';
import Modal from '../../../../components/modal';
import Button from '../../../../components/button';
import validators from '../../../../validators';
import submitValidation from '../../../../utils/submit-validation';
import SettingsService from '../../services/settings-service';
import { ProfileData, UserData } from '../../../../api/types/user-types';
import { State } from '../../../../types';
import connect from '../../../../utils/connect';

import './change-personal-data-modal.css';

const template = require('./change-personal-data-modal.hbs');

const fieldsData: FormFieldItemData[] = [
  {
    label: 'Почта',
    name: 'email',
    type: 'email',
    validator: validators.emailValidator,
  },
  {
    label: 'Логин',
    name: 'login',
    type: 'text',
    validator: validators.loginValidator,
  },
  {
    label: 'Имя',
    name: 'first_name',
    type: 'text',
    validator: validators.nameValidator,
  },
  {
    label: 'Фамилия',
    name: 'second_name',
    type: 'text',
    validator: validators.nameValidator,
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
    validator: validators.phoneValidator,
  },
];

const submit = new Button({
  text: 'Сохранить',
  type: 'submit',
});

type Props = {
  submit: Button;
  fields?: FormField[];
  userData?: UserData;
};

class Content extends Block<Props> {
  constructor(props: Props) {
    const fields = fieldsData.map((item) => new FormField(item));
    super({ ...props, fields });

    this.setProps({
      events: {
        submit: (event: Event) => this.handelSubmit(event),
      },
    });
  }

  componentDidUpdate(oldProps?: Props, newProps?: Props): boolean {
    if (oldProps?.userData !== newProps?.userData && newProps?.userData) {
      const fildsWithValue = fieldsData.map((field) => ({
        ...field,
        value: newProps?.userData?.[field.name as keyof UserData]?.toString(),
      }));
      Object.assign(this.children, {
        fields: fildsWithValue.map((item) => new FormField(item)),
      });
    }

    return true;
  }

  handelSubmit = (event: Event) => {
    event.preventDefault();
    const target = event.target as HTMLFormElement;
    const formData = new FormData(target);
    const formIsValid = submitValidation(formData, fieldsData, this.children.fields as Block[]);

    if (formIsValid) {
      SettingsService.changeProfile(Object.fromEntries(formData) as ProfileData)
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        .then(() => modal.hide())
        .then(() => target.reset());
    }
  };

  render() {
    return this.compile(template, this.props);
  }
}

const mapStateToProps = (state: State) => ({
  userData: state?.user?.data,
});

const ConnectedContent = connect<Props, ReturnType<typeof mapStateToProps>>(
  Content,
  mapStateToProps,
);

const content = new ConnectedContent({
  submit,
});

const modal = new Modal({ content });

export default modal;
