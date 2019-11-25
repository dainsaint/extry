import React, { Component } from 'react';

import ProcessDebug from './ProcessDebug.js';
import Section from './Section.js';

class Main extends Component {

  render() {
    return (
      <main>
        <div className="uk-container">
          <Section title="Inspections" endpoint="/odp/inspections" type="Article"/>
          <Section title="Zoning Hearings - Map" endpoint="/fna/meetings" type="Map"/>
          <Section title="Zoning Hearings - List"  endpoint="/fna/meetings" type="List"/>
          <Section title="Appeals"  endpoint="/odp/appeals" type="List"/>
        </div>
      </main>
    );
  }
}

export default Main;
