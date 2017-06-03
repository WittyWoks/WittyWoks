import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Navbar from './Navbar.jsx';
import Login from './Login.jsx';
import Signup from './Signup.jsx';
import Resume from './Resume.jsx';
import Dashboard from './Dashboard.jsx';
import Home from './Home.jsx';
import Analytics from './Analytics.jsx';
import CompanyInfo from './CompanyInfo.jsx';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
    <MuiThemeProvider>
      <div>
        <Route exact path='/home' component={(props) => <Home /> } />
        <Route path="/login" component={(props) => <Login /> } />
        <Route path="/signup" component={(props) => <Signup /> } />
        <Route path="/dashboard" component={(props) => <Dashboard /> } />
        <Route path="/resume" component={(props) => <Resume /> } />
        <Route path="/companyInfo" component={(props) => <CompanyInfo /> } />
        <Route path="/resume" component={(props) => <Dashboard /> } />
        <Route path="/analytics" component={(props) => <Dashboard /> } />
        <Route path="/settings" component={(props) => <Dashboard /> } />

      </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
