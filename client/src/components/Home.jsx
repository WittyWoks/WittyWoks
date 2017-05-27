import React from 'react';
import {Link} from 'react-router-dom';
import Navbar from './Navbar.jsx';
import GoogleButton from 'react-google-button'


const HomePage = () => (
  <div>
    <Navbar />
    <div className="content-home">
      <div className="row vert-center">
        <div className="col text-center align-self-center">
          <h1 className="display-1">BestFit</h1>
          <p className="text-muted">Your one stop autoshop for your job search</p>
          <button role="button" className="btn btn-google">
            <a href="/auth/google">Google Sign-In</a>
          </button>
          <button type="button" className="btn btn-primary">
            <Link to="/dashboard" className="router-link-color"> Guest </Link>
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default HomePage;
