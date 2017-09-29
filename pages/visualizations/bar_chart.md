---
permalink: /visualizations/bar-chart/
layout: styleguide
title: Bar Charts
category: Visualization types
lead: Bar charts use horizontal or vertical columns to show relationships among different categories of data. The columns can be arranged either along the [horizontal](anchor link to horizontal subsection) or [vertical](link to subsection) axis. 
---

<h4 class="usa-chart-title">Home ownership and rental costs across the southwest</h4>
<div id="vertical" class="chart" style="height: 350px; width: 860px;"></div>
<div class="usa-legend" aria-hidden="true">
  <span class="usa-legend-box"></span>
    <span class="usa-legend-text">Median selected monthly owner costs -with a mortgage, 2011-2015</span>
  <span class="usa-legend-box"></span>
    <span class="usa-legend-text">Median gross rent, 2011-2015</span>
</div>

<h4 class="usa-chart-title">Education rates across the southwest</h4>
<div id="horizontal" class="chart" style="height: 330px; width: 880px;"></div>
<div class="usa-legend" aria-hidden="true">
  <span class="usa-legend-box"></span>
    <span class="usa-legend-text">High school graduate or higher, percent of persons age 25 years+, 2011-2015</span>
  <br />
  <span class="usa-legend-box"></span>
    <span class="usa-legend-text">Bachelor's degree or higher, percent of persons age 25 years+, 2011-2015</span>
</div>

<h4 class="usa-chart-title">Tabular alternatives</h4>

Due to the fact that bar charts are semantically similar to tabular data,
the unpredictable support for accessible SVGs across browsers and
screen readers, and the fact that many screen readers contain specialized
controls for navigating tabular data easily, we recommend hiding
graphical bar charts from screen readers and providing a tabular
alternative for visually impaired users.

A screen-reader only tabular version of the data is included with each
SVG on this page to assist visually impaired users. Below is the
tabular version made visible, for reference purposes.

<div id="table"></div>

## When to use it
Use bar charts to compare values grouped into separate categories. Use bar charts to show time series data only if the data points are all at equal intervals. If the length of time between measurements is not the same for every data point and your variable is one that changes continously over time (such as employment rate or revenue) use a [line chart](link).

## The basics
- Maintain space between bars so they’re easy to tell apart.
- Use a single color to represent all data representing the same measurement.
- Start numeric axis at zero where possible.
- Include a title, source, and labels written in plain language.
- Maintain consistency and dimensions in look and feel when representing multiple, similar bar charts on a page.
- Avoid visual elements like bar outlines, extra grid lines, borders and graphics.

## Examples

A bar charts can also use  data representing the same measurement for two different years.


Bar charts can show negative values.

The order in which you put your items tells people how to interpret them. Put the shortest bar first to highlight the lowest values. To highlight the highest values, put the longest bar first. 


## Things to avoid
- Too many bars on the same chart.
- Alphabetical sorting of values.
- Representing the same measurement with different colors, or gradients.
- Starting a numeric axis at anything but zero in an attempt to highlight the difference in values.
- Not including enough information



