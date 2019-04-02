var body=d3.select("#student")

var screen={height:400,width:700}
var margin= {top: 50, right: 50, bottom: 50, left: 50}
var w= screen.width - margin.left - margin.right
var h=screen.height - margin.top-margin.bottom;

  // scale
  var yScale=d3.scaleLinear()
      .domain([0, 10])
      .range([h+margin.top,margin.top])
  var xScale=d3.scaleLinear()
      .domain([1,40])
      .range([margin.left,margin.left+w])

// data
var data=[]
var dataset=d[i].quizes
for (i=0;i<dataset.length;i++){
  var day=dataset[i].day
  var grade=dataset[i].grade
  var point={"x":xScale(day),"y":yScale(grade)}
  data.push(point)
}

var drawPath=d3.line()
  .x(function(d) { return d.x; })
  .y(function(d) { return d.y; })
  .curve(d3.curveCardinal)

    body.append("svg")
    .attr('id', 'quizegraph')
    .attr('height', screen.height)
    .attr('width', screen.width)

    var graph=body.select("#quizegraph")

    // graph title
    graph.append("text")
    .attr('x', 10)
    .attr('y', 30)
    .text('Quize Grade Graph')
    .style('font-size', 20)

    // axis
    var axis=d3.axisLeft(yScale).tickSize(0)
    graph.append("g")
    .call(axis)
    .attr('transform', 'translate(' + (margin.left-10) + ',' + 0+ ')')

    // Graph
        graph.selectAll("circle")
            .data(data)
            .enter()
            .append('circle')
            .attr('cx',function(d){
              return xScale(d.x)})
            .attr('cy',function(d){return yScale(d.y)})
            .attr('r',3)
            .style('fill', '#54576E');

        // paths
        graph.append("path")
          .attr('d', drawPath(data))
          .style('stroke', '#54576E')
          .attr('stroke-width', 1.5)
          .attr('class', 'path')
