const
  express = require('express'),
  { google } = require('googleapis'),

  axios = require('axios'),
  sugar = require('sugar'),
  Case = require('case'),

  zillow = require('node-zillow'),


  geocode = require('../utilities/geocode.js');

sugar.extend();

const zillowApi = new zillow( process.env.ZILLOW_API_KEY );

var app = module.exports = express();



app.get( "/zil/search/raw", async (req, res) => {
  const result = await zillowApi.get( "GetDeepSearchResults", {
    address: "1014 S 2nd St",
    citystatezip: "19147",
    rentzestimate: "true"
  });

  res.send( result );
})



app.get( "/zil/types/raw", async (req, res) =>{

  const result = await zillowApi.get( "GetUpdatedPropertyDetails", {
    zpid: "2096355452"
  });

  res.send( result );
})
