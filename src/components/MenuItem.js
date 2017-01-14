import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

export default React.createClass({
  mixins: [PureRenderMixin],
  selectItem: function() {
    this.props.selectItem(this.props.id);
  },
  render: function() {
    return <table className={"menu-item" + (this.props.selected?" selected":"")} title={this.props.tooltip} onClick={this.selectItem}>
      <tbody>
        <tr>
          <td><img className="image" src={this.props.imageUrl} role='presentation' /></td>
          <td className='details'>
            <span className='title'>{this.props.title}</span><br/>
            <span className='subtitle'>{this.props.subtitle}</span>
          </td>
        </tr>
      </tbody>
    </table>;
  }
});
