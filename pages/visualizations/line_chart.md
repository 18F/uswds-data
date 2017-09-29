---
permalink: /visualizations/line-chart/
layout: styleguide
title: Line Charts
category: Visualization types
lead: Straight lines between data points show continuous change in value, usually over time.
---

## When to use it
Line charts are best at communicating trends over time rather than the value of distinct data points. Never use a line chart to compare non-numeric variables, such as country of birth or state of residence. To compare data in categories, use a [bar chart]().

## The basics
- Use contrasting colors to make identifying lines from one another easy.
- Symbols can help identify breaks in your data, but shouldn't clutter or obscure lines.  You can also use circles or dots on the line at each data point when the lengths of time between each data point is not the same.
- Label each line directly if possible.
- Start the numeric axis at zero where possible.  To highlight small changes over time, in some cases you may decide to start the y-axis at a non-zero value.  In such cases be sure to clearly indicate a clear break between zero and the first number.
- Include a title, source, and labels written in plain language.
- A continuous line calls attention to overall trends rather than individual data points. Never use a line chart to compare non-numeric variables, such as country of birth. To compare data in separate categories, use a [bar chart]().
- Some changes over time are small but important. To make them easier to see, add a second, more focused chart, next to a primary chart showing the trend in its full context.
- Comparing trends is easier when lines are not layered on top of each other. Give each line its own small chart if there are more than five lines.
- You can create a single chart with both a line and a bar chart as long as both use the same units of time.  See [composite charts]() for examples.

## Examples

<h4 class="usa-chart-title">Population sizes</h4>
<div id="line" class="chart" style="height: 350px; width: 860px;"></div>
<div class="usa-legend" aria-hidden="true">
  <span class="usa-legend-box" style="background-color: rgb(31, 119, 180);"></span>
    <span class="usa-legend-text">
    New York City, NY</span>
  <br />
  <span class="usa-legend-box" style="background-color: rgb(255, 127, 14);"></span>
    <span class="usa-legend-text">Philadelphia, PA</span>
  <span class="usa-legend-box" style="background-color: rgb(44, 160, 44);"></span>
    <span class="usa-legend-text">Baltimore City, MD</span>
</div>

## Things to avoid

- Placing labels too far away from their respective lines.
- Unnecessary visual elements such as extra grid lines, borders and graphics.
- Avoid curving lines between data measurements.
- Avoid using line thickness, or dotted or dashed lines to identify one line from another.

