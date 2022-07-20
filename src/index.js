import {routes} from './utils/routes';
import {registerEventHandler} from './utils/register-event';

import './styles/index.css';

window.addEventListener('load', () => {
    const root = document.querySelector('#root');
    root.innerHTML = routes[window.location.pathname] || routes.notFound;
    registerEventHandler()
});
