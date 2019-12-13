import React, { Component } from 'react';
import Header from './Header.js';
import ModuleEditor from './editors/ModuleEditor.js';
import CreateModuleButton from './editors/CreateModuleButton.js';

class Sidebar extends Component {


  render() {
    const editors = this.props.modules.map( module => <ModuleEditor key={module.id} module={module} onModuleChange={ this.props.onModuleChange } onModuleDelete={ this.props.onModuleDelete }/> )
    return (
      <aside>
        <Header/>
        <div className="ui accordion">
          { editors }
        </div>
        <div className="ui divider"></div>
        <div className="ui fluid buttons">
          <CreateModuleButton onModuleCreate={ this.props.onModuleCreate }/>
        </div>

        <div className="ui divider"></div>
        <a href="#" className="ui link" onClick={ this.props.onExportJson }><i className="ui icon download"></i> Export to JSON</a>

      </aside>
    );
  }
}

export default Sidebar;
