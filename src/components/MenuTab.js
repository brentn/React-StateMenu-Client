import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import TabSection from '../containers/TabSection';
// import $ from '../../lib/jquery-3.1.0.min.js';

export default React.createClass({
  propTypes: {
    title: React.PropTypes.string.isRequired,
    sections: React.PropTypes.arrayOf(React.PropTypes.shape({
      title: React.PropTypes.string,
      items: React.PropTypes.object.isRequired
    })).isRequired,
    select: React.PropTypes.func.isRequired,
    isSelected: React.PropTypes.bool.isRequired
  },
  getDefaultProps: function() {
    return {
      selected: false
    };
  },
  mixins: [PureRenderMixin],
  select: function(event) {
    this.props.select(this.props.title);
    // $('div.menu-tab>.title.selected').removeClass('selected');
    // $(event.target).addClass('selected');
  },
  render: function() {
    return <div className="menu-tab">
      <h3 className={(this.props.isSelected?"title selected":"title")} onClick={this.select}>{this.props.title}</h3>
      <div className='menu-sections'>
        {this.props.sections.map(section =>
          <TabSection key={section.title} title={section.title} items={section.items} />
        )}
      </div>
    </div>;
  }
});
