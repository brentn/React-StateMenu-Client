import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import MenuItem from './MenuItem';

export default React.createClass({
  mixins: [PureRenderMixin],
  render: function() {
    var listItems = [];
    this.props.items.forEach(item => {
      listItems.push(<li key={item.id}><MenuItem item={item} /></li>);
    });
    return <ul className="menu-item-list" >
      {(this.props.title?<span className='title'>{this.props.title}</span>:"")}
      {listItems}
    </ul>;
  }
});
