import Block from '../../utils/block';
import Routes from '../../enums/routes';
import ServicePageInfo from '../../components/service-page-info/service-page-info';

import template from './not-found.hbs';

import './not-found.css';

const content = new ServicePageInfo({
  title: '404',
  subtitle: 'Такой страницы нет',
  linkText: 'Назад к чатам',
  linkUrl: Routes.Messenger,
});

class NotFound extends Block {
  constructor() {
    super({});

    Object.assign(this.children, { content });
  }

  render() {
    return this.compile(template, this.props);
  }
}

export default NotFound;
