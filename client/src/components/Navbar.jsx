import React from 'react';
import { Link } from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import $ from 'jquery';


const styles = {
  button: {
    color: 'white', 
  }
};


class Navbar extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    $(window).scroll(function() {
      if ($(this).scrollTop() > 200) { // <--- adjust pixel point here
        $('.fixed-top').addClass('opaque');
      } else {
        $('.fixed-top').removeClass('opaque');
      }
    });
  }

  render() {
    return (
       <div className="Navigation">
        <nav className="navbar navbar-toggleable-sm navbar-dark fixed-top transition">
            <div className="container">
                <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarNav1" aria-controls="navbarNav1" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <a className="navbar-brand" href="/"><strong>BestFit</strong></a>
                <div className="collapse navbar-collapse" id="navbarNav1">
                    <ul className="navbar-nav ml-auto">
                      <li className="nav-item">
                        <a className="nav-link" href="#home">Home <span className="sr-only">(current)</span></a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" href="#about">About Us</a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" href="#offer">What We Offer</a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" href="#contact">Contact</a>
                      </li>
                      <li className="nav-item">
                        <a className="btn btn-primary btn-sm" id="menu-button" href="/auth/google"><i className="fa fa-google" aria-hidden="true"></i> Log In</a>
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
