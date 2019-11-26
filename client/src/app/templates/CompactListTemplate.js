import React, { Component } from 'react';
import CompactListItemTemplate from "./CompactListItemTemplate.js"
import sugar from "sugar";

class CompactListTemplate extends Component {

  componentDidMount()
  {

  }

  render() {
    sugar.extend();
    const items = this.props.items.map( item => <CompactListItemTemplate key={item.id} item={item}/> ).first( this.props.count );
    return (
      <div className="ui items">
        { items }
      </div>
    )
  }
}

export default CompactListTemplate;
