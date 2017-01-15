import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import MenuTree from './MenuTree';
import MenuItemCompact from './MenuItemCompact';
import $ from '../../lib/jquery-3.1.0.min.js';


export default React.createClass({
  propTypes: {
    title: React.PropTypes.string.isRequired,
    items: React.PropTypes.array.isRequired
  },
  mixins: [PureRenderMixin],
  toggle: function(event) {
    if ($(event.target).hasClass('expanded')) {
      $(event.target).removeClass('expanded');
    } else {
      $(event.target).addClass('expanded');
    }
  },
  render: function() {
    return <div className="menu-tree" >
      <div className="title" onClick={this.toggle}>{this.props.title}</div>
      <ul>
        {this.props.items.map(item =>
          (item.items?
            <li key={item.title}><MenuTree title={item.title} items={item.items}/></li>:
            <li key={item.id}><MenuItemCompact item={item} /></li>
          )
        )}
      </ul>
    </div>;
  }
});
