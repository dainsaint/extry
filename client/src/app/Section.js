import React, { Component } from 'react'

import axios from 'axios'

import ListTemplate from './templates/ListTemplate.js'
import MapTemplate from './templates/MapTemplate.js'
import ArticleTemplate from './templates/ArticleTemplate.js'



const api = axios.create({
  baseURL: "/"
});


class Section extends Component {

  constructor(props)
  {
    super(props);

    this.state = {
      items: [],
      isLoading: false
    }
  }

  fetch()
  {
    this.setState({ isLoading: true });
    api.get( this.props.endpoint || '/fna/meetings')
      .then( result => {
        console.log("get", result);
        this.setState({ items: result.data, isLoading: false })
      } );
  }

  componentDidMount()
  {
    this.fetch();
  }

  componentDidUpdate( prevProps, prevState )
  {
    if( prevProps.endpoint != this.props.endpoint )
      this.fetch();
  }



  render() {


    const templates = {
      Map: MapTemplate,
      List: ListTemplate,
      Article: ArticleTemplate
    };

    const Template = templates[ this.props.type ] || ListTemplate;

    const loader = this.state.isLoading ?
      <div className="ui active inverted dimmer">
        <div className="ui text loader">Loading...</div>
      </div>
    : null;

    return (
      <article className="ui segment ">
        <h2 className="ui header">{ this.props.title }</h2>
        <div>
        <Template items={ this.state.items }/>
        { loader }
        </div>
      </article>
    );
  }
}



export default Section;
