import login from '../pages/login';
import signup from '../pages/signup';
import notFound from '../pages/not-found';
import errorPage from '../pages/error-page';
import chat from '../pages/chat';
import settings from '../pages/settings';

export const routes = {
    '/': login,
    '/login': login,
    '/signup': signup,
    '/notFound': notFound,
    '/error': errorPage,
    '/chat': chat,
    '/settings': settings,
};
