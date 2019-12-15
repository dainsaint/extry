import React, { Component } from 'react';
import ReactHtmlParser from 'react-html-parser';
import ta from 'time-ago';
import Case from 'case';
import DateElementTemplate from './DateElementTemplate.js';

class ListItemTemplate extends Component {

  render() {
    const actionButton = this.props.item.action ? <a className="ui button primary" href={ this.props.item.action.url }>{ this.props.item.action.name }</a> : null;
    const tags = this.props.item.tags ? this.props.item.tags.map( tag => <a key={tag.name} className="ui horizontal label">{ tag.name }</a>) : null;

    return (
      <div className="ui item">
        <div>
          <h3 className="ui header">
            { Case.title( this.props.item.title) }
            { tags }
          </h3>
          <p className="meta"> { this.props.item.name } </p>

          <DateElementTemplate date={this.props.item.date}/>

          <p className="description">{ ReactHtmlParser(this.props.item.description) }</p>
          <p>{ actionButton }</p>
        </div>
      </div>
    )
  }
}

export default ListItemTemplate;
