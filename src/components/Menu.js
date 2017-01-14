import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import MenuTab from './MenuTab';

export default React.createClass({
  mixins: [PureRenderMixin],
  render: function() {
    var menuTabs = [];
    var isFirst = true;
    this.props.adapter.tabNames().forEach((tab) => {
      menuTabs.push(<MenuTab key={tab} title={tab} items={this.props.adapter.getSectionsForTab(tab)} selected={isFirst}/>);
      isFirst=false;
    });
    return <div className="menu">
      {menuTabs}
    </ div>;
  }
});
