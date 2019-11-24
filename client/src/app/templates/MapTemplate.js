import React, { Component } from 'react'
// import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api'


class MapTemplate extends Component {

  render() {
    const markers = this.props.items.map( item => <Marker name={item.location.address} position={item.location}/> );
    return (
      <div style={{height: "300px;"}}>
      <LoadScript
          id="script-loader"
          googleMapsApiKey = { process.env.REACT_APP_GOOGLE_MAPS_API_KEY }
        >
        <GoogleMap
          zoom={14}
          center={{lat: 39.971882, lng: -75.128901}}
          mapContainerStyle={{width:"100%", height:"300px"}}
        >
          { markers }
        </GoogleMap>
      </LoadScript>
      </div>
    )
  }
}

export default MapTemplate

//
// export default GoogleApiWrapper({
//   apiKey: "AIzaSyA0zzOuoJnfsAJ1YIfPJ7RrtXeiYbdW-ZQ"
// })(MapTemplate);
