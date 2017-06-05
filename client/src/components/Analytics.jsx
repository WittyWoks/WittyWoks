import React from 'react';
import BarChart from './barChart.jsx';
import loading from './loadingPage.jsx';
import d3 from 'd3';

class Analytics extends React.Component {

  render() {
   return (
     <div>
     <ul className="list-group">
     <h1>Applied Jobs</h1>
      <div className='D3'>
      </div>
      <div>
      <BarChart data={[5,10,1,3,10,20,10,30,50,102,102,40,30,48]} size={[500,500]} />
      </div>
    </ul>
</div>
   )

  }

}

export default Analytics;
