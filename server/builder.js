const
  express = require('express'),
  sugar = require('sugar'),
  axios = require('axios');


sugar.extend();

const
  zillow = require('node-zillow'),
  { google } = require('googleapis');

const
  odpTransform = require( './transformers/openDataPhillyTransformer.js' ),
  zillowTransform = require( './transformers/zillowTransformer.js' ),
  googleCalendarTransform = require( './transformers/googleCalendarTransformer.js' );

var app = module.exports = express();

const
  fnaZoningMeetingScheduleCalendarUrl = "https://calendar.google.com/calendar/b/2/embed?showCalendars=0&amp;showTz=0&amp;mode=AGENDA&amp;height=480&amp;wkst=1&amp;bgcolor=%23FFFFFF&amp;src=fishtown.org_o0nu0h9itvqbfce7c2538qij70%40group.calendar.google.com&amp;color=%230F4B38&amp;ctz=America%2FNew_York";
  fnaCalendarId = "fishtown.org_o0nu0h9itvqbfce7c2538qij70@group.calendar.google.com";

const
  apiKeys = {
    google: "AIzaSyCXvsIAI6N8ihCNyP8zNQRA8Uoly_ngx9M",
    zillow: "X1-ZWz1hhgkuog3d7_8z2s9"
  }


const
  openDataPhillyApi = axios.create({ baseURL: "https://phl.carto.com/api/v2/" }),
  zillowApi = new zillow( apiKeys.zillow ),
  calendarApi = google.calendar({ version: "v3", auth: apiKeys.google });

const
  zillowFishtownId = "271178";

app.get( "/calendar", async (req, res) =>{
  try{
    const result = await calendarApi.events.list({
      calendarId: fnaCalendarId,
    })
    res.send( result.data.items.map( googleCalendarTransform.toExtry) );
  } catch(e) {
    res.send(e);
  }
})

app.get( "/zillow", async (req, res) => {
  const result = await zillowApi.get( "GetSearchResults", {
    address: "1014 S 2nd St",
    citystatezip: "19147",
    rentzestimate: "true"
  });

  res.send( result.response.results.result.map( zillowTransform.toExtry ) );
})

app.get( "/zillow/regions", async (req, res) => {
  const result = await zillowApi.get( "GetRegionChildren", {
    state: "PA",
    city: "Philadelphia",
    childtype: "neighborhood"
  });

  res.send( result.response.list.region.map( x => ({ id: x.id[0], name: x.name[0], url: x.url[0], value: x.zindex }) ).sortBy( "name" ) );
})

app.get( "/inspections", async (req, res) => {
  const result = await openDataPhillyApi.get( '/sql',{
    params:{
      q: "SELECT * FROM li_case_inspections ORDER BY inspectioncompleted DESC LIMIT 10 "
    }
  })

  var rows = result.data.rows.map( odpTransform.liCaseInspections.toExtry );
  res.send( rows );
})


app.get( "/", (req, res) => {
  var content = "<head><title>Extry Server</title></head>";
  content += "<h1>Extry Server</h1>";
  content += "<p>External Content</p>";
  res.send( content );
});
