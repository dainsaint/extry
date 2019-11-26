import React, { Component } from 'react';

import ProcessDebug from './ProcessDebug.js';
import Module from './Module.js';

import sugar from 'sugar';

class Main extends Component {

  render() {
    sugar.extend();
    const modules = this.props.modules.map( module => <Module key={module.id} module={ module }/> )
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
          { modules }
        </div>
      </main>
    );
  }
}

export default Main;
