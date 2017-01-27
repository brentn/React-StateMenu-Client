import React from 'react';
import MenuTree from './MenuTree';
import TreeItem from './TreeItem';

let lastId = 0;
function newId() {
  return lastId++;
}

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
    })).isRequired,
    expandedTrees: React.PropTypes.object.isRequired,
    callback: React.PropTypes.func.isRequired,
    selectItem: React.PropTypes.func.isRequired,
    selectedItemId: React.PropTypes.number
  },
  componentWillMount: function() {
    this.id = newId()
  },
  toggle: function() {
    this.props.callback(this.id);
  },
  render: function() {
    let tree = buildTree(this.props.items);
    let classes = "title" + (this.props.expandedTrees.includes(this.id)?" expanded":"");
    return <div className="menu-tree" >
      <div className={classes} onClick={this.toggle}>{this.props.title}</div>
      <ul>
        {tree.nodes.sort().map(node =>
          <li key={node}>
            <MenuTree title={node}
                      items={tree.data[node]}
                      selectItem={this.props.selectItem}
                      expandedTrees={this.props.expandedTrees}
                      callback={this.props.callback}
                      selectedItemId={this.props.selectedItemId} />
          </li>
        )}
        {tree.leaves.sort((a, b) => {return a.id > b.id}).map(leaf =>
          <li key={leaf.id} onClick={() => this.props.selectItem(leaf.id)}><TreeItem item={leaf} isSelected={leaf.id === this.props.selectedItemId} /></li>
        )}
      </ul>
    </div>;
  }
});
