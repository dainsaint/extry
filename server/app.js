// Includes
const
  express = require('express'),
  path = require('path'),
  sugar = require('sugar'),
  cors = require('cors');

//Modules
const
  builder = require("./builder");
  google = require("./google");

const app = express()
const port = process.env.PORT || 4000;

sugar.extend();

app.use( cors({ origin: 'http://localhost:3000' } ) );
// app.use( builder );
app.use( google );
app.listen( port );
console.log(`Extry Server listening on port ${port}`)
