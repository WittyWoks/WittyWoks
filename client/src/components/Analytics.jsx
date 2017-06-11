import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import {Link} from 'react-router-dom';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import $ from 'jquery';
import ReactDOM from 'react-dom';

import DonutChart from './C3Components/DonutChart.jsx';
import PieChart from './C3Components/PieChart.jsx';
import BarChart from './C3Components/BarChart.jsx';
import PercentChart from './C3Components/PercentChart.jsx';
import axios from 'axios';




class Analytics extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      barChartDates: null,
      barChartJobsApplied: null,
      jobsAppliedTo: null,
      loaded: false
    };
    this.fetchAllAppliedJob();
  }

  fetchAllAppliedJob() {
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

          console.log('Success getting jobs!', jobs);
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
        })
        .catch(err => {
          console.error('Error occured getting jobs', err);
        });
      }
    });
  }

  render() {
    return (
      <div>
        <div className="container wow fadeIn" data-wow-delay="1.5s">
          <div className="row justify-content-center">
            <div className="card text-center z-depth-2">
              <div className="card-block">
                <h3 className="card-header default-color-dark white-text">Applied Jobs</h3>
                { this.state.loaded === false ?
                  <p>Loading...</p>
                 :
                  <BarChart barChartData={this.state} />
                }
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec suscipit ullamcorper diam eu aliquam. Pellentesque nisl ligula, euismod in urna nec, semper porttitor purus. Sed commodo velit magna, eget pulvinar nunc hendrerit in. Morbi ipsum sapien, faucibus eget imperdiet non, sollicitudin eu lectus. Donec non ultricies tellus. Vestibulum sit amet bibendum massa. Sed lorem urna, fringilla vel posuere vulputate, consectetur a ante.</p>
              </div>
            </div>
              <p></p>
            <div className="card text-center z-depth-2">
              <div className="card-block">
                <h3 className="card-header default-color-dark white-text">Resume Keywords Matches</h3>
                <p></p>
                <DonutChart />
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec suscipit ullamcorper diam eu aliquam. Pellentesque nisl ligula, euismod in urna nec, semper porttitor purus. Sed commodo velit magna, eget pulvinar nunc hendrerit in. Morbi ipsum sapien, faucibus eget imperdiet non, sollicitudin eu lectus. Donec non ultricies tellus. Vestibulum sit amet bibendum massa. Sed lorem urna, fringilla vel posuere vulputate, consectetur a ante.</p>
              </div>
            </div>
              <p></p>
            <div className="card text-center z-depth-2">
              <div className="card-block">
                <h3 className="card-header default-color-dark white-text">Percentage of Rejections</h3>
                <p></p>
                <PieChart />
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec suscipit ullamcorper diam eu aliquam. Pellentesque nisl ligula, euismod in urna nec, semper porttitor purus. Sed commodo velit magna, eget pulvinar nunc hendrerit in. Morbi ipsum sapien, faucibus eget imperdiet non, sollicitudin eu lectus. Donec non ultricies tellus. Vestibulum sit amet bibendum massa. Sed lorem urna, fringilla vel posuere vulputate, consectetur a ante.</p>
              </div>
            </div>
              <p></p>
            <div className="card text-center z-depth-2">
              <div className="card-block">
                <h3 className="card-header default-color-dark white-text">Percent</h3>
                <p></p>
                <PercentChart />
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec suscipit ullamcorper diam eu aliquam. Pellentesque nisl ligula, euismod in urna nec, semper porttitor purus. Sed commodo velit magna, eget pulvinar nunc hendrerit in. Morbi ipsum sapien, faucibus eget imperdiet non, sollicitudin eu lectus. Donec non ultricies tellus. Vestibulum sit amet bibendum massa. Sed lorem urna, fringilla vel posuere vulputate, consectetur a ante.</p>
              </div>
            </div>
              <p></p>
          </div>
          <div className="row">
            <div className="col-sm-12">
            {this.state.loaded === false ?
              <p>Loading...</p>
            :
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Company</th>
                    <th>Job Title</th>
                    <th>Location</th>
                    <th>Posting</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.jobsAppliedTo.map((job, idx) => {
                    let parsedJob = JSON.parse(job.job_data);
                    return (
                      <tr key={idx}>
                        <th>{idx + 1}</th>
                        <td>{parsedJob.indeed.company}</td>
                        <td>{parsedJob.indeed.jobtitle}</td>
                        <td>{parsedJob.indeed.city}</td>
                        <td><a target="_blank" href={parsedJob.indeed.url}>Link</a></td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Analytics;
