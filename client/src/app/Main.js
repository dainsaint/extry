import React, { Component } from 'react';

import ProcessDebug from './ProcessDebug.js';
import Section from './Section.js';

import sugar from 'sugar';

class Main extends Component {

  render() {
    sugar.extend();
    const sections = this.props.sections.map( section => <Section key={section.id} title={ section.title } endpoint={ section.endpoint } type={ section.type }/> )
    return (
      <main>
        <h1 className="ui header">
          <div className="content">
          Fishtown Local Newsletter
          <div className="sub header">
            { new Date().medium() }
          </div>
          </div>
        </h1>

        <div className="ui container">
          { sections }
        </div>
      </main>
    );
  }
}

export default Main;
