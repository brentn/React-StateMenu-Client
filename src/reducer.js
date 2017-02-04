import {Map, List} from 'immutable';
import {combineReducers} from 'redux';
import {SELECT_TAB, TOGGLE_TREE, SELECT_ITEM, FETCH_DATA} from './actions';

function selectTab(state, name) {
  return Object.assign({}, state, {
    selectedTab: name
  });
}

function toggleTree(state, treeId) {
  return  (state.includes(treeId)?
          state.filterNot(id => (id === treeId)):
          state.push(treeId));
}

function selectItem(state, id) {
  return Object.assign({}, state, {
    selectedItemId: id
  });
}

function fetchData(state, action) {
  if (action.status) {
    if (action.status === 'success') {
      return Object.assign({}, state, {
        isFetching: false,
        items: action.data,
        updatedAt: action.receivedAt
      });
    } else { // failure
      return Object.assign({}, state, {
        isFetching: false
      });
    }
  } else { // request
    return Object.assign({}, state, {
      isFetching: true
    });
  }
}

function menu(state = Map(), action) {
  switch (action.type) {
    case SELECT_TAB: return selectTab(state, action.name);
    case SELECT_ITEM: return selectItem(state, action.itemId);
    case FETCH_DATA: return fetchData(state, action);
    default : return state;
  }
}

function expandedTrees(state = List(), action) {
  switch (action.type) {
    case TOGGLE_TREE: return toggleTree(state, action.treeId);
    default: return state;
  }
}

const Reducers = combineReducers({
  menu,
  expandedTrees
})

export default Reducers;
