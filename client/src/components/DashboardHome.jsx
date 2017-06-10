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
      sortedChron: true
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.searchIndeed = this.searchIndeed.bind(this);
  }

  componentWillMount() {
    let jobsFromSessions = sessionStorage.getItem('jobs');
    //check and see if results already exist in sessions
    if (jobsFromSessions) {
      this.setState({
        jobs: JSON.parse(jobsFromSessions)
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
    let route = '';
    if (location === undefined) {
      route = '/indeedTopTen';
    } else {
      route = '/indeed';
    }

    $.get(route, {
      search: search,
      location: location
    })
    .done((data) => {
      //store new results in sessionStorage
      sessionStorage.setItem('jobs', JSON.stringify(data));
      this.setState({
        jobs: data,
      });
    })
    .fail(err => {
      console.error('Error occured ', err);
    });
  }
  
  sortJobsByTime(jobs) {
    if (this.state.sortedChron) {
      var sortedJobs = jobs.sort((a, b) => {
        return Date.parse(b.date) - Date.parse(a.date);
      });
    } else {
      var sortedJobs = jobs.sort((a, b) => {
        return Date.parse(a.date) - Date.parse(b.date);
      });
    }
    this.setState({
      jobs: sortedJobs,
      sortedChron: !this.state.sortedChron
    }); 
  }

  render() {
    return (
      <div>
      <button onClick={ () => this.sortJobsByTime(this.state.jobs)}> filter by time </button>
        <div className="row">
          <div className="col-sm-8"> 
          </div>
          <div className="col-sm-4">
            <button onClick= { () => { this.searchIndeed('top ten jobs'); }}> Find 10 Ten Jobs In the US </button>
          </div>
        </div>
        
        <p>&nbsp;</p> 

        {/* First row */}
        <div className="container">
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
          <div className="container wow fadeIn" data-wow-delay="1.5s">
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
          </div>
        </section>
        {/*
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <List>
              <ul className="list-group">
                {this.state.jobs.length ? this.state.jobs.map(job => {
                  return <ListItem className="list-group-item" key={Math.random() * 1000}>
                    <JobListEntry job={job}/>
                  </ListItem>;
                }) : this.state.top10.map(job => {
                  return <ListItem className="list-group-item" key={Math.random() * 1000}>
                    <JobListEntry job={job}/>
                  </ListItem>;
                })}
              </ul>
              </List>
            </div>
          </div>
        </div>
      */}

      </div>
    );
  }
}

export default DashboardHome;
