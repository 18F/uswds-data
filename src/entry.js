require('uswds');
var d3 = require('d3');

var margin = { top: 30, right: 20, bottom: 30, left: 40 };
var width = d3.select('.chart').node().offsetWidth - margin.right - margin.left;
var height = 350 - margin.top - margin.bottom;


// vertical bars
d3.csv('/data/uninsured_rate_in_virginia.csv', function(d, i, columns) {
    for (var i = 1, n = columns.length; i < n; ++i) d[columns[i]] = +d[columns[i]];
    return d;
}, function(error, data) {
  var keys = data.columns.slice(1);

  var x = d3.scaleBand()
      .rangeRound([0, width + margin.right])
      .padding(0.25);

  var x1 = d3.scaleBand()
      .padding(0);

  var y = d3.scaleLinear()
      .rangeRound([height, 0]);

  var z = d3.scaleOrdinal()
      .range(['#112E51', '#26C6DA']);

  x.domain(data.map(function(d) { return d.Year; }));
  x1.domain(keys).rangeRound([0, x.bandwidth()]);
  y.domain([0, d3.max(data, function(d) { return d3.max(keys, function(key) { return d[key]; }); }) + 50]).n

  var svg = d3.select('.chart').append('svg')
              .attr('height','100%')
              .attr('width','100%');
  var g = svg.append('g').attr('transform',
    'translate(' + 30 + ',' + margin.top + ')');

  var xAxis = d3.axisBottom(x)
                .tickPadding(10)
                .tickSize(0);
  var yAxis = d3.axisLeft(y)
                .ticks(null, 's')
                .tickSize(-width - margin.right);

  g.append('g')
      .attr('class', 'axis axis--y')
      .call(yAxis)
    .append('g')
      .attr('class', 'axis axis--x')
      .attr('transform', 'translate(' + 0 + ',' + height + ')')
      .call(xAxis)
    .append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', 6)
      .attr('dy', '0.71em')
      .attr('text-anchor', 'end');

  g.append('g')
      .selectAll('g')
      .data(data)
      .enter().append('g')
        .attr('transform', function(d) { return 'translate(' + x(d.Year) + ',0)'; })
      .selectAll('rect')
      .data(function(d) { return keys.map(function(key) { return {key: key, value: d[key]}; }); })
      .enter().append('rect')
        .attr('x', function(d) { return x1(d.key); })
        .attr('y', function(d) { return y(d.value); })
        .attr('width', x1.bandwidth())
        .attr('height', function(d) { return height - y(d.value); })
        .attr('fill', function(d) { return z(d.key); });

  g.append('text')
      .attr('class', 'label')
      .attr('y', -20)
      .attr('x', -margin.left + 15)
      .text('Rate')
});

// horizontal bars
d3.csv('/data/uninsured_rate_in_virginia.csv', function(d, i, columns) {
    for (var i = 1, n = columns.length; i < n; ++i) d[columns[i]] = +d[columns[i]];
    return d;
}, function(error, data) {
  margin.left = 50;
  var keys = data.columns.slice(1);

  var x = d3.scaleLinear()
      .rangeRound([0, width]);

  var y1 = d3.scaleBand()
      .padding(0);

  var y = d3.scaleBand()
      .rangeRound([height, 0])
      .padding(0.25);

  var z = d3.scaleOrdinal()
      .range(['#112E51', '#26C6DA']);

  x.domain([0, d3.max(data, function(d) { return d3.max(keys, function(key) { return d[key]; }); }) + 50]).n
  y.domain(data.map(function(d) { return d.Year; }));
  y1.domain(keys).rangeRound([0, y.bandwidth()]);

  var svg = d3.select('#horizontal').append('svg')
              .attr('height','100%')
              .attr('width','100%');
  var g = svg.append('g').attr('transform',
    'translate(' + 30 + ',' + margin.top + ')');

  var xAxis = d3.axisBottom(x)
                .ticks(null, 's')
                .tickSize(-width - margin.left);
  var yAxis = d3.axisLeft(y)
                .tickPadding(10)
                .tickSize(0);

  g.append('g')
      .attr('class', 'axis axis--y')
      .attr('transform', function(d) { return 'translate(10, 0)'; })
      .call(yAxis)
    .append('g')
      .attr('class', 'axis axis--x')
      .attr('transform', 'translate(' + 5 + ',' + height + ')')
      .call(xAxis)
    .append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', 6)
      .attr('dy', '0.71em')
      .attr('text-anchor', 'end');

  g.append('g')
      .selectAll('g')
      .data(data)
      .enter().append('g')
        .attr('transform', function(d) { return 'translate(15, ' + y(d.Year) + ')'; })
      .selectAll('rect')
      .data(function(d) { return keys.map(function(key) { return {key: key, value: d[key]}; }); })
      .enter().append('rect')
        .attr('x', function(d) { return 0; })
        .attr('y', function(d) { return y1(d.key); })
        .attr('height', y1.bandwidth())
        .attr('width', function(d) { return x(d.value); })
        .attr('fill', function(d) { return z(d.key); });

  g.append('text')
      .attr('class', 'label')
      .attr('y', -20)
      .attr('x', -margin.left + 20)
      .text('Rate')
});
