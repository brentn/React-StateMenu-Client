import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import MenuTab from './MenuTab';

export default React.createClass({
  propTypes: {
    tabs: React.PropTypes.arrayOf(React.PropTypes.shape({
      title: React.PropTypes.string.isRequired,
      sections: React.PropTypes.array.isRequired
    })).isRequired
  },
  mixins: [PureRenderMixin],
  render: function() {
    return <div className="menu">
      {this.props.tabs.map(tab =>
        <MenuTab key={tab.title} title={tab.title} selected={tab === this.props.tabs[0]} sections={tab.sections} />
      )}
    </ div>;
  }
});
