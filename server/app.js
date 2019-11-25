// Includes
const
  express = require('express'),
  path = require('path'),
  sugar = require('sugar'),
  cors = require('cors'),
  dotenv = require('dotenv');

dotenv.config();

//Modules
const
  fna = require("./endpoints/fna"),
  odp = require("./endpoints/odp");

const app = express()
const port = process.env.PORT || 3001;
const staticFiles = express.static( path.join(__dirname, '../../client/build') );

sugar.extend();

app.use( cors({ origin: 'http://localhost:3000' } ) );
// app.use( builder );
app.use( fna );
app.use( odp );

app.use('/', staticFiles);
app.listen( port );
console.log(`Extry Server listening on port ${port}`)
