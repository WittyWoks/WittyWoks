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

import {Tabs, Tab} from 'material-ui/Tabs';

const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
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
      <div className="container">
        
        {/* First Row */}
        <div className="row ">
          <div className="col-sm-8">

              <div className="col-sm-12">
              { this.state.loaded === false ? 
                <p>Loading...</p>
               :
               <div>
                  <div className="divider-new">
                    <h4 className="primary-text" style={{fontSize: '45px'}}>Application Rate</h4>
                  </div>
                    <br />
                    <BarChart barChartData={this.state} />
              </div>
              }
              </div>
         
          </div>
        </div>
        <br />
        <br />
        {/* Second Row */}
        <div className="row">
          <div className="col-sm-8">

            {this.state.loaded === false ?
                <p>Loading...</p>
              :
                <div className="primary-text">
                  <div className="divider-new">
                    <h4 className="primary-text" style={{fontSize: '45px'}}>Jobs Applied To </h4>
                  </div>
                      <br />
                        {this.state.jobsAppliedTo.map((job, idx) => {
                          let parsedJob = JSON.parse(job.job_data);
                          let jobs = parsedJob.indeed;
                          return (
                            <div className="media mb-1" onClick={() => { this.goToJob(jobs.url); }}>
                              <a className="media-left waves-light">
                                  <img className="rounded-circle" style={{height: '100px'}} src={parsedJob.glassDoor.squareLogo} alt="Generic placeholder image" />
                              </a>
                              <div className="media-body">
                                  <h4 className="media-heading">{jobs.company}</h4>
                                  <div> {jobs.jobtitle} </div>
                                  <div> {jobs.city} </div>
                              </div>
                            </div>
                          );
                        })}
                </div>
            }
          </div>
        </div>
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
                  })}"{"glassDoor":{"id":471,"name":"Neiman Marcus","website":"www.neimanmarcus.com","isEEP":false,"exactMatch":false,"industry":"Department, Clothing, & Shoe Stores","numberOfRatings":908,"squareLogo":"https://media.glassdoor.com/sqll/471/neiman-marcus-squarelogo.png","overallRating":"3.1","ratingDescription":"OK","cultureAndValuesRating":"3.0","seniorLeadershipRating":"2.7","compensationAndBenefitsRating":"3.0","careerOpportunitiesRating":"2.7","workLifeBalanceRating":"2.9","recommendToFriendRating":49,"sectorId":10022,"sectorName":"Retail","industryId":200105,"industryName":"Department, Clothing, & Shoe Stores","featuredReview":{"attributionURL":"http://www.glassdoor.com/Reviews/Employee-Review-Neiman-Marcus-RVW15406516.htm","id":15406516,"currentJob":true,"reviewDateTime":"2017-06-09 09:04:09.167","jobTitle":"Employee","location":"","headline":"Employees are great to work with","pros":"Friendly working environment at this company","cons":"no cons for me here","overall":4,"overallNumeric":4},"ceo":{"name":"Karen W. Katz","title":"President, CEO, and Director","numberOfRatings":439,"pctApprove":74,"pctDisapprove":26,"image":{"src":"https://media.glassdoor.com/people/sqll/471/neiman-marcus-karen-w-katz.png","height":200,"width":200}}},"indeed":{"jobtitle":"Junior Commercial Real Estate Agent","company":"Marcus & Millichap","city":"San Francisco","state":"CA","country":"US","language":"en","formattedLocation":"San Francisco, CA","source":"Marcus & Millichap","date":"Fri, 28 Apr 2017 05:17:36 GMT","snippet":"And seven-figures within your first ten years. This is a unique opportunity working directly with an experienced, highly successful Senior agent(s) in one of...","url":"https://www.indeed.com/viewjob?jk=32b9c1654d06a6b0&qd=0wCtTIOMpXku87cxKGc85J3RpYL0SzdVzAXyc7SAHESKeFcf3QCr16BftLIezYtJcHPwrN_mn3Vp3iHanA-VLLcfZ38MRnr1AL9f-B29AeaQhwggWUZEvHtN5OcDtAPb&indpubnum=2321237742722632&chnl=%3Crequired%3E&atk=1bimdl7voaeoo90e","onmousedown":"indeed_clk(this,'7952');","jobkey":"32b9c1654d06a6b0","sponsored":false,"expired":false,"indeedApply":true,"formattedLocationFull":"San Francisco, CA","formattedRelativeTime":"30+ days ago","stations":""}}"
                </tbody>
              </table>
            }
            </div>
          </div>
        </div>
      </div>
*/