import React, { Component } from 'react';
import ListItemTemplate from "./ListItemTemplate.js"
import sugar from "sugar";

class ListTemplate extends Component {

  componentDidMount()
  {

  }

  render() {
    sugar.extend();
    const items = this.props.items.map( item => <ListItemTemplate item={item}/> ).first(3);
    return (
      <ul className="uk-list">
        { items }
      </ul>
    )
  }
}

export default ListTemplate;
