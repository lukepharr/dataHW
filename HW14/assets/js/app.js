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
    .range([0, chartHeight])
    .domain([0, d3.max(data, d => d.birth_no_hs_diploma)]);
    
  var bottomAxis = d3.axisBottom(xLinearScale);
  var leftAxis = d3.axisLeft(yLinearScale);


  chartGroup.selectAll(".circle")
    .data(data)
    .enter()
    .append("circle")
    .classed("circle", true)
    .attr("cx", d => xLinearScale(d.birth_no_hs_diploma))
    .attr("cy", d => yLinearScale(d.could_not_afford_dotor))



  chartGroup.selectAll(".text")
  	.data(data)
  	.enter()
    .append("text")
    .classed('inside-text', true)
    .attr("x", d => xLinearScale(d.birth_no_hs_diploma))
    .attr("y", d => yLinearScale(d.could_not_afford_dotor))
    .text(function(d){return d.state })

  chartGroup.append("g")
    .classed("axis", true)
    .call(leftAxis)
    .append('text')
    .classed('axis-text', true)
    .text('Percent of people who could not afford doctor')
    .attr('transform', 'rotate(360)');

  chartGroup.append("g")
    .classed("axis", true)
    .call(bottomAxis)
    .append('text')
    .classed('axis-text', true)
    .text('Percent of women who gave birth w/o highschool diplomas') 
    .attr('transform', 'rotate(270)');

});  

