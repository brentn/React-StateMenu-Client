import React from 'react';

export default React.createClass({
  propTypes: {
    newItem: React.PropTypes.shape({
      text: React.PropTypes.string.isRequired,
      callback: React.PropTypes.func.isRequired
    })
  },
  render: function() {
    return (this.props.newItem?
      <input type='button' className='new-item-button' value={this.props.newItem.text} onClick={this.props.newItem.callback}/>:'')
    }
});
