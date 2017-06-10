import React, { Component } from 'react';

class LineChart extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      gmail: null,
      render: false
    };
  };

  componentWillMount() {
    let context = this;
    $.ajax({
      type: 'GET',
      url: '/keyword',
      datatype: 'json'
    })
    .done((data) => {
      context.setState({
        gmail: data,
        render: true
      });
      console.log('get worked', data);
    })
    .fail(() => {
      console.log('failed to get',err);
    })
  }

  componentDidMount() {

    var barChart = c3.generate({
      bindto: '#linechart',
      data: {
        columns: [
           ['data1', 30, 200, 100, 400, 150, 250],
           ['data2', 130, 100, 140, 200, 150, 50]
       ],
       type: 'bar'
     },
     bar: {
       width: {
           ratio: 0.5 // this makes bar width 50% of length between ticks
       }
        // or
        //width: 100 // this makes bar width 100
      }
    });

    setTimeout(function () {
     barChart.load({
         columns: [
             ['data3', 130, -150, 200, 300, -200, 100]
         ]
     });
    }, 1000);
  }

  render() {
    return (
      <div id="linechart"></div>
    )
  }
}

export default LineChart;
