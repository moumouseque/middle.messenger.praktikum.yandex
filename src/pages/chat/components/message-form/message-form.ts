import Block from '../../../../utils/block';
import Button from '../../../../components/button';
import FormField from '../../../../components/form-field';
import validators from '../../../../validators';
import submitValidation from '../../../../utils/submit-validation';
import chatService from '../../services/chat-service';

import template from './message-form.hbs';

import './message-form.css';

const fieldsData = [{
  name: 'message',
  type: 'text',
  validator: validators.requiredValidator,
}];

const button = new Button({
  text: 'Отправить',
  type: 'submit',
});

type Props = {
  button: Button;
  fields: FormField[];
};

class MessageForm extends Block<Props> {
  constructor(props: Props) {
    super(props);

    this.setProps({
      events: {
        submit: (event: Event) => this.handelSubmit(event),
      },
    });
  }

  handelSubmit = (event: Event) => {
    event.preventDefault();
    const target = event.target as HTMLFormElement;
    const formData = new FormData(target);
    const formIsValid = submitValidation(formData, fieldsData, this.children.fields as Block[]);

    if (formIsValid) {
      chatService.sendMessage(Object.fromEntries(formData).message as string)
        .then(() => target.reset());
    }
  };

  render() {
    return this.compile(template);
  }
}

export default new MessageForm({
  fields: fieldsData.map((field) => new FormField(field)),
  button,
});
