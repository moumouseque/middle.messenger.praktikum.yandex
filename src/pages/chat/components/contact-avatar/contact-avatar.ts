import Block from '../../../../utils/block';

import './contact-avatar.css';

const template = require('./contact-avatar.hbs');

type Props = {
  avatar: string | null;
};

class ContactAvatar extends Block<Props> {
  render() {
    return this.compile(template);
  }
}

export default ContactAvatar;
