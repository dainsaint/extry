const googleMaps = require('@google/maps');
const mapsApi = googleMaps.createClient({ key: process.env.GOOGLE_MAPS_API_KEY, Promise: Promise });

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


exports.expand = async function( items )
{


  const expandLocations = async () => Promise.all( items.map( e => exports.geocode(e.location.address) ) );

  // const latLongs = await getLocations();
  try{
    const locations = await expandLocations();
    items.forEach( (item, i) => { item.location = locations[i] });
    return items;
  } catch(error) {
    return {error};
  }

}
