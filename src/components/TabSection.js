import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import MenuItemList from './MenuItemList';
import MenuTree from './MenuTree';

export default React.createClass({
  propTypes: {
    title: React.PropTypes.string,
    items: React.PropTypes.shape({
      treeItems: React.PropTypes.array,
      listItems: React.PropTypes.array
    }).isRequired
  },
  getDefaultProps: function() {
    return {
      title: ''
    }
  },
  mixins: [PureRenderMixin],
  render: function() {
    let items = this.props.items;
    return <div className="tab-section">
      {(items.treeItems?<MenuTree title={this.props.title} items={items.treeItems} />:"")}
      {(items.listItems?<MenuItemList title={this.props.title} items={items.listItems} />:"")}
    </div>;
  }
});
