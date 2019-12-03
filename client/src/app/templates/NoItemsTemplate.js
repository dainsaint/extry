import React, { Component } from 'react';

class NoItemsTemplate extends Component {

  render() {
    return (
      <div class="ui placeholder segment">
        <div class="ui icon header">
          <i class="minus circle icon"></i>
          No items matching criteria.
        </div>
      </div>
    )
  }
}

export default NoItemsTemplate;
