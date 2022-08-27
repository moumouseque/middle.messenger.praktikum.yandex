import Button from '../../../../../../components/button';
import FormField from '../../../../../../components/form-field';
import Block from '../../../../../../utils/block';
import submitValidation from '../../../../../../utils/submit-validation';
import Modal from '../../../../../../components/modal';
import chatService from '../../../../services/chat-service';

import template from './add-chat-modal.hbs';

import './add-chat-modal.css';

const fieldsData = [
  {
    label: 'Имя чата',
    name: 'title',
    type: 'text',
  },
];

const submit = new Button({
  text: 'Добавить',
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
      chatService.createChat(formData.get('title') as string)
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
