import React from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import DashboardHome from './DashboardHome.jsx';
import Home from './Home.jsx';
import JobList from './JobList.jsx';
import CompanyInfo from './CompanyInfo.jsx';
import Analytics from './Analytics.jsx';
import Resume from './Resume.jsx';
import Settings from './Settings.jsx';
import Drawers from './Drawers.jsx';
import $ from 'jquery';


class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'Welcome!'
    }
  }

  componentDidMount() {
    this.nameChange();
  }

  nameChange() {
    let context = this;
    $.ajax({
      type: 'GET',
      url: '/user',
      datatype: 'json'
    })
    .done(function(data) {
      context.setState({
        name: 'Welcome Back, '+data +'!'
      })
      console.log('success GET', data);
      })
    .fail(function(err) {
      console.log('failed to GET', err);
    })
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
              <h1 className="h2-responsive">{this.state.name}</h1>
            </div>
          </div>

          {/* React Router Routes */}
          <Route exact path='/dashboard' component={DashboardHome} />
          <Route path="/jobs" component={JobList} />
          <Route path="/companyInfo" component={CompanyInfo} />
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
