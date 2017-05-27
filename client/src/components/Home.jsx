import React from 'react';
import {Link} from 'react-router-dom';
import GoogleButton from 'react-google-button'

// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// import RaisedButton from 'material-ui/RaisedButton';

const style = {
  margin: 12
};


const HomePage = () => (
  <div className="content-home">
    <div className="row vert-center">
      <div className="col text-center align-self-center">
        <h1 className="display-1">BestFit</h1>
         <p className="text-muted">Your one stop autoshop for your job search</p>
         <button role="button" className="btn btn-google">
         <a href="/auth/google">Google Sign-In</a></button>
         <button role="button" className="btn btn-primary">Guest</button>

      </div>
    </div>
  </div>
);

export default HomePage;
