import fetch from 'isomorphic-fetch';

export const SET_STATE = 'SET_STATE';
export const SET_ITEMS = 'SET_ITEMS';
export const SELECT_TAB = 'SELECT_TAB';
export const TOGGLE_TREE = 'TOGGLE_TREE';
export const SELECT_ITEM = 'SELECT_ITEM';
export const FETCH_DATA = 'FETCH_DATA';

var data = require('../data/invoices.json');

export function setItems(items) {
  return {type: SET_ITEMS, items: items};
}

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
  return { type: FETCH_DATA, };
}

export function receiveData(json, makeItem) {
  return {
    type: FETCH_DATA,
    status: 'success',
    data: json.data.map(child => makeItem(child)),
    receivedAt: Date.now()
  }
}

export function dataError(e) {
  console.log('error', e)
  return {
    type: FETCH_DATA,
    status: 'error',
  }
}

export function fetchData(url, makeItem) {
  return function(dispatch) {
    dispatch(requestData())
    return fetch(url)
      .then(response => {
        try {
          if (response.status===200) {
//            return dispatch(receiveData(response.json(), makeItem));
            return dispatch(receiveData({data:data}, makeItem))
          } else {
            dispatch(dataError());
          }
        } catch(ex) {
          dispatch(dataError(ex));
        }
      })
      .then(items => dispatch(setItems(items.data)));
  }
}
