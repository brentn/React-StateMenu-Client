import React from 'react';
import InvoiceMenuAdapter from './InvoiceMenuAdapter';
import Menu from './Menu';

let menuAdapter = new InvoiceMenuAdapter();

export default React.createClass({
  getInitialState: function() {
    return {
      selectedItem:null,
      items:[]
    }
  },
  render: function() {
    return <Menu tabs={menuAdapter.getTabs()} flags={menuAdapter.getFlags()} newItem={menuAdapter.newItem()} />
  }
});
