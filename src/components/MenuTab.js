import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import MenuItemList from './MenuItemList';
import MenuTree from './MenuTree';
import $ from '../../lib/jquery-3.1.0.min.js';

export default React.createClass({
  propTypes: {
    title: React.PropTypes.string.isRequired,
    sections: React.PropTypes.array.isRequired
  },
  getDefaultProps: function() {
    return {
      selected: false
    };
  }
  mixins: [PureRenderMixin],
  select: function(event) {
    $('.menu-tab>.title.selected').removeClass('selected');
    $(event.target).addClass('selected');
  },
  render: function() {
    return <div className="menu-tab">
      <h3 className={(this.props.selected?"title selected":"title")} onClick={this.select}>{this.props.title}</h3>
      <div className='menu-sections'>
        {this.props.sections.map(section =>
          (section.items.length > 0 && section.items[0].items)?
            <MenuTree key={section.title} title={section.title} items={section.items} />:
            <MenuItemList key={section.title} title={section.title} items={section.items} />
          )
        }
      </div>
    </div>;
  }
});
