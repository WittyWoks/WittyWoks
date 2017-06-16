import React from 'react';
import { Link } from 'react-router-dom';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import FlatButton from 'material-ui/FlatButton';
import $ from 'jquery';
import RemoveRedEye from 'material-ui/svg-icons/image/remove-red-eye';
import Dialog from 'material-ui/Dialog';
import axios from 'axios';
import moment from 'moment';
import BigCalendar from 'react-big-calendar';
import Snackbar from 'material-ui/Snackbar';

BigCalendar.momentLocalizer(moment);

import calanderCss from 'react-big-calendar/lib/css/react-big-calendar.css';




const styles = {
  drawer: {
    background: '#212121'
  },
  overlay: {
    // background: 'none'
  },
  appBar: {
    background: '#212121',
    // color: '#1DE9B6'
  },
  menuItem: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontWeight: 200
  },
  subheader: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontWeight: 300
  },
  icon: {
    primary: {
      color: '#1DE9B6'
    },
    alternate: {
      color: '#FFAF36'
    }
  },
  user: {
    padding: '15px',
    marginLeft: 0,
    background: '#303030',
    color: '#999',
    fontWeight: 300,
  },
  snack: {
    position: 'fixed',
    height: 50,
    maxWidth: '100%'
  },
  Calendar: {
    width: 300,
    paddingTop: 5,
    paddingBottom: 5,
    background: '#676767'

  }
};

