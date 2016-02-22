import AppDispatcher from '../AppDispatcher';
import {ActionTypes} from '../Constants';
import {EventEmitter} from 'events';

let _links = [];

class LinkStore extends EventEmitter{
  constructor(props) {
    super(props);

    AppDispatcher.register(payload => {
      switch(payload.actionType) {
        case ActionTypes.RECEIVE_LINKS:
          console.log('3. In Store');
          _links = payload.links;
          this.emit("change");
          break;
        default:
          console.log('default action');
          break;
      }
    });
  }

  getAll() {
    return _links;
  }
}

export default new LinkStore();
