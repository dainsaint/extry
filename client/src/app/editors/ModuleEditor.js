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
      count: 1
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
      <section>

      <div className="ui segments">

        <div class="ui segment">

          <form className="ui form">

            <div className="field">
              <label>Title</label>
              <input
                className="uk-input"
                type="text"
                placeholder="Title TK"
                defaultValue={ this.props.module.title }
                onChange={ this.onTitleChange }
              />
            </div>

            <div className="field">
              <label>Summary</label>
              <textarea
                className="ui textarea"
                type="text"
                placeholder="Summary TK"
                defaultValue={ this.props.module.summary }
                onChange={ this.onSummaryChange }
              />
            </div>

          </form>

        </div>

        <div className="ui segment">
          <h4 className="ui header">Elements</h4>
          { elements }
          <div className="ui fluid buttons">
            <CreateElementButton onElementCreate={ this.onElementCreate }/>
          </div>
        </div>

      </div>

      <div className="ui divider"></div>




      <div className="ui fluid buttons">
        <DeleteModuleButton onModuleDelete={ this.onModuleDelete }/>
      </div>

    </section>
    );
  }
}

export default ModuleEditor;
