import React, { Component } from 'react';

class ElementEditor extends Component {


  onEndpointChange = (e) => {
    this.props.onElementChange( this.props.element.id, {endpoint: e.target.value} )
  }

  onTypeChange = (e) => {
    this.props.onElementChange( this.props.element.id, {type: e.target.value} )
  }

  onCountChange = (e) => {
    this.props.onElementChange( this.props.element.id, {count: e.target.value} )
  }

  onElementDelete = (e) => {
    this.props.onElementDelete( this.props.element.id )
  }


  render() {
    return (

      <form className="ui form segment relative">


        <div className="field">
          <label>Datasource</label>
          <select className="dropdown" defaultValue={ this.props.element.endpoint } onChange={ this.onEndpointChange }>
            <option value="/fna/meetings">Zoning Hearings</option>
            <option value="/odp/inspections">L&amp;I Inspections</option>
            <option value="/odp/appeals">L&amp;I Appeals</option>
            <option value="/odp/demolitions">L&amp;I Demolitions</option>
            <option value="/odp/permits">L&amp;I Permits</option>
          </select>
        </div>

        <div className="field">
          <label>Template</label>
          <select className="dropdown" defaultValue={ this.props.element.type } onChange={ this.onTypeChange }>
            <option value="List">List</option>
            <option value="CompactList">Compact List</option>
            <option value="Article">Article</option>
            <option value="Map">Map</option>

          </select>
        </div>

        <div className="field">
          <label>Item Count</label>
          <input type="range" min="1" max="10" defaultValue={ this.props.element.count} onChange={ this.onCountChange }/>
        </div>


        <a className="ui mini button red" onClick={ this.onElementDelete }><i className="ui icon trash"></i> Delete Element</a>


      </form>

    );
  }
}

export default ElementEditor;
