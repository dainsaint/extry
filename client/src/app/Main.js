import React, { Component } from 'react';

import ProcessDebug from './ProcessDebug.js';
import Section from './Section.js';

class Main extends Component {

  render() {
    const sections = this.props.sections.map( section => <Section key={section.id} title={ section.title } endpoint={ section.endpoint } type={ section.type }/> )
    return (
      <main>
        <div className="ui container">
          { sections }
        </div>
      </main>
    );
  }
}

export default Main;
