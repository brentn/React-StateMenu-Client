import React from 'react';
import MenuItem from './MenuItem';

export default React.createClass({
  propTypes: {
    title: React.PropTypes.string,
    items: React.PropTypes.arrayOf(React.PropTypes.shape({
      id: React.PropTypes.number.isRequired
    })),
    selectItem: React.PropTypes.func,
    selectedItemId: React.PropTypes.number
  },
  getDefaultProps: function() {
    return {
      title: '',
      items: []
    }
  },
  render: function() {
    return <ul className="menu-item-list" >
      {(this.props.title?<span className='title'>{this.props.title}</span>:"")}
      {this.props.items.map(item =>
          <li key={item.id} onClick={() => this.props.selectItem(item.id)}><MenuItem item={item} isSelected={(item.id === this.props.selectedItemId)} /></li>
      )}
    </ul>;
  }
});
