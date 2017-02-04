import React from 'react';
import {connect} from 'react-redux';
import {selectTab} from '../actions';
import MenuTab from './MenuTab';
import MenuFlags from './MenuFlags';
import MenuButton from './MenuButton';


const Menu = React.createClass({
  propTypes: {
    flags: React.PropTypes.arrayOf(React.PropTypes.string),
    tabNames: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
    buildTab: React.PropTypes.func.isRequired,
    newItem: React.PropTypes.shape({
      text: React.PropTypes.string.isRequired,
      callback: React.PropTypes.func.isRequired
    })
  },
  render: function() {
    return <div className="menu">
        <MenuFlags flags={this.props.flags} />
        <MenuButton newItem={this.props.newItem} />
        {this.props.tabNames.map(tabName =>
          <MenuTab key={tabName} title={tabName} sections={this.props.buildTab(tabName, this.props.items)} select={this.props.selectTab}
          isSelected={tabName === (this.props.selectedTab || (this.props.tabNames.length>0?this.props.tabNames[0]:''))} />
        )}
      </ div>
  }
});

function mapStateToProps(state) {
  return {
    items: state.menu.items,
    selectedTab: state.menu.selectedTab
  };
}

function mapDispatchToProps(dispatch) {
  return {selectTab: (name) => {
    dispatch(selectTab(name));
  }}
}

export default connect(mapStateToProps, mapDispatchToProps) (Menu);
