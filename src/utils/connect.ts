import { State } from '../types';
import store, { StoreEvents } from './store';
import Block, { BaseProps } from './block';

function connect<T, P = null>(
  Component: typeof Block<T & P>,
  mapStateToProps: (state: State) => P,
) {
  return class ConnectedComponent extends Component {
    constructor(props: BaseProps<T>) {
      super({ ...props, ...mapStateToProps(store.getState()) });

      store.on(StoreEvents.Updated, () => {
        this.setProps({ ...mapStateToProps(store.getState()) });
      });
    }
  };
}

export default connect;
