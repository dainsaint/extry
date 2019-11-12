// Includes
const
  express = require('express')
  sugar = require('sugar');

//Modules
const
  builder = require("./builder");

const app = express()
const port = process.env.PORT || 4000;

sugar.extend();

app.use( builder );
app.listen( port );
console.log(`Extry Server listening on port ${port}`)
