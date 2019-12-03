import React, { Component } from 'react';
import Case from 'case';
import ta from 'time-ago';

class ArticleItemTemplate extends Component {

  componentDidMount()
  {

  }

  render() {
    return (
      <article className="eight wide column">
        <img alt="Temp thumbnail" src="https://placeimg.com/640/480/tech/grayscale" className="ui fluid image"/>
        <h3 className="uk-card-title">
          { Case.title( this.props.item.title) }
        </h3>
        <p className="uk-card-meta">
          { ta.ago( this.props.item.datetime ) }
        </p>
      </article>
    )
  }
}

export default ArticleItemTemplate;
