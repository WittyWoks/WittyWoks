import React from 'react';
import $ from 'jquery';
import axios from 'axios';
import Dialog from 'material-ui/Dialog';
import Snackbar from 'material-ui/Snackbar';

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
      open: false,
      openSnack: false
    };

    this.searchGlassDoor = this.searchGlassDoor.bind(this);
    this.appliedJob = this.appliedJob.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.goBack = this.goBack.bind(this);
    this.handleTouchTap = this.handleTouchTap.bind(this);
    this.handleRequestClose = this.handleRequestClose.bind(this);
  }

  componentDidMount() {
    this.searchGlassDoor(this.props.location.state.company);
  }

  handleOpen() {
    this.setState({open: true});
  }

  handleClose() {
    this.setState({open: false});
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
    let context = this;
    $.ajax({
      type: 'GET',
      url: '/user',
      datatype: 'json'
    })
    .done(data => {
      if (data.email) {
        let job = context.state.jobs[0];
        axios.post('/ReturnJobsApplied', {
          google_id: data.id,
          jobId: job.id,
          jobData: JSON.stringify(job)
        })
        .then(() => {
          console.log('Success within adding this job!');
        })
        .catch(err => {
          console.error('Error occured getting jobs', err);
        });
      }
    })
    .fail(function(err) {
      console.error('Failed to thumbs up a job', err);
    });
  }

  goBack() {
    window.history.back();
  }

  handleTouchTap() {
    this.setState({
      openSnack: true,
    });
  }

  handleRequestClose() {
    this.setState({
      openSnack: false,
    });
  }

  render() {
    
    const jobInfo = this.props.location.state;
    const actions = [
      <button type="button" className="btn btn-default" onTouchTap={this.handleClose}>Cancel</button>,
      <a className="btn btn-primary" href="/auth/google"><i className="fa fa-google" aria-hidden="true"></i> Log In</a>
    ];

    return (
      <div className="container wow fadeIn" data-wow-delay="0.2s">
        <div className="card">
          <div style={styles.cardHeader}>
            <h4 className="card-title text-center" style={styles.jobs}>Company Info</h4>
            <button onClick={this.goBack}>Go Back</button>
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
          { this.props.loggedIn === false ? 
            <button className="btn btn-mdb" 
              onClick={this.handleOpen} 
              onTouchTap={this.handleTouchTap}
              label="Add to my calendar" >Thumbs Up</button>
           :
            <button className="btn btn-mdb" 
              onClick={this.appliedJob} 
              onTouchTap={this.handleTouchTap}
              label="Add to my calendar">Thumbs Up</button>
          }
          <Dialog
            title="Log in to continue"
            actions={actions}
            modal={false}
            open={this.state.open}
            onRequestClose={this.handleClose}
          >
            Please log in to use this feature.
          </Dialog>
          <Snackbar
            open={this.state.openSnack}
            message="Yay! You've applied to this job!"
            autoHideDuration={4000}
            onRequestClose={this.handleRequestClose}
          />
        </div>
      </div>
    );
  }
}

export default CompanyInfo;
