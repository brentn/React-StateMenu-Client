export const SET_STATE = 'SET_STATE';
export const SELECT_TAB = 'SELECT_TAB';
export const SELECT_ITEM = 'SELECT_ITEM';
export const ADD_ITEM = 'ADD_ITEM';

export function selectItem(id) {
  return {type: SELECT_ITEM, itemId: id};
}

export function selectTab(tabName) {
  return {type: SELECT_TAB, name: tabName};
}

export function addItem(item) {
  return {type: ADD_ITEM, item: item};
}
