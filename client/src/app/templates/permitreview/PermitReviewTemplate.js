import React, { Component } from 'react';
import PermitListItemTemplate from "./PermitListItemTemplate.js"
import PermitCompactListItemTemplate from './PermitCompactListItemTemplate.js'
import sugar from "sugar";

class PermitReviewTemplate extends Component {

  constructor( props )
  {
    super(props);


    this.state =  {
      main: null,
      upcoming: []
    }
  }

  hash( items )
  {
    return items.map( x => x.id ).join(',');
  }

  fetch()
  {
    var main = Object.clone( this.props.items[ this.props.count - 1 ] );
    var upcoming = this.props.items.filter( item => item.location.address == main.location.address ).map( item => {
      var title = item.title.split('-').first();
      return {...item, title};
     });

    if( main )
      main.title = main.location.address.split(',').first();



    this.setState( state => {
      return { main, upcoming }
    });
  }

  componentDidMount()
  {
    sugar.extend();
    this.fetch();
  }

  componentDidUpdate( prevProps, prevState )
  {
    if( this.hash( prevProps.items ) !== this.hash(this.props.items) || prevProps.count != this.props.count )
      this.fetch();
  }

  render() {

    const main =  this.state.main ? <PermitListItemTemplate key={this.state.main.id} item={this.state.main}/> : null;
    const upcoming = this.state.upcoming ? this.state.upcoming.map( item => <PermitCompactListItemTemplate key={item.id} item={item}/> ) : null;

    return (
      <div className="ui items">
        { main }
        <h2 className="ui header">Get Involved:</h2>
        { upcoming }
      </div>
    )
  }
}

export default PermitReviewTemplate;
