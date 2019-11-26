import React, { Component } from 'react';
import ReactHtmlParser from 'react-html-parser';
import ta from 'time-ago';
import v from 'voca';

class CompactListItemTemplate extends Component {

  render() {
    const actionButton = this.props.item.action ? <a className="ui button primary" href={ this.props.item.action.url }>{ this.props.item.action.name }</a> : null;
    return (
      <div className="item">

          <div className="ui tiny image">
            <img src="https://placeimg.com/80/80/tech/grayscale"/>
          </div>

          <div className="middle aligned content">
            <h3 className="header">
              { v.titleCase( this.props.item.title) }

            </h3>
            <p className="meta">{ta.ago( this.props.item.datetime)}</p>
            <p>{ actionButton }</p>
          </div>
      </div>
    )
  }
}

export default CompactListItemTemplate;
