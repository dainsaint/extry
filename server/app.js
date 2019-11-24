// Includes
const
  express = require('express'),
  path = require('path'),
  sugar = require('sugar'),
  cors = require('cors');

//Modules
const
  google = require("./google");

const app = express()
const port = process.env.PORT || 3001;
const staticFiles = express.static( path.join(__dirname, '../../client/build') );

sugar.extend();

app.use( cors({ origin: 'http://localhost:3000' } ) );
// app.use( builder );
app.use( google );

app.use('/*', staticFiles);
app.listen( port );
console.log(`Extry Server listening on port ${port}`)
