import authService from '../../services/auth-service';
import Block from '../../utils/block';
import Contact from './components/contact';
import Link from '../../components/link';
import messageForm from './components/message-form';
import SearchForm from './components/search-form';
import ContactAvatar from './components/contact-avatar';
import Routes from '../../enums/routes';
import connect from '../../utils/connect';
import chatService from './services/chat-service';
import Actions from './components/actions';
import { State } from '../../types';
import { ChatData } from '../../api/types';
import MessagesBlock from './components/messages-block';
import convertToMessageDateTime from '../../utils/date';
import errorModal from '../../components/error-modal';

import template from './chat.hbs';

import './chat.css';

const settingsLink = new Link({
  text: '< Профиль',
  url: Routes.Settings,
  className: 'chat__settings-link',
});
const avatar = new ContactAvatar({ avatar: '' });
const actions = new Actions();
const messagesBlock = new MessagesBlock({});

type Props = {
  contactName: string;
  chats: ChatData[];
};

class Chat extends Block<Props> {
  constructor(props: Props) {
    super(props);

    Object.assign(this.children, {
      avatar,
      settingsLink,
      messageForm,
      errorModal,
      actions,
      messagesBlock,
      searchForm: new SearchForm({
        handleChange: this.handleSearch,
      }),
    });
  }

  handleSearch = (value: string) => {
    const filteredChats = this.props.chats
      .filter((chat: ChatData) => chat.title.toLowerCase().includes(value));

    Object.assign(this.children, {
      contacts: this.createChatChildren(filteredChats),
    });
  };

  componentDidMount() {
    authService.checkAuth()
      .then(() => chatService.getChats());
  }

  createChatChildren = (chats?: ChatData[]) => chats?.map(({ id, ...chat }) => new Contact({
    ...chat,
    content: chat.last_message?.content,
    time: convertToMessageDateTime(chat.last_message?.time),
    events: {
      click: () => {
        chatService.createChatSocket(id);
      },
    },
  }));

  componentDidUpdate(oldProps?: Props, newProps?: Props): boolean {
    if (oldProps?.chats !== newProps?.chats) {
      Object.assign(this.children, {
        contacts: this.createChatChildren(newProps?.chats),
      });
    }

    return true;
  }

  render() {
    return this.compile(template, this.props);
  }
}

const mapStateToProps = (state: State) => ({
  chats: state?.chat?.chats ?? [],
});

const ConnectedChat = connect(Chat, mapStateToProps);

export default ConnectedChat;
