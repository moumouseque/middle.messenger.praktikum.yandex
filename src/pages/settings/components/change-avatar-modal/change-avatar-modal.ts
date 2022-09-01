import Block from '../../../../utils/block';
import FormField from '../../../../components/form-field';
import Modal from '../../../../components/modal';
import Button from '../../../../components/button';
import submitValidation from '../../../../utils/submit-validation';
import SettingsService from '../../services/settings-service';

import './change-avatar-modal.css';

const template = require('./change-avatar-modal.hbs');

const fieldsData = [
  {
    label: 'Аватар',
    name: 'avatar',
    type: 'file',
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
      SettingsService.changeAvatar(formData)
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
