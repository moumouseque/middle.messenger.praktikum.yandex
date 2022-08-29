import Login from './pages/login';
import Signup from './pages/signup';
import NotFound from './pages/not-found';
import ErrorPage from './pages/error-page';
import Chat from './pages/chat';
import Settings from './pages/settings';
import Router from './utils/router';
import Routes from './enums/routes';
import Block from './utils/block';

const router = new Router('#root');

router
  .use(Routes.Login, Login as typeof Block)
  .use(Routes.SignUp, Signup as typeof Block)
  .use(Routes.Error, ErrorPage as typeof Block)
  .use(Routes.Messenger, Chat as typeof Block)
  .use(Routes.Settings, Settings as typeof Block)
  .use(Routes.NotFound, NotFound as typeof Block, true);

export default router;
