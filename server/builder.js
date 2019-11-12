const
  express = require('express');
  sugar = require('sugar');

sugar.extend();

var app = module.exports = express();

const
  fnaZoningMeetingScheduleCalendarUrl = "https://calendar.google.com/calendar/b/2/embed?showCalendars=0&amp;showTz=0&amp;mode=AGENDA&amp;height=480&amp;wkst=1&amp;bgcolor=%23FFFFFF&amp;src=fishtown.org_o0nu0h9itvqbfce7c2538qij70%40group.calendar.google.com&amp;color=%230F4B38&amp;ctz=America%2FNew_York";



app.get( "/", (req, res) => {
  var content = "<head><title>Extry Server</title></head>";
  content += "<h1>Extry Server</h1>";
  content += "<p>External Content</p>";
  res.send( content );
});
