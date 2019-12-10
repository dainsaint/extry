const
  Case = require('case'),
  geocode = require('../../utilities/geocode.js');

var exports = module.exports = {};


exports.inspections =  function( item )
{
    return {
      id: item.cartodb_id,
      title: Case.title( item.address ),
      name: Case.title( item.ownername ),
      description: Case.sentence( item.inspectiondescription ),
      location: {
        address: Case.title( item.address ),
        lat: item.geocode_x,
        long: item.geocode_y
      },
      datetime: item.inspectioncompleted
    }
}

exports.appeals =  function( item )
{
    return {
      id: item.cartodb_id,
      title: Case.title( item.address ),
      name: Case.title( item.ownername),
      description: Case.sentence( item.appealgrounds ),
      location: {
        address: Case.title( item.address ),
        lat: item.geocode_x,
        long: item.geocode_y
      },
      datetime: item.processeddate
    }
}

exports.demolitions =  function( item )
{
    return {
      id: item.cartodb_id,
      title: Case.title( item.address ),
      name: Case.title( item.ownername),
      description: Case.sentence( item.record_type ),
      location: {
        address: Case.title( item.address ),
        lat: item.geocode_x,
        long: item.geocode_y
      },
      datetime: item.start_date
    }
}

exports.permits =  function( item )
{
    return {
      id: item.cartodb_id,
      title: Case.title( item.address ),
      name: Case.title( item.ownername),
      description: Case.sentence( item.descriptionofwork ),
      location: {
        address: Case.title( item.address ),
        lat: item.geocode_x,
        long: item.geocode_y
      },
      action: {
        name: Case.title( item.permitdescription )
      },
      datetime: item.permitissuedate
    }
}
