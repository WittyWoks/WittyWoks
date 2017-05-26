import React from 'react';
import { Link } from 'react-router-dom';

class Navbar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
       <div className="Navigation">
        <nav className="navbar navbar-default navbar-fixed-top ">
          <div className="navbar-header">
            <a className="navbar-brand navbar-left" href="/"> BestFit </a>
          </div>
          <div className="container-fluid navbar-right">
            <ul className="nav navbar-nav">
              <li> <Link to="/dashboard"> Dashboard </Link> </li>   
              <li> <Link to="/data"> Analyitcs </Link> </li>   
              <li> <Link to="/companyInfo"> Company Info </Link> </li>   
              <li> <Link to="/login"> Log In </Link> </li>      
              <li> <Link to="/signup"> Sign Up </Link> </li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}

export default Navbar;
