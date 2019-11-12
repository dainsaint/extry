import React, { Component } from 'react';
import axios from 'axios';
import sugar from 'sugar';
import ta from 'time-ago';
import v from 'voca';

class PHLCartoDebug extends Component {

  constructor(props)
  {
    super(props);
    sugar.extend();
    this.state = {
      data: []
    }
  }

  componentDidMount()
  {
    var api = axios.create({
      baseURL: "https://phl.carto.com/api/v2/"
    });

    api.get( '/sql',{
      params:{
        q: "SELECT * FROM li_case_inspections ORDER BY inspectioncompleted DESC LIMIT 10 "
      }
    })
      .then( response => this.setState({ data: response.data.rows }) );
  }

  inspectionIcon( status )
  {
    switch(status)
    {
      case 'Passed': return <span className="tag tag--success">Passed</span>;
      case 'Failed': return <span className="tag tag--danger">Failed</span>;
      case 'Closed': return <span className="tag tag--secondary">Closed</span>;
      case 'None': return <span className="tag tag--info">None</span>;
    }
  }

  render() {
    const listItems = this.state.data.from(1).map( data => (

      <div className="tile tile--center">
        <div class="tile__container">
          <p className="tile__title">{ v.titleCase(data.address) } </p>
          <p className="tile__subtitle">{ v.titleCase(data.ownername) }</p>
          <span class="info">{ta.ago(data.inspectioncompleted)}</span>
        </div>

        <p class="tile__buttons">
          { this.inspectionIcon( data.inspectionstatus ) }
        </p>

      </div>

    ) );

    return (
      <div>
        <h2>Most Recent Case Inspections</h2>
        <div>
            {listItems}
        </div>
      </div>
    );
  }
}

export default PHLCartoDebug;
