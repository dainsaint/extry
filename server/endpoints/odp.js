const
  express = require('express'),
  sugar = require('sugar'),
  axios = require('axios'),
  Case = require('case'),
  sql = require('mysql-bricks'),

  transform = require('./odp/transform.js'),
  geocode = require('../utilities/geocode.js');


const select = sql.select, like = sql.like;

sugar.extend();

const odpTransform = require( '../transformers/openDataPhillyTransformer.js' );

var app = module.exports = express();

const openDataPhillyApi = axios.create({ baseURL: "https://phl.carto.com/api/v2/" });
const fishtownZips = ['19125', '19122', '19123', '19106'];


function endpoint( query, transform )
{
  return async (req, res) => {
    const result = await openDataPhillyApi.get( '/sql',{ params:{ q: query } })

    var rows = result.data.rows;

    if( transform )
    {
      var items = rows.map( transform );
      const expanded = await geocode.expand( items );
      res.send( items );
    } else {
      res.send( rows );
    }

  }
}

var fishtownQuery = select().where(like('zip', `(${ fishtownZips.join('|') })%`)).limit(10);
var aq = fishtownQuery.clone()
  .from('li_appeals')
  .orderBy('processeddate desc')
  .limit(10)

// console.log( aq.toString() );

var appealsQuery = "SELECT * FROM li_appeals WHERE zip SIMILAR TO '(19125|19122|19123|19106)%' AND date_scheduled IS NOT NULL ORDER BY date_scheduled DESC LIMIT 10";

app.get("/odp/appeals/raw", endpoint( appealsQuery ) );
app.get("/odp/appeals", endpoint( appealsQuery, transform.appeals ) );


var demolitionsQuery = "SELECT * FROM li_demolitions WHERE zip SIMILAR TO '(19125|19122|19123|19106)%' ORDER BY start_date DESC LIMIT 10";

app.get("/odp/demolitions/raw", endpoint( demolitionsQuery ) );
app.get("/odp/demolitions", endpoint( demolitionsQuery, transform.demolitions ) );

var permitsQuery = "SELECT * FROM li_permits WHERE zip SIMILAR TO '(19125|19122|19123|19106)%' AND permitdescription SIMILAR TO '(NEW|DEMOLITION)%' ORDER BY permitissuedate DESC LIMIT 10";

app.get("/odp/permits/raw", endpoint( permitsQuery ) );
app.get("/odp/permits", endpoint( permitsQuery, transform.permits ) );

var inspectionsQuery = "SELECT * FROM li_case_inspections WHERE zip SIMILAR TO '(19125|19122|19123|19106)%' ORDER BY inspectioncompleted DESC LIMIT 10"

app.get("/odp/inspections/raw", endpoint( inspectionsQuery ) );
app.get("/odp/inspections", endpoint( inspectionsQuery, transform.inspections ) );
