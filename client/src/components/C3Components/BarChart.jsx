import React, { Component } from 'react';

class LineChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gmail: null,
      render: false
    };
  }

  componentDidMount() {
    let context = this;
    var barChart = c3.generate({
      bindto: '#linechart',
      data: {
        columns: [
          context.props.barChartData.barChartJobsApplied
        ],
        type: 'bar'
      },
      bar: {
        width: {
          ratio: 0.5 // this makes bar width 50% of length between ticks
        }
        // or
        //width: 100 // this makes bar width 100
      },
      axis: {
        x: {
          type: 'category',
          categories: context.props.barChartData.barChartDates
        },
        y: {
          tick: { format: d3.format('d') }
        }
      }
    });
  }

  render() {
    return (
      <div id="linechart"></div>
    );
  }
}

export default LineChart;
