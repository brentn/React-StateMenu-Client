import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import MenuItemList from './MenuItemList';
import MenuTree from './MenuTree';
import $ from '../../lib/jquery-3.1.0.min.js';

export default React.createClass({
  mixins: [PureRenderMixin],
  select: function(event) {
    $('.menu-tab>.title.selected').removeClass('selected');
    $(event.target).addClass('selected');
  },
  render: function() {
    var classes = this.props.selected?"title selected":"title";
    var sections = [];
    this.props.items.forEach(section => {
      if (section.items.length && section.items[0].items) {
        sections.push(<MenuTree key={section.title} title={section.title} items={section.items} />);
      } else {
        sections.push(<MenuItemList key={section.title} title={section.title} items={section.items} />);
      }
    });

    return <div className="menu-tab">
      <h3 className={classes} onClick={this.select}>{this.props.title}</h3>
      <div className='menu-section'>
        {sections}
      </div>
    </div>;
  }
});
