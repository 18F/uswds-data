require('uswds');
var d3 = require('d3');

var data = [15, 45, 23, 31, 28, 39, 50, 8];

var margin = { top: 20, right: 20, bottom: 30, left: 40 };
var width = d3.select('.chart').node().offsetWidth - margin.right - margin.left;
var height = 350 - margin.top - margin.bottom;


d3.csv('/data/uninsured_rate_in_virginia.csv', function(d, i, columns) {
    for (var i = 1, n = columns.length; i < n; ++i) d[columns[i]] = +d[columns[i]];
    return d;
}, function(error, data) {
  console.log('data', data);
  var keys = data.columns.slice(1);

  var x = d3.scaleBand()
      .rangeRound([0, width])
      .paddingInner(0.25);

  var x1 = d3.scaleBand()
      .padding(0);

  var y = d3.scaleLinear()
      .rangeRound([height, 0]);

  var z = d3.scaleOrdinal()
      .range(["#112E51", "#26C6DA"]);

  x.domain(data.map(function(d) { return d.Year; }));
  x1.domain(keys).rangeRound([0, x.bandwidth()]);
  y.domain([0, d3.max(data, function(d) { return d3.max(keys, function(key) { return d[key]; }); })]).n

  var svg = d3.select('.chart').append('svg')
              .attr('height','100%')
              .attr('width','100%');
  var g = svg.append("g").attr("transform",
    "translate(" + margin.left + "," + margin.top + ")");

  var xAxis = d3.axisBottom(x)
  var yAxis = d3.axisLeft(y)
                .ticks(null, 's');

  g.append("g")
      .selectAll("g")
      .data(data)
      .enter().append("g")
        .attr("transform", function(d) { return "translate(" + x(d.Year) + ",0)"; })
      .selectAll("rect")
      .data(function(d) { return keys.map(function(key) { return {key: key, value: d[key]}; }); })
      .enter().append("rect")
        .attr("x", function(d) { return x1(d.key); })
        .attr("y", function(d) { return y(d.value); })
        .attr("width", x1.bandwidth())
        .attr("height", function(d) { return height - y(d.value); })
        .attr("fill", function(d) { return z(d.key); });


  g.append('g')
      .attr('class', 'axis axis--y')
      .call(d3.axisLeft(y).ticks(null, 's'))
    .append('g')
      .attr('class', 'axis axis--x')
      .attr("transform", "translate(" + 0 + "," + height + ")")
      .call(xAxis)
    .append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', 6)
      .attr('dy', '0.71em')
      .attr('text-anchor', 'end');

});






