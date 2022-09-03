import Block from '../../utils/block';

import './frame.css';

const template = require('./frame.hbs');

type Props = {
  title: string;
  content: Block[];
};

class Frame extends Block<Props> {
  render() {
    const { title, content } = this.props;

    return this.compile(template, { title, content });
  }
}

export default Frame;
