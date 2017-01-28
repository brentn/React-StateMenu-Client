import React from 'react';
import ReactDOM from 'react-dom';
import sinon from 'sinon';
import { shallow, mount } from 'enzyme';

import MenuItemList from '../src/components/MenuItemList';
import MenuItem from '../src/components/MenuItem';

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
    const items = [{id:1}];
    const wrapper = mount(<MenuItemList items={items}/>);
    expect(wrapper.find('li').length).toBe(1);
    expect(wrapper.find('li table.menu-item').length).toBe(1);
  });
  it('does not render a title when not provided', ()  => {
    const wrapper = shallow(<MenuItemList items={[{id:2}]} />);
    expect(wrapper.find('span.title').length).toBe(0);
  });
  it('does not render a title when empty string provided', ()  => {
    const wrapper = shallow(<MenuItemList title={''} items={[{id:3}]} />);
    expect(wrapper.find('span.title').length).toBe(0);
  });
  it('does not render any items when none provided', () => {
    const wrapper = shallow(<MenuItemList title={'Title'} items={[]} />);
    expect(wrapper.find('li').length).toBe(0);
  });
  it('passes isSelected=true to item with matching id', () => {
    const item = {id:2};
    const items = [{id:1},item,{id:3},{id:4}];
    const wrapper = shallow(<MenuItemList items={items} selectedItemId={2}/>);
    expect(wrapper.find('li').at(1).key()).toBe("2");
    expect(wrapper.find('li').at(1).containsMatchingElement(<MenuItem item={item} isSelected={true}/>)).toBe(true);
  });
  it('passes isSelected=false to items without matching id', () => {
    const item = {id:2};
    const items = [{id:1},item,{id:3},{id:4}];
    const wrapper = shallow(<MenuItemList items={items} selectedItemId={2}/>);
    expect(wrapper.find('li').at(1).key()).toBe("2");
    expect(wrapper.find('li').at(0).containsMatchingElement(<MenuItem item={{id:1}} isSelected={true}/>)).toBe(false);
    expect(wrapper.find('li').at(2).containsMatchingElement(<MenuItem item={{id:3}} isSelected={true}/>)).toBe(false);
    expect(wrapper.find('li').at(3).containsMatchingElement(<MenuItem item={{id:4}} isSelected={true}/>)).toBe(false);
  });
  it('fires callback with correct ID on click', () => {
    const items = [{id:1},{id:2},{id:3},{id:4}];
    const clickHandler = sinon.spy();
    const wrapper = shallow(<MenuItemList items={items} selectItem={clickHandler}/>);
    expect(wrapper.find('li').at(2).key()).toBe("3");
    wrapper.find('li').at(2).simulate('click');
    expect(clickHandler.calledOnce).toBe(true);
    expect(clickHandler.calledWith(3)).toBe(true);
  });
});
