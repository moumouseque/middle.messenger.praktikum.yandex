import frame from '../../components/frame';
import link from '../../components/link';
import loginForm from './components/login-form';

import template from './login.hbs';
import './login.css';

const frameContent = [
    loginForm,
    link({url: '/signup', text: 'Нет аккаунта?', className: 'login__link'}),
]
const content = frame({title: 'Вход', content: frameContent});

const login = template({content});

export default login;