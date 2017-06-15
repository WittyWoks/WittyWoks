import React from 'react';
import $ from 'jquery';
import axios from 'axios';
import Dialog from 'material-ui/Dialog';
import Snackbar from 'material-ui/Snackbar';
import PercentChart from './C3Components/PercentChart.jsx';
import Chip from 'material-ui/Chip';

const styles = {
  card: {
    backgroundColor: '#424242'
  },
  chip: {
    margin: 4
  },
  wrapper: {
    display: 'flex',
    flexWrap: 'wrap'
  }
};  

class CompanyInfo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      jobs: [],
      open: false,
      openSnack: false,
      skills: [],
      wordMatch: null,
      progressChart: false,
      matchingSkills: [],
      loaded: false
    };

    this.searchGlassDoor = this.searchGlassDoor.bind(this);
    this.appliedJob = this.appliedJob.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.goBack = this.goBack.bind(this);
    this.handleTouchTap = this.handleTouchTap.bind(this);
    this.handleRequestClose = this.handleRequestClose.bind(this);
    console.log('in constructor', this.props.location.state);
  }

  componentDidMount() {
    this.getResume();
    this.searchGlassDoor(this.props.location.state.company);
  }

  handleOpen() {
    this.setState({open: true});
  }

  handleClose() {
    this.setState({open: false});
  }

  getResume() {
    let context = this;
    $.ajax({
      type: 'GET',
      url: '/user',
      datatype: 'json'
    })
    .done((user) => {
      $.ajax({
        url: '/getResume',
        type: 'GET',
        data: {resume_id: user.resume_id},
      })
      .done((text) => {
        context.setState({
          skills: text.skills.split(','),
        });
        this.MatchRating();
      })
      .fail(function(err) {
        console.log('failed to GET', err);
      });
    });
  }

  MatchRating() {
    let context = this;
    $.ajax({
      type: 'POST',
      url: '/jobMatchRanking',
      contentType: 'application/JSON',
      data: JSON.stringify({
        data: this.props.location.state,
        skills: context.state.skills
      })
    })
    .done((data) => {
      data = JSON.parse(data);
      context.setState({
        wordMatch: data,
      });
      if (context.state.wordMatch !== null) {
        context.setState({
          progressChart: true
        });
      }
      for (let key in context.state.wordMatch) {
        if (context.state.wordMatch[key] > 0) {
          context.state.matchingSkills.push(key);
        }
      }
      context.setState({
        loaded: true,
      });
    })
    .fail(err => {
      console.error(err);
    });
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
      console.log('Arrays are here', data);
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
        let job = {
          glassDoor: context.state.jobs[0],
          indeed: context.props.location.state
        };

        axios.post('/ReturnJobsApplied', {
          google_id: data.id,
          jobId: job.id,
          jobData: JSON.stringify(job)
        })
        .then(() => {
          // console.log('Success within adding this job!');
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

  // Needed to render skills chips (Material-UI component)
  renderChip(data) {
    return (
      <Chip style={styles.chip} key={Math.random() * 1000}>
        {data}
      </Chip>
    );
  }

  render() {

    const jobInfo = this.props.location.state;
    const actions = [
      <button type="button" className="btn btn-default" onTouchTap={this.handleClose}>Cancel</button>,
      <a className="btn btn-primary" href="/auth/google"><i className="fa fa-google" aria-hidden="true"></i> Log In</a>
    ];

    return (
      <div className="container wow fadeIn" data-wow-delay="0.2s">
        {this.state.jobs.length && this.state.loaded === true ? this.state.jobs.map((job, i) => {
          if (i === 0) {
            return (
              <div className="card-group">
                
                {/* Card one */}
                <div className="card" style={styles.card}>
                  <div className="equal-height card-block">
                    <img className="img-fluid mx-auto d-block z-depth-3" src={job.squareLogo} alt={job.name} size="125"/>
                  </div>
                  <hr/>
                  <div className="card-block">
                    <h4 className="card-title primary-text">{jobInfo.company}<span><h6><small className="text-muted">{jobInfo.formattedLocation}</small></h6></span></h4>
                    <h6 className="card-text secondary-text">{jobInfo.jobtitle}</h6>
                    <p className="card-text secondary-text">{jobInfo.snippet}</p>
                    <a className="btn btn-primary" role="button" href={`${jobInfo.url}`} target="blank">Apply Now!</a>
                    <a className="btn btn-default"><i className="fa fa-thumbs-up left"></i> Applied!</a>
                    <p className="card-text disabled-text"><small className="text-muted">Posted {jobInfo.formattedRelativeTime}</small></p>
                  </div>
                </div>

                {/* Card two */}
                <div className="card" style={styles.card}>
                  <div className="equal-height card-block">
                    <p className="secondary-text">Overall Rating <span className="badge badge-primary badge-pill">{job.overallRating || 'N/A'}</span></p>
                    <p className="secondary-text">Work Life Balance <span className="badge badge-primary badge-pill">{job.workLifeBalanceRating || 'N/A'}</span></p>
                    <p className="secondary-text">Culture and Values <span className="badge badge-primary badge-pill">{job.cultureAndValuesRating || 'N/A'}</span></p>
                    <p className="secondary-text">Career Opportunities <span className="badge badge-primary badge-pill">{job.careerOpportunitiesRating || 'N/A'}</span></p>
                    <p className="secondary-text">Compensation & Benfits <span className="badge badge-primary badge-pill">{job.compensationAndBenefitsRating || 'N/A'}</span></p>
                    { job.name ?
                        <h6 className="secondary-text disabled-text">
                          {job.name} is led by CEO <a target="_blank" href={'http://www.google.com/search?q=' + job.ceo.name + ' ' + job.name}>{job.ceo.name}</a>
                        </h6>
                      :
                      null
                    }
                  </div>
                  <hr/>
                  <div className="card-block">
                    <h4 className="card-title primary-text">{jobInfo.company}<span><h6><small className="text-muted">{jobInfo.formattedLocation}</small></h6></span></h4>
                    <h6 className="card-text secondary-text">{jobInfo.jobtitle}</h6>
                    <p className="card-text secondary-text">{jobInfo.snippet}</p>
                    <a className="btn btn-primary" role="button" href={`${jobInfo.url}`} target="blank">Apply Now!</a>
                    <a className="btn btn-default"><i className="fa fa-thumbs-up left"></i> Applied!</a>
                    <p className="card-text disabled-text"><small className="text-muted">Posted {jobInfo.formattedRelativeTime}</small></p>
                  </div>
                </div>

                {/* Card three */}
                <div className="card" style={styles.card}>
                  <div className="equal-height">
                      <div style={styles.wrapper}>
                        {this.state.progressChart ? <PercentChart data ={this.state.wordMatch} /> : null}
                        {this.state.matchingSkills.map(this.renderChip, this)}
                        <p className="card-text disabled-text"><small className="text-muted"></small></p>
                      </div>
                      </div>
                      <hr/>
                    <div className="card-block">
                        <h4 className="card-title primary-text">Card title</h4>
                        <p className="card-text secondary-text">This is a wider card with supporting text below as a natural lead-in to additional content. This card has even longer content than the first to show that equal height action.</p>
                    </div>
                </div>

              </div>
            );
          }
        }) : null}
      </div>
    );
  }
}

export default CompanyInfo;
