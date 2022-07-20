import template from './modal.hbs';

import './modal.css';

export default ({content, closeClassName, className}) => template({content, closeClassName, className});
