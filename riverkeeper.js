/* Course: DATA 300L 111 Spring 2020
  Author: Eleni Nickolas and Patrick Sullivan
*/

/*
  Loading multiple data files.
*/

const data2019 = d3.csv("desktop/Data300/data2019.csv")
const data2018 = d3.csv("desktop/Data300/data2018.csv")
const data2017 = d3.csv("desktop/Data200/data2017.csv")

/* Threshold for enterococcus count 
*/

const enterococcusThreshold = 60;

/* Define sequential scale to indicate illiteracy rate. */
const color = d3.scaleSequential(t => d3.hsl(145, 100, 32 * t).toString())
  .domain([0, 2400]);
/* Define diverging scale to indicate below/above entercoccus threshold. */
const hiLoColor = d3.scaleDiverging()
  .interpolator(d3.interpolatePuOr)
  .domain([0, enterococcusThreshold, 2400);

/* Create an SVG image to hold the chart. */
const svg = d3.select("#choropleth")
  .append("svg")
  .attr("width", chartParams.width)
  .attr("height", chartParams.height)
  .on("click", toggleDetails);

/* Container to hold the path elements for the map. */
const map = svg.append("g");

/* Register event listener for color palette toggle. */
d3.select("#viewControl input")
  .on("change", updateViewColors);

/* Initialize color gradients for legend. */
initializeGradients();

/* Create a legend at the bottom of the chart. */
buildLegend();

/* Once all of the data loads, we can build our chart. */
Promise.all([data2019, data2018, data2017])
  .then(buildChart);