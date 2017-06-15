import React from 'react';
import $ from 'jquery';
import axios from 'axios';
import Dialog from 'material-ui/Dialog';
import Snackbar from 'material-ui/Snackbar';
import PercentChart from './C3Components/PercentChart.jsx';
import Chip from 'material-ui/Chip';

const styles = {
  jobs: {
    color: 'white'
  },
  cardHeader: {
    backgroundColor: '#E34724',
    padding: '10px'
  },
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
        
        {/*
        <div className="card">
          <div className="row">
            <div className="col-sm-6">
              <img className="img-fluid" src="https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20%282%29.jpg" alt="Card image cap" />
            </div>
            <div className="col-sm-6">
              <h3>Testing</h3>
            </div>
          </div>
            <div className="card-block">
              <h4 className="card-title">Card title</h4>
              <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
              <a href="#" className="btn btn-primary">Button</a>
            </div>
        </div>
        */}
          {this.state.jobs.length && this.state.loaded === true ? this.state.jobs.map((job, i) => {
            if (i === 0) {
              return (
                <div className="card-group">
                    <div className="card" style={styles.card}>
                        <div className="equal-height shade">
                          <img className="img-fluid mx-auto d-block z-depth-3" src={job.squareLogo} alt={job.name} size="125"/>
                        </div>
                        <div className="card-block">
                            <h4 className="card-title primary-text">{job.name}</h4>
                            <h6 className="card-text secondary-text">{jobInfo.jobtitle}</h6>
                            <p className="card-text secondary-text">{jobInfo.snippet}</p>
                            <a className="btn btn-primary" role="button" href={`${jobInfo.url}`} target="blank">Apply Now!</a>
                            <a className="btn btn-default"><i className="fa fa-thumbs-up left"></i> Applied!</a>
                            <p className="card-text disabled-text"><small className="text-muted">Posted {jobInfo.formattedRelativeTime}</small></p>
                        </div>
                    </div>
                    <div className="card" style={styles.card}>
                      <div className="equal-height shade">
                        {this.state.progressChart ? <PercentChart data ={this.state.wordMatch} /> : null}
                      </div>
                        <div className="card-block">
                            <h4 className="card-title primary-text">Card title</h4>
                            <p className="card-text secondary-text">This card has supporting text below as a natural lead-in to additional content.</p>
                        </div>
                    </div>
                    <div className="card" style={styles.card}>
                      <div  className="equal-height shade">
                          <div style={styles.wrapper}>
                            {this.state.matchingSkills.map(this.renderChip, this)}
                          </div>
                          </div>
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
