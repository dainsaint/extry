import React, { Component } from 'react';
import ta from 'time-ago';
import v from 'voca';

class ODPListTemplate extends Component {

  inspectionIcon( status )
  {
    switch(status)
    {
      case 'Passed': return <span className="uk-card-badge uk-label uk-label-success">Passed</span>;
      case 'Failed': return <span className="uk-card-badge uk-label uk-label-danger">Failed</span>;
      case 'Closed': return <span className="uk-card-badge uk-label uk-label-default">Closed</span>;
      case 'None': return <span className="uk-card-badge uk-label uk-label-warning">None</span>;
    }
  }

  render() {

    return (
      <li key={ this.props.data.id } className="uk-card">

        { this.inspectionIcon(  this.props.data.inspectionstatus ) }

        <div class="uk-card-header">
          <h3 className="uk-card-title uk-margin-remove-bottom">
            { v.titleCase( this.props.data.address) }
          </h3>
          <p className="uk-text-meta uk-margin-remove-top">{ta.ago( this.props.data.inspectioncompleted)}</p>
        </div>



      </li>
    )
  }
}

export default ODPListTemplate;
