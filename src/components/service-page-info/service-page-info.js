import link from '../link';

import template from './service-page-info.hbs';
import './service-page-info.css';

export default ({title, subtitle, linkText, linkUrl}) => {
    const fallbackLink = link({url: linkUrl, text: linkText});
    return template({title, subtitle, link: fallbackLink});
};
