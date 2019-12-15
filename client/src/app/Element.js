import React, { Component } from 'react'

import axios from 'axios'


import ListTemplate from './templates/ListTemplate.js'
import CompactListTemplate from './templates/CompactListTemplate.js'
import MapTemplate from './templates/MapTemplate.js'
import ArticleTemplate from './templates/ArticleTemplate.js'
import ChartTemplate from './templates/ChartTemplate.js'
import PermitReviewTemplate from './templates/permitreview/PermitReviewTemplate.js'



const api = axios.create({
  baseURL: "/"
});


class Element extends Component {

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
    console.log( 'FETCH' );
    this.setState({ isLoading: true });
    api.get( this.props.element.endpoint || '/fna/meetings')
      .then( result => {
        // console.log("get", result.data);
        this.setState({ items: result.data, isLoading: false })
      } );
  }

  componentDidMount()
  {
    this.fetch();


  }

  componentDidUpdate( prevProps, prevState )
  {

    if( prevProps.element.endpoint !== this.props.element.endpoint )
      this.fetch();
  }



  render() {


    const templates = {
      Map: MapTemplate,
      List: ListTemplate,
      CompactList: CompactListTemplate,
      Article: ArticleTemplate,
      PermitReview: PermitReviewTemplate,
      Chart: ChartTemplate
    };

    const Template = this.props.element.endpoint === "/odp/permits/count" ?
      ChartTemplate :
      templates[ this.props.element.type ] || ListTemplate;



    const loader = this.state.isLoading ?
      <div className="ui active inverted dimmer">
        <div className="ui text loader">Loading...</div>
      </div>
      : null

    return (
      <div className="ui segment vertical">
        <Template items={ this.state.items } count={ this.props.element.count }/>
        { loader }
      </div>
    );
  }
}



export default Element;
