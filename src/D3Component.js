import React from 'react';
import d3 from 'd3';

// adapted from http://bl.ocks.org/d3noob/b3ff6ae1c120eea654b5

const parseDate = d3.time.format("%d-%b-%y").parse;

const margin = {top: 30, right: 50, bottom: 30, left: 50};
const width = 600 - margin.left - margin.right;
const height = 270 - margin.top - margin.bottom;

const x = d3.time.scale().range([0, width]);
const y = d3.scale.linear().range([height, 0]);

const xAxis = d3.svg.axis().scale(x)
  .orient("bottom").ticks(5);

const yAxis = d3.svg.axis().scale(y)
  .orient("left").ticks(5);

// Define the line
const valueline = d3.svg.line()
  .x(d => x(d.date))
  .y(d => y(d.close));

export class D3Component extends React.Component {

  constructor(props) {
    super(props);
    this.state = { data: null };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    d3.csv('data.csv', (error, data) => {
      data.forEach((d) => {
        d.date = parseDate(d.date);
        d.close = +d.close;
      });

      // Scale the range of the data
      x.domain(d3.extent(data, d => d.date));
      y.domain([0, d3.max(data, d => d.close)]);

      this.setState({
        data,
      });

      this.drawAxises();
    });
  }

  drawAxises() {
    // direct dom manipulations by d3 have to be done in componentDidMount
    const xAxisNode = this.refs.xAxis;
    const yAxisNode = this.refs.yAxis;
    d3.select(xAxisNode).call(xAxis);
    d3.select(yAxisNode).call(yAxis);
  }

  render() {
    if (!this.state.data) {
      return <div>loading data</div>;
    }
    // important: className instead class
    // simply render tags instead of using d3 append
    return <svg width={width + margin.left + margin.right} height={height + margin.top + margin.bottom}>
      <g transform={'translate(' + margin.left + ',' + margin.top + ')'}>
        <path className="line" d={valueline(this.state.data)}></path>
        <g className="x axis" ref="xAxis" transform={'translate(0,' + height + ')'}></g>
        <g className="y axis" ref="yAxis"></g>
      </g>
    </svg>;
  }
}