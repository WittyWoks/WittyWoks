import React from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import DashboardHome from './DashboardHome.jsx';
import Home from './Home.jsx';
import JobList from './JobList.jsx';
import Analytics from './Analytics.jsx';
import Resume from './Resume.jsx';
import Settings from './Settings.jsx';
import Drawers from './Drawers.jsx';


class Dashboard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <BrowserRouter>
        <div>
        
          {/* Dashboard Drawer (menus) */}
          <Drawers />

          {/* First row */}
          <div className="jumbotron jumbotron-fluid">
            <div className="container">
              <h1 className="h2-responsive">Welcome back, You!</h1>
            </div>
          </div>
          
          {/* React Router Routes */}
          <Route exact path='/dashboard' component={DashboardHome} />
          <Route path="/jobs" component={JobList} />
          <Route path="/analytics" component={Analytics} />
          <Route path="/resume" component={Resume} />
          <Route path="/settings" component={Settings} />
          <Route path='/home' component={Home} />

        </div>
      </BrowserRouter>
    );
  }
}

export default Dashboard;
