import Block from '../../../../utils/block';

import './settings-item.css';

const template = require('./settings-item.hbs');

type Props = {
  title: string;
  value: string;
};

class SettingsItem extends Block<Props> {
  render() {
    return this.compile(template, this.props);
  }
}

export default SettingsItem;
