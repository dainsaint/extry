const
  express = require('express'),
  sugar = require('sugar'),
  axios = require('axios'),
  Case = require('case'),

  geocode = require('../utilities/geocode.js');

sugar.extend();

const odpTransform = require( '../transformers/openDataPhillyTransformer.js' );

var app = module.exports = express();

const openDataPhillyApi = axios.create({ baseURL: "https://phl.carto.com/api/v2/" });
const fishtownZips = ['19125', '19122', '19123', '19106'];

var inspectionTransform =  function( item )
{
    return {
      id: item.cartodb_id,
      title: Case.title( item.address ),
      location: {
        address: Case.title( item.address ),
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
      title: Case.title( item.address ),
      name: Case.title( item.ownername),
      description: Case.sentence( item.appealgrounds ),
      location: {
        address: Case.title( item.address ),
        lat: item.geocode_x,
        long: item.geocode_y
      },
      datetime: item.processeddate
    }
}




app.get( "/odp/inspections", async (req, res) => {
  const result = await openDataPhillyApi.get( '/sql',{
    params:{
      q: "SELECT * FROM li_case_inspections WHERE zip SIMILAR TO '(19125|19122|19123|19106)%' ORDER BY inspectioncompleted DESC LIMIT 10"
    }
  })

  var items = result.data.rows.map( inspectionTransform );
  const expanded = await geocode.expand( items );
  res.send( expanded );
})

app.get( "/odp/inspections/raw", async (req, res) => {
  const result = await openDataPhillyApi.get( '/sql',{
    params:{
      q: "SELECT * FROM li_case_inspections WHERE zip SIMILAR TO '(19125|19122|19123|19106)%' ORDER BY inspectioncompleted DESC LIMIT 10"
    }
  })

  var items = result.data.rows;
  res.send( items );
})



app.get( "/odp/appeals", async (req, res) => {
  const result = await openDataPhillyApi.get( '/sql',{
    params:{
      q: "SELECT * FROM li_appeals WHERE zip SIMILAR TO '(19125|19122|19123|19106)%' ORDER BY processeddate DESC LIMIT 10"
    }
  })

  var items = result.data.rows.map( appealTransform );
  const expanded = await geocode.expand( items );
  res.send( items );
})


app.get( "/odp/appeals/raw", async (req, res) => {
  const result = await openDataPhillyApi.get( '/sql',{
    params:{
      q: "SELECT * FROM li_appeals WHERE zip SIMILAR TO '(19125|19122|19123|19106)%' ORDER BY processeddate DESC LIMIT 10"
    }
  })

  var items = result.data.rows;
  res.send( items );
})
