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
  it('renders the a menu-item tree-item', () => {
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
  it('does not render any flags by default', () => {
    const wrapper = shallow(<TreeItem item={item} />);
    expect(wrapper.find('.flag').length).toBe(0);
  });
  it('does not render any flags if flag values are false', () => {
    let item = {id:5, flags:{info:false, private:false}};
    const wrapper = shallow(<TreeItem item={item} />);
    expect(wrapper.find('.flag').length).toBe(0);
  });
  it('Renders an info flag if flag.info is true', () => {
    let item = {id:4, flags:{info:true}}
    const wrapper = shallow(<TreeItem item={item} />);
    expect(wrapper.find('.flag.info').length).toBe(1);
  });
  it('Renders a private flag if flag.private is true', () => {
    let item = {id:4, flags:{private:true}}
    const wrapper = shallow(<TreeItem item={item} />);
    expect(wrapper.find('.flag.private').length).toBe(1);
  });
  it('is not selected by default', () => {
    const wrapper = shallow(<TreeItem item={item} />);
    expect(wrapper.find('.tree-item').hasClass('selected')).toBe(false);
  });
  it('is not selected if isSelected is false', () => {
    const wrapper = shallow(<TreeItem item={item} isSelected={false}/>);
    expect(wrapper.find('.tree-item').hasClass('selected')).toBe(false);
  });
  it('adds selected class if isSelected', () => {
    const wrapper = shallow(<TreeItem item={item} isSelected={true}/>);
    expect(wrapper.find('.tree-item').hasClass('selected')).toBe(true);
  });
});
