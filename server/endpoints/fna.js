const
  express = require('express'),
  { google } = require('googleapis'),

  axios = require('axios'),
  sugar = require('sugar'),

  geocode = require('../utilities/geocode.js');

sugar.extend();

const fnaCalendarId = "fishtown.org_o0nu0h9itvqbfce7c2538qij70@group.calendar.google.com",
      googleCalendarApiKey =  "AIzaSyCXvsIAI6N8ihCNyP8zNQRA8Uoly_ngx9M";


const calendarApi = google.calendar({ version: "v3", auth: googleCalendarApiKey });


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



app.get( "/fna/meetings", async (req, res) =>{
  try{
    const result = await calendarApi.events.list({
      calendarId: fnaCalendarId,
    })

    const data = result.data.items;
    const items = data.map( toExtry ).filter( item => new Date(item.datetime).isFuture() ).sortBy( item => new Date(item.datetime) );

    const expanded = await geocode.expand( items );
    res.send( expanded );

    // res.send( result.data.items.map( toExtry ) );
  } catch(e) {
    res.send(e);
  }
})
