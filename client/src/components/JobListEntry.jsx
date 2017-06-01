import React from 'react';
import { Link } from 'react-router-dom';

const JobListEntry = ({ job }) => (
  <Link to={{pathname: `/companyInfo/${job.company}`, state: job}}>
    <div className="col-sm-6 col-md-4">
      {job.company} <br/>
      {job.jobtitle} - {job.city}
    </div>
  </Link>
);

export default JobListEntry;
