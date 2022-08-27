import set from './set';
import { State } from '../types';
import EventBus from './event-bus';

export enum StoreEvents {
  Updated = 'updated',
}

class Store extends EventBus {
  private state: State = {} as State;

  public getState() {
    return this.state;
  }

  public set(path: string, value: unknown) {
    set(this.state, path, value);
    this.emit(StoreEvents.Updated);
  }
}

export default new Store();
