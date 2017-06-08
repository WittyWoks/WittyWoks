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

const styles = {
  cardHero: {
    marginBottom: '30px',
    background: '#E8E8E8',
    color: '#434A54'
  }
};

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'Welcome!',
      avatar: '<i class="fa fa-user-circle" aria-hidden="true"></i>',
      nameOnly: 'Guest',
      resume_id: null
    };
  }

  componentWillMount() {
    this.nameChange();
    // console.log('!!!!!!!!!!!!!!', this.props)
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
        console.log('success GET', data);
        context.setState({
          name: 'Welcome Back, '+data.display +'!',
          avatar: data.avatar,
          nameOnly: data.display,
          resume_id: data.resume_id
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
          <Drawers avatar={this.state.avatar} nameOnly={this.state.nameOnly}/>

          {/* First row */}
          <div className="card card-block" style={styles.cardHero}>
            <div className="container">
              <h2 className="card-title">{this.state.name}</h2>
            </div>
          </div>

          {/* React Router Routes */}
          <Route exact path='/dashboard' component={DashboardHome} />
          <Route path="/jobs" component={JobList} />
          <Route path="/companyInfo" component={CompanyInfo} />
          <Route path="/analytics" component={Analytics} />
          <Route path="/resume" component={(props) => <Resume resume_id={this.state.resume_id}/>} />
          <Route path="/settings" component={Settings} />
          <Route path='/home' component={Home} />

        </div>
      </BrowserRouter>
    );
  }
}

export default Dashboard;
