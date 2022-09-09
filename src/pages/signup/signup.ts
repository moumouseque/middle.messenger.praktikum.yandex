import Block from '../../utils/block';
import Frame from '../../components/frame';
import Link from '../../components/link';
import signupForm from './components/signup-form';
import Routes from '../../enums/routes';
import { State } from '../../types';
import connect from '../../utils/connect';

import './signup.css';

const template = require('./signup.hbs');

const link = new Link({ url: Routes.Login, text: 'Войти', className: 'signup__link' });
const frameContent = [
  signupForm,
  link,
];

const frame = new Frame({ title: 'Регистрация', content: frameContent });

type Props = {
  errorMessage?: string;
};

class Signup extends Block<Props> {
  constructor(props: Props) {
    super(props);
    Object.assign(this.children, {
      content: frame,
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
const mapStateToProps = (state: State) => ({
  errorMessage: state?.user?.errorMessage,
});

const ConnectedSignup = connect<Props, ReturnType<typeof mapStateToProps>>(Signup, mapStateToProps);
export default ConnectedSignup;
