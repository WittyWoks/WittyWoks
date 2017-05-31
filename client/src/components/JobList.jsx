import React from 'react';
import JobListEntry from './JobListEntry.jsx';

class JobList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h1>Hello from JobList Component</h1>
        <JobListEntry />
      </div>
    );
  }
}

export default JobList;
