import React, { Component } from 'react';
import ta from 'time-ago';
import Case from 'case';
import DateElementTemplate from "./DateElementTemplate.js";

class CompactListItemTemplate extends Component {

  render() {
    const actionButton = this.props.item.action ? <a className="ui button primary" href={ this.props.item.action.url }>{ this.props.item.action.name }</a> : null;


    return (
      <div className="item">

          <div className="ui tiny image">
            <img alt="Temp thumbnail" src="https://placeimg.com/80/80/tech/grayscale"/>
          </div>

          <div className="middle aligned content">
            <h3 className="header">
              { Case.title( this.props.item.title) }

            </h3>
            <DateElementTemplate date={this.props.item.date}/>
            <p>{ actionButton }</p>
          </div>
      </div>
    )
  }
}

//{ta.ago( this.props.item.datetime)}

export default CompactListItemTemplate;
