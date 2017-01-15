import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';

import MenuTree from '../src/components/MenuTab';

describe('MenuTab', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<MenuTab title='' sections=[] />, div);
  });
  it('renders a menu-tab item', () => {
    const wrapper = shallow(<MenuTab title='' sections=[] />);
    expect(wrapper.find('div.menu-tab').length).toBe(1);
  });
  it('displays the title in an h3 tag', () => {
    const title = "Lava";
    const wrapper = shallow(<MenuTab title={title} sections=[] />);
    expect(wrapper.find('div.menu-tab>h3.title').text()).toBe(title);
  });
  it('adds selected class to selected title', () => {
    const wrapper = shallow(<MenuTab title={title} selected=true sections=[] />);
    expect(wrapper.find('div.menu-tab>h3.title.selected').length).toBe(1);
  });
  it('shows a menu-sections div', () => {
    const wrapper = shallow(<MenuTab title='' sections=[] />);
    expect(wrapper.find('div.menu-tab>div.menu-sections').length).toBe(1);
  });
  it('includes a MenuItemList when section items dont have subitems',() => {
    const sections = [{items:[]}];
    const wrapper = shallow(<MenuTab title='' sections={sections} />);
    expect(wrapper.find('div.menu-sections').containsMatchingElement('MenuItemList')).toBe(true);
    expect(wrapper.find('div.menu-sections').containsMatchingElement('MenuTree')).toBe(false);
  });
  it('includes a MenuTree when section items have subitems', () => {
    const sections = [{items:[{items:[]}]}];
    const wrapper = shallow(<MenuTab title='' sections={sections} />);
    expect(wrapper.find('div.menu-sections').containsMatchingElement('MenuTree')).toBe(true);
    expect(wrapper.find('div.menu-sections').containsMatchingElement('MenuItemList')).toBe(false);
  });
  it('selects tab when clicked', () => {
    const wrapper = shallow(<MenuTab title='' sections={sections} />);
    expect(wrapper.find('h3.title.selected').length).toBe(0);
    wrapper.find('h3.title').simulate('click');
    expect(wrapper.find('h3.title.selected').length).toBe(1);
  });
  it('deselects tab when clicked', () => {
    const wrapper = shallow(<MenuTab title='' selected:true sections={sections} />);
    expect(wrapper.find('h3.title.selected').length).toBe(1);
    wrapper.find('h3.title').simulate('click');
    expect(wrapper.find('h3.title.selected').length).toBe(0);
  });
});