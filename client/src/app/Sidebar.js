import React, { Component } from 'react';
import Header from './Header.js';
import SectionEditor from './editors/SectionEditor.js';

class Sidebar extends Component {


  render() {
    const editors = this.props.sections.map( section => <SectionEditor key={section.id} section={section} onSectionChange={ this.props.onSectionChange }/> )
    return (
      <aside>
        <Header/>
        <div className="ui accordion">
          { editors }
        </div>
      </aside>
    );
  }
}

export default Sidebar;
