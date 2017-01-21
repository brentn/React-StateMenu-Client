import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

export default React.createClass({
  propTypes: {
    item: React.PropTypes.shape({
      id: React.PropTypes.number.isRequired,
      title: React.PropTypes.string,
      tooltip: React.PropTypes.string,
      selectItem: React.PropTypes.function
    }).isRequired,
    onClick: React.PropTypes.func
  },
  getDefaultProps: function() {
    return {
      item: {
        title: 'Menu item',
        tooltip: ''
      }
    };
  },
  mixins: [PureRenderMixin],
  selectItem: function() {
    if (this.props.item.selectItem) {
      this.props.item.selectItem(this.props.item.id);
    }
  },
  render: function() {
    return <span className="tree-item menu-item" title={this.props.item.tooltip} onClick={this.selectItem}>
      {this.props.item.title}
    </span>
  }
});
