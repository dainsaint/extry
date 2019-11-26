import React, { Component } from 'react';
import ArticleItemTemplate from "./ArticleItemTemplate.js"
import sugar from "sugar";

class ArticleTemplate extends Component {

  componentDidMount()
  {

  }

  render() {
    sugar.extend();
    const items = this.props.items.map( item => <ArticleItemTemplate key={item.id} item={item}/> ).first(this.props.count);
    return (
      <section className="ui grid">
        { items }
      </section>
    )
  }
}

export default ArticleTemplate;
