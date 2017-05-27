import React from 'react';
import { Link } from 'react-router-dom';

class Navbar extends React.Component {
  constructor(props) {
    super(props);
  }


  render() {
    return (
       <div className="Navigation">
        <nav className="navbar navbar-toggleable-sm navbar-light fixed-top">
            <div className="container">
                <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarNav1" aria-controls="navbarNav1" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <a className="navbar-brand align-self-center" href="/"><strong>BestFit</strong></a>
                <div className="collapse navbar-collapse" id="navbarNav1">
                    <ul className="navbar-nav mr-auto align-self-center">
                        <li className="nav-item active">
                            <Link className="nav-link" to="/dashboard"> Dashboard </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/data"> Analyitcs </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/companyInfo"> Company Info </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/auth/google"> Log In </Link>
                        </li>
                    </ul>
                    <ul className="navbar-nav ml-auto">
                      <li>
                        <button className="btn btn-primary" type="button">Signup</button>
                      </li>
                    </ul>
                </div>
            </div>
        </nav>
      </div>
    );
  }
}

export default Navbar;
