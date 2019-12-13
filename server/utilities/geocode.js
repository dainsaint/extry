const googleMaps = require('@google/maps');
const axios = require('axios');
const mapsApi = googleMaps.createClient({ key: process.env.GOOGLE_MAPS_API_KEY, Promise: Promise });


const streetView = axios.create({
  baseURL: "https://maps.googleapis.com/maps/api/streetview"
});

var exports = module.exports = {};

exports.geocode = async function( address )
{
  try
  {
    const result = await mapsApi.geocode({ address: address + ", Philadelphia, PA" }).asPromise();
    var address = result.json.results[0];

    return {
      address: address.formatted_address,
      lat: address.geometry.location.lat,
      lng: address.geometry.location.lng,
    }
  } catch( error ) {
    return { error };
  }

}

exports.image = async function( address )
{
  console.log( address );
  try
  {
    const imageUrl = await streetView.get('metadata', {
      params: {
        key: process.env.GOOGLE_MAPS_API_KEY,
        location: address + ", Philadelphia, PA",
        size: "600x400"
      }
    });

    // console.log( imageUrl.data );

    return imageUrl.data;

  } catch( error ) {
    console.log( error );
    return { error };
  }
}


exports.expand = async function( items )
{


  const expandLocations = async () => Promise.all( items.map( e => exports.geocode(e.location.address) ) );


  // const latLongs = await getLocations();
  try{
    const locations = await expandLocations();
    // const expandImages = async () => Promise.all( locations.map( e => exports.image( e.address ) ) );
    // const images = await expandImages();

    items.forEach( (item, i) => {
      item.location = locations[i];
      // item.image = images[i];
    });

    return items;
  } catch(error) {
    return {error};
  }

}
