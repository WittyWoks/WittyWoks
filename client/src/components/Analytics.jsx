import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import {Link} from 'react-router-dom';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import $ from 'jquery';
import ReactDOM from 'react-dom';

import InsetShadow from './D3Components/svgShadow.jsx';
import DonutChart from './D3Components/DonutChart.jsx';
import ProgressChart from './D3Components/ProgressChart.jsx';
import LineChart from './D3Components/LineChart.jsx';
import BarChart from './D3Components/BarChart.jsx';


class Analytics extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      open: true,
      data: false,
    };
    this.handleClose = this.handleClose.bind(this);
  }

  // gmailAnalytics() {
  //   $.ajax({
  //     url: '/Gmail'
  //     type: 'GET',
  //   }
  // }
  handleClose() {
    this.setState({
      open: false,
      data: true
    });
    this.renderAll();
  };

componentDidUpdate() {
  setTimeout(() => {
  ReactDOM.render(<Applied />,document.getElementById("applied"));
  ReactDOM.render(<Keyword />,document.getElementById("keyword"));
  },1)
  ReactDOM.render(<Rejections />,document.getElementById("rejections"));
}

renderAll() {
  ReactDOM.render(<Applied />,document.getElementById("applied"));
  ReactDOM.render(<Keyword />,document.getElementById("keyword"));
  ReactDOM.render(<Rejections />,document.getElementById("rejections"));
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
        <div className="container wow fadeIn" data-wow-delay="1.5s">
          <div className="row justify-content-center">
            <div className="card text-center z-depth-2">
              <div className="card-block">
                <h3 className="card-header default-color-dark white-text">Applied Jobs</h3>
                <ul id="applied"></ul>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec suscipit ullamcorper diam eu aliquam. Pellentesque nisl ligula, euismod in urna nec, semper porttitor purus. Sed commodo velit magna, eget pulvinar nunc hendrerit in. Morbi ipsum sapien, faucibus eget imperdiet non, sollicitudin eu lectus. Donec non ultricies tellus. Vestibulum sit amet bibendum massa. Sed lorem urna, fringilla vel posuere vulputate, consectetur a ante.</p>
              </div>
            </div>
              <p></p>
            <div className="card text-center z-depth-2">
              <div className="card-block">
                <h3 className="card-header default-color-dark white-text">Resume Keywords Matches</h3>
                <p></p>
                <ul id="keyword"></ul>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec suscipit ullamcorper diam eu aliquam. Pellentesque nisl ligula, euismod in urna nec, semper porttitor purus. Sed commodo velit magna, eget pulvinar nunc hendrerit in. Morbi ipsum sapien, faucibus eget imperdiet non, sollicitudin eu lectus. Donec non ultricies tellus. Vestibulum sit amet bibendum massa. Sed lorem urna, fringilla vel posuere vulputate, consectetur a ante.</p>
              </div>
            </div>
              <p></p>
            <div className="card text-center z-depth-2">
              <div className="card-block">
                <h3 className="card-header default-color-dark white-text">Percentage of Rejections</h3>
                <p></p>
                <ul id="rejections"></ul>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec suscipit ullamcorper diam eu aliquam. Pellentesque nisl ligula, euismod in urna nec, semper porttitor purus. Sed commodo velit magna, eget pulvinar nunc hendrerit in. Morbi ipsum sapien, faucibus eget imperdiet non, sollicitudin eu lectus. Donec non ultricies tellus. Vestibulum sit amet bibendum massa. Sed lorem urna, fringilla vel posuere vulputate, consectetur a ante.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

    );
  }
}

class Applied extends React.Component {

  render() {
    return (
      <div>
        <LineChart/>
      </div>
    )
  }
};

class Keyword extends React.Component {

  render() {
    return (
      <div>
        <DonutChart id="bs_chart" padAngle={0.03}/>
      </div>
    )
  }
};

class Rejections extends React.Component {

  render() {
    return (
      <div>
        <ProgressChart />
        </div>
    )
  }
};







export default Analytics;
