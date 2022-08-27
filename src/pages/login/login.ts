import Block from '../../utils/block';
import Frame from '../../components/frame';
import Link from '../../components/link';
import LoginForm from './components/login-form';

import template from './login.hbs';

import './login.css';
import Routes from '../../enums/routes';
import connect from '../../utils/connect';
import { State } from '../../types';

const link = new Link({ url: Routes.SignUp, text: 'Нет аккаунта?', className: 'login__link' });
const frameContent = [
  LoginForm,
  link,
];

const frame = new Frame({ title: 'Вход', content: frameContent });

type Props = {
  errorMessage: string;
};

class Login extends Block<Props> {
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

const ConnectedLogin = connect<Props, ReturnType<typeof mapStateToProps>>(Login, mapStateToProps);
export default ConnectedLogin;
