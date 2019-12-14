import React, { Component } from 'react'
import Element from './Element.js'
import ReactHtmlParser from 'react-html-parser'

class Module extends Component {



  render() {

    const elements = this.props.module.elements.map( element => <Element key={ element.id } element={element}/> );
    const selected = this.props.currentModule ? this.props.currentModule.id === this.props.module.id ? "ui raised segment" : "ui segment vertical" : "ui segment vertical";

    return (
      <article className={ selected }>
        <h2 className="ui header">{ this.props.module.title }</h2>
        <p className="lead">
           { ReactHtmlParser(this.props.module.summary) }
        </p>
        <div>
          { elements }
        </div>
      </article>
    );
  }
}



export default Module;
