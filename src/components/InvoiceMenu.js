import React from 'react';
import {connect} from 'react-redux';
import InvoiceMenuAdapter from '../classes/InvoiceMenuAdapter';
import Invoice from '../classes/Invoice';
import Menu from './Menu';
import {fetchData} from '../actions';


let menuAdapter = new InvoiceMenuAdapter();
let invoice = new Invoice();

export const InvoiceMenu = React.createClass({
  componentDidMount: function() {
    this.props.fetchData()
  },
  render: function() {
    return <Menu tabNames={menuAdapter.getTabNames()} buildTab={menuAdapter.buildTab} flags={menuAdapter.getMenuFlags()} newItem={menuAdapter.newItem()} />
  }
});

function mapDispatchToProps(dispatch) {
  return {
    fetchData: () => dispatch(fetchData('../../data/invoices.json', invoice.makeItem))
  }

}

export default connect(null, mapDispatchToProps) (InvoiceMenu);
