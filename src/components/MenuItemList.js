import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import MenuItem from './MenuItem';

export default React.createClass({
  mixins: [PureRenderMixin],
  render: function() {
    var listTitle = "";
    var listItems = [];
    if (this.props.title) {
      listTitle = <span className='title'>{this.props.title}</span>
    }
    this.props.items.forEach(item => {
      listItems.push(<li key={item.id}>
                      <MenuItem
                        id={item.id}
                        selectItem={item.selectItem}
                        tooltip={item.tooltip}
                        imageUrl={item.imageUrl}
                        title={item.title}
                        selected={item.selected}
                        subtitle={item.subtitle} />
                      </li>);
    });

    return <ul className="menu-item-list" >
      {listTitle}
      {listItems}
    </ul>;
  }
});
