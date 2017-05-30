import React from 'react';
import { Link } from 'react-router-dom';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import FlatButton from 'material-ui/FlatButton';

class Drawers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openPrimary: false,
      openSecondary: false,
    };
    this.handleTogglePrimary = this.handleTogglePrimary.bind(this);
    this.handleToggleSecondary = this.handleToggleSecondary.bind(this);
    this.handleClosePrimary = this.handleClosePrimary.bind(this);
    this.handleCloseSecondary = this.handleCloseSecondary.bind(this);
  }

  // Toggles state of primary drawer (left-menu)
  handleTogglePrimary() {
    this.setState({
      openPrimary: !this.state.openPrimary,
    });
  }

  // Toggles state of secondary drawer (right-menu)
  handleToggleSecondary() {
    this.setState({
      openSecondary: !this.state.openSecondary,
    });
  }

  // Closes menu when an item is clicked
  handleClosePrimary() {
    this.setState({
      openPrimary: false,
    });
  }

  // Closes menu when an item is clicked
  handleCloseSecondary() {
    this.setState({
      openSecondary: false,
    });
  }

  render() {
    return (
      <div>

        {/* Navigation bar */}
        <AppBar
          title="Menu"
          iconElementRight={<FlatButton label="Activity" />}
          onLeftIconButtonTouchTap={this.handleTogglePrimary}
          onRightIconButtonTouchTap={this.handleToggleSecondary}
        />

        {/* Primary drawer (left-menu) */}
        <Drawer
          docked={false}
          width={200}
          open={this.state.openPrimary}
          onRequestChange={(openPrimary) => this.setState({openPrimary})}
        >
          <Subheader>BestFit</Subheader>
          <MenuItem onTouchTap={this.handleClosePrimary} leftIcon={<i className="fa fa-home" aria-hidden="true"></i>} containerElement={<Link to="/dashboard" className="router-link-color"></Link>}>Home</MenuItem>
          <MenuItem onTouchTap={this.handleClosePrimary} leftIcon={<i className="fa fa-briefcase" aria-hidden="true"></i>} containerElement={<Link to="/jobs" className="router-link-color"></Link>}>Jobs</MenuItem>
          <MenuItem onTouchTap={this.handleClosePrimary} leftIcon={<i className="fa fa-area-chart" aria-hidden="true"></i>} containerElement={<Link to="/analytics" className="router-link-color"></Link>}>Analytics</MenuItem>
          <MenuItem onTouchTap={this.handleClosePrimary} leftIcon={<i className="fa fa-pencil" aria-hidden="true"></i>} containerElement={<Link to="/resume" className="router-link-color"></Link>}>Résumé</MenuItem>
          <Divider />

          <Subheader>My Settings</Subheader>
          <MenuItem onTouchTap={this.handleClosePrimary} leftIcon={<i className="fa fa-cogs" aria-hidden="true"></i>} containerElement={<Link to="/settings" className="router-link-color"></Link>}>Settings</MenuItem>
          <Divider />

          <Subheader>Sign out</Subheader>
          <MenuItem onTouchTap={this.handleClosePrimary} leftIcon={<i className="fa fa-sign-out" aria-hidden="true"></i>} href="/">Sign out</MenuItem>
        </Drawer>
        
        {/* Secondary drawer (right-menu) */}
        <Drawer
          docked={false}
          width={300}
          openSecondary={true}
          open={this.state.openSecondary}
          onRequestChange={(openSecondary) => this.setState({openSecondary})}
        >
          <Subheader>Calendar</Subheader>
          <MenuItem onTouchTap={this.handleCloseSecondary}><img src="http://placehold.it/250x350"/></MenuItem>
          <Subheader>Activity</Subheader>
          <MenuItem onTouchTap={this.handleCloseSecondary}><img src="http://placehold.it/250x300"/></MenuItem>
        </Drawer>

      </div>
    );
  }
}

export default Drawers;
