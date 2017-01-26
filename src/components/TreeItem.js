import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

export default React.createClass({
  propTypes: {
    item: React.PropTypes.shape({
      id: React.PropTypes.number.isRequired,
      title: React.PropTypes.string,
      tooltip: React.PropTypes.string,
      flags: React.PropTypes.arrayOf(
        React.PropTypes.string
      )
    }).isRequired,
    isSelected: React.PropTypes.bool.isRequired
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
    return <span className={"tree-item menu-item" + (this.props.isSelected?" selected":"")} title={this.props.item.tooltip}>
      {this.props.item.title}
      {(this.props.item.flags.includes('moreinfo')?<span className='flag moreinfo'/>:"")}
      {(this.props.item.flags.includes('private')?<span className='flag private' />:"")}
    </span>
  }
});
