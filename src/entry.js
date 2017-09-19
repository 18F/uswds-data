require('uswds');
var d3 = require('d3');

var data = [15, 45, 23, 31, 28, 39, 50, 8];

var margin = { top: 20, right: 20, bottom: 30, left: 40 };
var width = d3.select('.chart').node().offsetWidth - margin.right - margin.left;
var height = 350 - margin.top - margin.bottom;

var x = d3.scaleBand().rangeRound([0, width]).padding(0.3);
var y = d3.scaleLinear().rangeRound([height, 0]);

x.domain(data);
y.domain([0, d3.max(data)]);

var svg = d3.select('.chart').append('svg')
          .attr('height','100%')
          .attr('width','100%');

var xAxis = d3.axisBottom(x)
var yAxis = d3.axisLeft(y)
          .ticks(10, '%');


svg.append('g')
    .attr('class', 'axis axis--y')
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
    .call(d3.axisLeft(y).ticks(10, '%'))
  .append('g')
    .attr('class', 'axis axis--x')
    .attr("transform", "translate(" + 0 + "," + height + ")")
    .call(xAxis)
  .append('text')
    .attr('transform', 'rotate(-90)')
    .attr('y', 6)
    .attr('dy', '0.71em')
    .attr('text-anchor', 'end')
    .text('Frequency');

svg.selectAll('rect')
          .data(data)
          .enter().append('rect')
          .attr('class', 'usa-chart-bar')
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
          .attr('height', function(d, i) { return height - y(d); })
          .attr('width', x.bandwidth())
          .attr('x', function(d, i) { return x(d); })
          .attr('y', function(d, i) { return y(d); });
