import React, { Component } from 'react';

import ProcessDebug from './ProcessDebug.js';
import PHLCartoDebug from './PHLCartoDebug.js';

class Main extends Component {

  render() {
    return (
      <main className="uk-container">
        <ProcessDebug/>
        <PHLCartoDebug/>
      </main>
    );
  }
}

export default Main;
