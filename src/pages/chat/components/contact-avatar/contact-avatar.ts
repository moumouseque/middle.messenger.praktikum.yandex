import Block from '../../../../utils/block';

import template from './contact-avatar.hbs';

import './contact-avatar.css';

type Props = {
  avatar: string | null;
};

class ContactAvatar extends Block<Props> {
  render() {
    return this.compile(template);
  }
}

export default ContactAvatar;
