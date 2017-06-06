import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import BarChart from './D3Components/barChart.jsx';
import loading from './D3Components/Loading.jsx';
import Modal from 'react-modal';
import {Link} from 'react-router-dom';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import $ from 'jquery';
import {withFauxDOM} from 'react-faux-dom'
import ReactDOM from 'react-dom';


class Analytics extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      open: true,
      data: false,
      d3: null
    };
    this.handleClose = this.handleClose.bind(this);
  }

  handleClose() {
    this.setState({
      open: false,
      data: true
    });
    // <BarChart data={[5,10,1,3]} size={[500,500]} />
    // this.loadingScreen();
  };


  render() {



    const actions = [
      <Link to='/dashboard'>
      <FlatButton
        label="Back To Dashboard"
        primary={true}
      /></Link>,
      <FlatButton
        label="Accept"
        disabled={false}
        onTouchTap={this.handleClose}
      />,
    ];

    return (
      <div>
        <Dialog
          title="Permission To Scan Your Email"
          actions={actions}
          modal={true}
          open={this.state.open}
        >
         We can help you improve your job search by building analytics, But we first need your permission to do so.
         <p></p>
         I authorize BestFit to sign into my current Gmail account and scan emails for job related emails.
        </Dialog>

         <div class="container">
          <div class="row">
            <div class="col-xs-12" >
              <div class="top" id="top-line-chart">

              </div>
            </div>
          </div>
        <div class="row">
          <div class="col-xs-7">
            <div class="bottom-left" id="browser">

            </div>
          </div>
        <div class="col-xs-5">
            <div class="bottom-right" id="ret_visitors">

            </div>
            </div>
        </div>
      </div>
    </div>
    );
  }
}


Analytics.propTypes = {
    svgWidth: PropTypes.number.isRequired,
    svgHeight: PropTypes.number.isRequired,
    startTicker: PropTypes.func.isRequired,
    startParticles: PropTypes.func.isRequired,
    stopParticles: PropTypes.func.isRequired,
    updateMousePos: PropTypes.func.isRequired
};

export default Analytics;
