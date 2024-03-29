import Block from '../../utils/block';
import Input from '../input';
import { Validator, RecordEvent } from '../../types';

import './form-field.css';

const template = require('./form-field.hbs');

type Props = {
  name: string;
  type: string;
  label?: string;
  errorText?: string;
  validator?: Validator;
  value?: string;
};

class FormField extends Block<Props> {
  constructor(props: Props) {
    super(props);

    this.children.input = new Input({
      name: props.name,
      type: props.type,
      value: props.value,
      className: 'form-field__input',
      events: {
        blur: (event: RecordEvent<HTMLInputElement>) => {
          this.handleBlur(event.target?.value);
        },
      },
    });
  }

  handleBlur = (value: any) => {
    if (!this.props.validator) {
      return;
    }
    const errorText = this.props.validator(value);

    this.setProps({ errorText });
  };

  render() {
    const {
      name, label, errorText, type,
    } = this.props;
    return this.compile(template, {
      name, label, errorText, type,
    });
  }
}

export default FormField;
