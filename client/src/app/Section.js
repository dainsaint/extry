import React, { Component } from 'react'

import axios from 'axios'

import ListTemplate from './templates/ListTemplate.js'
import MapTemplate from './templates/MapTemplate.js'
import ArticleTemplate from './templates/ArticleTemplate.js'


class Section extends Component {

  constructor(props)
  {
    super(props);

    this.state = {
      items: [],
      count: "0"
    }
  }

  componentDidMount()
  {
    var api = axios.create({
      baseURL: "/"
    });

    api.get( this.props.endpoint || '/fna/meetings')
      .then( result => this.setState({ items: result.data }) );

  }


  render() {


    const templates = {
      Map: MapTemplate,
      List: ListTemplate,
      Article: ArticleTemplate
    };

    const Template = templates[ this.props.type ] || ListTemplate;

    return (
      <article className="uk-card uk-card-default uk-card-body uk-article">
        <h2 className="uk-article-title">{ this.props.title }</h2>
        <Template items={ this.state.items }/>
      </article>
    );
  }
}



export default Section;
