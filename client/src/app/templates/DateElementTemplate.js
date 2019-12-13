import React, { Component } from 'react';
import ReactHtmlParser from 'react-html-parser';


class DateElementTemplate extends Component {

  render() {
    const dateTime = new Date( this.props.date.datetime );
    return (
      <p className="meta">{this.props.date.name}: { dateTime.format('{Dow}, {Mon} {do} {year} at {h}{tt}')} </p>
    )
  }
}

export default DateElementTemplate;
