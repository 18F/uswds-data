---
permalink: /components/bar-chart/
layout: styleguide
title: Bar Chart
category: Components
lead: Bar charts are a good way to visualize data.
---

## Bar Charts

Accessibility for vertical bar charts lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla a nunc eleifend, sagittis ante vel, auctor risus. Pellentesque sed ex magna. Suspendisse congue felis sit amet magna egestas facilisis.

See additional info about color in the overall [accessibility guidelines](design-principals/accessibility/).

<h4 class="usa-chart-title">Housing and rent comparisons across the southwest</h4>
<div id="vertical" class="chart" style="height: 350px; width: 100%;"></div>
<div class="usa-legend" aria-hidden="true">
  <span class="usa-legend-box"></span>
    <span class="usa-legend-text">Median selected monthly owner costs -with a mortgage, 2011-2015</span>
  <span class="usa-legend-box"></span>
    <span class="usa-legend-text">Median gross rent, 2011-2015</span>
</div>

<h4 class="usa-chart-title">Education rates across the southwest</h4>
<div id="horizontal" class="chart" style="height: 350px; width: 100%;"></div>
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

