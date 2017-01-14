import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import MenuItem from './MenuItem';

export default React.createClass({
  mixins: [PureRenderMixin],
  propTypes: {
    title: React.PropTypes.string,
    items: React.PropTypes.array
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
          <li key={item.id}><MenuItem item={item} /></li>
      )}
    </ul>;
  }
});
