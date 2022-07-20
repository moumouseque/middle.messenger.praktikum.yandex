import frame from '../../components/frame';
import link from '../../components/link';
import signupForm from './components/signup-form';

import template from './signup.hbs';
import './signup.css';

const frameContent = [
    signupForm,
    link({url: '/login', text: 'Войти', className: 'signup__link'}),
]
const content = frame({title: 'Регистрация', content: frameContent});

const signup = template({content});

export default signup;