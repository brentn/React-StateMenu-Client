import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import MenuTree from './MenuTree';
import TreeItem from './TreeItem';
import $ from '../../lib/jquery-3.1.0.min.js';

function buildTree(items) {
  let tree = {
    data: {},
    nodes: [],
    leaves: []
  }
  items.forEach(item => {
    if (item.parents.length > 0) {
      let parent = item.parents.slice(-1)[0];
      tree.nodes.indexOf(parent) >= 0 || tree.nodes.push(parent);
      tree.data[parent] = tree.data[parent] || [];
      tree.data[parent].push({
        parents: item.parents.slice(0,-1),
        item: item.item
      });
    } else {
      tree.leaves.push(item.item);
    }
  })
  return tree;
}

export default React.createClass({
  propTypes: {
    title: React.PropTypes.string.isRequired,
    items: React.PropTypes.arrayOf(React.PropTypes.shape({
      parents: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
      item: React.PropTypes.shape({
        id: React.PropTypes.number.isRequired
      }).isRequired
    })).isRequired
  },
  mixins: [PureRenderMixin],
  toggle: function(event) {
    if ($(event.target).hasClass('expanded')) {
      $(event.target).removeClass('expanded');
    } else {
      $(event.target).addClass('expanded');
    }
  },
  render: function() {
    let tree = buildTree(this.props.items);
    return <div className="menu-tree" >
      <div className="title" onClick={this.toggle}>{this.props.title}</div>
      <ul>
        {tree.nodes.sort().map(node =>
          <li key={node}><MenuTree title={node} items={tree.data[node]} /></li>
        )}
        {tree.leaves.sort((a, b) => {return a.id > b.id}).map(leaf =>
          <li key={leaf.id}><TreeItem item={leaf} /></li>
        )}
      </ul>
    </div>;
  }
});
