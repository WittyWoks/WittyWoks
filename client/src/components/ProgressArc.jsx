import React, { Component } from 'react';
import * as d3 from "d3";

class ProgressArc extends React.Component {
    constructor(props) {
     super(props);
     this.state = {percentComplete: 0.3};
     this.togglePercent = this.togglePercent.bind(this);
   }

  propTypes: {
    id: PropTypes.string,
    height: PropTypes.number,
    width: PropTypes.number,
    innerRadius: PropTypes.number,
    outerRadius: PropTypes.number,
    backgroundColor: PropTypes.string,
    foregroundColor: PropTypes.string,
    percentComplete: PropTypes.number
  }
  componentDidMount() {
    const context = this.setContext();
    this.setBackground(context);
    this.setForeground(context);
  }
  setContext() {
    const { height, width, id} = this.props;
    return d3.select(this.refs.arc).append('svg')
      .attr('height', height)
      .attr('width', width)
      .attr('id', id)
      .append('g')
      .attr('transform', `translate(${height / 2}, ${width / 2})`);
  }
  setBackground(context) {
    return context.append('path')
    .datum({ endAngle: this.tau })
    .style('fill', this.props.backgroundColor)
    .attr('d', this.arc());
  }
  setForeground(context) {

    return context.append('path')
    .datum({ endAngle: this.tau * this.props.percentComplete })
    .style('fill', this.props.foregroundColor)
    .attr('d', this.arc());
  }
  arc() {
    return d3.arc()
      .innerRadius(this.props.innerRadius)
      .outerRadius(this.props.outerRadius)
      .startAngle(0)
  }

   togglePercent() {
    const percentage = this.state.percentComplete === 0.3 ? 0.7 : 0.3;
    this.setState({percentComplete: percentage});
  }
  render() {
  console.log(this.state.percentComplete);
  return (
      <div>
        <a onClick={this.togglePercent}>Toggle Arc</a>
        <ProgressArc
          percentComplete={this.state.percentComplete}
        />
      </div>
    );
  }
}

export default ProgressArc;
