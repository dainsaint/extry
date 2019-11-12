import React, { Component } from 'react';


class ProcessDebug extends Component {
  render() {
    return (
      <div>
        <small>running application in <b>{process.env.NODE_ENV}</b> mode.</small>
      </div>
    );
  }
}

export default ProcessDebug;
