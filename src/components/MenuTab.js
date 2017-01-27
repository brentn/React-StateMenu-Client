import React from 'react';
import TabSection from '../containers/TabSection';

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
  select: function(event) {
    this.props.select(this.props.title);
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
