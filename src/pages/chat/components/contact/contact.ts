import Block, { BaseProps } from '../../../../utils/block';
import ContactAvatar from '../contact-avatar';

import './contact.css';

const template = require('./contact.hbs');

type Props = {
  avatar: string | null;
  title: string;
  content: string | null;
  time?: string;
};

class Contact extends Block<Props> {
  constructor(props: BaseProps<Props>) {
    super(props);
    this.children.avatar = new ContactAvatar({ avatar: props.avatar });
  }

  render() {
    return this.compile(template, this.props);
  }
}

export default Contact;
