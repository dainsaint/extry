const sugar = require('sugar');

sugar.extend();

var exports = module.exports = {};

exports.liCaseInspections = {
  toExtry: function (row) {
    return {
      id: row.cartodb_id,
      title: row.address,
      location: {
        lat: row.geocode_x,
        long: row.geocode_y
      },
      datetime: row.inspectioncompleted
    };
  }
};