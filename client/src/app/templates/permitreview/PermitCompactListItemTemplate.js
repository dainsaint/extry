import React, { Component } from 'react';
import ta from 'time-ago';
import Case from 'case';

class PermitCompactListItemTemplate extends Component {

  render() {
    const item = this.props.item;
    const actionButton = item.action ? <a className="ui blue" href={ item.action.url }>{ item.action.name }</a> : null;
    const dateTime = new Date( item.date.datetime );
    const meeting = item.meeting ? <p className="description"><strong>Meeting at:</strong> { item.meeting }</p>  : null;

    return (
      <div className="item">



          <div className="middle aligned content">
            <h3 className="header">
              <i className="ui calendar icon"></i> { Case.title( item.title) }

            </h3>
            <p className="meta">{ dateTime.format('{Dow}, {Mon} {do} at {h}{tt}')} ({ actionButton })</p>
            { meeting }
          </div>
      </div>
    )
  }
}

//{ta.ago( this.props.item.datetime)}

export default PermitCompactListItemTemplate;
