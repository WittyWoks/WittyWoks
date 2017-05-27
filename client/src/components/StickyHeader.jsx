import React from 'react';
import { Link } from 'react-router-dom';

class StickyHeader extends React.Component {
  constructor(props) {
    super(props);
  }


  render() {
    return (
      <nav className="navbar navbar-toggleable-sm navbar-light">
          <div className="container">
              <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarNav1" aria-controls="navbarNav1" aria-expanded="false" aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon"></span>
              </button>
              <a className="navbar-brand align-self-center" href="/"><strong>BestFit</strong></a>
              <div className="collapse navbar-collapse" id="navbarNav1">
                <ul className="navbar-nav ml-auto align-self-center">
                  <li className="nav-item align-self-center">
                    Jon Eric Escobedo
                  </li>
                </ul>
              </div>  
          </div>
      </nav>
    );
  }
}

export default StickyHeader;
