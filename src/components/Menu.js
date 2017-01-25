import React from 'react';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import reducer from '../reducer';
import MenuTab from './MenuTab';
import MenuFlags from './MenuFlags';
import MenuButton from './MenuButton';

let store = createStore(reducer);

export default React.createClass({
  propTypes: {
    flags: React.PropTypes.arrayOf(React.PropTypes.string),
    tabs: React.PropTypes.arrayOf(React.PropTypes.shape({
      title: React.PropTypes.string.isRequired,
      sections: React.PropTypes.array.isRequired
    })).isRequired,
    newItem: React.PropTypes.shape({
      text: React.PropTypes.string.isRequired,
      callback: React.PropTypes.func.isRequired
    })
  },
  mixins: [PureRenderMixin],
  render: function() {
    return <Provider store={store}>
      <div className="menu">
        <MenuFlags flags={this.props.flags} />
        <MenuButton newItem={this.props.newItem} />
        {this.props.tabs.map(tab =>
          <MenuTab key={tab.title} title={tab.title}
          selected={tab === this.props.tabs[0]} sections={tab.sections} />
        )}
      </ div>
    </ Provider>;
  }
});
