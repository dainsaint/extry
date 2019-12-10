import React, { Component } from 'react';
import ElementEditor from './ElementEditor.js';
import CreateElementButton from './CreateElementButton.js';
import DeleteModuleButton from './DeleteModuleButton.js';

class ModuleEditor extends Component {


  onTitleChange = (e) => {
    this.props.onModuleChange( this.props.module.id, {title: e.target.value} )
  }

  onSummaryChange = (e) => {
    this.props.onModuleChange( this.props.module.id, {summary: e.target.value} )
  }

  onModuleDelete = (e) => {
    this.props.onModuleDelete( this.props.module.id )
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

  onElementCreate = () => {
    var blankElement = {
      id: Math.random().toString(36).substring(7),
      endpoint: "fna/meetings",
      type: "List",
      count: 5
    };

    const elements = this.props.module.elements.add( blankElement );
    this.props.onModuleChange( this.props.module.id, { elements: elements })
  }

  onElementDelete = (id) => {
    const elements = this.props.module.elements.filter( element => element.id !== id );
    this.props.onModuleChange( this.props.module.id, { elements: elements })
  }

  render() {
    const elements = this.props.module.elements.map( element => <ElementEditor key={element.id} element={ element } onElementChange={ this.onElementChange } onElementDelete={ this.onElementDelete }/> );
    return (
      <div className="ui segment">
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

          <div className="ui divider"></div>

          <div class="fluid ui mini buttons">
            <CreateElementButton onElementCreate={ this.onElementCreate }/>
            <DeleteModuleButton onModuleDelete={ this.onModuleDelete }/>
          </div>

        </div>
      </div>
    );
  }
}

export default ModuleEditor;
