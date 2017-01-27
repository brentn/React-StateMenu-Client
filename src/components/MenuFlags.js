import React from 'react';

export default React.createClass({
  propTypes: {
    flags: React.PropTypes.arrayOf(React.PropTypes.string)
  },
  render: function() {
    return (this.props.flags && this.props.flags.length>0?
      <div className='menu-flags'>
        {this.props.flags.map(flag =>
          <span key={flag} className='menu-flag' >{flag}</span>
        )}
      </div>:'')
  }
});
