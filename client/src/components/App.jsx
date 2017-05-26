import React from 'react';
import Navbar from './Navbar.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Navbar className="nav" />
        <h2> Hello from App. This is the landing page index route</h2>
      </div>
    );
  }
}

export default App;
