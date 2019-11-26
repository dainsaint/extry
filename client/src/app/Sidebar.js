import React, { Component } from 'react';
import Header from './Header.js';
import ModuleEditor from './editors/ModuleEditor.js';

class Sidebar extends Component {


  render() {
    const editors = this.props.modules.map( module => <ModuleEditor key={module.id} module={module} onModuleChange={ this.props.onModuleChange }/> )
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
