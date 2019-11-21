import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';


class MapTemplate extends Component {

  render() {
    const markers = this.props.items.map( item => <Marker name={item.location.address} position={item.location}/> );
    return (
      <Map google={this.props.google} zoom={16} initialCenter={ {lat: 39.971882, lng: -75.128901} }>
        { markers }
      </Map>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyA0zzOuoJnfsAJ1YIfPJ7RrtXeiYbdW-ZQ"
})(MapTemplate);
