import React, { Component } from 'react';

class DeleteModuleButton extends Component {


  onModuleDelete = (e) => {
    this.props.onModuleDelete( )
  }


  render() {
    return (

      <a className="ui button red" onClick={ this.onModuleDelete }><i className="ui icon trash "></i> Delete Module</a>

    );
  }
}

export default DeleteModuleButton;
