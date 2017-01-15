import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';

import MenuItemList from '../src/components/MenuItemList';

describe('MenuItemList', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<MenuItemList />, div);
  });
  it('renders a list with menu-item-list class', () => {
    const wrapper = shallow(<MenuItemList />);
    expect(wrapper.find('ul.menu-item-list').length).toBe(1);
  });
  it('adds a list title when provided', () => {
    const title = "Lower End";
    const wrapper = shallow(<MenuItemList title={title}/>);
    expect(wrapper.find('span.title').text()).toBe(title);
  });
  it('renders MenuItems as list items (when provided)', () => {
    const items = [{}];
    const wrapper = shallow(<MenuItemList items={items}/>);
    expect(wrapper.find('li').length).toBe(1);
    expect(wrapper.find('li').containsMatchingElement('MenuItem')).toBe(true);
  });
  it('does not render a title when not provided', ()  => {
    const wrapper = shallow(<MenuItemList items={[{}]} />);
    expect(wrapper.find('span.title')).not.toExist();
  });
  it('does not render a title when empty string provided', ()  => {
    const wrapper = shallow(<MenuItemList title={''} items={[{}]} />);
    expect(wrapper.find('span.title').length).toBe(0);
  });
  it('does not render any items when none provided', () => {
    const wrapper = shallow(<MenuItemList title={'Title'} items={[{}]} />);
    expect(wrapper.find('li').length).toBe(0);
  });
});
