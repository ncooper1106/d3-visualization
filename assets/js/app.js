// Create the scatter svg
var svg = d3.select("#scatter")
  .append("svg")
  .attr("width", 680)
  .attr("height", 340)
  .attr("class", "chart");

// Create and select xaxis label
svg.append("g").attr("class", "xlabel")
var xlabel = d3.select(".xlabel")

// Create and select yaxis label
svg.append("g").attr("class", "ylabel")
var ylabel = d3.select(".ylabel")

// Assign attributes to xlabel and ylabel d3 objects
// Income
xlabel.append("text")
  .attr("y", 0)
  .attr("data-name", "income")
  .attr("data-axis", "x")
  .text("Household Median Income");

// No healthcare
ylabel.append("text")
.attr("y", 0)
.attr("data-name", "healthcare")
.attr("data-axis", "y")
.text("No healthcare");

// Poverty
xlabel.append("text")
  .attr("y", 30)
  .attr("data-name", "poverty")
  .attr("data-axis", "x")
  .text("Poverty %");

// Obesity
ylabel.append("text")
.attr("y", 30)
.attr("data-name", "obesity")
.attr("data-axis", "y")
.text("Obese %");

// Age
xlabel.append("text")
  .attr("y", 60)
  .attr("data-name", "age")
  .attr("data-axis", "x")
  .text("Median Age");

// Smoking
ylabel.append("text")
  .attr("x", 60)
  .attr("data-name", "smokes")
  .attr("data-axis", "y")
  .text("Smoking %");

// Import csv data
d3.csv("assets/data/data.csv").then(data => {
    populate(data);
  }); 

function populate(data) {
var curX = "poverty";
var curY = "obesity";

var xMin;
var xMax;
var yMin;
var yMax;

// Setting up the tooltip
var toolTip = d3
    .tip()
    .attr("class", "d3-tip")
    .offset([40, -60])
    .html(function(d) {
    var theX;
    // Get the state name.
    var theState = "<div>" + d.state + "</div>";
    // Y value key and value.
    var theY = "<div>" + curY + ": " + d[curY] + "%</div>";
    // If the x key is poverty
    if (curX === "poverty") {
        // Grab the x key and a version of the value formatted to show percentage
        theX = "<div>" + curX + ": " + d[curX] + "%</div>";
    }
    else {
        // Otherwise
        // Grab the x key and a version of the value formatted to include commas after every third digit.
        theX = "<div>" +
        curX +
        ": " +
        parseFloat(d[curX]).toLocaleString("en") +
        "</div>";
    }
    // Display what we capture.
    return theState + theX + theY;
    });
// Call the toolTip function.
svg.call(toolTip);