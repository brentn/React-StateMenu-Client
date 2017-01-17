import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount } from 'enzyme';

import MenuTree from '../src/components/MenuTree';
import MenuItemCompact from '../src/components/MenuItemCompact';

describe('MenuTree', () => {
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
  it('renders compact-menu-items if items.items does not exist', () => {
    const wrapper = mount(<MenuTree title='Title' items={[{id:1, title:''}]} />);
    expect(wrapper.find('span.compact').length).toBe(1);
  });
  it('renders subtree if items.items exists', () => {
    const wrapper = mount(<MenuTree title='toital' items={[{title:'',items:[]}]} />);
    expect(wrapper.find('div.menu-tree ul li').childAt(0).hasClass('menu-tree')).toBe(true);
  });
  it('expands subtree if clicked when collapsed', () => {
    const wrapper = mount(<MenuTree title='abc' items={[{id:1}]} />);
    expect(wrapper.find('div.menu-tree div.title.expanded').length).toBe(0)
    wrapper.find('div.menu-tree div.title').simulate('click');
    expect(wrapper.find('div.menu-tree div.title.expanded').length).toBe(1)
  });
  it('collapses subtree if clicked when expanded', () => {
    const wrapper = mount(<MenuTree title='a' items={[{id:1}]} />);
    expect(wrapper.find('div.menu-tree div.title.expanded').length).toBe(0)
    wrapper.find('div.menu-tree div.title').simulate('click');
    expect(wrapper.find('div.menu-tree div.title.expanded').length).toBe(1)
    wrapper.find('div.menu-tree div.title').simulate('click');
    expect(wrapper.find('div.menu-tree div.title.expanded').length).toBe(0)
  });
});
