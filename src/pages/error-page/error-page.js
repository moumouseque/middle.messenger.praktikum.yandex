import servicePageInfo from '../../components/service-page-info/service-page-info';
import template from './error-page.hbs';

import './error-page.css';

const content = servicePageInfo({
    title: 'Ошибка',
    subtitle: 'Что-то пошло не так',
    linkText: 'Назад к чатам',
    linkUrl: '#chat',
})

const errorPage = template({content});

export default errorPage;
