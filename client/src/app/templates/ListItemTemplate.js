import React, { Component } from 'react';
import ReactHtmlParser from 'react-html-parser';
import ta from 'time-ago';
import Case from 'case';

class ListItemTemplate extends Component {

  render() {
    const actionButton = this.props.item.action ? <a className="ui button primary" href={ this.props.item.action.url }>{ this.props.item.action.name }</a> : null;
    return (
      <div className="item">
        <div>
          <h3 className="header">
            { Case.title( this.props.item.title) }
          </h3>
          <p className="meta">{ta.ago( this.props.item.datetime)}</p>
          <p className="description">{ ReactHtmlParser(this.props.item.description) }</p>
          <p>{ actionButton }</p>
        </div>
      </div>
    )
  }
}

export default ListItemTemplate;
