const
  sugar = require('sugar');

sugar.extend();

var exports = module.exports ={};

exports.toExtry = function( row )
{
    return {
      // full: row,
      id: row.zpid[0],
      title: row.address[0].street[0],
      location: {
        lat: row.address[0].latitude[0],
        long: row.address[0].longitude[0]
      },
      datetime: new Date()
    }
}
