import React, { Component } from 'react';
import ta from 'time-ago';
import v from 'voca';

class ListItemTemplate extends Component {

  render() {

    return (
      <li className="uk-card">
        <div className="uk-card-header">
          <h3 className="uk-card-title uk-margin-remove-bottom">
            { v.titleCase( this.props.item.title) }
          </h3>
          <p className="uk-text-meta uk-margin-remove-top">{ta.ago( this.props.item.datetime)}</p>
        </div>
      </li>
    )
  }
}

export default ListItemTemplate;
