import login from './pages/login';
import changePasswordModal from './pages/settings/components/change-password-modal';
import signup from './pages/signup';
import notFound from './pages/not-found';
import errorPage from './pages/error-page';
import chat from './pages/chat';
import settings from './pages/settings';
import changePersonalDataModal from './pages/settings/components/change-personal-data-modal';

import './styles/normalize.css';
import './styles/index.css';

const root = document.querySelector('#root');
window.addEventListener('hashchange', event => {
    const anchor = event.newURL.split('#')[1];
    console.log('++', anchor)
    switch (anchor) {
        case 'login': {
            root.innerHTML = login;
            break;
        }
        case 'signup': {
            root.innerHTML = signup;
            break;
        }
        case 'notFound': {
            root.innerHTML = notFound;
            break;
        }
        case 'error': {
            root.innerHTML = errorPage;
            break;
        }
        case 'chat': {
            root.innerHTML = chat;
            break;
        }
        case 'settings': {
            root.innerHTML = settings;
            break;
        }
        default: {
            root.innerHTML = notFound;
        }
    }
});
root.innerHTML = changePasswordModal;
