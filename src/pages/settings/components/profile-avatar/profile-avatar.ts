import Block from '../../../../utils/block';
import connect from '../../../../utils/connect';
import { State } from '../../../../types';

import './profile-avatar.css';

const template = require('./profile-avatar.hbs');

const RESOURCES_PATH = 'https://ya-praktikum.tech/api/v2/resources';

type Props = {
  avatar?: string;
};

class ProfileAvatar extends Block<Props> {
  render() {
    return this.compile(template, this.props);
  }
}

const mapStateToProps = (state: State) => ({
  avatar: state?.user?.data?.avatar ? `${RESOURCES_PATH}${state?.user?.data?.avatar}` : '',
});

export default connect<Props, ReturnType<typeof mapStateToProps>>(ProfileAvatar, mapStateToProps);
