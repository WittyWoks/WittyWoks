import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import resizeMixin from './resizemin.js';
import InsetShadow from './svgShadow.jsx';
import createReactClass from 'create-react-class';


class DonutChartPath extends React.Component {

  componentWillMount() {
    let radius=this.props.height;
    let outerRadius=radius/2;
    let innerRadius=radius/3.3;

    this.arc=d3.svg.arc()
      .outerRadius(outerRadius)
      .innerRadius(innerRadius);

    this.transform='translate('+radius/2+','+radius/2+')';

  };

  createChart(_self) {

    let paths = (this.props.pie(this.props.data)).map(function(d, i) {

      return (
        <path fill={_self.props.color(i)} d={_self.arc(d)} key={i}/>
      )
    });

    return paths;
  }

  render() {
    let paths = this.createChart(this);

    return(
      <g transform={this.transform}>
        {paths}
      </g>
    )
  }
};

DonutChartPath.propTypes = {
    width:React.PropTypes.number,
    height:React.PropTypes.number,
    data:React.PropTypes.array,
    pie:React.PropTypes.func,
    color:React.PropTypes.func
}

class DonutChartLegend extends React.Component {

  createChart(_self) {

    let texts = (this.props.pie(this.props.data)).map(function(d, i) {
    let transform="translate(10,"+i*30+")";
    let rectStyle = {
      fill:_self.props.color(i),
      stroke:_self.props.color(i)
    };

    let textStyle = {
      fill:_self.props.color(i)
    };

    return (
      <g transform={transform} key={i}>
        <rect width="20" height="20" style={rectStyle} rx="2" rx="2"/>
        <text x="30" y="15" className="browser-legend" style={textStyle}>{d.data.name}</text>
      </g>
    )
    });

  return texts;
  }

  render(){

    var style={
      visibility:'visible'
    };

    if(this.props.width<=this.props.height+70){
      style.visibility='hidden';
    }

    var texts = this.createChart(this);
    var transform="translate("+(this.props.width/2+80)+",55)";
    return(
      <g is transform={transform} style={style}>
        {texts}
      </g>
    )
  }
}

DonutChartLegend.propTypes = {
  width:React.PropTypes.number,
  height:React.PropTypes.number,
  data:React.PropTypes.array,
  pie:React.PropTypes.func,
  color:React.PropTypes.func
};

const DonutChart=createReactClass({
    propTypes: {
        width:React.PropTypes.number,
        height:React.PropTypes.number,
        padAngle:React.PropTypes.number,
        id:React.PropTypes.string.isRequired
    },

    getDefaultProps: function() {
        return {
            width: 450,
            height: 250,
            padAngle:0
        };
    },
    getInitialState:function(){
        return {
            data:[],
            width:0
        };
    },

    mixins:[resizeMixin],

    componentWillMount:function(){

        this.pie=d3.layout.pie()
            .value(function(d){return d.count})
            .padAngle(this.props.padAngle)
            .sort(null);

        this.color = d3.scale.ordinal()
            .range(['#68c8d7','#eccd63','#bb8cdd','#de6942','#52b36e','#bbc7d9']);

        let data = [
            { name: 'React', count: 40 },
            { name: 'Node', count: 32 },
            { name: 'Javascript', count: 14 },
            { name: 'mySql', count: 9 },
            { name: 'Others', count: 6 }
        ];

        this.setState({'data':data,width:this.props.width});
    },

    updateData(){
        let data = [
            { name: 'Backbone', count: Math.random() },
            { name: 'React', count: Math.random() },
            { name: 'Node', count: Math.random() },
            { name: 'Javascript', count: Math.random() },
            { name: 'mySql', count: Math.random() },
            { name: 'Opera', count: Math.random() }

        ];

        this.setState({'data':data });
    },
    render(){

        return (
            <div>
                <svg id={this.props.id} width={this.state.width}

                     height={this.props.height} className="shadow" onClick={this.updateData}>

                    <DonutChartPath width={this.state.width} height={this.props.height}
                                    pie={this.pie} color={this.color} data={this.state.data}/>

                    <DonutChartLegend pie={this.pie} color={this.color} data={this.state.data}
                                      width={this.state.width} height={this.props.height}/>

                </svg>
            </div>
        );
    }
});

export default DonutChart;
