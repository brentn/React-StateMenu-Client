import thunkMiddleware from 'redux-thunk'
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import reducer from './reducer';
import InvoiceMenu from './components/InvoiceMenu';
import './index.css';

const store = createStore(
  reducer,
  applyMiddleware(thunkMiddleware)
);

ReactDOM.render(
  <Provider store={store}>
    <InvoiceMenu />
  </Provider>,
  document.getElementById('root')
);
