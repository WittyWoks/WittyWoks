import React, { Component } from 'react';

class KeywordBarChart extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    let wordCountArray = [];
    let keywordsCount = ['Keywords'];
    let keyword = ['x'];
    let unsortedKeywordCount =['Keywords'];
    let unsortedKeywords = ['x'];

    for (let i in this.props.ranking) {
      wordCountArray.push([i, this.props.ranking[i]]);
    }

    wordCountArray.forEach((index) => {
      unsortedKeywordCount.push(index[1]);
      unsortedKeywords.push(index[0]);
    })

    wordCountArray.sort((num1, num2) => {
      return num2[1] - num1[1];
    });

    wordCountArray.forEach((index) => {
      keywordsCount.push(index[1]);
      keyword.push(index[0]);
    })

    let chart = c3.generate({
      bindto: '#keyword',
      data: {
        x : 'x',
        columns: [
          unsortedKeywords,
          unsortedKeywordCount
        ],
        type: 'bar',
        colors: {
          Keywords: '#1DE9B6'
          }
      },
      axis: {
        x: {
          type: 'category'

        },
        y: {
          show: false
        }
      },
      padding: {
        bottom: 130
      }
    });

  setTimeout(function () {
    chart.load({
      columns: [
        keyword,
        keywordsCount
      ],
      axis: {
        x: {
          type: 'category'
        }
      },
      transition: {
        duration: 5000
      }
    });
  }, 2000);

}


  render() {
    return (
      <div id="keyword"></div>
    );
  }
}

export default KeywordBarChart;
