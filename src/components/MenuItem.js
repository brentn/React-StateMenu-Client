import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

export default React.createClass({
  mixins: [PureRenderMixin],
  selectItem: function() {
    this.props.item.selectItem(this.props.item.id);
  },
  render: function() {
    return <table className={"menu-item"} title={this.props.item.tooltip} onClick={this.selectItem}>
      <tbody>
        <tr>
          <td><img className="image" src={this.props.item.imageUrl} role='presentation' /></td>
          <td className='details'>
            <span className='title'>{this.props.item.title}</span><br/>
            <span className='subtitle'>{this.props.item.subtitle}</span>
          </td>
        </tr>
      </tbody>
    </table>;
  }
});
