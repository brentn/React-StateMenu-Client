import React from 'react';
import ReactDOM from 'react-dom';
import {List} from 'immutable';
import sinon from 'sinon';
import { shallow, mount } from 'enzyme';

import MenuTree from '../src/components/MenuTree';
import TreeItem from '../src/components/TreeItem';

describe('MenuTree', () => {
  const SINGLE_ITEM = [{parents:[], item:{id:1}}];
  const EX_TREE = List();
  const CALLBACK = function(){};

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<MenuTree title={''} items={[]} nodeCallback={CALLBACK} itemCallback={CALLBACK} expandedTrees={EX_TREE} />, div);
  });
  it('renders a menu-tree component', () => {
    const wrapper = shallow(<MenuTree title='' items={[]} nodeCallback={CALLBACK} itemCallback={CALLBACK} expandedTrees={EX_TREE} />);
    expect(wrapper.find('div.menu-tree').length).toBe(1);
  });
  it('renders the title of this node', () => {
    const title = "Thanksgiving";
    const wrapper = shallow(<MenuTree title={title} items={[]} nodeCallback={CALLBACK} itemCallback={CALLBACK} expandedTrees={EX_TREE} />);
    expect(wrapper.find('div.title').length).toBe(1);
    expect(wrapper.find('div.title').text()).toBe(title);
  });
  it('renders a list of items', () => {
    const wrapper = shallow(<MenuTree title='' items={[]} nodeCallback={CALLBACK} itemCallback={CALLBACK} expandedTrees={EX_TREE} />);
    expect(wrapper.find('div.menu-tree ul').length).toBe(1);
  });
  it('produces a leaf for each item', () => {
    const ITEMS = [{parents:[], item:{id:1}},{parents:["C"], item:{id:2}},{parents:["C","Chow"], item:{id:3}},{parents:["Exit"], item:{id:4}}]
    const wrapper = mount(<MenuTree title='' items={ITEMS} nodeCallback={CALLBACK} itemCallback={CALLBACK} expandedTrees={EX_TREE} />);
    expect(wrapper.find('li .tree-item').length).toBe(4);
  });
  it('assigns a unique id to each node', () => {
    const ITEMS = [{parents:["A"], item:{id:1}},{parents:["B"], item:{id:2}},{parents:["C"], item:{id:3}},{parents:["D"], item:{id:4}}]
    var ids = [];
    const clickHandler = function(id) {expect(ids.indexOf(id)).toBe(-1); ids.push(id);};
    const wrapper = mount(<MenuTree title='' items={ITEMS} nodeCallback={clickHandler} itemCallback={CALLBACK} expandedTrees={EX_TREE} />);
    wrapper.find('.title').forEach(node => {
      node.simulate('click');
    })
    expect(ids.length).toBe(5);
  });
  it('includes parents in order as nodes', () => {
    const ITEMS = [{parents:["Dcx"], item:{id:1}},{parents:["Rcx"], item:{id:7}},{parents:["Lcx"], item:{id:0}},{parents:["Acx"], item:{id:5}}]
    const wrapper = mount(<MenuTree title='root' items={ITEMS} nodeCallback={CALLBACK} itemCallback={CALLBACK} expandedTrees={EX_TREE} />);
    let lastItem=null;
    wrapper.find('.menu-tree').at(0).find('ul').find('.title').forEach(node => {
      expect((lastItem===null || lastItem<=node.text())).toBe(true);
      lastItem = node.text();
    })
  });
  it('combines items with the same lineage into a single tree', () => {
    const ITEMS = [{parents:["Bottom", "Mid","Top"], item:{id:1}},{parents:["Right", "Mid","Top"], item:{id:7}},{parents:["Left", "Mid","Top"], item:{id:0}},{parents:["Center", "Mid","Top"], item:{id:5}}]
    const wrapper = mount(<MenuTree title='root' items={ITEMS} nodeCallback={CALLBACK} itemCallback={CALLBACK} expandedTrees={EX_TREE} />);
    let node = wrapper.find('.menu-tree').first();
    expect(node.find('.menu-tree').length).toBe(7);
    expect(node.childAt(0).text()).toBe('root');
    node = node.childAt(1).find('.menu-tree').first();
    expect(node.find('.menu-tree').length).toBe(6);
    expect(node.childAt(0).text()).toBe('Top');
    node = node.childAt(1).find('.menu-tree').first();
    expect(node.find('.menu-tree').length).toBe(5);
    expect(node.childAt(0).text()).toBe('Mid');
    expect(node.childAt(1).find('.menu-tree').length).toBe(4);
    expect(node.childAt(1).find('.menu-tree').at(0).childAt(0).text()).toBe('Bottom');
    expect(node.childAt(1).find('.menu-tree').at(1).childAt(0).text()).toBe('Center');
    expect(node.childAt(1).find('.menu-tree').at(2).childAt(0).text()).toBe('Left');
    expect(node.childAt(1).find('.menu-tree').at(3).childAt(0).text()).toBe('Right');
  });
  it('renders a collapsed tree by default', () => {
    const ITEMS = [{parents:["Bottom", "Mid","Top"], item:{id:1}},{parents:["Right", "Mid","Top"], item:{id:7}},{parents:["Left", "Mid","Top"], item:{id:0}},{parents:["Center", "Mid","Top"], item:{id:5}}]
    const wrapper = mount(<MenuTree title='root' items={ITEMS} nodeCallback={CALLBACK} itemCallback={CALLBACK} expandedTrees={EX_TREE} />);
    expect(wrapper.find('.title.expanded').length).toBe(0);
  });
  it('renders an expanded tree if node is listed in expandedTrees', () => {
    const expTree = List.of(33);
    const ITEMS = [{parents:["Bottom", "Mid","Top"], item:{id:1}},{parents:["Right", "Mid","Top"], item:{id:7}},{parents:["Left", "Mid","Top"], item:{id:0}},{parents:["Center", "Mid","Top"], item:{id:5}}]
    const wrapper = mount(<MenuTree title='root' items={ITEMS} nodeCallback={CALLBACK} itemCallback={CALLBACK} expandedTrees={expTree} />);
    expect(wrapper.find('.title.expanded').length).toBe(1);
  });
  it('sorts leaves by id', () => {
    const ITEMS = [{parents:[], item:{id:2, treeTitle:"2"}},{parents:[], item:{id:5, treeTitle:"5"}},{parents:[], item:{id:12, treeTitle:"12"}},{parents:[], item:{id:6, treeTitle:"6"}}];
    const wrapper = mount(<MenuTree title='root' items={ITEMS} nodeCallback={CALLBACK} itemCallback={CALLBACK} expandedTrees={EX_TREE} />);
    expect(wrapper.find('.tree-item').at(0).text()).toBe('2');
    expect(wrapper.find('.tree-item').at(1).text()).toBe('5');
    expect(wrapper.find('.tree-item').at(2).text()).toBe('6');
    expect(wrapper.find('.tree-item').at(3).text()).toBe('12');
  });
  it('fires item.selectItem on click', () => {
    const clickHandler = sinon.spy();
    const wrapper = mount(<MenuTree title='' items={SINGLE_ITEM} nodeCallback={CALLBACK} itemCallback={clickHandler} expandedTrees={EX_TREE} />);
    wrapper.find('.tree-item').simulate('click');
    expect(clickHandler.calledOnce).toBe(true);
  });
});
