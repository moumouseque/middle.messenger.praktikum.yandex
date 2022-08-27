import chatsAPI from '../../../api/chats-api';
import store from '../../../utils/store';
import ChatSocket from '../../../utils/chat-soket';

class ChatService {
  private socket: ChatSocket | undefined;

  public getChats = () => {
    chatsAPI.request()
      .then((response) => {
        if (response.status === 200) {
          store.set('chat.chats', JSON.parse(response.response));
        } else {
          throw JSON.parse(response.response);
        }
      });
  };

  public createChat = (title: string) => chatsAPI.create(title)
    .then((response) => {
      if (response.status === 200) {
        store.set('chat.chats', JSON.parse(response.response));
      } else {
        throw JSON.parse(response.response);
      }
    })
    .then(() => this.getChats());

  public getToken = (chatId: number) => chatsAPI.getToken(chatId)
    .then((response) => {
      if (response.status === 200) {
        store.set('chat.current.id', chatId);
        return JSON.parse(response?.response)?.token;
      }
      throw JSON.parse(response.response);
    });

  public createChatSocket = (chatId: number) => {
    this.getToken(chatId)
      .then((token) => {
        const userId = store.getState()?.user?.data?.id;
        this.socket = new ChatSocket('wss://ya-praktikum.tech/ws/chats', userId, chatId, token);
      });
  };

  public addUserToChat = (user: string) => {
    const data = {
      users: [Number(user)],
      chatId: store.getState()?.chat?.current?.id,
    };

    return chatsAPI.addUserToChat(data)
      .then((response) => {
        if (response.status !== 200) {
          throw JSON.parse(response.response);
        }
      });
  };

  public deleteUserFromChat = (user: string) => {
    const data = {
      users: [Number(user)],
      chatId: store.getState()?.chat?.current?.id,
    };

    return chatsAPI.deleteUserFromChat(data)
      .then((response) => {
        if (response.status !== 200) {
          throw JSON.parse(response.response);
        }
      });
  };

  public sendMessage = (message: string) => {
    if (this.socket) {
      this.socket.sendMessage(message);
    }
  };
}

export default new ChatService();
