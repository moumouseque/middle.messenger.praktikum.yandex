import Block from '../../utils/block';
import connect from '../../utils/connect';
import { State } from '../../types';
import Modal from '../modal';
import Button from '../button';

import './error-modal.css';

const template = require('./error-modal.hbs');

const submit: Button = new Button({
  text: 'Ок',
  events: {
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    click: () => modal.hide(),
  },
});

type Props = {
  submit: Button;
  errorMessage?: string;
  message?: string;
};

class ErrorModal extends Block<Props> {
  componentDidUpdate(oldProps?: Props, newProps?: Props): boolean {
    if (
      (oldProps?.errorMessage !== newProps?.errorMessage && newProps?.errorMessage)
      || (oldProps?.message !== newProps?.message && newProps?.message)
    ) {
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      modal.show();
      return true;
    }
    return false;
  }

  render() {
    return this.compile(template, this.props);
  }
}

const mapStateToProps = (state: State) => ({
  errorMessage: state?.error?.errorMessage,
  message: state?.error?.message,
});

const ConnectedErrorModal = connect<Props, ReturnType<typeof mapStateToProps>>(
  ErrorModal,
  mapStateToProps,
);

const content = new ConnectedErrorModal({ submit } as Props);
const modal = new Modal({ content });

export default modal;
