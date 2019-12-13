const
  Case = require('case'),
  sugar = require('sugar'),
  axios = require('axios'),

  geocode = require('../../utilities/geocode.js');


sugar.extend();

var exports = module.exports = {};

const openDataPhillyApi = axios.create({ baseURL: "https://phl.carto.com/api/v2/" });
const fishtownZips = ['19125', '19122', '19123', '19106'];


exports.query = async function( query, transform )
{
    const result = await openDataPhillyApi.get( '/sql',{ params:{ q: query } })

    var rows = result.data.rows;

    if( transform )
    {
      var items = rows.map( transform );
      const expanded = await geocode.expand( items );
      return items;
    } else {
      return rows;
    }


}


exports.endpoint = function( query, transform )
{
  return async (req, res) => {
    const result = await exports.query( query, transform );
    res.send( result );
  }
}


exports.fieldEndpoint = function( query, field )
{
  return async (req, res) => {
    const result = await openDataPhillyApi.get( '/sql',{ params:{ q: query } })

    const rows = result.data.rows;
    // const arr = rows.map( row => row[field] );
    const fields = [ field ];
    const opts = { fields };
    const csv = parse( rows, opts );
    res.attachment( 'file.csv' );
    res.send( csv );

  }
}
