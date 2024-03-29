import Block, { BaseProps } from '../../utils/block';

const template = require('./input.hbs');

type Props = {
  name: string;
  type: string;
  value?: string;
  placeholder?: string;
  className?: string;
  events?: BaseProps['events'];
};

class Input extends Block<Props> {
  constructor(props: Props) {
    super(props);
    if (this.element) {
      (this.element as HTMLInputElement).value = props.value || '';
    }
  }

  render() {
    return this.compile(template, this.props);
  }
}

export default Input;
