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
    let jobs = context.props.barChartData.barChartJobsApplied;
    let total = 0;

    if (jobs.length > 0) {
      for (let i = 1; i <jobs.length; i++) {
        total += jobs[i];
      }
    }

    jobs[0] = jobs[0]+ ' (Total: ' + total + ')';

    let barChart = c3.generate({
      bindto: '#linechart',
      data: {
        columns: [
          context.props.barChartData.barChartJobsApplied
        ],
        type: 'line',
      },
      bar: {
        width: {
          ratio: 0.5 // this makes bar width 50% of length between ticks
        }
        // or
        //width: 100 // this makes bar width 100
      },
      color: {
        pattern: ['#00BFA5'], // the three color levels for the percentage values.
      },
      axis: {
        x: {
          type: 'category',
          categories: context.props.barChartData.barChartDates
        },
        y: {
          show: false
        }
      },

    });

    setTimeout(function () {
      barChart.transform('bar');
    }, 3000);

    setTimeout(function () {
      barChart.transform('area');
    }, 5000);
  }

  render() {
    return (
      <div id="linechart"></div>
    );
  }
}

export default LineChart;
