import React from 'react';
import { Link } from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';


const style = {
  margin: 12
};

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
                <a className="navbar-brand" href="/"><strong>BestFit</strong></a>
                <div className="collapse navbar-collapse" id="navbarNav1">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <Link className="nav-link" to="/companyInfo"> Company Info </Link>
                        </li>
                    </ul>
                    <ul className="navbar-nav ml-auto">
                      <li className="nav-item">
                        <FlatButton 
                          label="Log in" 
                          href="/auth/google"
                        />
                      </li>
                      <li className="nav-item">
                        <RaisedButton 
                          label="Sign up" 
                          primary={true} 
                        />
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
