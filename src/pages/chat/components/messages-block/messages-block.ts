import Block from '../../../../utils/block';

import { State } from '../../../../types';
import connect from '../../../../utils/connect';
import Message from '../message';
import { ChatMessage } from '../../../../api/types/chat-types';
import convertToMessageDateTime from '../../../../utils/date';

import './messages-block.css';

const template = require('./messages-block.hbs');

type Props = {
  messagesItems?: ChatMessage[];
  userId?: string;
};

class MessagesBlock extends Block {
  componentDidUpdate(oldProps?: Props, newProps?: Props): boolean {
    if (oldProps?.messagesItems !== newProps?.messagesItems) {
      Object.assign(this.children, {
        messages: newProps?.messagesItems
          ?.map((message) => new Message({
            ...message,
            isMyMessage: message.user_id === newProps.userId,
            time: convertToMessageDateTime(message.time),
          })),
      });
    }

    return true;
  }

  render() {
    return this.compile(template, this.props);
  }
}

const mapStateToProps = (state: State) => ({
  messagesItems: state?.chat?.current?.messages,
  userId: state?.user?.data?.id,
});

const ConnectedMessagesBlock = connect<Props, ReturnType<typeof mapStateToProps>>(
  MessagesBlock,
  mapStateToProps,
);

export default ConnectedMessagesBlock;
