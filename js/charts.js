'use strict';

require('uswds');
var d3 = require('d3');


var sel = d3.select('.chart');
if (!sel.empty()) {
  var margin = { top: 30, right: 20, bottom: 30, left: 40 };
  var width = d3.select('.chart').node().offsetWidth - margin.right - margin.left;
  var height = 350 - margin.top - margin.bottom;
  var RATE_LABEL = 'Cost';

  function appendTable(d3selection, data) {
      var table = d3selection.append('table');
      var header = table.append('thead').append('tr');
      var body = table.append('tbody');

      header.selectAll('th')
          .data(data.columns.map(function(d, i) {
              return i === 0 ? d : d + ' ' + RATE_LABEL;
          }))
          .enter().append('th').text(function(d) { return d; });

      body.selectAll('tr')
          .data(data)
          .enter().append('tr')
          .selectAll('td')
          .data(function(d) { return data.columns.map(function(label) { return d[label]; }); })
          .enter().append('td').text(function(d) { return d; });

      return table;
  }

  // tabular alternative (for screen readers)
  d3.csv(window.location.origin + '/img/data/housing.csv', function(d, i, columns) {
      for (var i = 1, n = columns.length; i < n; ++i) d[columns[i]] = +d[columns[i]];
      return d;
  }, function(error, data) {
      appendTable(d3.select('#table'), data);
  });

  // vertical bars
  d3.csv(window.location.origin + '/img/data/housing.csv', function(d, i, columns) {
      for (var i = 1, n = columns.length; i < n; ++i) d[columns[i]] = +d[columns[i]];
      return d;
  }, function(error, data) {
    var keys = data.columns.slice(1);

    var x = d3.scaleBand()
        .rangeRound([0, 980])
        .padding(0.25);

    var x1 = d3.scaleBand()
        .padding(0);

    var y = d3.scaleLinear()
        .rangeRound([height, 0]);

    var z = d3.scaleOrdinal()
        .range(['#112E51', '#26C6DA']);

    x.domain(data.map(function(d) { return d.state; }));
    x1.domain(keys).rangeRound([0, x.bandwidth()]);
    y.domain([0, d3.max(data, function(d) { return d3.max(keys, function(key) { return d[key]; }); }) + 50]).n

    var container = d3.select('#vertical');
    var svg = container.append('svg')
                .attr('aria-hidden', 'true')
                .attr('height','100%')
                .attr('width','100%');
    var g = svg.append('g').attr('transform',
      'translate(' + 40 + ',' + margin.top + ')');

    var xAxis = d3.axisBottom(x)
                  .tickPadding(10)
                  .tickSize(0);
    var yAxis = d3.axisLeft(y)
                  .ticks(null, 's')
                  .tickSize(-width - margin.right)
                  .tickFormat(d3.format('$,.2r'));


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
          .attr('transform', function(d) { return 'translate(' + x(d.state) + ',0)'; })
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
        .text(RATE_LABEL)

    appendTable(container, data).attr('class', 'usa-sr-only');
  });

  // horizontal bars
  d3.csv(window.location.origin + '/img/data/education.csv', function(d, i, columns) {
      for (var i = 1, n = columns.length; i < n; ++i) d[columns[i]] = +d[columns[i]];
      return d;
  }, function(error, data) {
    margin.left = 70;
    var keys = data.columns.slice(1);

    var x = d3.scaleLinear()
        .rangeRound([0, width - 24]);

    var y1 = d3.scaleBand()
        .padding(0);

    var y = d3.scaleBand()
        .rangeRound([height, 0])
        .padding(0.25);

    var z = d3.scaleOrdinal()
        .range(['#112E51', '#26C6DA']);

    x.domain([0, 1]).n
    y.domain(data.map(function(d) { return d.state; }));
    y1.domain(keys).rangeRound([0, y.bandwidth()]);

    var container = d3.select('#horizontal');
    var svg = container.append('svg')
                .attr('aria-hidden', 'true')
                .attr('height','100%')
                .attr('width','100%');
    var g = svg.append('g').attr('transform',
      'translate(' + 70 + ',' + 10 + ')');

    var xAxis = d3.axisBottom(x)
                  .ticks(null, 's')
                  .tickSize(-width - margin.left)
                  .tickFormat(d3.format(',.1%'));
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
          .attr('transform', function(d) { return 'translate(15, ' + y(d.state) + ')'; })
        .selectAll('rect')
        .data(function(d) { return keys.map(function(key) { return {key: key, value: d[key]}; }); })
        .enter().append('rect')
          .attr('x', function(d) { return 0; })
          .attr('y', function(d) { return y1(d.key); })
          .attr('height', y1.bandwidth())
          .attr('width', function(d) { return x(d.value); })
          .attr('fill', function(d) { return z(d.key); });

    appendTable(container, data).attr('class', 'usa-sr-only');
  });
}

d3.csv(window.location.origin + '/img/data/east_coast_populations.csv', function(erro, data, columns) {
  var x = d3.scaleLinear().range([0, width + 14]),
      y = d3.scaleLinear().range([height, 0]),
      z = d3.scaleOrdinal(d3.schemeCategory10);
  var line = d3.line()
      .curve(d3.curveBasis)
      .x(function(d) { return x(parseInt(d.date)); })
      .y(function(d) { return y(parseInt(d.population)); });
  var cities = data.columns.slice(1).map(function(id) {
    return {
      id: id,
      values: data.map(function(d) {
        return {date: parseInt(d.date), population: parseInt(d[id])};
      })
    };
  });


  x.domain(d3.extent(data, function(d) { return parseInt(d.date); }));
  y.domain([
    d3.min(cities, function(c) { return d3.min(c.values, function(d) { return parseInt(d.population); }); }),
    d3.max(cities, function(c) { return d3.max(c.values, function(d) { return parseInt(d.population); }); })
  ]);
  z.domain(cities.map(function(c) { return c.id; }));

  var container = d3.select('#line');
  var svg = container.append('svg')
              .attr('aria-hidden', 'true')
              .attr('height','100%')
              .attr('width','100%');
  var g = svg.append("g")
         .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var xAxis = d3.axisBottom(x)
                .tickFormat(d3.format("d"));

  var yAxis = d3.axisLeft(y)
                .tickSize(-width - margin.right);

  g.append("g")
      .attr("class", "axis axis--x")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

  g.append("g")
      .attr("class", "axis axis--y")
      .call(yAxis);

  var city = g.selectAll(".city")
    .data(cities)
    .enter().append("g")
      .attr("class", "city");

  city.append("path")
      .attr("class", "line")
      .attr("d", function(d) { return line(d.values); })
      .style("stroke", function(d) { return z(d.id); });
});
