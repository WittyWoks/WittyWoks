import React from 'react';
import { Link } from 'react-router-dom';

const JobListEntry = ({ job }) => (
  <Link to={{pathname: `/companyInfo/${job.company}`, state: job}}>
    <div className="list-group-item list-group-item-action flex-column align-items-start card-bg">
      <div className="d-flex w-100 justify-content-between">
        <h5 className="mb-1 primary-text">{job.company}</h5>
        <small className="primary-text">{job.formattedRelativeTime}</small>
      </div>
      <p className="mb-1 primary-text">{job.jobtitle}</p>
      <small className="primary-text">{job.formattedLocation}</small>
  </div>
</Link>
);

export default JobListEntry;
