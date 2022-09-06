import Block from '../../utils/block';
import router from '../../routing';

import './link.css';

const template = require('./link.hbs');

type Props = {
  url: string;
  text: string;
  className?: string;
};

class Link extends Block<Props> {
  constructor(props: Props) {
    super(props);
    this.setProps({
      events: {
        click: (event: MouseEvent) => {
          event.preventDefault();
          router.go(props.url);
        },
      },
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}

export default Link;
