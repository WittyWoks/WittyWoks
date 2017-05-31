import React from 'react';
import {List, ListItem} from 'material-ui/List';
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';

class DashboardHome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({
      value: e.target.value,
    });
    console.log(e.target.value);
  }

  render() {
    return (
      <div>

        {/* First row */}
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <div className="md-form">
                <i className="fa fa-search prefix" aria-hidden="true"></i>
                <input type="text" id="job-search" className="form-control" value={this.state.value} onChange={this.handleChange}/>
                <label htmlFor="job-search">Search jobs</label>
              </div>
            </div>
          </div>
        </div>

        {/* Second row */}
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <List>
                <ListItem primaryText="Cool Job 1" />
                <ListItem primaryText="Cool Job 2" />
                <ListItem primaryText="Cool Job 3" />
                <ListItem primaryText="Cool Job 4" />
                <ListItem primaryText="Cool Job 5" />
                <ListItem primaryText="Cool Job 6" />
                <ListItem primaryText="Cool Job 7" />
                <ListItem primaryText="Cool Job 8" />
                <ListItem primaryText="Cool Job 9" />
                <ListItem primaryText="Cool Job 10" />
              </List>
            </div>
          </div>
        </div>
        
      </div>
    );
  }
}

export default DashboardHome;
