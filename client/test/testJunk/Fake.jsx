import React from 'react';

class Fake extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isChecked: false,
      value: ''
    };

    this.onChange = this.onChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  onChange() {
    this.setState({isChecked: !this.state.isChecked});
  }

  handleChange(e) {
    this.setState({value: e.target.value});
  }

  handleSubmit(e) {
    alert('A name was submitted: ' + this.state.value);
    e.preventDefault();
  }

  render() {
    return (
      <div className="test">
        <div>Hello From Fake</div>
        <h1 className="baz">Another Test</h1>
        <span>Span test</span>

        <label className="check">
          <input
            type="checkbox"
            checked={this.state.isChecked}
            onChange={this.onChange}
          />
          {this.state.isChecked ? this.props.labelOn : this.props.labelOff}
        </label>

        <div>
          {/*<form onSubmit={this.handleSubmit}>
            <label>
              Name:
              <input type="text" value={this.state.value} onChange={this.handleChange} />
            </label>
            <input type="submit" value="Submit" />
          </form>*/}
        </div>
      </div>
    );
  }
}

export default Fake;
