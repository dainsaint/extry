import React, { Component } from 'react';
import ReactHtmlParser from 'react-html-parser';
import ta from 'time-ago';
import v from 'voca';

class ListItemTemplate extends Component {

  render() {
    const actionButton = this.props.item.action ? <a className="uk-button uk-button-primary" href={ this.props.item.action.url }>{ this.props.item.action.name }</a> : null;
    return (
      <li>
        <div>
          <h3>
            { v.titleCase( this.props.item.title) }
          </h3>
          <p className="uk-text-meta">{ta.ago( this.props.item.datetime)}</p>
          <p>{ ReactHtmlParser(this.props.item.description) }</p>
          <p>{ actionButton }</p>
        </div>
      </li>
    )
  }
}

export default ListItemTemplate;
