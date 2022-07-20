import servicePageInfo from '../../components/service-page-info/service-page-info';
import template from './not-found.hbs';

import './not-found.css';

const content = servicePageInfo({
    title: '404',
    subtitle: 'Такой страницы нет',
    linkText: 'Назад к чатам',
    linkUrl: 'chat',
})

const notFound = template({content});

export default notFound;
