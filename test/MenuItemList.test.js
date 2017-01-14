import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';

import MenuItemList from '../src/components/MenuItemList';

describe('MenuItemList', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<MenuItemList />, div);
  });
  it('renders a list', () => {
    const wrapper = shallow(<MenuItemList />);
    expect(wrapper.find('ul').length).toBe(1);
  });
  
});
