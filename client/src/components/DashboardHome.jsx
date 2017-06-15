import React from 'react';
import {List, ListItem} from 'material-ui/List';
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';
import $ from 'jquery';
import JobListEntry from './JobListEntry.jsx';

const styles = {
  jobs: {
    color: 'white'
  },
  cardHeader: {
    backgroundColor: '#00BFA5'
  
    // padding: '10px'
  },
  cardBody: {
    backgroundColor: '#303030'
  },

  prefixColor: {
    color: '#00BFA5'
  }
};

class DashboardHome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      location: '',
      jobs: [],
      top10: [],
      sortedChron: true,
      totalJobs: [],
      pageNumber: '',
      radius: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.searchIndeed = this.searchIndeed.bind(this);
  }

  componentWillMount() {
    //if this.state.jobs has no entires, get entries from sessions instead
    if (!this.state.jobs.length && sessionStorage.totalJobs && JSON.parse(sessionStorage.totalJobs).length > 0) {
      let jobsFromSessions = sessionStorage.getItem('totalJobs');
      let pageNumberFromSessions = sessionStorage.getItem('pageNumber');
      jobsFromSessions = JSON.parse(jobsFromSessions);

      let filteredJobs = jobsFromSessions.filter((job, i) => {
        return i > pageNumberFromSessions * 10 && i < (pageNumberFromSessions + 1) * 10;
      });
      this.setState({
        totalJobs: jobsFromSessions,
        jobs: filteredJobs,
        pageNumber: pageNumberFromSessions
      });
    } else {
      $.get('https://ipinfo.io', (response) => {
        this.searchIndeed('top ten jobs', response.city);
      }, 'jsonp');
    }
  }

  handleChange(e) {
    let name = e.target.name;
    this.state[name] = e.target.value;
    this.setState(this.state);
    setTimeout(() => {
      this.searchIndeed(this.state.value, this.state.location, this.state.radius);
    }, 300);
  }

  handleSubmit(e) {
    this.searchIndeed(this.state.value, this.state.location, this.state.radius);
    e.preventDefault();
  }


  searchIndeed(search, location, radius) {
    let route;
    if (location === undefined) {
      route = '/indeedTopTen';
    } else {
      route = '/indeed';
    }

    $.get(route, {
      search: search,
      location: location, 
      radius: radius
    })
    .done((data) => {
      //store new results in sessionStorage
      sessionStorage.setItem('totalJobs', JSON.stringify(data));
      sessionStorage.setItem('pageNumber', 0);
      let initialJobs = data.filter((job, i) => {
        return i < 10;
      });
      this.setState({
        totalJobs: data,
        jobs: initialJobs,
        pageNumber: 0
      });
    })
    .fail(err => {
      console.error('Error occured ', err);
    });
  }

  sortJobsByTime() {
    let sortedJobs;
    if (this.state.sortedChron) {
      sortedJobs = this.state.totalJobs.sort((a, b) => {
        return Date.parse(b.date) - Date.parse(a.date);
      });
    } else {
      sortedJobs = this.state.totalJobs.sort((a, b) => {
        return Date.parse(a.date) - Date.parse(b.date);
      });
    }
    let jobs = sortedJobs.filter((job, i) => {
      return i < 10;
    });
    this.setState({
      totalJobs: sortedJobs,
      jobs: jobs,
      sortedChron: !this.state.sortedChron
    });

    sessionStorage.setItem('totalJobs', JSON.stringify(sortedJobs));
    sessionStorage.setItem('pageNumber', 0);
  }

  changePage(page) {
    if (page > 2) {
      page = 2;
    }
    if (page < 0) {
      page = 0;
    }
    let nextJobs = this.state.totalJobs.filter((a, i) => {
      return i > page * 10 && i < (page + 1) * 10;
    });
    this.setState({
      jobs: nextJobs,
      pageNumber: page
    });

    sessionStorage.setItem('pageNumber', page);
  }

  render() {
    return (
      <div>
        {/* First row */}
        <br />
        <br />

        <div className="container">
          <form onSubmit={this.handleSubmit} className="wow fadeInDown" data-wow-delay="0.2s">
            <div className="row justify-content-center">
              <div className="col-sm-6">
                <div className="md-form">
                  <i className="fa fa-search prefix" style={styles.prefixColor} aria-hidden="true"></i>
                  <input className="primary-text" placeholder="Search Jobs" type="text" id="job-search" name="value" style={{fontSize: '30px'}} value={this.state.value} onChange={this.handleChange}/>
                  <label htmlFor="job-search" style={{fontSize: '27px', top: '-8px'}} ></label>
                </div>
              </div>
              <div className="col-sm-6">
                <div className="md-form">
                  <i className="fa fa-map-marker prefix" style={styles.prefixColor} aria-hidden="true"></i>
                  <input className="primary-text" placeholder="Location" type="text" id="location-search" name="location" style={{fontSize: '30px'}} value={this.state.location} onChange={this.handleChange}/>
                  <label htmlFor="location-search" style={{fontSize: '27px', top: '-8px'}}></label>
                </div>

              </div>
            </div>
          </form>
        </div>

        {/* Second row */}
        <section>
          <div className="container-fluid wow fadeIn" data-wow-delay="0.5s">
            <div className="row justify-content-center">
              <div className="col-sm-3"> 
                <div className="md-form"> Radius 
                  <div>
                    <h3 className="primary-text"> FILTER RESULTS BY: </h3>
                    <br />
                    <div> 
                      <h4 className="primary-text"> Sort By: </h4>
                      <button className="btn btn-default btn-sm" onClick={ () => this.sortJobsByTime()}> Time </button>
                      <h4 className="primary-text"> Distance: </h4>
                      <div>
                        <select className="select-field primary-text" name="radius" value={this.state.selectValue} onChange={this.handleChange}>
                          <option value="0">Exact location</option>
                          <option value="5">within 5 miles</option>
                          <option value="10">within 10 miles</option>
                          <option value="15">within 15 miles</option>
                          <option value="20">within 20 miles</option>
                          <option value="50">within 50 miles</option>
                          <option value="100">within 100 miles</option>
                        </select>  
                      </div>
                    </div>
                  </div>
                </div>    
                <div>
                  <h4 className="primary-text"> Top Jobs in the US </h4>
                  <button className="btn btn-default btn-sm" onClick= { () => { this.searchIndeed('top jobs in us'); }}> Top Jobs </button>        
                </div>
              </div>
              <div className="col-sm-7"> 
                <div className="card">
                  {/*<div style={styles.cardHeader} className="text-center primary-text card-header" >
                      Jobs
                  </div>*/}
 
                  <div className="row justify-content-center">
                  <div className="card-block" style={styles.cardBody}>
                      <div className="list-group">
                        {this.state.jobs.length ? this.state.jobs.map(job => {
                          return (
                            <JobListEntry job={job} key={Math.random() * 1000}/>
                          );
                        }) : this.state.top10.map(job => {
                          return (
                            <JobListEntry job={job} key={Math.random() * 1000}/>
                          );
                        })}
                    </div>
                  </div>
                </div>
                  <div className="row justify-content-center" style={{background: '#303030'}}>
                    {this.state.pageNumber > 0 ?
                      <button className="btn btn-default btn-sm rounded" onClick={ () => this.changePage(this.state.pageNumber - 1)}> back </button>
                    : null }
                    <button className="btn btn-default btn-sm rounded" onClick={ () => this.changePage(0)}> 1 </button>
                    <button className="btn btn-default btn-sm rounded" onClick={ () => this.changePage(1)}> 2 </button>
                    <button className="btn btn-default btn-sm rounded" onClick={ () => this.changePage(2)}> 3 </button>
                    {this.state.pageNumber < 2 ?
                      <button className="btn btn-default btn-sm rounded" onClick={ () => this.changePage(this.state.pageNumber + 1)}> next </button>
                    : null }
                    
                  </div>
               
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default DashboardHome;
