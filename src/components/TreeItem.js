import React from 'react';

export default React.createClass({
  propTypes: {
    item: React.PropTypes.shape({
      id: React.PropTypes.number.isRequired,
      title: React.PropTypes.string,
      tooltip: React.PropTypes.string,
      flags: React.PropTypes.shape({
        private: React.PropTypes.bool,
        info: React.PropTypes.bool
      })
    }).isRequired,
    isSelected: React.PropTypes.bool
  },
  getDefaultProps: function() {
    return {
      item: {
        title: 'Menu item',
        tooltip: ''
      }
    };
  },
  render: function() {
    return <span className={"tree-item menu-item" + (this.props.isSelected?" selected":"")} title={this.props.item.tooltip}>
      {this.props.item.treeTitle}
      {(this.props.item.flags && this.props.item.flags.info?<span className='flag info' />:"")}
      {(this.props.item.flags && this.props.item.flags.private?<span className='flag private' />:"")}
    </span>
  }
});
