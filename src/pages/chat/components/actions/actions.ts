import Block from '../../../../utils/block';
import Button from '../../../../components/button';
import addChatModal from './components/add-chat-modal';
import addContactModal from './components/add-contact-modal';
import deleteContactModal from './components/delete-contact-modal';

import template from './actions.hbs';

import './actions.css';

const actionButton = new Button({ theme: 'link', text: 'Действия', className: 'actions__button' });
const newChatButton = new Button({
  theme: 'link',
  text: 'Добавить чат',
  events: {
    click: () => addChatModal.show(),
  },
});
const addUserButton = new Button({
  theme: 'link',
  text: 'Добавить контакт в чат',
  events: {
    click: () => addContactModal.show(),
  },
});
const deleteUserButton = new Button({
  theme: 'link',
  text: 'Удалить контакт из чата',
  events: {
    click: () => deleteContactModal.show(),
  },
});

class Actions extends Block {
  constructor() {
    super({});

    Object.assign(this.children, {
      actionButton,
      newChatButton,
      addUserButton,
      deleteUserButton,
      addChatModal,
      addContactModal,
      deleteContactModal,
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}

export default Actions;
