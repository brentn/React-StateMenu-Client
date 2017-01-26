import React from 'react';
import {connect} from 'react-redux';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {selectTab} from '../actions';
import MenuTab from './MenuTab';
import MenuFlags from './MenuFlags';
import MenuButton from './MenuButton';


const Menu = React.createClass({
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
    return <div className="menu">
        <MenuFlags flags={this.props.flags} />
        <MenuButton newItem={this.props.newItem} />
        {this.props.tabs.map(tab =>
          <MenuTab key={tab.title} title={tab.title} sections={tab.sections} select={this.props.selectTab}
          isSelected={tab.title === (this.props.selectedTab || (this.props.tabs.length>0?this.props.tabs[0].title:''))} />
        )}
      </ div>
  }
});

function mapStateToProps(state) {
  return {selectedTab: state.selectedTab};
}

function mapDispatchToProps(dispatch) {
  return {selectTab: (name) => {
    dispatch(selectTab(name));
  }}
}

export default connect(mapStateToProps, mapDispatchToProps) (Menu);
