import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount } from 'enzyme';
import Menu from '../src/components/Menu';
import MenuTab from '../src/components/MenuTab';

describe('Menu', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Menu menuData={[]}/>, div);
  });
  it('renders a menu component', () => {
    const wrapper = shallow(<Menu menuData={[]} />);
    expect(wrapper.find('div.menu').length).toBe(1);
  });
  it('opens the first tab', () => {
    const menuData = [<MenuTab key='1' title='a' sections={[]} />, <MenuTab key='2' title='a' sections={[]} />];
    const wrapper = mount(<Menu menuData={menuData} />);
    expect(wrapper.find('h3').length).toBe(2);
    expect(wrapper.find('h3.title').first().props().className).toBe('title selected');
  });
});
