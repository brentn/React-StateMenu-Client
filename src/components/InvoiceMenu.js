import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import InvoiceMenuAdapter from './InvoiceMenuAdapter';
import Menu from './Menu';

let menuAdapter = new InvoiceMenuAdapter();

export default React.createClass({
  mixins: [PureRenderMixin],
  getInitialState: function() {
    return {
      selectedItem:null,
      items:[]
    }
  },
  render: function() {
    return <Menu tabs={menuAdapter.getTabs()}
    flags={menuAdapter.getFlags()} newItem={menuAdapter.newItem()} />
  }
});
