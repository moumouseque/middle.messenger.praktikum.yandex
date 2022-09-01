import Block from '../../utils/block';
import Link from '../link';

import './service-page-info.css';

const template = require('./service-page-info.hbs');

type Props = {
  title: string;
  subtitle: string;
  linkText: string;
  linkUrl: string;
  link?: Block;
};

class ServicePageInfo extends Block<Props> {
  constructor(props: Props) {
    const { linkText, linkUrl, link } = props;
    const serviceLink = link || new Link({ url: linkUrl, text: linkText });
    super({ ...props, link: serviceLink });
  }

  render() {
    return this.compile(template, this.props);
  }
}

export default ServicePageInfo;
