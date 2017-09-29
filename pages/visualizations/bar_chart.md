---
permalink: /visualizations/bar-chart/
layout: styleguide
title: Bar Charts
category: Visualization types
lead: Bar charts use the length of horizontal or vertical columns to show relationships among different categories of data.  
---

## When to use them
In general, bar charts compare values that fall into separate categories. Use bar charts to show time series data only if the data points all occur at equal intervals. If the length of time between measurements is not the same for every data point and your variable is one that changes continously over time (such as employment rate or revenue) use a [line chart]().
However, bar charts can show negative values. 

## The basics
- Start the numeric axis at zero where possible.
- The order in which you put your items tells people how to interpret them. Put the shortest bar first to highlight the lowest values. To highlight the highest values, put the longest bar first. 
- Use a single color to represent all data representing the same measurement.
- Include a title, source, and labels written in plain language.
- Bar charts on the same topic and on the same page should have roughly the same dimensions and the same styles.
- Avoid unnecessary visual styling such as bar outlines, extra grid lines, borders and graphics.

## Examples

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

## Accessibility

For people using screen readers, we recommend hiding bar charts and proving the data in [table]() format instead.  
Browsers and screen readers present SVGs unpredictably, but many screen readers allow users to navigate data in tables easily. 
Since tables and bar charts are 

A screen-reader only tabular version of the data accompanies each SVG on this page. Here's a sample.

<div id="table"></div>

## Things to avoid
- Squashing too many bars into a single chart
- Alphabetically sorting values by default
- Using different colors for the same measurement
- Starting a numeric axis at anything but zero
