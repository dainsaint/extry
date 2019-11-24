import React, { Component } from 'react';

import axios from 'axios';



import ListTemplate from './templates/ListTemplate.js';
import MapTemplate from './templates/MapTemplate.js';


class PHLCartoDebug extends Component {

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

    api.get( '/google' )
      .then( result => this.setState({ items: result.data }) );

  }


  render() {


    const templates = {
      Map: MapTemplate,
      List: ListTemplate
    };

    const Template = templates[ this.props.type ] || MapTemplate;

    return (
      <article className="uk-article uk-overflow-hidden">
        <h1 className="uk-article-title">{ this.props.title }</h1>
        <Template items={ this.state.items }/>
      </article>
    );
  }
}



export default PHLCartoDebug;
