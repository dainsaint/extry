const sugar = require('sugar');

sugar.extend();

var exports = module.exports = {};

exports.toExtry = function (item) {
  return {
    // full: item,
    id: item.id,
    title: item.summary,
    location: {
      lat: 0,
      long: 0
    },
    datetime: item.start.dateTime
  };
};