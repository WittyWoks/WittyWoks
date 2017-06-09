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
      top10: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.searchIndeed = this.searchIndeed.bind(this);
  }

  componentWillMount() {
    this.searchIndeed('top 10 jobs');
    $.get("https://ipinfo.io", function(response) {
      console.log(response.city);
    }, "jsonp");
  }

  handleChange(e) {
    var name = e.target.name;
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
      this.setState({
        jobs: data,
        value: '',
        location: ''
      });
    })
    .fail(err => {
      console.error('Error occured ', err);
    });
  } 

  render() {
    return (
      <div>

        {/* First row */}
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-sm-8">
              <div className="md-form">
                <form onSubmit={this.handleSubmit} className="wow fadeInDown" data-wow-delay="0.2s">
                  <i className="fa fa-search prefix" aria-hidden="true"></i>
                  <input className="form-control" type="text" id="job-search" name="value" value={this.state.value} onChange={this.handleChange}/>
                  <label htmlFor="job-search">Search jobs</label>
                  <input className="form-control" type="text" id="location-search" name="location" value={this.state.location} onChange={this.handleChange}/>
                  <button type="submit" className="btn-sm btn-primary">Search Jobs</button>
                </form>
              </div>
            </div>
          </div>
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
