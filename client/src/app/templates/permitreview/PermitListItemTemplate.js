import React, { Component } from 'react';
import ReactHtmlParser from 'react-html-parser';
import ta from 'time-ago';
import Case from 'case';

class PermitListItemTemplate extends Component {

  render() {
    const actionButton = this.props.item.action ? <a className="ui button primary" href={ this.props.item.action.url }>{ this.props.item.action.name }</a> : null;
    const tags = this.props.item.tags ? this.props.item.tags.map( tag => <a key={tag.name} className="ui horizontal label">{ tag.name }</a>) : null;
    const people = this.props.item.people ? this.props.item.people.map( person => <div key={ person.name }><strong>{ person.title }:</strong> {person.name} </div>) : null;



    return (
      <div className="ui item">
        <div>
          <h3 className="ui header">
            { Case.title( this.props.item.title) }
            { tags }
          </h3>
          <p className="description">{ ReactHtmlParser(this.props.item.description) }</p>
          { people }

        </div>
      </div>
    )
  }
}

export default PermitListItemTemplate;
