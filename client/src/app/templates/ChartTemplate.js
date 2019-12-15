import React, { Component } from 'react'
import { Bar } from 'react-chartjs-2';
import sugar from 'sugar';
import Case from 'case';

class ChartTemplate extends Component {

  constructor( props )
  {
    super( props );

    this.state = {
      data: {
        labels: [],
        datasets: []
      },

      options: {
        scales: {
          xAxes: [{
            stacked: true
          }],
          yAxes: [{
            stacked: true
          }]
        }
      }
    }
  }

  transform() {

    const xAxis = "year";
    const colors= ["#267FC1", "#F0712C"];

    const items = this.props.items;
    const fields = Object.keys( items.first() ).filter( x => x != xAxis );
console.log( fields );
    const labels = this.props.items.map( item => item[ xAxis ] );

    const datasets = fields.map( (field, i) => ({
      label: Case.capital( field ),
      backgroundColor: colors[ i % colors.length ],
      data: items.map( x => x[field] ).flatten()
    }));

    const data = { labels, datasets }

    this.setState( state => ({ data }) );
  }

  hash( items )
  {
    return items.map( x => JSON.stringify(x) ).join(',');
  }

  componentDidMount()
  {
    sugar.extend();
  }

  componentDidUpdate( prevProps, prevState )
  {
    if( this.hash( prevProps.items ) !== this.hash(this.props.items) )
      this.transform();
  }

  render() {

    return (
      <div>
        <Bar
          data={ this.state.data }
          options={ this.state.options }
          />
      </div>
    )
  }
}

export default ChartTemplate;
