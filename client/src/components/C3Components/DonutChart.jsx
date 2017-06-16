import React, { Component } from 'react';

class DonutChart extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    let wordCountArray = [];

    for (let i in this.props.ranking) {
      wordCountArray.push([i, this.props.ranking[i]]);
    }

    wordCountArray.sort((num1, num2) => {
      return num1[1] - num2[1];
    });

    let largestRank = wordCountArray.slice(wordCountArray.length - 3, wordCountArray.length);
    let secondGroup = wordCountArray.slice(0, wordCountArray.length - 3);

    let chart = c3.generate({
      bindto: '#donutChart',
      data: {
        columns: largestRank,
        type: 'donut',
      },
      donut: {
      }
    });


    setTimeout(function () {
      chart.load({
        columns: secondGroup
      });
    }, 3000);

    setTimeout(function () {
      chart.unload({
        ids: wordCountArray
      });
    }, 4500);


  }


  render() {
    return (
      <div id="donutChart"></div>
    );
  }
}

export default DonutChart;
