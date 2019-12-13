const
  express = require('express'),
  sugar = require('sugar'),

  Case = require('case'),
  sql = require('mysql-bricks'),
  { parse } = require('json2csv'),


  transform = require('./odp/transform.js'),
  odpapi = require('./odp/odpapi.js');


sugar.extend();

var app = module.exports = express();


//
// var fishtownQuery = select().where(like('zip', `(${ fishtownZips.join('|') })%`)).limit(10);
// var aq = fishtownQuery.clone()
//   .from('li_appeals')
//   .orderBy('processeddate desc')
//   .limit(10)

// console.log( aq.toString() );

var appealsQuery = "SELECT * FROM li_appeals WHERE zip SIMILAR TO '(19125|19122|19123|19106)%' AND date_scheduled IS NOT NULL ORDER BY date_scheduled DESC LIMIT 10";

app.get("/odp/appeals/raw", odpapi.endpoint( appealsQuery ) );
app.get("/odp/appeals", odpapi.endpoint( appealsQuery, transform.appeals ) );


var demolitionsQuery = "SELECT * FROM li_demolitions WHERE zip SIMILAR TO '(19125|19122|19123|19106)%' ORDER BY start_date DESC LIMIT 10";

app.get("/odp/demolitions/raw", odpapi.endpoint( demolitionsQuery ) );
app.get("/odp/demolitions", odpapi.endpoint( demolitionsQuery, transform.demolitions ) );

var permitsQuery = "SELECT * FROM li_permits WHERE zip SIMILAR TO '(19125|19122|19123|19106)%' AND permitdescription SIMILAR TO '(NEW|DEMOLITION)%' ORDER BY permitissuedate DESC LIMIT 10";

app.get("/odp/permits/raw", odpapi.endpoint( permitsQuery ) );
app.get("/odp/permits", odpapi.endpoint( permitsQuery, transform.permits ) );

var inspectionsQuery = "SELECT * FROM li_case_inspections WHERE zip SIMILAR TO '(19125|19122|19123|19106)%' ORDER BY inspectioncompleted DESC LIMIT 10"

app.get("/odp/inspections/raw", odpapi.endpoint( inspectionsQuery ) );
app.get("/odp/inspections", odpapi.endpoint( inspectionsQuery, transform.inspections ) );


//
// app.get("/odp/permits/raw/new", fieldEndpoint( "SELECT descriptionofwork FROM li_permits WHERE zip SIMILAR TO '(19125|19122|19123|19106)%' AND permitdescription SIMILAR TO '(NEW)%' ORDER BY permitissuedate DESC LIMIT 50" , 'descriptionofwork') );
// app.get("/odp/permits/raw/demolition", fieldEndpoint( "SELECT descriptionofwork FROM li_permits WHERE zip SIMILAR TO '(19125|19122|19123|19106)%' AND permitdescription SIMILAR TO '(DEMOLITION)%' ORDER BY permitissuedate DESC LIMIT 50" , 'descriptionofwork') );


var addressQuery = "SELECT * FROM li_appeals WHERE address SIMILAR TO '1144 FRANKFORD AVE%' LIMIT 10"
app.get("/odp/appeals/address/raw", odpapi.endpoint( addressQuery ) );


app.get("/odp/appeals/address", async (req, res) => {
  var addressQueryTemplate = `SELECT * FROM li_appeals WHERE zip SIMILAR TO '(19125|19122|19123|19106)%' AND address SIMILAR TO '${ Case.upper(req.query.address) }%' LIMIT 10`
  var ep =  odpapi.endpoint( addressQueryTemplate );
  await ep( req, res );
});
