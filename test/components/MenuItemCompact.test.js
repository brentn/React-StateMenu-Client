import React from 'react';
import ReactDOM from 'react-dom';
import sinon from 'sinon';
import { shallow } from 'enzyme';

import MenuItemCompact from '../src/components/MenuItemCompact';

describe('MenuItemCompact', () => {
  let item = {id:3};
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<MenuItemCompact item={item} />, div);
  });
  it('renders the a compact menu item', () => {
    const wrapper = shallow(<MenuItemCompact item={item} />);
    expect(wrapper.is('span')).toBe(true);
    expect(wrapper.hasClass('compact')).toBe(true);
    expect(wrapper.hasClass('menu-item')).toBe(true);
  });
  it('renders the provided item.title', () => {
    const title = "Jacob";
    item.title = title;
    const wrapper = shallow(<MenuItemCompact item={item} />);
    expect(wrapper.find('span').text()).toBe(title);
  });
  it('renders the provided item.tooltip', () => {
    const hint = "Watherhole";
    item.tooltip = hint;
    const wrapper = shallow(<MenuItemCompact item={item} />);
    expect(wrapper.find('span').prop('title')).toBe(hint);
  });
  it('fires item.selectItem on click', () => {
    const clickHandler = sinon.spy();
    item.selectItem = clickHandler;
    const wrapper = shallow(<MenuItemCompact item={item} />);
    wrapper.find('span').simulate('click');
    expect(clickHandler.calledOnce).toBe(true);
  });
});
