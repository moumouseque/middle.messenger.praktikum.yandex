import Block from '../../utils/block';

import './button.css';

const template = require('./button.hbs');

type Props = {
  text: string;
  type?: string;
  className?: string;
  theme?: 'button' | 'link';
};

class Button extends Block<Props> {
  render() {
    const {
      text, type = 'button', theme = 'button', className,
    } = this.props;
    return this.compile(template, {
      text, type, theme, className,
    });
  }
}

export default Button;
