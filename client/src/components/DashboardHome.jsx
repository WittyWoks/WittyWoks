import React from 'react';
import {List, ListItem} from 'material-ui/List';
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';
import $ from 'jquery';

class DashboardHome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      jobs: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.searchIndeed = this.searchIndeed.bind(this);
  }

  handleChange(e) {
    this.setState({
      value: e.target.value,
    });
    // console.log(e.target.value);
  }

  handleSubmit(e) {
    this.searchIndeed(this.state.value);
    e.preventDefault();
  }

  searchIndeed(search) {
    $.get('/indeed', {
      search: search
    })
    .done((data) => {
      console.log('Job DATA', data);      
      this.setState({
        jobs: data
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
          <div className="row">
            <div className="col-sm-12">
              <div className="md-form">
                <i className="fa fa-search prefix" aria-hidden="true"></i>
                <form onSubmit={this.handleSubmit}>
                  <input type="text" id="job-search" className="form-control" value={this.state.value} onChange={this.handleChange}/>
                  <label htmlFor="job-search">Search jobs</label>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* Second row */}
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <List>
              <ul className="list-group">
                {this.state.jobs.length ? this.state.jobs.map(job => {
                  return <ListItem className="list-group-item" key={Math.random() * 1000}>
                    {job.company} <br/>
                    {job.jobtitle} - {job.city} </ListItem>;
                }) : null}
              </ul>
              </List>
            </div>
          </div>
        </div>
        
      </div>
    );
  }
}

export default DashboardHome;
