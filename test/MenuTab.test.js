import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount, render } from 'enzyme';

import MenuTab from '../src/components/MenuTab';
import MenuTree from '../src/components/MenuTree';
import MenuItemList from '../src/components/MenuItemList';

describe('MenuTab', () => {
  let DEFAULT_SECTIONS = [{title:'', items:{}}];
  let CALLBACK = function() {};
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<MenuTab title='' sections={DEFAULT_SECTIONS} select={CALLBACK} isSelected={false}/>, div);
  });
  it('renders a menu-tab item', () => {
    const wrapper = shallow(<MenuTab title='' sections={DEFAULT_SECTIONS} />);
    expect(wrapper.find('div.menu-tab').length).toBe(1);
  });
  it('displays the title in an h3 tag', () => {
    const title = "Lava";
    const wrapper = shallow(<MenuTab title={title} sections={DEFAULT_SECTIONS} />);
    expect(wrapper.find('div.menu-tab h3.title').text()).toBe(title);
  });
  it('adds selected class to selected title', () => {
    const wrapper = shallow(<MenuTab title={'abc'} selected={true} sections={DEFAULT_SECTIONS} />);
    expect(wrapper.find('div.menu-tab h3.title.selected').length).toBe(1);
  });
  it('shows a menu-sections div', () => {
    const wrapper = shallow(<MenuTab title='a' sections={DEFAULT_SECTIONS} />);
    expect(wrapper.find('div.menu-tab div.menu-sections').length).toBe(1);
  });
  it('selects tab when clicked', () => {
    const sections = [{title:'a', items:{itemList:[]}}];
    const wrapper = mount(<MenuTab title='c' sections={sections} />);
    expect(wrapper.find('h3.title.selected').length).toBe(0);
    wrapper.find('h3.title').simulate('click');
    expect(wrapper.find('h3.title.selected').length).toBe(1);
  });
  it('deselects first tab when another tab is clicked', () => {
    const wrapper = mount(<div><MenuTab title='c' sections={[]} /><MenuTab title='d' sections={[]}/></div>);
    wrapper.find('h3').first().simulate('click');
    expect(wrapper.find('h3').first().hasClass('selected')).toBe(true);
    expect(wrapper.find('h3').last().hasClass('selected')).toBe(false);
    wrapper.find('h3').last().simulate('click');
    //expect(wrapper.find('h3').first().hasClass('selected')).toBe(false);
    expect(wrapper.find('h3').last().hasClass('selected')).toBe(true);
  });
});
