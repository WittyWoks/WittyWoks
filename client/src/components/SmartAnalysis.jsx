import React from 'react';
import axios from 'axios';

class SmartAnalysis extends React.Component {
  constructor(props) {
    super(props);
    this.getResume();
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
      .done((resume) => {
        axios.get('/analyzeResume', {
          params: {
            url: resume.resume_url 
          }
        })
        .then((text) => {
          console.log('Inside analytics', text.data);
        });
        // context.setState({
        //   skills: resume.skills.split(','),
        //   file: resume.resume_url
        // });
        // console.log('Skillset:', context.state.skills);
      })
      .fail(function(err) {
        console.log('failed to GET', err);
      });
    })
    .fail(function(err) {
      console.log('failed to GET', err);
    });
  }

  render() {
    return (
      <div>
        <h1>Hello from SmartAnalysis Component</h1>
        <h4>Watson Tone Analyzer</h4>
        <p>All the content goes here</p>
        <button>Analyze</button>
      </div>
    );
  }
}

export default SmartAnalysis;
