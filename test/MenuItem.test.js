import React from 'react';
import ReactDOM from 'react-dom';
import sinon from 'sinon';
import { shallow } from 'enzyme';

import MenuItem from '../src/components/MenuItem';

describe('MenuItem', () => {
  let item = {id:0};
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<MenuItem item={item} />, div);
  });
  it('renders the menu item as a table', () => {
    const wrapper = shallow(<MenuItem item={item} />);
    expect(wrapper.is('table')).toBe(true);
    expect(wrapper.hasClass('menu-item')).toBe(true);
  });
  it('renders the provided item.tooltip', () => {
    const hint = "Tomorrow";
    item.tooltip = hint;
    const wrapper = shallow(<MenuItem item={item} />);
    expect(wrapper.find('.menu-item').prop('title')).toBe(hint);
  });
  it('renders the provided image', () => {
    const url = "http://test";
    item.imageUrl = url;
    const wrapper = shallow(<MenuItem item={item} />);
    expect(wrapper.find('.menu-item').find('img.image').prop('role')).toBe('presentation');
    expect(wrapper.find('.menu-item').find('img.image').prop('src')).toBe(url);
  });
  it('renders the provided item.title', () => {
    const title = "Flower";
    item.title = title;
    const wrapper = shallow(<MenuItem item={item} />);
    expect(wrapper.find('span.title').text()).toBe(title);
  });
  it('renders the provided item.subtitle', () => {
    const subtitle = "Sheetrock";
    item.subtitle = subtitle;
    const wrapper = shallow(<MenuItem item={item} />);
    expect(wrapper.find('span.subtitle').text()).toBe(subtitle);
  });
  it('fires item.selectItem on click', () => {
    const clickHandler = sinon.spy();
    item.selectItem = clickHandler;
    const wrapper = shallow(<MenuItem item={item} />);
    wrapper.find('table').simulate('click');
    expect(clickHandler.calledOnce).toBe(true);
  });
  it('is not selected by default', () => {
    const wrapper = shallow(<MenuItem item={item} />);
    expect(wrapper.find('.menu-item').hasClass('selected')).toBe(false);
  });
  it('adds selected class if id matches selectedItemId', () => {
    const wrapper = shallow(<MenuItem item={item} selectedItemId={item.id}/>);
    expect(wrapper.find('.menu-item').hasClass('selected')).toBe(true);
  });
});
