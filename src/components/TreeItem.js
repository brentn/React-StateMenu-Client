import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

export default React.createClass({
  propTypes: {
    item: React.PropTypes.shape({
      id: React.PropTypes.number.isRequired,
      title: React.PropTypes.string,
      tooltip: React.PropTypes.string,
    }).isRequired,
    selectedItemId: React.PropTypes.number
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
  render: function() {
    let selected = (this.props.item.id === this.props.selectedItemId?" selected":"");
    return <span className={"tree-item menu-item" + selected} title={this.props.item.tooltip}>
      {this.props.item.title}
    </span>
  }
});
