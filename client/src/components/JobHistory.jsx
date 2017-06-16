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
import Loader from 'halogen/SkewLoader';

import {Tabs, Tab} from 'material-ui/Tabs';

const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
  },
  card: {
    backgroundColor: '#424242',
    // maxWidth: '500'
  },
};


class JobHistory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      barChartDates: null,
      barChartJobsApplied: null,
      jobsAppliedTo: null,
      loaded: false,
      value: 'a',
    };
    this.fetchAllAppliedJob();
    this.handleChange = this.handleChange.bind(this);
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
          let datesObj = {};
          let yAxis = ['Applied'];
          let xAxis = [];

          jobs.data.forEach((job) => {
            let convertedDate = (new Date(job.created_at)).toDateString().substring(0, 10);
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

  handleChange(value) {
    this.setState({
      value: value,
    });
  }

  goToJob(url) {
    window.location = url;
  }

  render() {
    return (
      <div>
        <section className="container wow fadeIn" data-wow-delay="0.2s">
          <div className="divider-new">
            <h2 className="h2-responsive primary-text">Application Rate</h2>
          </div>

          {/* First Row */}

          <div className="card-deck">
            <div className="card wow fadeIn" style={styles.card} data-wow-delay="2s">
              <div className="card-block">
                {this.state.loaded === false ?
                  <div className="row">
                    <div className="col-lg-1 load-centered">
                      <Loader color="#26A65B" size="16px" margin="4px" position='center'/>
                    </div>
                  </div>
                  :
                 <BarChart barChartData={this.state} />
                }
              </div>
            </div>
          </div>
        </section>


        <br />
        <br />
        {/* Second Row */}
        <section className="container wow fadeIn" data-wow-delay="4s">
          <div className="divider-new">
            <h2 className="h2-responsive primary-text">Jobs Applied To</h2>
          </div>
          <div className="wow fadeIn secondary-text" style={styles.card}>
            {this.state.loaded === false ?
              <div className="row">
                <div className="col-lg-1 load-centered">
                  <Loader color="#26A65B" size="16px" margin="4px" position='center'/>
                </div>
              </div>
              :
                <div className="primary-text">
                      <br />
                        {this.state.jobsAppliedTo.map((job, idx) => {
                          let parsedJob = JSON.parse(job.job_data);
                          let jobIndeed = parsedJob.indeed;
                          return (
                            <div className="media mb-1 newHover" onClick={() => { this.goToJob(jobIndeed.url); }}>
                              <a className="media-left waves-light">
                                  <img className="rounded-circle" style={{height: '80px'}} src={parsedJob.glassDoor.squareLogo} alt="No Image" />
                              </a>
                              <div className="media-body">
                                  <h4 className="media-heading">{jobIndeed.company}</h4>
                                  <div> {jobIndeed.jobtitle} </div>
                                  <div> {jobIndeed.city} </div>
                              </div>
                            </div>
                          );
                        })}
                </div>
            }
            </div>
          </section>
      </div>
    );
  }
}

export default JobHistory;


/* All the old graphs originally implemented by Jeff are below
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

                </tbody>
              </table>
            }
            </div>



*/
