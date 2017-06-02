import React from 'react';
import $ from 'jquery';

class CompanyInfo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      jobs: []
    };

    this.searchGlassDoor = this.searchGlassDoor.bind(this);
  }

  componentDidMount() {
    this.searchGlassDoor(this.props.location.state.company);
  }
  
  searchGlassDoor(search) {
    $.get('/glassDoor', {
      search: search
    })
    .done((data) => {
      // console.log('Job DATA', data);      
      this.setState({
        jobs: data
      });
    })
    .fail(err => {
      throw err;
    });
  }
  

  render() {
    const jobInfo = this.props.location.state;
    return (
      <div className="container">
        {this.state.jobs.length ? this.state.jobs.map(job => {
          return <div className="media" key={Math.random() * 1000}>
              <div className="media-left media-top">
                <img src={job.squareLogo} className="media-object" />
              </div>
              <div className="media-body">
                <h2 className="media-heading">{job.name}</h2>
                <h4>{jobInfo.jobtitle}</h4>
                <p>{jobInfo.snippet}</p>
                <a className="btn btn-info" role="button" href={`${jobInfo.url}`} target="blank">Apply Now!</a>
              </div>
            </div>;
        }) : null}
    
      </div>
    );
  }
}

export default CompanyInfo;
