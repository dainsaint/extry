import React, { Component } from 'react';
import ArticleItemTemplate from "./ArticleItemTemplate.js"
import sugar from "sugar";

class ArticleTemplate extends Component {

  componentDidMount()
  {

  }

  render() {
    sugar.extend();
    const items = this.props.items.map( item => <ArticleItemTemplate item={item}/> ).first(2);
    return (
      <section className="uk-column-1-2">
        { items }
      </section>
    )
  }
}

export default ArticleTemplate;
