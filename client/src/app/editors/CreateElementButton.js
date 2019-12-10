import React, { Component } from 'react';

class CreateElementButton extends Component {


  onElementCreate = (e) => {

    this.props.onElementCreate( )
  }


  render() {
    return (

      <a className="ui button blue" onClick={ this.onElementCreate }><i className="ui icon plus circle"></i> Add Element</a>

    );
  }
}

export default CreateElementButton;
