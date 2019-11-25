import React, { Component } from 'react';
import sugar from 'sugar';

import Sidebar from './Sidebar.js';
import Header from './Header.js';
import Main from './Main.js';


class Builder extends Component {

  constructor(props)
  {
    super(props);

    this.state = {
      sections: [
        {
          id: "ERUIO",
          title: "Community Zoning Meetings",
          endpoint: "/fna/meetings",
          type: "List"
        },
        {
          id: "ERUIO",
          title: "What properties are being discussed?",
          endpoint: "/fna/meetings",
          type: "Map"
        },
        {
          id: "IHFGD",
          title: "Upcoming Inspections",
          endpoint: "/odp/inspections",
          type: "Article"
        }
      ]
    }
  }

  componentDidMount()
  {
    sugar.extend()
  }


  onSectionChange = ( id, update ) => {
    this.setState( state => {
      const sections = state.sections.map( section => {
        if( section.id == id )
          return { ...section, ...update };
        else
          return section;
      })
      console.log( sections );
      return { ...state, sections };
    });
  }


  render() {

    return (
      <div className="app">
        <Sidebar sections={ this.state.sections } onSectionChange={ this.onSectionChange }/>
        <Main sections={ this.state.sections }/>
      </div>
    );
  }
}



export default Builder;
