import React, { Component } from 'react';

class NoItemsTemplate extends Component {

  render() {
    return (
      <div className="ui placeholder segment">
        <div className="ui icon header">
          <i className="minus circle icon"></i>
          No matching items.
        </div>
      </div>
    )
  }
}

export default NoItemsTemplate;
