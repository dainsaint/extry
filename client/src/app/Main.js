import React, { Component } from 'react';

import ProcessDebug from './ProcessDebug.js';
import PHLCartoDebug from './PHLCartoDebug.js';

class Main extends Component {

  render() {
    return (
      <main>
        <div className="uk-container">
          <PHLCartoDebug title="Zoning Hearings" type="Map"/>
          <PHLCartoDebug title="New Ice Cream Shops" type="Map"/>
        </div>
      </main>
    );
  }
}

export default Main;
