import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

function openFirstTab(menuData) {
  if (menuData.length > 0) {
    menuData[0] = React.cloneElement(menuData[0], {selected:true});
  }
  return menuData;
}

export default React.createClass({
  mixins: [PureRenderMixin],
  render: function() {
    return <div className="menu">
      {openFirstTab(this.props.menuData)}
    </ div>;
  }
});
