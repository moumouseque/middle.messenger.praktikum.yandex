import { clearInterval } from 'timers';
import store from './store';

class ChatSocket {
  private intervalId: NodeJS.Timer | undefined;

  public socket: WebSocket;

  constructor(url: string, userId: number, chatId: number, token: string) {
    this.socket = new WebSocket(`${url}/${userId}/${chatId}/${token}`);
    this.socket.addEventListener('message', (event) => {
      this.setData(event.data);
    });
    this.socket.addEventListener('open', () => {
      this.getMessages(0);
      this.startPing();
    });
    this.socket.addEventListener('error', (event) => {
      // eslint-disable-next-line no-console
      console.log('Ошибка', event);
    });
    this.socket.addEventListener('close', () => {
      clearInterval(this.intervalId);
    });
  }

  public startPing = () => {
    this.intervalId = setInterval(() => {
      this.socket.send(JSON.stringify({
        type: 'ping',
      }));
    }, 10000);
  };

  public setData = (data: string) => {
    const parsedData = JSON.parse(data);
    if (Array.isArray(parsedData)) {
      store.set('chat.current.messages', parsedData.reverse());
    } else if (parsedData.type === 'message') {
      const { messages } = store.getState().chat.current;
      store.set('chat.current.messages', messages.concat(parsedData));
    }
  };

  public sendMessage = (message: string) => {
    this.socket.send(JSON.stringify({
      content: message,
      type: 'message',
    }));
  };

  public getMessages = (offset: number) => {
    this.socket.send(JSON.stringify({
      content: offset.toString(),
      type: 'get old',
    }));
  };
}

export default ChatSocket;
