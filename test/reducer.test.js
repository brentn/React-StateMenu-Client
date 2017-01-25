import {List, Map, fromJS} from 'immutable';
import {expect} from 'chai';

import reducer from '../src/reducer';

describe('reducer', () => {
  it('handles SET_STATE', () => {
    const initialState = Map();
    const action = {
      type: 'SET_STATE',
      state: Map({
        items: List.of(Map({id:3}),Map({id:4}),Map({id:5}),Map({id:6})),
        selectedItemId: null
      })
    };
    const nextState = reducer(initialState, action);
    expect(nextState).to.equal(fromJS({
      items: [{id:3},{id:4},{id:5},{id:6}],
      selectedItemId: null
    }));
  });
  it('handles SET_STATE without initial state', () => {
    const action = {
      type: 'SET_STATE',
      state: Map({
        items: [{id:3},{id:7},{id:9}],
        selectedItemId:2
      })
    };
    const nextState = reducer(undefined, action);
    console.log(nextState)
    console.log(fromJS({
      items: [{id:3},{id:4},{id:5},{id:6}],
      selectedItemId: null
    }))

    expect(nextState).to.equal(fromJS({
      items: [{id:3},{id:7},{id:9}],
      selectedItemId:2
    }));
  });
});
