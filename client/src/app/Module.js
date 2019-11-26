import React, { Component } from 'react'
import Element from './Element.js'
import ReactHtmlParser from 'react-html-parser'

class Module extends Component {



  render() {

    const elements = this.props.module.elements.map( element => <Element key={ element.id } element={element}/> );


    return (
      <article className="ui segment ">
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
