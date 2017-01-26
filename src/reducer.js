import {Map} from 'immutable';
import {SET_STATE, SELECT_ITEM, ADD_ITEM} from './actions';

function setState(state, newState) {
  return state.merge(newState);
}

function selectItem(state, id) {
  return Object.assign({}, state, {
    selectedItemId: id
  })
}

function addItem(state, item) {
  let newItems = state.items.push(item);
  return state.set('items': newItems);
}

export default function(state = Map(), action) {
  switch (action.type) {
    case SET_STATE: return setState(state, action.state);
    case SELECT_ITEM: return selectItem(state, action.itemId);
    case ADD_ITEM: return addItem(state, action.item);
    default : return state;
  }
}
