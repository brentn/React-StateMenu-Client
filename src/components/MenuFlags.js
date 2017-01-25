import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

export default React.createClass({
  propTypes: {
    flags: React.PropTypes.arrayOf(React.PropTypes.string)
  },
  mixins: [PureRenderMixin],
  render: function() {
    return (this.props.flags && this.props.flags.length>0?
      <div className='menu-flags'>
        {this.props.flags.map(flag =>
          <span key={flag} className='menu-flag' >{flag}</span>
        )}
      </div>:'')
  }
});
