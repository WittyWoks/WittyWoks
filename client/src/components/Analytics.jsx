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
import LineChart from './C3Components/LineChart.jsx';
import PercentChart from './C3Components/PercentChart.jsx';
import axios from 'axios';




class Analytics extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      // barChartJobsApplied: null,
      // barChartDates: null
    }
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
          console.log('Success getting jobs!', jobs.data);
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

          console.log(yAxis);
          console.log(xAxis);
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
                <LineChart />
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
          </div>
        </div>
      </div>

    );
  }
}

export default Analytics;