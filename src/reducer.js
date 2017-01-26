import {Map} from 'immutable';
import {SET_STATE, SELECT_TAB, SELECT_ITEM, ADD_ITEM} from './actions';

function setState(state, newState) {
  return state.merge(newState);
}

function selectTab(state, name) {
  return Object.assign({}, state, {
    selectedTab: name
  });
}

function selectItem(state, id) {
  return Object.assign({}, state, {
    selectedItemId: id
  });
}

function addItem(state, item) {
  return Object.assign({}, state, {
    items: state.items.slice().push(item)
  });
}

export default function(state = Map(), action) {
  switch (action.type) {
    case SET_STATE: return setState(state, action.state);
    case SELECT_TAB: return selectTab(state, action.name);
    case SELECT_ITEM: return selectItem(state, action.itemId);
    case ADD_ITEM: return addItem(state, action.item);
    default : return state;
  }
}
