import React, { Component } from 'react';
import Header from './Header.js';
import ModuleEditor from './editors/ModuleEditor.js';

import SidebarNewsletterEditor from './editors/SidebarNewsletterEditor.js';
import SidebarModuleEditor from './editors/SidebarModuleEditor.js';



const Mode = {
  Newsletter: "Newsletter",
  Module: "Module"
}

class Sidebar extends Component {

  constructor( props )
  {
    super(props);

    this.state= {
      view: Mode.Newsletter
    }
  }

  onModuleSelect = ( id ) =>
  {
    this.props.onModuleSelect(id);

    this.setState( state => ({
      view: Mode.Module,
    }))

  }

  onHomeSelect = () => {

    this.props.onModuleSelect( null );

    this.setState( state => ({
      view: Mode.Newsletter,

    }))

  }

  onModuleDelete = (id) => {
    this.onHomeSelect();
    this.props.onModuleDelete(id);
  }

  hash( items )
  {
    return items.map( x => JSON.stringify(x) ).join(',');
  }


  componentDidUpdate( prevProps, prevState )
  {
    if( this.hash( prevProps.modules ) !== this.hash(this.props.modules) )
    {
      if( this.state.view === Mode.Module )
        this.onModuleSelect( this.props.currentModule.id );
      else
        this.setState( state => ({force: Math.random()}) );
    }
  }

  render() {

    const view = this.state.view === Mode.Newsletter ?
      <SidebarNewsletterEditor
        modules = { this.props.modules }
        onSortEnd = {this.props.onSortEnd}
        onModuleSelect = {this.onModuleSelect}
        onModuleCreate = {this.props.onModuleCreate}
      />
      :
      <SidebarModuleEditor
        module={ this.props.currentModule }
        onModuleChange={ this.props.onModuleChange }
        onModuleDelete={ this.onModuleDelete }
        />;

    return (
      <aside>
        <Header
          module={ this.props.currentModule }
          onHomeSelect={ this.onHomeSelect }
        />

        { view }

        <div className="ui divider"></div>
        <a href="#" className="ui link" onClick={ this.props.onExportJson }><i className="ui icon download"></i> Export to JSON</a>

      </aside>
    );
  }
}

export default Sidebar;
