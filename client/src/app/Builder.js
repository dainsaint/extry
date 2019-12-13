import React, { Component } from 'react';
import sugar from 'sugar';
import { save } from 'save-file';

import Sidebar from './Sidebar.js';
import Main from './Main.js';
import DefaultModules from './data/default.json';


class Builder extends Component {

  constructor(props)
  {
    super(props);
    this.state = { ...DefaultModules };
  }

  componentDidMount()
  {
    sugar.extend()
  }


  onModuleChange = ( id, update ) => {
    this.setState( state => {
      const modules = state.modules.map( module => {

        if( module.id === id )
          return { ...module, ...update };
        else
          return module;
      })

      return { ...state, modules };
    });
  }

  onModuleDelete = (id) => {
    this.setState( state => {
      const modules = state.modules.filter( module => module.id !== id );
      return { ...state, modules };
    })
  }

  onModuleCreate = () => {

    var blankModule = {
      id: Math.random().toString(36).substring(7),
      title: "Title TK",
      summary: "Summary TK",
      elements: []
    };



    this.setState( state => {

      const modules = state.modules.add( blankModule );

      return { ...state, modules }
    });

    this.onModuleChange( blankModule.id, {} )
  }

  onExportJson = async () => {
    console.log( save );
    await save( JSON.stringify( this.state, null, 4 ), 'newsletter.json' );
  }




  render() {

    return (
      <div className="app">
        <Sidebar modules={ this.state.modules } onModuleChange={ this.onModuleChange } onModuleCreate={ this.onModuleCreate } onModuleDelete={ this.onModuleDelete } onExportJson={ this.onExportJson }/>
        <Main modules={ this.state.modules }/>
      </div>
    );
  }
}



export default Builder;
