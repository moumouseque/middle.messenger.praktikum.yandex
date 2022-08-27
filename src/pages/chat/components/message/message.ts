import Block from '../../../../utils/block';

import template from './message.hbs';

import './message.css';

type Props = {
  content: string;
  time: string;
  isMyMessage?: boolean;
};

class Message extends Block<Props> {
  render() {
    const { content, time, isMyMessage } = this.props;
    return this.compile(template, {
      content,
      time,
      className: isMyMessage ? 'message_my' : '',
    });
  }
}

export default Message;
