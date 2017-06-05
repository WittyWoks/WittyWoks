import React from 'react';
import { Link } from 'react-router-dom';

const JobListEntry = ({ job }) => (
  <Link to={{pathname: `/companyInfo/${job.company}`, state: job}}>
    <div className="list-group-item list-group-item-action flex-column align-items-start">
      <div className="d-flex w-100 justify-content-between">
        <h5 className="mb-1">{job.company}</h5>
        <small>3 days ago</small>
      </div>
      <p className="mb-1">{job.jobtitle}</p>
      <small>{job.city}</small>
  </div>
</Link>
);

{/*
<Link to={{pathname: `/companyInfo/${job.company}`, state: job}}>
  <div className="col-sm-6 col-md-4">
    {job.company} <br/>
    {job.jobtitle} - {job.city}
  </div>
</Link>
*/}

export default JobListEntry;

