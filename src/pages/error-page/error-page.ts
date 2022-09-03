import Block from '../../utils/block';
import ServicePageInfo from '../../components/service-page-info/service-page-info';
import Routes from '../../enums/routes';

import './error-page.css';

const template = require('./error-page.hbs');

const content = new ServicePageInfo({
  title: 'Ошибка',
  subtitle: 'Что-то пошло не так',
  linkText: 'Назад к чатам',
  linkUrl: Routes.Messenger,
});

class ErrorPage extends Block {
  constructor() {
    super({});

    Object.assign(this.children, { content });
  }

  render() {
    return this.compile(template, this.props);
  }
}

export default ErrorPage;
