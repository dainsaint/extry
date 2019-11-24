const
  express = require('express'),
  { google } = require('googleapis'),
  googleMaps = require('@google/maps'),
  axios = require('axios'),
  sugar = require('sugar');
  // { Observable, of, from } = require('rxjs'),
  // { map } = require('rxjs/operator');

sugar.extend();

const fnaCalendarId = "fishtown.org_o0nu0h9itvqbfce7c2538qij70@group.calendar.google.com",
      googleCalendarApiKey =  "AIzaSyCXvsIAI6N8ihCNyP8zNQRA8Uoly_ngx9M",
      googleMapsApiKey = "AIzaSyA0zzOuoJnfsAJ1YIfPJ7RrtXeiYbdW-ZQ";

const
  calendarApi = google.calendar({ version: "v3", auth: googleCalendarApiKey }),
  mapsApi = googleMaps.createClient({ key: googleMapsApiKey, Promise: Promise });


var app = module.exports = express();


var toExtry = function( item )
{
    var address = item.summary.split(/-(.+)/)[1].trim();
    return {
      id: item.id,
      title: item.summary,
      datetime: item.start.dateTime,
      location: {
        address: address,
        lat: 0,
        lng: 0
      },

    }
}

var geocode = async function( address )
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


app.get( "/google", async (req, res) =>{
  try{
    const result = await calendarApi.events.list({
      calendarId: fnaCalendarId,
    })

    const data = result.data.items;
    const items = data.map( toExtry );
    const expandLocations = async () => Promise.all( items.map( e => geocode(e.location.address) ) );

    // const latLongs = await getLocations();
    try{
      const locations = await expandLocations();
      items.forEach( (item, i) => item.location = locations[i] );
      res.send( items );
    } catch(error) {
      res.send( {error})
    }

    // res.send( result.data.items.map( toExtry ) );
  } catch(e) {
    res.send(e);
  }
})
