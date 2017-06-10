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
    backgroundColor: '#E34724',
    padding: '10px'
  },
  cardBody: {
    backgroundColor: '#F5F5F5'
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
      pageNumber: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.searchIndeed = this.searchIndeed.bind(this);
  }

  componentWillMount() {
    //if this.state.jobs has no entires, get entries from sessions instead
    if (!this.state.jobs.length && sessionStorage.totalJobs) {
      var jobsFromSessions = sessionStorage.getItem('totalJobs');
      var pageNumberFromSessions = sessionStorage.getItem('pageNumber');
      jobsFromSessions = JSON.parse(jobsFromSessions);
      
      console.log('sessions happening');
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
  }

  handleSubmit(e) {
    this.searchIndeed(this.state.value, this.state.location);
    e.preventDefault();
  }

  searchIndeed(search, location) {
    if (location === undefined) {
      var route = '/indeedTopTen';
    } else {
      var route = '/indeed';
    }

    $.get(route, {
      search: search,
      location: location
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
    if (this.state.sortedChron) {
      var sortedJobs = this.state.totalJobs.sort((a, b) => {
        return Date.parse(b.date) - Date.parse(a.date);
      });
    } else {
      var sortedJobs = this.state.totalJobs.sort((a, b) => {
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
        <div className="row">
          <div className="col-sm-8"> 
          </div>
          <div className="col-sm-4">
          </div>
        </div>
        
        <p>&nbsp;</p> 

        {/* First row */}
        <div className="container">
          <div className="row">
            <button onClick={ () => this.sortJobsByTime()}> Sort By Time </button>
          </div>
          <div className="row">
            <button onClick= { () => { this.searchIndeed('top jobs in us'); }}> Top Jobs in US </button>
          </div>
          <p>&nbsp;</p> 
          <p>&nbsp;</p> 
        <form onSubmit={this.handleSubmit} className="wow fadeInDown" data-wow-delay="0.2s">
          <div className="row justify-content-center">
            <div className="col-sm-6">
              <div className="md-form">
                  <input type="text" id="job-search" name="value" value={this.state.value} onChange={this.handleChange}/>
                  <label htmlFor="job-search">Search jobs</label>
              </div>
            </div>
            <div className="col-sm-2">
              <div className="md-form">
                  <input type="text" id="location-search" name="location" value={this.state.location} onChange={this.handleChange}/>
                  <label htmlFor="job-search"> Location </label>
              </div>
            </div>
            <div className="col-sm-2">
              <div className="md-form">
                  <button> search jobs </button>
              </div>
            </div>                                    
          </div>
          </form>
        </div>

        {/* Second row */}
        <section>
          <div className="container wow fadeIn" data-wow-delay="0.5s">
            <div className="row justify-content-center">
              <div className="col-sm-8">
                <div className="card">
                  <div style={styles.cardHeader}>
                      <h4 className="card-title text-center" style={styles.jobs}>Jobs</h4>
                  </div>
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
              </div>
            </div>
          <div className="row justify-content-center">
            <div className="col-sm-3"> 
              <button onClick={ () => this.changePage(this.state.pageNumber - 1)}> back </button>
              <button onClick={ () => this.changePage(this.state.pageNumber + 1)}> next </button>
              <button onClick={ () => this.changePage(0)}> 1 </button>
              <button onClick={ () => this.changePage(1)}> 2 </button>
              <button onClick={ () => this.changePage(2)}> 3 </button>
            </div>
          </div>
          </div>
        </section>
      </div>
    );
  }
}

export default DashboardHome;
