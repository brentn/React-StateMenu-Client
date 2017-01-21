import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount } from 'enzyme';
import Menu from '../src/components/Menu';
import MenuTab from '../src/components/MenuTab';

describe('Menu', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Menu tabs={[]}/>, div);
  });
  it('renders a menu component', () => {
    const wrapper = shallow(<Menu tabs={[]} />);
    expect(wrapper.find('div.menu').length).toBe(1);
  });
  it('opens the first tab', () => {
    const tabs = [{title:'a', sections:[]},{title:'b', sections:[]}];
    const wrapper = mount(<Menu tabs={tabs} />);
    expect(wrapper.find('h3').length).toBe(2);
    expect(wrapper.find('h3.title').first().props().className).toBe('title selected');
  });
});
