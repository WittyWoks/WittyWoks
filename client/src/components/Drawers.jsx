import React from 'react';
import { Link } from 'react-router-dom';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import FlatButton from 'material-ui/FlatButton';
import $ from 'jquery';
import RemoveRedEye from 'material-ui/svg-icons/image/remove-red-eye';


const styles = {
  drawer: {
    background: '#33414E'
  },
  overlay: {
    // background: 'none'
  },
  appBar: {
    background: '#33414E'
  },
  menuItem: {
    color: '#FFFFFF',
    fontWeight: 300
  },
  subheader: {
    color: '#999',
    fontWeight: 300
  },
  user: {
    padding: '15px',
    marginLeft: 0,
    background: '#2D3945',
    color: '#999',
    fontWeight: 300,
  }
};

class Drawers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openPrimary: false,
      openSecondary: false
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
          title="BestFit"
          iconElementRight={<FlatButton label="Activity" />}
          onLeftIconButtonTouchTap={this.handleTogglePrimary}
          onRightIconButtonTouchTap={this.handleToggleSecondary}
          style={styles.appBar}
        />

        {/* Primary drawer (left-menu) */}
        <Drawer
          containerStyle={styles.drawer}
          overlayStyle={styles.overlay}
          docked={false}
          width={225}
          open={this.state.openPrimary}
          onRequestChange={(openPrimary) => this.setState({openPrimary})}
        >
          <ul>
            <li style={styles.user}>
              <div className="container-fluid" style={styles.user}>
                <div className="flex-center">
                  { this.props.nameOnly === 'Guest' ? 
                    <i className="fa fa-user-circle fa-5x" aria-hidden="true" > </i>
                   :
                    <img src={this.props.avatar} className="img-fluid rounded-circle" />
                  }
                </div>
                <br/>
                <p className="text-center" > {this.props.nameOnly}</p>
              </div>
            </li>
            <Subheader style={styles.subheader}>BESTFIT</Subheader>
            <MenuItem style={styles.menuItem} onTouchTap={this.handleClosePrimary} leftIcon={<i className="fa fa-home" aria-hidden="true"></i>} containerElement={<Link to="/dashboard" className="router-link-color"></Link>}>Home</MenuItem>
            <MenuItem style={styles.menuItem} onTouchTap={this.handleClosePrimary} leftIcon={<i className="fa fa-area-chart" aria-hidden="true"></i>} containerElement={<Link to="/analytics" className="router-link-color"></Link>}>Analytics</MenuItem>
            <MenuItem style={styles.menuItem} onTouchTap={this.handleClosePrimary} leftIcon={<i className="fa fa-pencil" aria-hidden="true"></i>} containerElement={<Link to="/resume" className="router-link-color"></Link>}>Résumé</MenuItem>
            <Subheader style={styles.subheader}>MY SETTINGS</Subheader>
            <MenuItem style={styles.menuItem} onTouchTap={this.handleClosePrimary} leftIcon={<i className="fa fa-cogs" aria-hidden="true"></i>} containerElement={<Link to="/settings" className="router-link-color"></Link>}>Settings</MenuItem>
            <Subheader style={styles.subheader}>SIGN OUT</Subheader>
            <MenuItem style={styles.menuItem} onTouchTap={this.handleClosePrimary} leftIcon={<i className="fa fa-sign-out" aria-hidden="true"></i>} href="/logout">Sign Out</MenuItem>

            
          </ul>
          {/*
          <Divider />

          <Divider />

          */}
        </Drawer>

        {/* Secondary drawer (right-menu) */}
        <Drawer
          docked={false}
          width={350}
          openSecondary={true}
          open={this.state.openSecondary}
          onRequestChange={(openSecondary) => this.setState({openSecondary})}
        >
          <Subheader>Calendar</Subheader>
          <MenuItem onTouchTap={this.handleCloseSecondary}><img src="http://placehold.it/325x350"/></MenuItem>
          <Subheader>Activity</Subheader>
          <MenuItem onTouchTap={this.handleCloseSecondary}><img src="http://placehold.it/325x300"/></MenuItem>
        </Drawer>

      </div>
    );
  }
}

export default Drawers;
