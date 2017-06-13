import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class JobListEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state ={
      skills: [],
      wordMatch:{}
    }
  }

  componentDidMount() {
    this.getResume();
  }

  MatchRating() {
    let context = this;
    console.log('here!!!!!!',context.state.skills);
    console.log('here',context.props.job);
    $.ajax({
      type: 'POST',
      url: '/jobMatchRanking',
      contentType: 'application/JSON',
      data: JSON.stringify({
        data: context.props.job,
        skills: context.state.skills
      })
    })
    .done((data) => {
      context.setState({
        wordMatch: data
      })
    })
    .fail(err => {
      console.error(err);
    });
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
          console.log('Inside analytics', text);
          context.setState({
            skills: text.skills.split(','),
          });
          this.MatchRating();
      })
      .fail(function(err) {
        console.log('failed to GET', err);
      });
  })
}


  render() {
    return (
      <Link to={{pathname: `/companyInfo/${this.props.job.company}`, state: this.props.job}}>
        <div className="list-group-item list-group-item-action flex-column align-items-start">
          <div className="d-flex w-100 justify-content-between">
            <h5 className="mb-1">{this.props.job.company}</h5>
            <small>{this.props.job.formattedRelativeTime}</small>
          </div>
            <p className="mb-1">{this.props.job.jobtitle}</p>
            <small>{this.props.job.formattedLocation}</small>
        </div>
      </Link>
    )
  }
};

export default JobListEntry;
