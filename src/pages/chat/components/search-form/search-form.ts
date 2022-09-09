import Block from '../../../../utils/block';
import Input from '../../../../components/input';

import './search-form.css';

const template = require('./search-form.hbs');

type Props = {
  handleChange: (value: string) => void;
};

class SearchForm extends Block<Props> {
  constructor(props: Props) {
    super(props);
    this.children.input = new Input({
      name: 'search',
      type: 'text',
      placeholder: 'Поиск',
      className: 'search-form__input',
      events: {
        input: (event) => {
          props.handleChange(event.target.value);
          event.target.focus();
        },
      },
    });
  }

  render() {
    return this.compile(template);
  }
}

export default SearchForm;
