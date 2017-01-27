import React from 'react';

export default React.createClass({
  propTypes: {
    item: React.PropTypes.shape({
      id: React.PropTypes.number.isRequired,
      title: React.PropTypes.string,
      subtitle: React.PropTypes.string,
      imageUrl: React.PropTypes.string,
      tooltip: React.PropTypes.string,
    }).isRequired,
    isSelected: React.PropTypes.bool.isRequired
  },
  render: function() {
    return <table className={"menu-item" + (this.props.isSelected?" selected":"")} title={this.props.item.tooltip} >
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
