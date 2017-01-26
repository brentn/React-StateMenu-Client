import React from 'react';
import {connect} from 'react-redux';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import MenuItemList from '../components/MenuItemList';
import MenuTree from '../components/MenuTree';
import {selectItem} from '../actions';

const TabSection = React.createClass({
  propTypes: {
    title: React.PropTypes.string,
    items: React.PropTypes.shape({
      treeItems: React.PropTypes.array,
      listItems: React.PropTypes.array
    }).isRequired
  },
  getDefaultProps: function() {
    return {
      title: ''
    }
  },
  mixins: [PureRenderMixin],
  render: function() {
    let items = this.props.items;
    return <div className="tab-section">
      {(items.treeItems?<MenuTree title={this.props.title} items={items.treeItems} selectItem={this.props.selectItem} selectedItemId={this.props.selectedItemId} />:"")}
      {(items.listItems?<MenuItemList title={this.props.title} items={items.listItems} selectItem={this.props.selectItem} selectedItemId={this.props.selectedItemId}/>:"")}
    </div>;
  }
});

function mapStateToProps(state) {
  return {selectedItemId: state.selectedItemId};
}

function mapDispatchToProps(dispatch) {
  return {selectItem: (id) => {
    dispatch(selectItem(id));
  }}
}

export default connect(mapStateToProps, mapDispatchToProps) (TabSection);