class Drawers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openPrimary: false,
      openSecondary: false,
      open: false,
      jobsAppliedTo: null,
      loaded: false,
      gCalEvents: [],
      openSnack: false,
      calEvent: 'No event this day'

    };
    this.handleTogglePrimary = this.handleTogglePrimary.bind(this);
    this.handleToggleSecondary = this.handleToggleSecondary.bind(this);
    this.handleClosePrimary = this.handleClosePrimary.bind(this);
    this.handleCloseSecondary = this.handleCloseSecondary.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleRequestClose = this.handleRequestClose.bind(this);

    this.fetchAllAppliedJob();
    this.getGcal();

  }

  getGcal() {
    let context = this;
    $.ajax({
      type: 'GET',
      url: '/gCalender',
      datatype: 'json'
    })
    .done(data => {

      let storage = [];
      data = JSON.parse(data);

      data.items.forEach((index) => {

        let temp = {};
        let start = index.updated;
        let startYear, startMonth, startDay, startHour, startMinutes;

        if (start) {
          startYear = Number(start.slice(0, 4));
          startMonth = Number(start.slice(5, 7));
          startDay = Number(start.slice(8, 10));
          startHour = Number(start.slice(11, 13));
          startMinutes = Number(start.slice(14, 16));
        }

        temp['title'] = index.summary;
        temp['start'] = new Date(startYear, startMonth - 1, startDay, startHour, 0, 0, 0);
        temp['end'] = new Date(startYear, startMonth - 1, startDay, startHour, 1, 0, 0);
        temp['desc'] = 'index.description';

        storage.push(temp);
      });
      this.setState({
        gCalEvents: storage
      });
    })
    .catch(err => {
      console.log('Error, did not get GCal');
    });
  }

  goToJob(url) {
    window.location = url;
  }


  handleOpen() {
    this.setState({open: true});
  }

  handleClose() {
    this.setState({open: false});
  }

  // Toggles state of primary drawer (left-menu)
  handleTogglePrimary() {
    this.setState({
      openPrimary: !this.state.openPrimary,
    });
  }

  // Toggles state of secondary drawer (right-menu)
  handleToggleSecondary() {
    this.setState({
      openSecondary: !this.state.openSecondary,
    });
  }

  // Closes menu when an item is clicked
  handleClosePrimary() {
    this.setState({
      openPrimary: false,
    });
  }

  // Closes menu when an item is clicked
  handleCloseSecondary() {
    this.setState({
      openSecondary: false,
    });
  }


  handleRequestClose() {
    this.setState({
      openSnack: false
    });
  }

  handleTouchTap(item) {

    let time = item.start.toString().slice(4, 11);
    let title;
    if (item.title.length > 30) {
      title = item.title.slice(0, 20) + '...';
    } else {
      title = item.title;
    }

    this.setState({
      openSnack: true,
      calEvent: title +' @' + time
    });
  }



  fetchAllAppliedJob() {
    let context = this;
    $.ajax({
      type: 'GET',
      url: '/user',
      datatype: 'json'
    })
    .done(data => {
      if (data.email) {
        axios.get('/ReturnJobsApplied', {
          params: {
            google_id: data.id
          }
        })
        .then((jobs) => {
          let datesObj = {};
          let yAxis = ['Applied'];
          let xAxis = [];

          jobs.data.forEach((job) => {
            let convertedDate = (new Date(job.created_at)).toDateString();
            if (!datesObj[convertedDate]) {
              datesObj[convertedDate] = 1;
            } else {
              datesObj[convertedDate] += 1;
            }
          });

          for (let key in datesObj) {
            yAxis.push(datesObj[key]);
            xAxis.push(key);
          }

          context.setState({
            barChartDates: xAxis,
            barChartJobsApplied: yAxis,
            jobsAppliedTo: jobs.data,
            loaded: true
          });
        })
        .catch(err => {
          console.error('Error occured getting jobs', err);
        });
      }
    });
  }

  render() {
    const actions = [
      <button type="button" className="btn btn-default" onTouchTap={this.handleClose}>Cancel</button>,
      <a className="btn btn-primary" href="/auth/google"><i className="fa fa-google" aria-hidden="true"></i> Log In</a>
    ];
    const events = [
      {
        start: '2015-07-20',
        end: '2015-07-02',
        eventClasses: 'optionalEvent',
        title: 'test event',
        description: 'This is a test description of an event',
      },
      {
        start: '2015-07-19',
        end: '2015-07-25',
        title: 'test event',
        description: 'This is a test description of an event',
        data: 'you can add what ever random data you may want to use later',
      },
    ];

    return (
      <div>

        {/* Navigation bar */}
        <AppBar
          title={<img src="https://res.cloudinary.com/jescobedo/image/upload/v1497587577/puzzle_wugv86.png" width="50" height="auto" alt=""/>}
          titleStyle={styles.appBar}
          iconElementRight={<FlatButton label="Activity" />}
          onLeftIconButtonTouchTap={this.handleTogglePrimary}
          onRightIconButtonTouchTap={this.handleToggleSecondary}
          style={styles.appBar}
        />

        {/* Primary drawer (left-menu) */}
        <Drawer
          containerStyle={styles.drawer}
          overlayStyle={styles.overlay}
          docked={false}
          width={225}
          open={this.state.openPrimary}
          onRequestChange={(openPrimary) => this.setState({openPrimary})}
        >
          <ul>
            <li style={styles.user}>
              <div className="container-fluid" style={styles.user}>
                <div className="flex-center">
                  { this.props.nameOnly === 'Guest' ?
                    <i className="fa fa-user-circle fa-5x" aria-hidden="true" > </i>
                   :
                    <img src={this.props.avatar} className="img-fluid rounded-circle drawer-avatar" />
                  }
                </div>
                <br/>
                <p className="text-center" > {this.props.nameOnly}</p>
              </div>
            </li>
            <Subheader style={styles.subheader}>BESTFIT</Subheader>
            <MenuItem style={styles.menuItem} onTouchTap={this.handleClosePrimary} leftIcon={<i style={styles.icon.primary} className="fa fa-home" aria-hidden="true"></i>} containerElement={<Link to="/dashboard" className="router-link-color"></Link>}>Home</MenuItem>
            { this.props.loggedIn === false ?
              <MenuItem style={styles.menuItem} onTouchTap={this.handleOpen} leftIcon={<i style={styles.icon.primary} className="fa fa-list" aria-hidden="true"></i>}>Job History</MenuItem>
             :
              <MenuItem style={styles.menuItem} onTouchTap={this.handleClosePrimary} leftIcon={<i style={styles.icon.primary} className="fa fa-list" aria-hidden="true"></i>} containerElement={<Link to="/jobhistory" className="router-link-color"></Link>}>Job History</MenuItem>
            }
            { this.props.loggedIn === false ?
              <MenuItem style={styles.menuItem} onTouchTap={this.handleOpen} leftIcon={<i style={styles.icon.primary} className="fa fa-pencil" aria-hidden="true"></i>}>Résumé</MenuItem>
             :
              <MenuItem style={styles.menuItem} onTouchTap={this.handleClosePrimary} leftIcon={<i style={styles.icon.primary} className="fa fa-pencil" aria-hidden="true"></i>} containerElement={<Link to="/resume" className="router-link-color"></Link>}>Résumé</MenuItem>
            }
            { this.props.loggedIn === false ?
              <MenuItem style={styles.menuItem} onTouchTap={this.handleOpen} leftIcon={<i style={styles.icon.primary} className="fa fa-area-chart" aria-hidden="true"></i>}>Smart Analysis</MenuItem>
             :
              <MenuItem style={styles.menuItem} onTouchTap={this.handleClosePrimary} leftIcon={<i style={styles.icon.primary} className="fa fa-area-chart" aria-hidden="true"></i>} containerElement={<Link to="/smartanalysis" className="router-link-color"></Link>}>Smart Analysis</MenuItem>
            }
            <Subheader style={styles.subheader}>SIGN OUT</Subheader>
            <MenuItem style={styles.menuItem} onTouchTap={this.handleClosePrimary} leftIcon={<i style={styles.icon.alternate} className="fa fa-sign-out" aria-hidden="true"></i>} href="/logout">Sign Out</MenuItem>
            <Dialog
              title="Log in to continue"
              actions={actions}
              modal={false}
              open={this.state.open}
              onRequestClose={this.handleClose}
            >
              Please log in to use this feature.
            </Dialog>

          </ul>
          {/*
          <Divider />
          <Divider />
          */}
        </Drawer>

        {/* Secondary drawer (right-menu) */}
        <Drawer
          docked={false}
          width={350}
          openSecondary={true}
          open={this.state.openSecondary}
          onRequestChange={(openSecondary) => this.setState({openSecondary})}
          containerStyle={styles.drawer}
        >
          <Subheader style={styles.subheader}>Recently Applied</Subheader>
          <div>
           <div className="recentlyApplied">
            <div className="row">
              <div className="col-sm-12">
            {this.state.loaded === false ?
              <p>Loading...</p>
            :
              <div >
                  {this.state.jobsAppliedTo.filter((job, index) => {
                    return index > 3;
                  }).map((job, idx) => {
                    let parsedJob = JSON.parse(job.job_data);
                    let jobIndeed = parsedJob.indeed;
                    return (
                            <div className="media mb-1 hoverDash primary-text" onClick={() => { this.goToJob(jobIndeed.url); }}>
                              <a className="media-left waves-light">
                                  <img className="rounded-circle" style={{height: '45px'}} src={parsedJob.glassDoor.squareLogo} alt="No Image" />
                              </a>
                              <div className="media-body seconday-text" style={{fontSize: '8px'}}>
                                  <h6 className="media-heading">{jobIndeed.company}</h6>
                                  <div> {jobIndeed.jobtitle} </div>
                                  <div> {jobIndeed.city} </div>
                              </div>
                            </div>
                    );
                  })}
              </div>
            }

              </div>
              </div>
            </div>
          </div>
        <div onTouchTap={this.handleCloseSecondary}>
          <Subheader style={styles.subheader}>Calendar</Subheader>
          </div>
            <div style={styles.Calendar} className="container shade">
              <BigCalendar
              style={{height: '420px', color: 'white'}}
              events={this.state.gCalEvents}
              views={['month']}
              onSelectEvent={event => this.handleTouchTap(event)}

              />
            </div>
            <Snackbar
              style={styles.snack}
              open={this.state.openSnack}
              message={this.state.calEvent}
              autoHideDuration={3000}
              onRequestClose={this.handleRequestClose}
            />

        </Drawer>

      </div>
    );
  }
}

export default Drawers;
