const
  express = require('express'),
  sugar = require('sugar'),
  axios = require('axios'),
  v = require('voca'),

  geocode = require('../utilities/geocode.js');

sugar.extend();

const odpTransform = require( '../transformers/openDataPhillyTransformer.js' );

var app = module.exports = express();

const openDataPhillyApi = axios.create({ baseURL: "https://phl.carto.com/api/v2/" });


var inspectionTransform =  function( item )
{
    return {
      id: item.cartodb_id,
      title: v.titleCase( item.address ),
      location: {
        address: v.titleCase( item.address ),
        lat: item.geocode_x,
        long: item.geocode_y
      },
      datetime: item.inspectioncompleted
    }
}

var appealTransform =  function( item )
{
    return {
      id: item.cartodb_id,
      title: v.titleCase( item.address ),
      name: v.titleCase( item.ownername),
      description: v.titleCase( item.appealgrounds ),
      location: {
        address: v.titleCase( item.address ),
        lat: item.geocode_x,
        long: item.geocode_y
      },
      datetime: item.processeddate
    }
}




app.get( "/odp/inspections", async (req, res) => {
  const result = await openDataPhillyApi.get( '/sql',{
    params:{
      q: "SELECT * FROM li_case_inspections ORDER BY inspectioncompleted DESC LIMIT 10 "
    }
  })

  var items = result.data.rows.map( inspectionTransform );
  const expanded = await geocode.expand( items );
  res.send( expanded );
})


app.get( "/odp/appeals", async (req, res) => {
  const result = await openDataPhillyApi.get( '/sql',{
    params:{
      q: "SELECT * FROM li_appeals ORDER BY processeddate DESC LIMIT 10 "
    }
  })

  var items = result.data.rows.map( appealTransform );
  const expanded = await geocode.expand( items );
  res.send( items );
})
