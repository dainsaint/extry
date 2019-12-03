import React, { Component } from 'react';
import sugar from "sugar";

import CompactListItemTemplate from "./CompactListItemTemplate.js"
import NoItemsTemplate from "./NoItemsTemplate.js"


class CompactListTemplate extends Component {

  componentDidMount()
  {

  }

  render() {
    sugar.extend();
    const items = this.props.items.map( item => <CompactListItemTemplate key={item.id} item={item}/> ).first( this.props.count );
    const placeholder = <NoItemsTemplate/>
    const content = items.length > 0 ? items : placeholder;

    return (
      <div className="ui items">
        { content }
      </div>
    )
  }
}

export default CompactListTemplate;
