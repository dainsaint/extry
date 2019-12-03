import React, { Component } from 'react';
import sugar from 'sugar';

import Sidebar from './Sidebar.js';
import Main from './Main.js';


class Builder extends Component {

  constructor(props)
  {
    super(props);

    this.state = {
      modules: [
        {
          id: "ERUIO",
          title: "Community Zoning Meetings",
          summary: 'Want to get involved? All zoning meetings in Fishtown take place at the Fishtown Rec Center, <a href="https://maps.google.com/?q=1202+E+Montgomery+Ave&entry=gmail&source=g">1202 E Montgomery Ave</a>.',
          elements: [
            {
              id: 'NLMSA',
              endpoint: "/odp/appeals",
              type: "List",
              count: 1
            },
            {
              id: 'ADNML',
              endpoint: "/fna/meetings",
              type: "CompactList",
              count: 2
            }
          ]
        },

        {
          id: "ADAJO",
          title: "Appeals",

          elements: [
            {
              id: 'ADMLS',
              endpoint: "/odp/appeals",
              type: "Map",
              count: 20
            }
          ]
        }
      ]
    }
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


  render() {

    return (
      <div className="app">
        <Sidebar modules={ this.state.modules } onModuleChange={ this.onModuleChange }/>
        <Main modules={ this.state.modules }/>
      </div>
    );
  }
}



export default Builder;
