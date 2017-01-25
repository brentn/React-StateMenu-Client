import React from 'react';
import ReactDOM from 'react-dom';
import sinon from 'sinon';
import { shallow } from 'enzyme';

import TreeItem from '../src/components/TreeItem';

describe('TreeItem', () => {
  let item = {id:3};
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<TreeItem item={item} />, div);
  });
  it('renders the a tree-item', () => {
    const wrapper = shallow(<TreeItem item={item} />);
    expect(wrapper.is('span')).toBe(true);
    expect(wrapper.hasClass('tree-item')).toBe(true);
    expect(wrapper.hasClass('menu-item')).toBe(true);
  });
  it('renders the provided item.title', () => {
    const title = "Jacob";
    item.title = title;
    const wrapper = shallow(<TreeItem item={item} />);
    expect(wrapper.find('span').text()).toBe(title);
  });
  it('renders the provided item.tooltip', () => {
    const hint = "Watherhole";
    item.tooltip = hint;
    const wrapper = shallow(<TreeItem item={item} />);
    expect(wrapper.find('span').prop('title')).toBe(hint);
  });
  it('fires item.selectItem on click', () => {
    const clickHandler = sinon.spy();
    item.selectItem = clickHandler;
    const wrapper = shallow(<TreeItem item={item} />);
    wrapper.find('span').simulate('click');
    expect(clickHandler.calledOnce).toBe(true);
  });
  it('is not selected by default', () => {
    const wrapper = shallow(<TreeItem item={item} />);
    expect(wrapper.find('.tree-item').hasClass('selected')).toBe(false);
  });
  it('adds selected class if id matches selectedItemId', () => {
    const wrapper = shallow(<TreeItem item={item} selectedItemId={item.id}/>);
    expect(wrapper.find('.tree-item').hasClass('selected')).toBe(true);
  })
});
