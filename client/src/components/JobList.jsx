import React from 'react';
import JobListEntry from './JobListEntry.jsx';
import $ from 'jquery';


class JobList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      jobs: []
    };

    this.searchGlassDoor = this.searchGlassDoor.bind(this);
  }

  componentDidMount() {
    this.searchGlassDoor('Telltale');
  }
  
  searchGlassDoor(search) {
    $.get('/glassDoor', {
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
    const job = this.state.jobs;
    return (
      <div>
        <h1>Hello from JobList Component</h1>
        <ul className="list-group">
          {this.state.jobs.length ? this.state.jobs.map(job => {
            return <li className="list-group-item" key={Math.random() * 1000}>
              <img src={job.squareLogo} /> <br/>
              {job.name} 
              <a href={job.website} />
              </li>;
          }) : null}
        </ul>
        <JobListEntry />
      </div>
    );
  }
}

export default JobList;
