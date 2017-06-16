import React from 'react';
import $ from 'jquery';
import axios from 'axios';
import Dialog from 'material-ui/Dialog';
import Snackbar from 'material-ui/Snackbar';
import PercentChart from './C3Components/PercentChart.jsx';
import Chip from 'material-ui/Chip';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import NavigationBack from 'material-ui/svg-icons/navigation/arrow-back';

const styles = {
  card: {
    backgroundColor: '#424242'
  },
  chip: {
    margin: 4
  },
  wrapper: {
    display: 'flex',
    flexWrap: 'wrap',
    paddingLeft: '25px'
  },
  snackbar: {
    background: '#212121',
  },
  login: {
    height: '200px'
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
      openSnack: false
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
      <div className="container wow fadeIn" data-wow-delay="0.6s">
        <FloatingActionButton backgroundColor="#00BFA5" className="fab" zDepth="5" onClick={this.goBack}>
          <NavigationBack />
        </FloatingActionButton>
        {this.state.jobs.length ? this.state.jobs.map((job, i) => {
          if (i === 0) {
            return (
              <div className="card-group">
                
                {/* Card one */}
                <div className="card" style={styles.card}>
                  {/* Top of card */}
                  <div className="equal-height" id="job-logo">
                    <a target="_blank" href={'http://' + job.website}><img className="img-fluid mx-auto d-block z-depth-3" src={job.squareLogo} alt={job.name} size="125"/></a>
                  </div>
                  <hr/>
                  <div className="card-block">
                    <h4 className="card-title highlight-text">{jobInfo.company}<span><h6><small className="text-muted">{jobInfo.formattedLocation}</small></h6></span></h4>
                    <h6 className="card-text secondary-text">{jobInfo.jobtitle}</h6>
                    <p className="card-text secondary-text">{jobInfo.snippet}</p>
                    <a className="btn btn-primary" role="button" href={`${jobInfo.url}`} target="blank">Apply Now!</a>
                    { this.props.loggedIn ?
                      <a className="btn btn-default" onClick={this.appliedJob} onTouchTap={this.handleTouchTap}><i className="fa fa-thumbs-up left"></i> Applied!</a>
                    :
                      <a className="btn btn-default" onClick={this.handleOpen}><i className="fa fa-thumbs-up left"></i> Applied!</a>
                    }
                    <p className="card-text disabled-text"><small className="text-muted">Posted {jobInfo.formattedRelativeTime}</small></p>
                  </div>
                </div>

                {/* Card two */}
                <div className="card" style={styles.card}>
                  {/* Top of card */}
                  <div className="equal-height" id="job-ratings">
                    <p className="secondary-text">Overall Rating <span className="badge badge-primary badge-pill">{job.overallRating || 'N/A'}</span></p>
                    <p className="secondary-text">Work Life Balance <span className="badge badge-primary badge-pill">{job.workLifeBalanceRating || 'N/A'}</span></p>
                    <p className="secondary-text">Culture and Values <span className="badge badge-primary badge-pill">{job.cultureAndValuesRating || 'N/A'}</span></p>
                    <p className="secondary-text">Career Opportunities <span className="badge badge-primary badge-pill">{job.careerOpportunitiesRating || 'N/A'}</span></p>
                    <p className="secondary-text">Compensation & Benfits <span className="badge badge-primary badge-pill">{job.compensationAndBenefitsRating || 'N/A'}</span></p>
                    { job.ceo ?
                        <h6 className="secondary-text disabled-text">
                          {job.name} is led by CEO <a target="_blank" href={'http://www.google.com/search?q=' + job.ceo.name + ' ' + job.name}>{job.ceo.name}</a>
                        </h6>
                      :
                      null
                    }
                  </div>
                  <hr/>
                  <div className="card-block">
                    <h4 className="card-title highlight-text">Company ratings</h4>
                    { job.numberOfRatings && job.ratingDescription ?
                      <p className="card-text secondary-text">
                        Located in {jobInfo.formattedLocation}, {jobInfo.company} is a company in the {job.industryName} industry. 
                        Out of {job.numberOfRatings} Glassdoor.com reviews, {job.name} has an overall rating of {job.overallRating}, 
                        leaving employees feeling &#34;{job.ratingDescription}&#34; with the company.
                      </p>
                      :
                        <p className="disabled-text">This company hasn't been rated on Glassdoor yet.</p>
                      }
                  </div>
                </div>

                {/* Card three */}
                <div className="card" style={styles.card}>
                  {/* Top of card */}
                  <div className="equal-height" id="skills-graph">
                      {this.state.progressChart && this.props.loggedIn ? 
                        <PercentChart data ={this.state.wordMatch} />
                      : 
                        <div className="row h-100">
                          <div className="col-sm-12 my-auto">
                            <p className="text-center disabled-text">Please log in to view graphs</p>
                          </div>
                        </div>
                      }
                      </div>
                      <hr/>
                    <div className="card-block">
                        <h4 className="card-title highlight-text">Skills match</h4>
                        { this.props.loggedIn ?
                          <p className="card-text secondary-text">
                            After examining your resume and {jobInfo.company}'s posting, your resume matched
                            the following skills:
                          </p>
                        :
                          <p className="card-text secondary-text">
                            Once you log in, we'll assess the skills on your resume with the skills required for the job!
                          </p>
                        }
                        <div style={styles.wrapper}>
                          {this.state.matchingSkills.map(this.renderChip, this)}
                          <p className="card-text disabled-text"><small className="text-muted"></small></p>
                        </div>
                    </div>
                </div>

              </div>
            );
          }
        }) : null}
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
          message="You've applied to this job!"
          autoHideDuration={4000}
          onRequestClose={this.handleRequestClose}
          bodyStyle={styles.snackbar}
        />
      </div>
    );
  }
}

export default CompanyInfo;
