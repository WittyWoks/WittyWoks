import React from 'react';
import $ from 'jquery';

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
      <div className="container wow fadeIn" data-wow-delay="0.2s">
        <div className="card">
          <div style={styles.cardHeader}>
            <h4 className="card-title text-center" style={styles.jobs}>Company Info</h4>
          </div>
          <br/>
          {/* Single Job Listing */}
          <div className="row justify-content-center">
            {this.state.jobs.length ? this.state.jobs.map((job, i) => {
              if (i === 0) {
                return <div className="col-md-4 col-md-offset-5" key={Math.random() * 1000}>
                  <div className="card">
                    <img src={job.squareLogo} className="image-fluid card-img-top" alt="Card image cap" />
                  </div>
                  <div className="card-block text-center">
                    <h2 className="media-heading">{job.name}</h2>
                    <h4>{jobInfo.jobtitle}</h4>
                    <p>{jobInfo.snippet}</p>
                    <a className="btn btn-info" role="button" href={`${jobInfo.url}`} target="blank">Apply Now!</a>
                  </div>

                  {/* Company Ratings */}
                  <div className="row">
                    <div className="col-md-4">Overall Rating: <strong>{job.overallRating}</strong></div>
                    <div className="col-md-4">Work Life Balance: <strong>{job.workLifeBalanceRating}</strong></div>
                    <div className="col-md-4">Culture and Values: <strong>{job.cultureAndValuesRating}</strong></div>
                  </div>
                </div>;
              }
            }) : null}
          </div>
        </div>
      </div>
    );
  }
}

export default CompanyInfo;
