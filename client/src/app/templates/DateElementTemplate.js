import React, { Component } from 'react';
import ReactHtmlParser from 'react-html-parser';


class DateElementTemplate extends Component {

  render() {

    const dateTime = this.props.date ? new Date( this.props.date.datetime ) : new Date();
    const name = this.props.date ? this.props.date.name + ": " : "";
    return (
      <p className="meta">{ name }{ dateTime.format('{Dow}, {Mon} {do} {year} at {h}{tt}')} </p>
    )
  }
}

export default DateElementTemplate;
