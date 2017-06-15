import React, { Component } from 'react';

class PercentChart extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {

    let keywordMap = [];
    let keywordExist = [];
    let total = 0;

    for (let i in this.props.data) {
      keywordMap.push([i, this.props.data[i]]);
    }

    keywordMap.forEach((index) => {
      if (index[1] > 0) {
        keywordExist.push([index[0], index[1]]);
        total++;
      }
    });

    let chart = c3.generate({
      bindto: '#percentChart',
      data: {
        columns: [['Matching Keywords', 0]],
        type: 'gauge',
      },
      gauge: {
        max: keywordMap.length// 100 is default
      },
      color: {
        pattern: ['#60B044'], // the three color levels for the percentage values.
        threshold: {
          unit: 'value', // percentage is default
          //  max: 200, // 100 is default
          values: [keywordMap.length]
        }
      },
      size: {
        height: 180
      },
      title: {
        text: 'Skills Match'
      }

    });
  
    setTimeout(function () {
      chart.load({
        columns: [['Matching Keywords', total]]
      });
    }, 1000);
  }



  render() {
    return (
      <div>
      <div id="percentChart"></div>
      </div>
    );
  }
}


export default PercentChart;
