import React, { Component } from 'react';
import v from 'voca';
import ta from 'time-ago';

class ArticleItemTemplate extends Component {

  componentDidMount()
  {

  }

  render() {
    return (
      <article className="uk-card">
        <img src="https://placeimg.com/640/480/tech/grayscale" className="uk-width-1-1"/>
        <h3 className="uk-card-title">
          { v.titleCase( this.props.item.title) }
        </h3>
        <p className="uk-card-meta">
          { ta.ago( this.props.item.datetime ) }
        </p>
      </article>
    )
  }
}

export default ArticleItemTemplate;
