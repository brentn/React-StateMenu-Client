import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount } from 'enzyme';

import MenuTree from '../src/components/MenuTree';
import TreeItem from '../src/components/TreeItem';

describe('MenuTree', () => {
  const SINGLE_ITEM = [{parents:[], item:{id:1}}];

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<MenuTree title={''} items={[]} />, div);
  });
  it('renders a menu-tree component', () => {
    const wrapper = shallow(<MenuTree title='' items={[]} />);
    expect(wrapper.find('div.menu-tree').length).toBe(1);
  });
  it('renders the title of this node', () => {
    const title = "Thanksgiving";
    const wrapper = shallow(<MenuTree title={title} items={[]} />);
    expect(wrapper.find('div.title').length).toBe(1);
    expect(wrapper.find('div.title').text()).toBe(title);
  });
  it('renders a list of items', () => {
    const wrapper = shallow(<MenuTree title='' items={[]} />);
    expect(wrapper.find('div.menu-tree ul').length).toBe(1);
  });
  it('renders tree-items if items.items does not exist', () => {
    const wrapper = mount(<MenuTree title='Title' items={SINGLE_ITEM} />);
    expect(wrapper.find('span.tree-item').length).toBe(1);
  });
  it('renders subtree if parents is not empty', () => {
    var items = [{parents:['parent'], item:{id:1}}];
    const wrapper = mount(<MenuTree title='abc' items={items} />);
    expect(wrapper.find('div.menu-tree ul li .menu-tree').length).toBe(1);
  });
  it('expands subtree if clicked when collapsed', () => {
    const wrapper = mount(<MenuTree title='abc' items={SINGLE_ITEM} />);
    expect(wrapper.find('div.menu-tree div.title.expanded').length).toBe(0)
    wrapper.find('div.menu-tree div.title').simulate('click');
    expect(wrapper.find('div.menu-tree div.title.expanded').length).toBe(1)
  });
  it('collapses subtree if clicked when expanded', () => {
    const wrapper = mount(<MenuTree title='a' items={SINGLE_ITEM} />);
    expect(wrapper.find('div.menu-tree div.title.expanded').length).toBe(0)
    wrapper.find('div.menu-tree div.title').simulate('click');
    expect(wrapper.find('div.menu-tree div.title.expanded').length).toBe(1)
    wrapper.find('div.menu-tree div.title').simulate('click');
    expect(wrapper.find('div.menu-tree div.title.expanded').length).toBe(0)
  });
});
