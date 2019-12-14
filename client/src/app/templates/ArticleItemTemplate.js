import React, { Component } from 'react';
import Case from 'case';
import ta from 'time-ago';
import sugar from 'sugar';

import DateElementTemplate from "./DateElementTemplate.js";

class ArticleItemTemplate extends Component {

  componentDidMount()
  {
    sugar.extend();
  }

  color( tag )
  {
    return tag == "New Construction Permit" ? "blue" : "orange";
  }

  render() {

    const svImg = `https://maps.googleapis.com/maps/api/streetview?key=${ process.env.REACT_APP_GOOGLE_MAPS_API_KEY }&size=600x400&location=${ this.props.item.location.address }`;
    const tags = this.props.item.tags ? this.props.item.tags.map( tag => <a key={ tag.name } className="ui horizontal label">{ tag.name }</a>) : null;
    const people = this.props.item.people ? this.props.item.people.map( person => <p key={ person.name }><strong>{ person.title }:</strong> {person.name} </p>) : null;

    return (

      <article className="item">

          <div className="ui medium image">
            <img alt="Temp thumbnail" src={ svImg } className="ui fluid image"/>
          </div>

          <div className="middle aligned content">
            <h3 className="ui header">
              { this.props.item.title }
              { tags }
            </h3>

            <DateElementTemplate date={ this.props.item.date } />

              <p className="description">
                { this.props.item.description }
              </p>

              <div className="meta">
                { people }
              </div>
          </div>

      </article>

    )
  }
}

export default ArticleItemTemplate;
