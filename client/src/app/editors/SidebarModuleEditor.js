import React, { Component } from 'react';

import ModuleEditor from './ModuleEditor.js';

class SidebarModuleEditor extends Component {

  render() {
    const module = this.props.module;

    return (
      <section>
        <ModuleEditor
          module={module}
          onModuleChange={ this.props.onModuleChange }
          onModuleDelete={ this.props.onModuleDelete }
        />
      </section>
    );
  }
}

export default SidebarModuleEditor;
