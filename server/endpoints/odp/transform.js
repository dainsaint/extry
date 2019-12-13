const
  Case = require('case'),
  sugar = require('sugar'),
  geocode = require('../../utilities/geocode.js');


sugar.extend();

var exports = module.exports = {};


exports.inspections =  function( item )
{
    return {
      id: item.cartodb_id,
      title: Case.title( item.address ),
      people: [{
        title: "Property Owner",
        name: Case.title( item.ownername )
      }],
      description: Case.sentence( item.inspectiondescription ),
      location: {
        address: Case.title( item.address ),
        lat: item.geocode_x,
        long: item.geocode_y
      },
      date: {
        name: "Inspection Completed",
        datetime: item.inspectioncompleted
      }
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
      date:{
          name: "Appeal Processed",
          datetime: item.processeddate
      }

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
      date: {
          name: "Demolition Start Date",
          datetime: item.start_date
      }

    }
}

exports.permits =  function( item )
{
    return {
      id: item.cartodb_id,
      title: Case.title( item.address ),
      people: [{
        title: "Property Owner",
        name: Case.title( item.ownername )
      },
      {
        title: "Contractor",
        name: Case.title( item.contractorname )
      }
      ],
      description: Case.sentence( item.descriptionofwork ),
      location: {
        address: Case.title( item.address ),
        lat: item.geocode_x,
        long: item.geocode_y
      },
      tags: [
        {
          name: Case.title( item.permitdescription ),
          type: "primary"
        }
      ],

      date: {
          name: "Permit Issued",
          datetime: item.permitissuedate
      }

    }
}





// v--------- for pushing data fields to arrays ----------v




function passthrough( item )
{
  return item
}

function action( pair )
{
  return {
    name: pair[0],
    url: pair[1]
  }
}

function location( address )
{
  return {
    address: Case.title(address)
  }
}

const transformers = {
  id: passthrough,
  dates: passthrough,
  title: Case.title,
  names: Case.title,
  text: Case.sentence,
  locations: location,
  tags: Case.title
}



const appealSchema = {
  id: "cartodb_id",
  title: "address",
  locations: ["address"],
  dates: [ "date_scheduled", "processeddate", "decisiondate", "appapproveddate" ],
  names: [ "ownername", "primaryapplicant" ],
  text: [ "appealgrounds", "descriptionofproject"],
  tags: [ "permitdescription" ]
}

const permitSchema = {
  id: "cartodb_id",
  title: "address",
  locations: ["address"],
  dates: [ "permitissuedate", "moddttm"],
  names: [ "ownername", "contractorname" ],
  text: [ "descriptionofwork" ],
  tags: [ "permitdescription" ]
}






function expand( schema, item )
{
  const keys = Object.keys( schema );
  const result = {}

  keys.forEach( key => {
    const transformer = transformers[key];
    const fields = schema[key];

    if( Array.isArray( fields ) )
    {
      // console.log( field, transformer );
      result[key] = fields.map( field => transformer(item[field]) );
    } else {
      result[key] = transformer( item[ schema[key] ] );
    }

  });

  return result;

}


//
//
// exports.appeals = expand.partial( appealSchema );
// exports.permits = expand.partial( permitSchema );
