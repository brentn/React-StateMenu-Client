import React from 'react';
import {connect} from 'react-redux';
import InvoiceMenuAdapter from './InvoiceMenuAdapter';
import Menu from './Menu';
import {fetchData} from '../actions';


let menuAdapter = new InvoiceMenuAdapter();

export const InvoiceMenu = React.createClass({
  componentDidMount: function() {
    this.props.fetchData()
  },
  render: function() {
    return <Menu tabNames={menuAdapter.getTabNames()} buildTab={menuAdapter.buildTab} flags={menuAdapter.getFlags()} newItem={menuAdapter.newItem()} />
  }
});

function mapDispatchToProps(dispatch) {
  return {
    fetchData: () => dispatch(fetchData('../../data/invoices.json', menuAdapter.makeItem))
  }

}

export default connect(null, mapDispatchToProps) (InvoiceMenu);
