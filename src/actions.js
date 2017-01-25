export const SET_STATE = 'SET_STATE';
export const SELECT_ITEM = 'SELECT_ITEM';
export const ADD_ITEM = 'ADD_ITEM';

export function selectItem(id) {
  return {type: SELECT_ITEM, itemId: id};
}
