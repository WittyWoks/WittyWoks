import React from 'react';
import axios from 'axios';
import DonutChart from './C3Components/DonutChart.jsx';

class SmartAnalysis extends React.Component {
  constructor(props) {
    super(props);
    this.fetchAllAppliedJob();
  }

  fetchAllAppliedJob() {
    this.getResume();
    this.state = {
      barChartDates: null,
      barChartJobsApplied: null,
      jobsAppliedTo: null,
      loaded: false,
      allData: [],
      keywordsRanking:null,
      donutChart: false,
      skills:[]
    };
    let context = this;
    $.ajax({
      type: 'GET',
      url: '/user',
      datatype: 'json'
    })
    .done(data => {
      if (data.email) {
        axios.get('/ReturnJobsApplied', {
          params: {
            google_id: data.id
          }
        })
        .then((jobs) => {

          // console.log('Success getting jobs!', jobs);
          context.setState({
            allData : jobs.data
          });
          let datesObj = {};
          let yAxis = ['Applied'];
          let xAxis = [];

          jobs.data.forEach((job) => {
            let convertedDate = (new Date(job.created_at)).toDateString();
            if (!datesObj[convertedDate]) {
              datesObj[convertedDate] = 1;
            } else {
              datesObj[convertedDate] += 1;
            }
          });

          for (let key in datesObj) {
            yAxis.push(datesObj[key]);
            xAxis.push(key);
          }

          // console.log(xAxis);
          // console.log(yAxis);
          context.setState({
            barChartDates: xAxis,
            barChartJobsApplied: yAxis,
            jobsAppliedTo: jobs.data,
            loaded: true
          });


          this.urlParser(context.state.allData, this.state.skills);
        })
        .catch(err => {
          console.error('Error occured getting jobs', err);
        });
      }
    });
  }

  urlParser(DataArray, skills) {
    let context = this;
    $.ajax({
      type: 'POST',
      url: '/urlParser',
      contentType: 'application/JSON',
      data: JSON.stringify({
        data: DataArray,
        skills: skills
      })
    })
    .done((ranking) => {
      ranking = JSON.parse(ranking);
      context.setState({
        keywordsRanking: ranking
      })
      if (context.state.keywordsRanking !== null) {
        context.setState({
          donutChart: true
        })
      }
    })
    .fail(err => {
      console.error('Error occured getting jobs', err);
    });
  }

  getResume() {
    let context = this;
    $.ajax({
      type: 'GET',
      url: '/user',
      datatype: 'json'
    })
    .done((user) => {
      $.ajax({
        url: '/getResume',
        type: 'GET',
        data: {resume_id: user.resume_id},
      })
      .done((resume) => {
        axios.get('/analyzeResume', {
          params: {
            url: resume.resume_url
          }
        })
        .then((text) => {
          // console.log('Inside analytics', text.data);
        });
        context.setState({
          skills: resume.skills.split(','),
          file: resume.resume_url
        });
      })
      .fail(function(err) {
        console.log('failed to GET', err);
      });
    })
    .fail(function(err) {
      console.log('failed to GET', err);
    });
  }

  render() {
    return (
      <div>
        <h1>Hello from SmartAnalysis Component</h1>
        <h4>Watson Tone Analyzer</h4>
        <p>All the content goes here</p>
        <button>Analyze</button>
        <h4>Keywords tracker</h4>
        {this.state.donutChart ?<DonutChart ranking={this.state.keywordsRanking} /> : null}
      </div>
    );
  }
}

export default SmartAnalysis;
