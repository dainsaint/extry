import React, { Component } from 'react';
import { GoogleMap, Marker } from "react-google-maps"

import axios from 'axios';
import sugar from 'sugar';


import ODPListTemplate from './templates/ODPListTemplate.js';


class PHLCartoDebug extends Component {

  constructor(props)
  {
    super(props);
    sugar.extend();
    this.state = {
      data: [],
      count: "0"
    }
  }

  componentDidMount()
  {
    var api = axios.create({
      baseURL: "https://phl.carto.com/api/v2/"
    });



    api.get( '/sql',{
      params:{
        q: "SELECT * FROM li_case_inspections ORDER BY inspectioncompleted DESC LIMIT 10 "
      }
    })
      .then( response => this.setState({ data: response.data.rows }) );

    api.get( '/sql', {
      params:{
        q: "SELECT COUNT(ownername) FROM li_case_inspections WHERE inspectionstatus = 'Failed'"
      }
    })
    .then ( response => this.setState( {count : response.data.rows[0].count }))
  }



  render() {
    const listItems = this.state.data.map( data => <ODPListTemplate data={data}/> );

    const googleMapsAPIKey = "AIzaSyCXvsIAI6N8ihCNyP8zNQRA8Uoly_ngx9M";

    return (
      <div>
        <h2>Most Recent Case Inspections</h2>
        <pre>{ this.state.count } Failed</pre>
        <div id="map"></div>
        <ul className="uk-list uk-list-divider">
            {listItems}
        </ul>

      </div>
    );
  }
}



export default PHLCartoDebug;
