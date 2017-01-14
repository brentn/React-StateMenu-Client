import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import InvoiceMenuAdapter from './InvoiceMenuAdapter';
import Menu from './Menu';
import MenuTab from './MenuTab';

var data = {
  userId:1,
  isFinance:true,
  accounts:['110100', '110140'],
  selectedId:null,
  invoices:[
    {id:1, status:0, userId:1, apprUserId:2, vendorId:'VENDOR', grossAmount:204.22, costCenter: '123000'},
    {id:2, status:0, userId:1, apprUserId:2, vendorId:'VENDOR', grossAmount:39.31, costCenter: '110100'},
    {id:3, status:1, userId:2, apprUserId:1, vendorId:'VENDOR', grossAmount:90, costCenter: '123000'},
    {id:5, status:1, userId:2, apprUserId:1, vendorId:'BIGBOY', grossAmount:903.12, costCenter: '110140'},
    {id:4, status:1, userId:1, apprUserId:2, vendorId:'GRATOY', grossAmount:84.23, costCenter:'110100'}
  ]
};

let menuAdapter = new InvoiceMenuAdapter(data);

export default React.createClass({
  mixins: [PureRenderMixin],
  getInitialState: function() {
    return {
      selectedItem:null,
      items:[]
    }
  },
  render: function() {
    return <Menu menuData={menuAdapter.tabNames().map(tab =>
      <MenuTab key={tab} title={tab} sections={menuAdapter.getSectionsForTab(tab)} />
    )}/>
  }
});
