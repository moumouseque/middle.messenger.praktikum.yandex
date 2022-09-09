import router from './routing';
import Routes from './enums/routes';
import Login from './pages/login';
import Block from './utils/block';
import Signup from './pages/signup';
import ErrorPage from './pages/error-page';
import Chat from './pages/chat';
import Settings from './pages/settings';
import NotFound from './pages/not-found';

import './styles/index.css';

window.addEventListener('load', () => {
  router
    .use(Routes.Login, Login as typeof Block)
    .use(Routes.SignUp, Signup as typeof Block)
    .use(Routes.Error, ErrorPage as typeof Block)
    .use(Routes.Messenger, Chat as typeof Block)
    .use(Routes.Settings, Settings as typeof Block)
    .use(Routes.NotFound, NotFound as typeof Block, true)
    .start();
});
