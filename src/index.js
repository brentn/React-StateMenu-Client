import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import reducer from './reducer';
import InvoiceMenu from './components/InvoiceMenu';
import './index.css';

let store = createStore(reducer);

ReactDOM.render(
  <Provider store={store}>
    <InvoiceMenu />
  </Provider>,
  document.getElementById('root')
);
