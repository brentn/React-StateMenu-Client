import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import Menu from '../src/components/Menu';

describe('Menu', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Menu />, div);
  });
  it('renders a menu component', () => {
    const wrapper = shallow(<Menu menuData=[] />);
    expect(wrapper.find('div.menu').length).toBe(1);
  });
  it('opens the first tab', () => {
    const menuData = [{},{}]
    const wrapper = shallow(<Menu menuData={menuData} />);
    expect(wrapper.find('div.menu').html()).toEqual([{selected:true},{}]);
  });
});
