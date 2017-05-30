import React from 'react';
import StickyHeader from './StickyHeader.jsx';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <StickyHeader />
        Hello from Dashboard
      </div>
    );
  }
}

export default Dashboard;
