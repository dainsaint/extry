const
  express = require('express'),
  { google } = require('googleapis'),

  axios = require('axios'),
  sugar = require('sugar'),
  Case = require('case'),

  geocode = require('../utilities/geocode.js'),
  odpapi = require('./odp/odpapi.js');

sugar.extend();


const fnaCalendarId = "fishtown.org_o0nu0h9itvqbfce7c2538qij70@group.calendar.google.com";
const calendarApi = google.calendar({ version: "v3", auth: process.env.GOOGLE_CALENDAR_API_KEY });


var app = module.exports = express();


var toExtry = function( item )
{
    var address = item.summary.split(/-(.+)/)[1].trim();
    return {
      id: item.id,
      title: item.summary,
      description: item.description,
      date:{
        name: "Meeting Date",
        datetime: item.start.dateTime,
      },

      location: {
        address: address,
        lat: 0,
        lng: 0
      },
      action: {
        url: item.htmlLink,
        name: "Set Reminder"
      },
      meeting: "Fishtown Rec Center, 1202 E Montgomery Ave"

    }
}

async function getAppealName( address )
{
  var addressQuery = `SELECT ownername FROM li_appeals WHERE zip SIMILAR TO '(19125|19122|19123|19106)%' AND address SIMILAR TO '${ Case.upper(address.split(',')[0]) }%' LIMIT 1`

  const result = await odpapi.query( addressQuery );
  return result.map( row => row );
}


app.get( "/fna/meetings", async (req, res) =>{

  try{
    const result = await calendarApi.events.list({
      calendarId: fnaCalendarId,
    })

    const data = result.data.items;
    const items = data.map( toExtry ).filter( item => new Date(item.date.datetime).isFuture() ).sortBy( item => new Date(item.date.datetime) );

    const expanded = await geocode.expand( items );


    const expandNames = async () => Promise.all( expanded.map( e => getAppealName(e.location.address) ) );

    const names = await expandNames();
    const list = names.flatten().map( x => x.ownername );
    const named = expanded.map( (item, i) => {
      var people = list[i] ? [{
        name: Case.title( list[i] ),
        title: "Owner"
      }] : null;

      return {...item, people};
    });

    res.send( named );

    // res.send( result.data.items.map( toExtry ) );
  } catch(e) {
    res.send(e);
  }
})


app.get( "/fna/meetings/raw", async (req, res) =>{
  try{
    const result = await calendarApi.events.list({
      calendarId: fnaCalendarId,
    })

    const data = result.data.items;
    res.send( data );

    // res.send( result.data.items.map( toExtry ) );
  } catch(e) {
    res.send(e);
  }
})
