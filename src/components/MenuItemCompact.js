import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

export default React.createClass({
  propTypes: {
    item: React.PropTypes.shape({
      id: React.PropTypes.number.isRequired,
      title: React.PropTypes.string,
      tooltip: React.PropTypes.string
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
    this.props.item.selectItem(this.props.item.id);
  },
  render: function() {
    return <span className="compact menu-item" title={this.props.item.tooltip} onClick={this.selectItem}>
      {this.props.item.title}
    </span>
  }
});
