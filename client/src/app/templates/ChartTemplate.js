import React, { Component } from 'react'
import {Map, Marker, GoogleApiWrapper} from 'google-maps-react';
// import { GoogleMap, LoadScript, Marker } from '@react-g÷oogle-maps/api'


class MapTemplate extends Component {

  render() {
    const markers = this.props.items.map( item => <Marker key={item.id} name={item.location.address} position={item.location}/> );
    return (
      <div style={{position:"relative", height: "300px"}}>

        <Map
          google={this.props.google}
          zoom={14}
          initialCenter={{lat: 39.971882, lng: -75.128901}}
          style={{width:"100%", height:"300px"}}
        >
          { markers }
        </Map>

      </div>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
})(MapTemplate);
