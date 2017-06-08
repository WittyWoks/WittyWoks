import React from 'react';
import $ from 'jquery';
import axios from 'axios';

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

class CompanyInfo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      jobs: [],
    };

    this.searchGlassDoor = this.searchGlassDoor.bind(this);
    this.appliedJob = this.appliedJob.bind(this);
  }

  componentDidMount() {
    this.searchGlassDoor(this.props.location.state.company);
  }
  
  searchGlassDoor(search) {
    $.get('/glassDoor', {
      search: search
    })
    .done((data) => {
      if (data.length === 0) {
        this.setState({
          jobs: [this.props.location.state]
        });
      } else {
        this.setState({
          jobs: data
        });
      }
    })
    .fail(err => {
      throw err;
    });
  }

  appliedJob() {
    $.ajax({
      type: 'GET',
      url: '/user',
      datatype: 'json'
    })
    .done(function(data) {
      if (data.email) {
        axios.post('/ReturnJobsApplied', {
          google_id: data.id
        })
          .then(results => {
            console.log('Results from Axios Job Get', results);
          })
          .catch(err => {
            console.error('Error occured getting jobs', err);
          });
      }
    })
    .fail(function(err) {
      console.log('failed to GET', err);
    });
  }

  getappliedJob() {
    $.ajax({
      type: 'GET',
      url: '/user',
      datatype: 'json'
    })
    .done(function(data) {
      if (data.email) {
        axios.get('/ReturnJobsApplied', {
          params: {
            google_id: data.id
          }
        })
          .then(results => {
            console.log('Results from Axios Job Get', results);
          })
          .catch(err => {
            console.error('Error occured getting jobs', err);
          });
      }
    })
    .fail(function(err) {
      console.log('failed to GET', err);
    });
  }
  

  render() {
    
    const jobInfo = this.props.location.state;

    return (
      <div className="container wow fadeIn" data-wow-delay="0.2s">
        <div className="card">
          <div style={styles.cardHeader}>
            <h4 className="card-title text-center" style={styles.jobs}>Company Info</h4>
          </div>
          <br/>
          {/* Single Job Listing */}
          <div className="row justify-content-center">
            {this.state.jobs.length ? this.state.jobs.map((job, i) => {
              if (i === 0) {
                return <div className="col-md-4 col-md-offset-5" key={Math.random() * 1000}>
                  <div className="card">
                    <img src={job.squareLogo} className="image-fluid card-img-top" alt="Image Not Found" />
                  </div>
                  <div className="card-block text-center">
                    <h2 className="media-heading">{job.name}</h2>
                    <h4>{jobInfo.jobtitle}</h4>
                    <p>{jobInfo.snippet}</p>
                    <a className="btn btn-warning" role="button" href={`${jobInfo.url}`} target="blank">Apply Now!</a>
                  </div>

                  {/* Company Ratings */}
                  <div className="row">
                    <div className="col-md-4">Overall Rating: <strong>{job.overallRating || 'N/A'}</strong></div>
                    <div className="col-md-4">Work Life Balance: <strong>{job.workLifeBalanceRating || 'N/A'}</strong></div>
                    <div className="col-md-4">Culture and Values: <strong>{job.cultureAndValuesRating || 'N/A'}</strong></div>
                  </div>
                </div>;
              }
            }) : null} 
          </div>
          <button className="btn btn-mdb" onClick={this.appliedJob}>Thumbs Up</button>
        </div>
      </div>
    );
  }
}

export default CompanyInfo;
