import React from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import DashboardHome from './DashboardHome.jsx';
import Home from './Home.jsx';
import JobList from './JobList.jsx';
import CompanyInfo from './CompanyInfo.jsx';
import JobHistory from './JobHistory.jsx';
import Resume from './Resume.jsx';
import SmartAnalysis from './SmartAnalysis.jsx';
import Drawers from './Drawers.jsx';
import $ from 'jquery';


const styles = {
  cardHero: {
    marginBottom: '30px',
    background: '#212121',
    // color: '#434A54'
  }
};

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'Welcome!',
      avatar: '<i class="fa fa-user-circle" aria-hidden="true"></i>',
      nameOnly: 'Guest',
      resume_id: null,
      loggedIn: false
    };
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
      if (data.email) {
        context.setState({
          name: `Welcome Back, ${data.display}!`,
          avatar: data.avatar,
          nameOnly: data.display,
          loggedIn: true
        });
      }
    })
    .fail(function(err) {
      console.log('failed to GET', err);
    });
  }


  render() {
    return (
      <BrowserRouter>
        <div>

          {/* Dashboard Drawer (menus) */}
          <Drawers avatar={this.state.avatar} nameOnly={this.state.nameOnly} loggedIn={this.state.loggedIn} />

          {/* First row */}
          <div className="card card-block" style={styles.cardHero} className="primary-text">
            <div className="container-fluid">
              <p className="text-right">{this.state.name}</p>
            </div>
          </div>

          {/* React Router Routes */}
          <Route exact path='/dashboard' component={DashboardHome} />
          <Route path="/jobs" component={JobList} />
          <Route path="/companyInfo" component={(props) => <CompanyInfo loggedIn={this.state.loggedIn} {...props} />} />
          <Route path="/jobhistory" component={JobHistory} />
          <Route path="/resume" component={Resume} />
          <Route path="/smartanalysis" component={SmartAnalysis} />
          <Route path='/home' component={Home} />

        </div>
      </BrowserRouter>
    );
  }
}

export default Dashboard;
