import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';

import TabSection from '../src/components/TabSection';
import MenuTree from '../src/components/MenuTree';
import MenuItemList from '../src/components/MenuItemList';

describe('MenuTab', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<TabSection items={{treeItems:[], listItems:[]}} />, div);
  });
  it('returns a tab-section div', () => {
    var wrapper = shallow(<TabSection items={{}} />);
    expect(wrapper.find('.tab-section').length).toBe(1);
  });
  it('doesnt include any items by default', () => {
    var wrapper = shallow(<TabSection items={{}} />);
    expect(wrapper.find('div.tab-section').containsAnyMatchingElements([<MenuTree/>,<MenuItemList/>])).toBe(false);
  });
  it('includes a MenuItemList if listItems is provided', () => {
    var wrapper = shallow(<TabSection items={{listItems:[]}} />);
    expect(wrapper.find('div.tab-section').containsMatchingElement(<MenuItemList/>)).toBe(true);
  });
  it('includes a MenuTree if treeItems is provided', () => {
    var wrapper = shallow(<TabSection items={{treeItems:[]}} />);
    expect(wrapper.find('div.tab-section').containsMatchingElement(<MenuTree />)).toBe(true);
  });
  it('includes first a MenuTree and then a MenuItemList if treeItems and listItems provided', () => {
    var wrapper = shallow(<TabSection items={{listItems:[], treeItems:[]}} />);
    expect(wrapper.find('div.tab-section').childAt(0).containsMatchingElement(<MenuTree/>)).toBe(true);
    expect(wrapper.find('div.tab-section').childAt(1).containsMatchingElement(<MenuItemList/>)).toBe(true);
  });
});
