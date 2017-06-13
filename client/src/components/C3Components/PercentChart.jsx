import React, { Component } from 'react';

class PercentChart extends React.Component {
  constructor(props){
    super(props);
  };

  componentDidMount() {
    console.log('here', this.props.data);

    let keywordMap = [];
    let keywordExist = [];
    let total = 0;

    for (let i in this.props.data) {
      keywordMap.push([i,this.props.data[i]]);
    }
    console.log(keywordMap.length);
    keywordMap.forEach((index) => {
      if (index[1] > 0) {
        keywordExist.push([index[0], index[1]]);
        total++;
      }
    })

    // console.log(keywordExist);
    console.log(total);
    var chart = c3.generate({
      bindto: '#percentChart',
      data: {
        columns: [['Matching Keywords', total]],
        type: 'gauge',
        onclick: function (d, i) { console.log("onclick", d, i); },
        onmouseover: function (d, i) { console.log("onmouseover", d, i); },
        onmouseout: function (d, i) { console.log("onmouseout", d, i); }
      },
      gauge: {
      //  label: {
      //      format: function(value, ratio) {
      //          return value;
      //      },
      //      show: false // to turn off the min/max labels.
      //  },
      //  min: 0, // 0 is default, //can handle negative min e.g. vacuum / voltage / current flow / rate of change
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
      }
    });

    // setTimeout(function () {
    //   chart.load({
    //     columns: [['data', 10]]
    //   });
    // }, 1000);
    //
    // setTimeout(function () {
    //   chart.load({
    //     columns: [['data', 50]]
    //   });
    // }, 2000);
    //
    // setTimeout(function () {
    // chart.load({
    //     columns: [['data', 70]]
    // });
    // }, 3000);
    //
    // setTimeout(function () {
    //   chart.load({
    //     columns: [['data', 0]]
    // });
    // }, 4000);
    //
    // setTimeout(function () {
    //   chart.load({
    //     columns: [['data', 80]]
    //   });
    // }, 5000);

    let barChart = c3.generate({
      bindto: '#barMatchChart',
      data: {
        columns: keywordExist,
        type: 'bar'
      },
      axis: {
        x: {
        show: false
        },
        y: {
        show: false
        }
      },
      bar: {
        width:{ratio: 1}
      }

    })
  }


  render() {
    return (
      <div>
      <div id="percentChart"></div>
      <div id="barMatchChart"></div>
      </div>
    )
  }
}


export default PercentChart;
