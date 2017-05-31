import React from 'react';
import {Link} from 'react-router-dom';
import Navbar from './Navbar.jsx';
import RaisedButton from 'material-ui/RaisedButton';

const styles = {
  button: {
    margin: 12,
  },
};


const HomePage = () => (
  <div>
    <Navbar />
    <div className="content-home">
      <div className="row vert-center">
        <div className="col text-center align-self-center">
          <h1 className="display-1">BestFit</h1>
          <p className="text-muted">Your one stop autoshop for your job search</p>
          <RaisedButton
            href="/auth/google"
            target="_blank"
            label="Google Sign-In"
            style={styles.button}
            icon={<i className="fa fa-google" aria-hidden="true"></i>}
          />
          <RaisedButton 
            label="Guest" 
            primary={true} 
            style={styles.button} 
            containerElement={<Link to="/dashboard" className="router-link-color"> Guest </Link>} 
          />
        </div>
      </div>
    </div>
  </div>
);

export default HomePage;
