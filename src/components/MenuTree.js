import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import MenuTree from './MenuTree';
import MenuItemCompact from './MenuItemCompact';
import $ from '../../lib/jquery-3.1.0.min.js';


export default React.createClass({
  mixins: [PureRenderMixin],
  toggle: function(event) {
    if ($(event.target).hasClass('expanded')) {
      $(event.target).removeClass('expanded')
    } else {
      $(event.target).addClass('expanded');
    }
  },
  render: function() {
    var menuItems = [];
    this.props.items.forEach(item => {
      if (item.items) {
        menuItems.push(<li key={item.title}><MenuTree title={item.title} items={item.items}/></li>);
      } else {
        menuItems.push(<li key={item.id}><MenuItemCompact item={item} /></li>);
      }
    });
    return <div className="menu-tree" >
      <div className="title" onClick={this.toggle}>{this.props.title}</div>
      <ul>
        {menuItems}
      </ul>
    </div>;
  }
});
