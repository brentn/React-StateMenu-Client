export const SET_STATE = 'SET_STATE';
export const SELECT_TAB = 'SELECT_TAB';
export const TOGGLE_TREE = 'TOGGLE_TREE';
export const SELECT_ITEM = 'SELECT_ITEM';
export const FETCH_DATA = 'FETCH_DATA';

export function selectTab(tabName) {
  return {type: SELECT_TAB, name: tabName};
}

export function toggleTree(id) {
    return {type: TOGGLE_TREE, treeId: id};
}

export function selectItem(id) {
  return {type: SELECT_ITEM, itemId: id};
}

export function requestData() {
  return {type: FETCH_DATA};
}

export function receiveData(json) {
  return {
    type: FETCH_DATA,
    status: 'success',
    data: json.data.children.map(child => child.data),
    receivedAt: Date.now()
  }
}

export function dataError(e) {
  return {
    type: FETCH_DATA,
    status: 'error',
  }
}

export function fetchData() {
  return function(dispatch) {
    dispatch(requestData())
    return fetch(URL)
      .then(response => response.json())
      .then(json => dispatch(receiveData(json)))
  }
}
