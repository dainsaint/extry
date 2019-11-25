import React, { Component } from 'react';

class SectionEditor extends Component {


  onTitleChange = (e) => {
    this.props.onSectionChange( this.props.section.id, {title: e.target.value} )
  }

  onEndpointChange = (e) => {
    this.props.onSectionChange( this.props.section.id, {endpoint: e.target.value} )
  }

  onTypeChange = (e) => {
    this.props.onSectionChange( this.props.section.id, {type: e.target.value} )
  }

  render() {
    return (
      <div>
        <div className="title">
          <i className="dropdown icon"></i>
          { this.props.section.title }
        </div>

        <div className="content ">
          <form className="ui form">

            <div className="field">
              <label>Title</label>
              <input
                className="uk-input"
                type="text"
                placeholder="Title"
                defaultValue={ this.props.section.title }
                onChange={ this.onTitleChange }
              />
            </div>

            <div className="field">
              <label>Datasource</label>
              <select className="dropdown" defaultValue={ this.props.section.endpoint } onChange={ this.onEndpointChange }>
                <option value="/fna/meetings">Zoning Hearings</option>
                <option value="/odp/inspections">L&I Inspections</option>
                <option value="/odp/appeals">L&I Appeals</option>
              </select>
            </div>


            <div className="field">
              <label>Template</label>
              <select className="dropdown" defaultValue={ this.props.section.type } onChange={ this.onTypeChange }>
                <option value="List">List</option>
                <option value="Article">Article</option>
                <option value="Map">Map</option>
              </select>
            </div>

          </form>
        </div>
      </div>
    );
  }
}

export default SectionEditor;
