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
    // const listItems  = this.state.items.map( item => <ListTemplate key={ item.id } item={item}/> );


    return (
      <section>
        <h2>Properties With Zoning Hearings</h2>
        <MapTemplate items={ this.state.items }/>
      </section>
    );
  }
}



export default PHLCartoDebug;
