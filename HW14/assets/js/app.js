var svgWidth = 960;
var svgHeight = 660;

var chartMargin = {
  top: 30,
  right: 30,
  bottom: 30,
  left: 30
};

var chartWidth = svgWidth - chartMargin.left - chartMargin.right;
var chartHeight = svgHeight - chartMargin.top - chartMargin.bottom;

var svg = d3
  .select("body")
  .append("svg")
  .attr("height", svgHeight)
  .attr("width", svgWidth)

var chartGroup = svg.append("g")
  .attr("transform", `translate(${chartMargin.left}, ${chartMargin.top})`);

d3.csv("../../data.csv", function (error, data) {
  if (error) return console.warn(error);
  console.log(data);
  data.forEach(function (d) {
    d.could_not_afford_dotor = +d.could_not_afford_dotor;
    d.birth_no_hs_diploma = +d.birth_no_hs_diploma;
  });

  var yLinearScale = d3.scaleLinear()
    .range([chartHeight, 0])
    .domain([0, d3.max(data, d => d.could_not_afford_dotor)]);

  var xLinearScale = d3.scaleLinear()
    .range([chartHeight, 0])
    .domain([0, d3.max(data, d => d.birth_no_hs_diploma)]);
    
  var bottomAxis = d3.axisBottom(xTimeScale);
  var leftAxis = d3.axisLeft(yLinearScale);

  chartGroup.append("g")
    .classed("axis", true)
    .call(leftAxis);

  chartGroup.append("g")
    .classed("axis", true)
    .call(bottomAxis);  

  chartGroup.selectAll(".circle")
    .data(data)
    .enter()
    .append("circle")
    .classed("circle", true)
    .attr("x", xLinearScale(data.birth_no_hs_diploma))
    .attr("y", yLinearScale(data.could_not_afford_dotor))
    .text(function(data){return data.state})

});  

