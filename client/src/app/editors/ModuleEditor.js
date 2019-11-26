import React, { Component } from 'react';
import ElementEditor from './ElementEditor.js';

class ModuleEditor extends Component {


  onTitleChange = (e) => {
    this.props.onModuleChange( this.props.module.id, {title: e.target.value} )
  }

  onSummaryChange = (e) => {
    this.props.onModuleChange( this.props.module.id, {summary: e.target.value} )
  }


  onElementChange = ( id, update ) => {
    const elements = this.props.module.elements.map( element => {

      if( id === element.id )
        return { ...element, ...update };
      else
        return element;
    } );

    this.props.onModuleChange( this.props.module.id, { elements: elements })
  }

  render() {
    const elements = this.props.module.elements.map( element => <ElementEditor key={element.id} element={ element } onElementChange={ this.onElementChange }/> );
    return (
      <div>
        <div className="title">
          <i className="dropdown icon"></i>
          { this.props.module.title }
        </div>

        <div className="content">
          <form className="ui form">

            <div className="field">
              <label>Title</label>
              <input
                className="uk-input"
                type="text"
                placeholder="Title"
                defaultValue={ this.props.module.title }
                onChange={ this.onTitleChange }
              />
            </div>

            <div className="field">
              <label>Summary</label>
              <textarea
                className="ui textarea"
                type="text"
                placeholder="Summary"
                defaultValue={ this.props.module.summary }
                onChange={ this.onSummaryChange }
              />
            </div>

          </form>

          { elements }

        </div>
      </div>
    );
  }
}

export default ModuleEditor;
