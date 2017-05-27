import React from 'react';
// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// import RaisedButton from 'material-ui/RaisedButton';

const style = {
  margin: 12,
};

const HomePage = () => (
  <div>

    <div className="row vert-center">
      <div className="col text-center align-self-center">
        <h1 className="display-1">BestFit</h1>
         <p className="text-muted">Your one stop autoshop for your job search</p>
         <button type="button" className="btn btn-primary">Signup</button>
         <button type="button" className="btn btn-primary">Guest</button>

      </div>
    </div>
  </div>
);

export default HomePage;
