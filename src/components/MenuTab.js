import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import MenuItemList from './MenuItemList';
import MenuTree from './MenuTree';
import $ from '../../lib/jquery-3.1.0.min.js';

function buildSections(sectionData) {
  let sectionList = [];
  sectionData.forEach(section => {
    if (section.items.length > 0 && section.items[0].items) {
      sectionList.push(<MenuTree key={section.title} title={section.title} items={section.items} />);
    } else {
      sectionList.push(<MenuItemList key={section.title} title={section.title} items={section.items} />);
    }
  });
  return sectionList;
}

export default React.createClass({
  mixins: [PureRenderMixin],
  select: function(event) {
    $('.menu-tab>.title.selected').removeClass('selected');
    $(event.target).addClass('selected');
  },
  render: function() {
    return <div className="menu-tab">
      <h3 className={(this.props.selected?"title selected":"title")} onClick={this.select}>{this.props.title}</h3>
      <div className='menu-sections'>
        {buildSections(this.props.sections)}
      </div>
    </div>;
  }
});
