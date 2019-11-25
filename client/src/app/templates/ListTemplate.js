import React, { Component } from 'react';
import ListItemTemplate from "./ListItemTemplate.js"
import sugar from "sugar";

class ListTemplate extends Component {

  componentDidMount()
  {

  }

  render() {
    sugar.extend();
    const items = this.props.items.map( item => <ListItemTemplate key={item.id} item={item}/> ).first(3);
    return (
      <div className="ui items">
        { items }
      </div>
    )
  }
}

export default ListTemplate;
