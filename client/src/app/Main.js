import React, { Component } from 'react';

import ProcessDebug from './ProcessDebug.js';
import Section from './Section.js';

class Main extends Component {

  render() {
    return (
      <main>
        <div className="uk-container">
          <Section title="Zoning Hearings - Article" type="Article"/>
          <Section title="Zoning Hearings - Map" type="Map"/>
          <Section title="Zoning Hearings - List" type="List"/>
        </div>
      </main>
    );
  }
}

export default Main;
