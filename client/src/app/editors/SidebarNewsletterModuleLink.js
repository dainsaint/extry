import React, { Component } from 'react';

import ModuleEditor from './ModuleEditor.js';

class SidebarNewsletterModuleLink extends Component {

  onModuleSelect = (e) => {
    this.props.onModuleSelect( this.props.module.id )
  }

  render() {
    const module = this.props.module;

    return (
      <a onClick={ this.onModuleSelect } style={{ cursor: "pointer"}}>
        { module.title }
      </a>
    );
  }
}

export default SidebarNewsletterModuleLink;
