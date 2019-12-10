import React, { Component } from 'react';

class CreateModuleButton extends Component {


  onModuleCreate = (e) => {

    this.props.onModuleCreate( )
  }


  render() {
    return (

      <a className="ui button primary" onClick={ this.onModuleCreate }><i className="ui icon plus circle"></i> Add Module</a>

    );
  }
}

export default CreateModuleButton;
