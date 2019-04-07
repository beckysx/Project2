var dataset=d3.json("classData.json");
function sortNumber(a,b){
  return a-b
}
// get final grade array 23
var getFinalArray=function(d){
        var array=[]
        for(var i=0;i<d.length;i++){
          var grade=parseInt(d[i].final[0].grade)
          array.push(grade)
        }
        array.sort(sortNumber)
        return array
}
// get homework grad2 array 437
var getPersonalArray=function(d,array){
  for(var i=0;i<d.length;i++){
    var a=[]
    var grade=parseInt(d[i].grade)
    a.push(grade)
    d3.sum(a)
    array.push(a)
  }
}
var getHwArray=function(d){
  var array=[]
  for(var i=0;i<d.length;i++){
    var data=d[i].homework
    var personData=getPersonalArray(data,array)
  }
  array.sort(sortNumber)
  return array
}
// get test 1 grade array 23
var getTest1Array=function(d){
  var array=[]
  var sort=[]
  for(var i=0;i<d.length;i++){
    var grade=parseInt(d[i].test[0].grade)
    array.push(grade)
    sort.push(grade)
  }
  sort.sort(sortNumber)
  return [array,sort]

}
// get test 2 grade array 23
var getTest2Array=function(d){
  var array=[]
  var sort=[]
  for(var i=0;i<d.length;i++){
    var grade=parseInt(d[i].test[1].grade)
    array.push(grade)
    sort.push(grade)
  }
  sort.sort(sortNumber)
  return [array,sort]

}
// get quize grade array 874
var getQuizeArray=function(d){
  var array=[]
  for(var i=0;i<d.length;i++){
    var data=d[i].quizes
    var personData=getPersonalArray(data,array)
  }
  array.sort(sortNumber)
  return array
}



// index Page

  // timeline & pie chart
    var drawFixedPart=function(){
      // timeline
        var timescreen={width:1400,height:270};
        var timemargin = {top: 50, right: 30, bottom: 30, left: 30};
        var timew = timescreen.width - timemargin.left - timemargin.right;
        var timeh = timescreen.height - timemargin.top - timemargin.bottom;


        var timelinesvg=d3.select("#index").append("svg")
                  .attr('id', 'timelinesvg')
                  .attr('width', timescreen.width)
                  .attr('height', timescreen.height)

        var line=d3.select("#timelinesvg")
            .append('line')
            .attr('x1', timemargin.right-5)
            .attr('y1', timemargin.top)
            .attr('x2', timemargin.right+timew)
            .attr('y2',timemargin.top )
            .attr('stroke-width', 3)
            .style('stroke', '#111');

        var exam=[15,30,41]
        var quize=d3.range(42)
        delete quize[15]
        delete quize[30]
        delete quize[41]

        var scale=d3.scaleLinear()
            .domain([1,40])
            .range([30, timew]);

        var examcircle=d3.select("#timelinesvg").selectAll('circle')
            .data(exam)
            .enter()
            .append('circle')
            .attr('cx', function(d){
              return scale(d)
            })
            .attr('cy', timemargin.top)
            .attr('r', 10)
            .style('stroke', 'pink')
            .attr('stroke-width', 5)
            .style('fill', 'orange')
            .attr('id',function(d){
              return "day"+d
            });


        var quizeLine=d3.select("#timelinesvg").append("g").attr('id', 'quizeLine')
        quizeLine.selectAll("line")
            .data(quize)
            .enter().append('line')
            .attr('x1', function(d){
              return scale(d)
            })
            .attr('y1', timemargin.top-15)
            .attr('x2', function(d){
              return scale(d)
            })
            .attr('y2', timemargin.top-1)
            .style('stroke', '#499FB7')
            .attr('stroke-width', 5)
            .attr('id',function(d){
              return "day"+d
            });

        var hw=d3.range(2,40,2)
        delete hw[14]

        var hwLine=d3.select("#timelinesvg").append("g").attr('id', 'hwLine')
        hwLine.selectAll("line")
            .data(hw)
            .enter().append('line')
            .attr('x1', function(d){
              return scale(d)
            })
            .attr('y1', timemargin.top+1)
            .attr('x2', function(d){
              return scale(d)
            })
            .attr('y2', timemargin.top+15)
            .style('stroke', '#8F995E')
            .attr('stroke-width', 5)
            .attr('id',function(d){
              return "day"+d
            });



      // explain box
          //quizes box
          var quizebox=timelinesvg.append("g").attr('id', 'quizebox')
          quizebox.append('circle')
                  .attr('cx', 164.35)
                  .attr('cy', 160)
                  .attr('r', 5)
                  .style('fill', '#111');

          quizebox.append("line")
              .attr('x1', 164.36)
              .attr('y1',50 )
              .attr('x2', 164.36)
              .attr('y2', 165)
              .style('stroke', '#111');

          quizebox.append("text")
          .attr('text-anchor', 'middle')
          .attr('x', 164.36)
          .attr('y', 200)
          .text("Quize")

          quizebox.append("text")
          .attr('text-anchor', 'middle')
          .attr('x', 164.36)
          .attr('y', 230)
          .text("Everyday")

          //test1 box
          var test1box=timelinesvg.append("g").attr('id', 'test1box')
          test1box.append('circle')
                  .attr('cx', 500)
                  .attr('cy', 160)
                  .attr('r', 5)
                  .style('fill', '#111');

          test1box.append("line")
              .attr('x1', 500)
              .attr('y1',61 )
              .attr('x2', 500)
              .attr('y2', 160)
              .style('stroke', '#111');

          test1box.append("text")
          .attr('text-anchor', 'middle')
          .attr('x', 500)
          .attr('y', 195)
          .text("Test1")

          test1box.append("text")
          .attr('text-anchor', 'middle')
          .attr('x', 500)
          .attr('y', 230)
          .text("on Day15")

          //hw box
          var hwbox=timelinesvg.append("g").attr('id', 'hwbox')
          hwbox.append('circle')
                  .attr('cx', 735.4)
                  .attr('cy', 160)
                  .attr('r', 5)
                  .style('fill', '#111');

          hwbox.append("line")
              .attr('x1', 735.4)
              .attr('y1',65 )
              .attr('x2', 735.4)
              .attr('y2', 160)
              .style('stroke', '#111');

          hwbox.append("text")
          .attr('text-anchor', 'middle')
          .attr('x', 735.4)
          .attr('y', 195)
          .text("Homework")

          hwbox.append("text")
          .attr('text-anchor', 'middle')
          .attr('x', 735.4)
          .attr('y', 230)
          .text("Every 2 Day")

          //test2 box
          var test2box=timelinesvg.append("g").attr('id', 'test2box')
          test2box.append('circle')
                  .attr('cx', 1004)
                  .attr('cy', 160)
                  .attr('r', 5)
                  .style('fill', '#111');

          test2box.append("line")
              .attr('x1', 1004)
              .attr('y1',62 )
              .attr('x2', 1004)
              .attr('y2', 160)
              .style('stroke', '#111');

          test2box.append("text")
          .attr('text-anchor', 'middle')
          .attr('x', 1004)
          .attr('y', 195)
          .text("Test 2")

          test2box.append("text")
          .attr('text-anchor', 'middle')
          .attr('x', 1004)
          .attr('y', 230)
          .text("on Day30")

          //final box
          var finalbox=timelinesvg.append("g").attr('id', 'finalbox')

          finalbox.append('circle')
                  .attr('cx', 1271)
                  .attr('cy', 160)
                  .attr('r', 5)
                  .style('fill', '#111');

          finalbox.append("line")
              .attr('x1', 1373.6)
              .attr('y1',62 )
              .attr('x2', 1271)
              .attr('y2', 130)
              .style('stroke', '#111');

          finalbox.append("line")
              .attr('x1', 1271)
              .attr('y1',130 )
              .attr('x2', 1271)
              .attr('y2', 160)
              .style('stroke', '#111');

          finalbox.append("text")
          .attr('text-anchor', 'middle')
          .attr('x', 1271)
          .attr('y', 195)
          .text("Final")

          finalbox.append("text")
          .attr('text-anchor', 'middle')
          .attr('x', 1271)
          .attr('y', 230)
          .text("on Day41")


      // piechart
        var chart=d3.select("#index").append("svg")
        .attr('width', 400)
        .attr('height', 300)
        .attr('id', 'piechart')

        chart.append("svg:image")
        .attr('xlink:href', function(){return "piechart.png"})
        .attr('x', -20)
        .attr('y', 0)
        .attr('width', 400)
        .attr('class', 'piechartImage')

        chart.append("text")
        .attr('x', 125)
        .attr('y', 135)
        .attr('text-anchor', 'middle')
        .text('Final Grade')

      // color legend
        var colorlegend=d3.select("#index").append("svg")
        .attr('id', 'colorlegend')
        .attr('width', 270)
        .attr('height', 150)

            //quize average line
            colorlegend.append("g").attr('id', 'qMLlegend')
            d3.select("#qMLlegend").append('line')
                .attr('x1', 10)
                .attr('y1', 30)
                .attr('x2', 50)
                .attr('y2', 30)
                .style('stroke', '#4A969E')
                .attr('stroke-width', 3)
                .attr('stroke-opacity', 0.5);
            d3.select("#qMLlegend").append('text')
                .attr('x', 70)
                .attr('y', 35)
                .text('Quize Median Line')
            //quize point
            colorlegend.append("g").attr('id', 'qSPlegend')
            d3.select("#qSPlegend").append('circle')
                .attr('cx', 30)
                .attr('cy', 65)
                .attr('r', 5)
                .attr('fill', '#D87A5B')

            d3.select("#qSPlegend").append('text')
                .attr('x', 70)
                .attr('y', 70)
                .text('Quize Score Point')

            //homework average line
            colorlegend.append("g").attr('id', 'hMLlegend')
            d3.select("#hMLlegend").append('line')
                .attr('x1', 10)
                .attr('y1', 100)
                .attr('x2', 50)
                .attr('y2', 100)
                .style('stroke', '#FFCA1E')
                .attr('stroke-width', 3)
                .attr('stroke-opacity', 0.5);
            d3.select("#hMLlegend").append('text')
                .attr('x', 70)
                .attr('y', 105)
                .text('Homework Median Line')
            //homework point
            colorlegend.append("g").attr('id', 'hSPlegend')
            d3.select("#hSPlegend").append('circle')
                .attr('cx', 30)
                .attr('cy', 135)
                .attr('r', 5)
                .attr('fill', '#A5D350')

            d3.select("#hSPlegend").append('text')
                .attr('x', 70)
                .attr('y', 140)
                .text('Homework Score Point')
    }

  // main chart fixed part
    var drawMainChart=function(d){

          // Student situation
          var screen={width:1400/4,height:100};
          var margin = {top: 4, right: 10, bottom: 10, left: 100};
          var w = screen.width - margin.left - margin.right;
          var h = screen.height - margin.top - margin.bottom;

          // scale
          var qyScale=d3.scaleLinear()
              .domain([0,10])
              .range([margin.top+h,margin.top]);
          var hyScale=d3.scaleLinear()
              .domain([0, 50])
              .range([margin.top+h,margin.top]);
          var xScale=d3.scaleLinear()
              .domain([1,40])
              .range([margin.left+5,margin.left+w]);

          // y axis
              var qyAxis=d3.axisRight(qyScale)
              .tickSize(0)
              .ticks(5)
              var hyAxis=d3.axisLeft(hyScale)
              .tickSize(0)
              .ticks(5)

          // path function
          var drawPath=d3.line()
            .x(function(d) { return d.x; })
            .y(function(d) { return d.y; })
            .curve(d3.curveCardinal)

          // big svg
            var allstudentsvg=d3.select("#index").append("svg")
            .attr('id', 'allstudentsvg')
            .attr('width', 1400)
            .attr('height', 800)
            .style('background', '#56554C')

            // group1
            for(i=0;i<4;i++){
              allstudentsvg.append("g")
              .attr('class', 'group1')
              .attr('transform', function(){
                return 'translate(' + (i*screen.width) + ',' + 30+ ')'
              })
              .append("svg")
              .attr('class', 'studentsvg')
              .attr('id', function(){return "student"+(i+1)})
              .attr('clip-path', function(){return 'url(#cover'+(i+1)+')'})

              allstudentsvg.append("g")
              .attr('class', 'actual')
              .attr('transform', function(){
                return 'translate(' + (i*screen.width) + ',' + 30+ ')'
              })
              .append("svg")
              .attr('class', 'averagelines')
              .attr('id', function(){return "lines"+(i+1)})

              // y axis
              var currentid="#student"+(i+1)
              var svg=d3.select(currentid)

              svg.append("g").attr('class', 'qyaxis')
              .call(qyAxis)
              .attr('transform', 'translate(' + (margin.left-10) + ',' + margin.top + ')')

              svg.append("g").attr('class', 'hyaxis')
              .call(hyAxis)
              .attr('transform', 'translate(' + (margin.left-10) + ',' + margin.top + ')')

              // clip paths
              svg.append('clipPath')
              .attr('id', function(){return "cover"+(i+1)})
              .append("rect")
              .attr('x', 0)
              .attr('y', 0)
              .attr('width', xScale(1))
              .attr('height', 260)

              // paths
              var qpoints=[]
              var dataset=d[i].quizes
              for (a=0;a<dataset.length;a++){
                var day=dataset[a].day
                var grade=dataset[a].grade
                var point={"x":xScale(day),"y":qyScale(grade)}
                qpoints.push(point)
              }

              var hpoints=[]
              var dataset=d[i].homework
              for (a=0;a<dataset.length;a++){
                var day=dataset[a].day
                var grade=dataset[a].grade
                var point={"x":xScale(day),"y":hyScale(grade)}
                hpoints.push(point)
              }

              svg.append("path")
                .attr('d', drawPath(qpoints))
                .style('stroke', '#D87A5B')
                .attr('stroke-width', 1.5)
                .attr('class', 'path')

              svg.append("path")
                .attr('d', drawPath(hpoints))
                .style('stroke', '#A5D350')
                .attr('stroke-width', 1.5)
                .attr('class', 'path')

              // student picture
              var index=i
              svg.append("a").attr('href', '#goto')
              .append("svg:image")
              .attr('xlink:href', function(){return "https://beckysx.github.io/Project2/penguins/"+d[index].picture})
              .attr('x', 10)
              .attr('y', 0)
              .attr('width', 60)
              .attr('height', 60)
              .attr('class', 'image')
              .attr('id', function(){
                return "pstudent"+index
              })
              .on('click', function(){
                var getindex=parseInt(d3.select(this).attr("id").replace(/[^0-9]/ig,""))
                studentpagechange(d,getindex)
              })
            }
            //group2
            for(i=0;i<4;i++){
              allstudentsvg.append("g")
              .attr('class', 'group2')
              .attr('transform', function(){
                return 'translate(' + (i*screen.width) + ',' + (screen.height+60) + ')'
              })
              .append("svg")
              .attr('class', 'studentsvg')
              .attr('id', function(){return "student"+(i+5)})
              .attr('clip-path', function(){return 'url(#cover'+(i+5)+')'})

              allstudentsvg.append("g")
              .attr('class', 'actual')
              .attr('transform', function(){
                return 'translate(' + (i*screen.width) + ',' + (screen.height+60)+ ')'
              })
              .append("svg")
              .attr('class', 'averagelines')
              .attr('id', function(){return "lines"+(i+5)})

              // y axis
              var currentid="#student"+(i+5)
              var svg=d3.select(currentid)

              svg.append("g").attr('class', 'qyaxis')
              .call(qyAxis)
              .attr('transform', 'translate(' + (margin.left-10) + ',' + margin.top + ')')

              svg.append("g").attr('class', 'hyaxis')
              .call(hyAxis)
              .attr('transform', 'translate(' + (margin.left-10) + ',' + margin.top + ')')

              // clip paths
              svg.append('clipPath')
              .attr('id', function(){return "cover"+(i+5)})
              .append("rect")
              .attr('x', 0)
              .attr('y', 0)
              .attr('width', xScale(1))
              .attr('height', 260)

              // paths
              var qpoints=[]
              var dataset=d[i+4].quizes
              for (a=0;a<dataset.length;a++){
                var day=dataset[a].day
                var grade=dataset[a].grade
                var point={"x":xScale(day),"y":qyScale(grade)}
                qpoints.push(point)
              }

              var hpoints=[]
              var dataset=d[i+4].homework
              for (a=0;a<dataset.length;a++){
                var day=dataset[a].day
                var grade=dataset[a].grade
                var point={"x":xScale(day),"y":hyScale(grade)}
                hpoints.push(point)
              }

              svg.append("path")
                .attr('d', drawPath(qpoints))
                .style('stroke', '#D87A5B')
                .attr('stroke-width', 1.5)
                .attr('class', 'path')

              svg.append("path")
                .attr('d', drawPath(hpoints))
                .style('stroke', '#A5D350')
                .attr('stroke-width', 1.5)
                .attr('class', 'path')

              // student picture
              var index=i+4
              svg.append("a").attr('href', '#goto')
              .append("svg:image")
              .attr('xlink:href', function(){return "https://beckysx.github.io/Project2/penguins/"+d[index].picture})
              .attr('x', 10)
              .attr('y', 0)
              .attr('width', 60)
              .attr('height', 60)
              .attr('class', 'image')
              .attr('id', function(){
                return "pstudent"+index
              })
              .on('click', function(){
                var getindex=parseInt(d3.select(this).attr("id").replace(/[^0-9]/ig,""))
                studentpagechange(d,getindex)
              })

            }
            //group3
            for(i=0;i<4;i++){
              allstudentsvg.append("g")
              .attr('class', 'group3')
              .attr('transform', function(){
                return 'translate(' + (i*screen.width) + ',' + (2*screen.height+90) + ')'
              })
              .append("svg")
              .attr('class', 'studentsvg')
              .attr('id', function(){return "student"+(i+9)})
              .attr('clip-path', function(){return 'url(#cover'+(i+9)+')'})

              allstudentsvg.append("g")
              .attr('class', 'actual')
              .attr('transform', function(){
                return 'translate(' + (i*screen.width) + ',' + (2*screen.height+90)+ ')'
              })
              .append("svg")
              .attr('class', 'averagelines')
              .attr('id', function(){return "lines"+(i+9)})

              // y axis
              var currentid="#student"+(i+9)
              var svg=d3.select(currentid)

              svg.append("g").attr('class', 'qyaxis')
              .call(qyAxis)
              .attr('transform', 'translate(' + (margin.left-10) + ',' + margin.top + ')')

              svg.append("g").attr('class', 'hyaxis')
              .call(hyAxis)
              .attr('transform', 'translate(' + (margin.left-10) + ',' + margin.top + ')')

              // clip paths
              svg.append('clipPath')
              .attr('id', function(){return "cover"+(i+9)})
              .append("rect")
              .attr('x', 0)
              .attr('y', 0)
              .attr('width', xScale(1))
              .attr('height', 260)

              // paths
              var qpoints=[]
              var dataset=d[i+8].quizes
              for (a=0;a<dataset.length;a++){
                var day=dataset[a].day
                var grade=dataset[a].grade
                var point={"x":xScale(day),"y":qyScale(grade)}
                qpoints.push(point)
              }

              var hpoints=[]
              var dataset=d[i+8].homework
              for (a=0;a<dataset.length;a++){
                var day=dataset[a].day
                var grade=dataset[a].grade
                var point={"x":xScale(day),"y":hyScale(grade)}
                hpoints.push(point)
              }

              svg.append("path")
                .attr('d', drawPath(qpoints))
                .style('stroke', '#D87A5B')
                .attr('stroke-width', 1.5)
                .attr('class', 'path')

              svg.append("path")
                .attr('d', drawPath(hpoints))
                .style('stroke', '#A5D350')
                .attr('stroke-width', 1.5)
                .attr('class', 'path')

              // student picture
              var index=i+8
              svg.append("a").attr('href', '#goto')
              .append("svg:image")
              .attr('xlink:href', function(){return "https://beckysx.github.io/Project2/penguins/"+d[index].picture})
              .attr('x', 10)
              .attr('y', 0)
              .attr('width', 60)
              .attr('height', 60)
              .attr('class', 'image')
              .attr('id', function(){
                return "pstudent"+index
              })
              .on('click', function(){
                var getindex=parseInt(d3.select(this).attr("id").replace(/[^0-9]/ig,""))
                studentpagechange(d,getindex)
              })
            }
            //group4
            for(i=0;i<4;i++){
              allstudentsvg.append("g")
              .attr('class', 'group4')
              .attr('transform', function(){
                return 'translate(' + (i*screen.width) + ',' + (3*screen.height+120) + ')'
              })
              .append("svg")
              .attr('class', 'studentsvg')
              .attr('id', function(){return "student"+(i+13)})
              .attr('clip-path', function(){return 'url(#cover'+(i+13)+')'})

              allstudentsvg.append("g")
              .attr('class', 'actual')
              .attr('transform', function(){
                return 'translate(' + (i*screen.width) + ',' + (3*screen.height+120)+ ')'
              })
              .append("svg")
              .attr('class', 'averagelines')
              .attr('id', function(){return "lines"+(i+13)})

              // y axis
              var currentid="#student"+(i+13)
              var svg=d3.select(currentid)

              svg.append("g").attr('class', 'qyaxis')
              .call(qyAxis)
              .attr('transform', 'translate(' + (margin.left-10) + ',' + margin.top + ')')

              svg.append("g").attr('class', 'hyaxis')
              .call(hyAxis)
              .attr('transform', 'translate(' + (margin.left-10) + ',' + margin.top + ')')

              // clip paths
              svg.append('clipPath')
              .attr('id', function(){return "cover"+(i+13)})
              .append("rect")
              .attr('x', 0)
              .attr('y', 0)
              .attr('width', xScale(1))
              .attr('height', 260)

              // paths
              var qpoints=[]
              var dataset=d[i+12].quizes
              for (a=0;a<dataset.length;a++){
                var day=dataset[a].day
                var grade=dataset[a].grade
                var point={"x":xScale(day),"y":qyScale(grade)}
                qpoints.push(point)
              }

              var hpoints=[]
              var dataset=d[i+12].homework
              for (a=0;a<dataset.length;a++){
                var day=dataset[a].day
                var grade=dataset[a].grade
                var point={"x":xScale(day),"y":hyScale(grade)}
                hpoints.push(point)
              }

              svg.append("path")
                .attr('d', drawPath(qpoints))
                .style('stroke', '#D87A5B')
                .attr('stroke-width', 1.5)
                .attr('class', 'path')

              svg.append("path")
                .attr('d', drawPath(hpoints))
                .style('stroke', '#A5D350')
                .attr('stroke-width', 1.5)
                .attr('class', 'path')

              // student picture
              var index=i+12
              svg.append("a").attr('href', '#goto')
              .append("svg:image")
              .attr('xlink:href', function(){return "https://beckysx.github.io/Project2/penguins/"+d[index].picture})
              .attr('x', 10)
              .attr('y', 0)
              .attr('width', 60)
              .attr('height', 60)
              .attr('class', 'image')
              .attr('id', function(){
                return "pstudent"+index
              })
              .on('click', function(){
                var getindex=parseInt(d3.select(this).attr("id").replace(/[^0-9]/ig,""))
                studentpagechange(d,getindex)
              })
            }
            //group5
            for(i=0;i<4;i++){
              allstudentsvg.append("g")
              .attr('class', 'group5')
              .attr('transform', function(){
                return 'translate(' + (i*screen.width) + ',' + (4*screen.height+150) + ')'
              })
              .append("svg")
              .attr('class', 'studentsvg')
              .attr('id', function(){return "student"+(i+17)})
              .attr('clip-path', function(){return 'url(#cover'+(i+17)+')'})


              allstudentsvg.append("g")
              .attr('class', 'actual')
              .attr('transform', function(){
                return 'translate(' + (i*screen.width) + ',' + (4*screen.height+150)+ ')'
              })
              .append("svg")
              .attr('class', 'averagelines')
              .attr('id', function(){return "lines"+(i+17)})


              // y axis
              var currentid="#student"+(i+17)
              var svg=d3.select(currentid)

              svg.append("g").attr('class', 'qyaxis')
              .call(qyAxis)
              .attr('transform', 'translate(' + (margin.left-10) + ',' + margin.top + ')')

              svg.append("g").attr('class', 'hyaxis')
              .call(hyAxis)
              .attr('transform', 'translate(' + (margin.left-10) + ',' + margin.top + ')')

              // clip paths
              svg.append('clipPath')
              .attr('id', function(){return "cover"+(i+17)})
              .append("rect")
              .attr('x', 0)
              .attr('y', 0)
              .attr('width', xScale(1))
              .attr('height', 260)

              // paths
              var qpoints=[]
              var dataset=d[i+16].quizes
              for (a=0;a<dataset.length;a++){
                var day=dataset[a].day
                var grade=dataset[a].grade
                var point={"x":xScale(day),"y":qyScale(grade)}
                qpoints.push(point)
              }

              var hpoints=[]
              var dataset=d[i+16].homework
              for (a=0;a<dataset.length;a++){
                var day=dataset[a].day
                var grade=dataset[a].grade
                var point={"x":xScale(day),"y":hyScale(grade)}
                hpoints.push(point)
              }

              svg.append("path")
                .attr('d', drawPath(qpoints))
                .style('stroke', '#D87A5B')
                .attr('stroke-width', 1.5)
                .attr('class', 'path')

              svg.append("path")
                .attr('d', drawPath(hpoints))
                .style('stroke', '#A5D350')
                .attr('stroke-width', 1.5)
                .attr('class', 'path')

              // student picture
              var index=i+16
              svg.append("a").attr('href', '#goto')
              .append("svg:image")
              .attr('xlink:href', function(){return "https://beckysx.github.io/Project2/penguins/"+d[index].picture})
              .attr('x', 10)
              .attr('y', 0)
              .attr('width', 60)
              .attr('height', 60)
              .attr('class', 'image')
              .attr('id', function(){
                return "pstudent"+index
              })
              .on('click', function(){
                var getindex=parseInt(d3.select(this).attr("id").replace(/[^0-9]/ig,""))
                studentpagechange(d,getindex)
              })
            }
            //group6
            for(i=0;i<3;i++){
              allstudentsvg.append("g")
              .attr('class', 'group6')
              .attr('transform', function(){
                return 'translate(' + (i*screen.width) + ',' + (5*screen.height+180) + ')'
              })
              .append("svg")
              .attr('class', 'studentsvg')
              .attr('id', function(){return "student"+(i+21)})
              .attr('clip-path', function(){return 'url(#cover'+(i+21)+')'})

              allstudentsvg.append("g")
              .attr('class', 'actual')
              .attr('transform', function(){
                return 'translate(' + (i*screen.width) + ',' + (5*screen.height+180)+ ')'
              })
              .append("svg")
              .attr('class', 'averagelines')
              .attr('id', function(){return "lines"+(i+21)})

              // y axis
              var currentid="#student"+(i+21)
              var svg=d3.select(currentid)

              svg.append("g").attr('class', 'qyaxis')
              .call(qyAxis)
              .attr('transform', 'translate(' + (margin.left-10) + ',' + margin.top + ')')

              svg.append("g").attr('class', 'hyaxis')
              .call(hyAxis)
              .attr('transform', 'translate(' + (margin.left-10) + ',' + margin.top + ')')

              // clip paths
              svg.append('clipPath')
              .attr('id', function(){return "cover"+(i+21)})
              .append("rect")
              .attr('x', 0)
              .attr('y', 0)
              .attr('width', xScale(1))
              .attr('height', 260)

              // paths
              var qpoints=[]
              var dataset=d[i+20].quizes
              for (a=0;a<dataset.length;a++){
                var day=dataset[a].day
                var grade=dataset[a].grade
                var point={"x":xScale(day),"y":qyScale(grade)}
                qpoints.push(point)
              }

              var hpoints=[]
              var dataset=d[i+20].homework
              for (a=0;a<dataset.length;a++){
                var day=dataset[a].day
                var grade=dataset[a].grade
                var point={"x":xScale(day),"y":hyScale(grade)}
                hpoints.push(point)
              }

              svg.append("path")
                .attr('d', drawPath(qpoints))
                .style('stroke', '#D87A5B')
                .attr('stroke-width', 1.5)
                .attr('class', 'path')

              svg.append("path")
                .attr('d', drawPath(hpoints))
                .style('stroke', '#A5D350')
                .attr('stroke-width', 1.5)
                .attr('class', 'path')

              // student picture
              var index=i+20
              svg.append("a").attr('href', '#goto')
              .append("svg:image")
              .attr('xlink:href', function(){return "https://beckysx.github.io/Project2/penguins/"+d[index].picture})
              .attr('x', 10)
              .attr('y', 0)
              .attr('width', 60)
              .attr('height', 60)
              .attr('class', 'image')
              .attr('id', function(){
                return "pstudent"+index
              })
              .on('click', function(){
                var getindex=parseInt(d3.select(this).attr("id").replace(/[^0-9]/ig,""))
                studentpagechange(d,getindex)
              })
            }


            d3.selectAll(".studentsvg").attr('width', screen.width)
            .attr('height', screen.height)

            studentpage(d)

      }

  // Click button will change this part
    var drawChangingPart=function(d){

        var date=1

        var screen={width:1400/4,height:100};
        var margin = {top: 4, right: 10, bottom: 10, left: 100};
        var w = screen.width - margin.left - margin.right;
        var h = screen.height - margin.top - margin.bottom;

        // Date indication
          var datesvg=d3.select("#index").append("svg")
          .attr('id', 'datesvg')
          .attr('width', 400)
          .attr('height', 300)

          datesvg.append("a").attr('id', 'top').append("text")
          .attr('x', '200')
          .attr('y', '200')
          .attr('text-anchor', 'middle')
          .text(function(){return "Day"+" "+date})
          .attr('id', 'datetext')
          .attr('class', 'title')

          // scale
          var qyScale=d3.scaleLinear()
              .domain([0,10])
              .range([margin.top+h,margin.top]);
          var hyScale=d3.scaleLinear()
              .domain([0, 50])
              .range([margin.top+h,margin.top]);
          var xScale=d3.scaleLinear()
              .domain([1,40])
              .range([margin.left+5,margin.left+w]);


          // new Quize data
          var newQArray=d.map(function(d){
            if(date<15){
              var i=date-1
              return d.quizes[i].grade}
            else if (date>15 && date<30) {
              var i=date-2
              return d.quizes[i].grade}
            else if (date>30) {
              var i=date-3
              return d.quizes[i].grade}
          })
          var sort=d.map(function(d){
            if(date<15){
              var i=date-1
              return d.quizes[i].grade}
            else if (date>15 && date<30) {
              var i=date-2
              return d.quizes[i].grade}
            else if (date>30) {
              var i=date-3
              return d.quizes[i].grade}
          })
          var sortQArray=sort.sort(sortNumber)
          var dayQM=d3.quantile(sort,0.5)

          // data note
            var dataNote=d3.select("#index").append("svg")
            .attr('id', 'dataNote')
            .attr('width', 450)
            .attr('height', 140)

            dataNote.append("text")
            .attr('x', '20')
            .attr('y', '40')
            .attr('text-anchor', 'left')
            .text("Quize Median:"+" "+dayQM)
            .attr('id', 'dayQMtext')
            .attr('class', 'dataNote')

            dataNote.append("text")
            .attr('x', '20')
            .attr('y', '100')
            .attr('text-anchor', 'left')
            .text(function(){
              if(date==15||date==30||date==41||(date%2!=0)){
                return "Homework Median: No Homework Today"
              }
              else{
                return "Homework Median:"+" "+dayHM
              }
            })
            .attr('id', 'dayHMtext')
            .attr('class', 'dataNote')


          // draw on each studentsvg
          for (i=0;i<23;i++){
            var currentid="#lines"+(i+1)
            var currentsvg=d3.select(currentid)
            var dayqscore=newQArray[i]
            // Quize part
                // quize Median line
                currentsvg.append('line')
                    .attr('x1', margin.left-10)
                    .attr('y1', qyScale(dayQM))
                    .attr('x2', margin.left+w)
                    .attr('y2', qyScale(dayQM))
                    .style('stroke', '#4A969E')
                    .attr('stroke-width', 2)
                    .attr('stroke-opacity', 0.5)
                    .attr('id', 'qML');
                // quize circle
                currentsvg.append('circle')
                    .attr('cx', xScale(date))
                    .attr('cy', qyScale(dayqscore))
                    .attr('r', 3)
                    .style('fill', '#D87A5B')
                    .attr('id', 'qSP');

            // Homework part
                // Homework Median line
                currentsvg.append('line')
                    .attr('x1', margin.left-10)
                    .attr('y1', 0)
                    .attr('x2', margin.left+w)
                    .attr('y2', 0)
                    .style('stroke', '#FFCA1E')
                    .attr('stroke-width', 2)
                    .attr('stroke-opacity', 0)
                    .attr('id', 'hML');
                // Homework circle
                currentsvg.append('circle')
                    .attr('cx', 0)
                    .attr('cy', 0)
                    .attr('r', 3)
                    .style('fill', '#A5D350')
                    .attr('fill-opacity', 0)
                    .attr('id', 'hSP');

                  }

          // change button

            d3.select("#index").append("button")
            .attr('id', 'next')
            .text("Next Day")
            .attr('class', 'buttontext')
            .on('click', function(){
              if (date==41){date=date}
              else{
                date=date+1
                if(date==15 || date==30 || date==41){
                  // Date indication
                    d3.select("#datesvg").select("#datetext")
                    .text(function(){return "Day"+" "+date})

                  // data note
                    d3.select("#dayQMtext")
                    .text("Quize Median: No Quize Today")

                    d3.select("#dayHMtext")
                    .text("Homework Median: No Homework Today")

                }
                else{
                  //双数天 两个都有 向后
                  if (date%2==0) {
                    // Date indication
                      d3.select("#datesvg").select("#datetext")
                      .text(function(){return "Day"+" "+date})

                    // new Quize data
                    var qsort=d.map(function(d){
                      if(date<15){
                        var i=date-1
                        return d.quizes[i].grade}
                      else if (date>15 && date<30) {
                        var i=date-2
                        return d.quizes[i].grade}
                      else if (date>30) {
                        var i=date-3
                        return d.quizes[i].grade}})
                    var newQArray=d.map(function(d){
                      if(date<15){
                        var i=date-1
                        return d.quizes[i].grade}
                      else if (date>15 && date<30) {
                        var i=date-2
                        return d.quizes[i].grade}
                      else if (date>30) {
                        var i=date-3
                        return d.quizes[i].grade}})
                    var sortQArray=qsort.sort(sortNumber)
                    var dayQM=d3.quantile(qsort,0.5)

                    // new Homework data
                    var hsort=d.map(function(d){
                      if (date<30){
                        var i=(date-2)/2
                        return d.homework[i].grade
                      }
                      else {
                        var i=(date-4)/2
                        return d.homework[i].grade
                      }})
                    var newHArray=d.map(function(d){
                      if (date<30){
                        var i=(date-2)/2
                        return d.homework[i].grade
                      }
                      else {
                        var i=(date-4)/2
                        return d.homework[i].grade
                      }})
                    var sortHArray=hsort.sort(sortNumber)
                    var dayHM=d3.quantile(hsort,0.5)

                    // data note
                      d3.select("#dayQMtext")
                      .text("Quize Median:"+" "+dayQM)

                      d3.select("#dayHMtext")
                      .text("Homework Median:"+" "+dayHM)

                    // draw on each studentsvg
                    for (i=0;i<23;i++){
                      var currentid="#lines"+(i+1)
                      var currentsvg=d3.select(currentid)
                      var dayqscore=newQArray[i]
                      var dayhscore=newHArray[i]

                      // clipPath
                      var coverid="#cover"+(i+1)
                      var cover=d3.select(coverid).select("rect")
                      cover.attr('width', xScale(date))

                      // Quize part
                          // quize Median line
                          currentsvg.select('#qML')
                              .transition()
                              .duration(200)
                              .attr('y1', qyScale(dayQM))
                              .attr('y2', qyScale(dayQM))

                          // quize circle
                          currentsvg.select('#qSP')
                              .transition()
                              .duration(200)
                              .attr('cx', xScale(date))
                              .attr('cy', qyScale(dayqscore))

                      // Homework part
                          // Homework Median line
                          currentsvg.select('#hML')
                              .transition()
                              .duration(200)
                              .attr('y1', hyScale(dayHM))
                              .attr('y2', hyScale(dayHM))
                              .attr('stroke-opacity', 0.5)
                          // Homework circle
                          currentsvg.select('#hSP')
                              .transition()
                              .duration(200)
                              .attr('cx', xScale(date))
                              .attr('cy', hyScale(dayhscore))
                              .attr('fill-opacity', 1)
                          }}
                  //单数天 只有quiz 向后
                  else{
                    // Date indication
                      d3.select("#datesvg").select("#datetext")
                      .text(function(){return "Day"+" "+date})

                    // new Quize data
                    var qsort=d.map(function(d){
                      if(date<15){
                        var i=date-1
                        return d.quizes[i].grade}
                      else if (date>15 && date<30) {
                        var i=date-2
                        return d.quizes[i].grade}
                      else if (date>30) {
                        var i=date-3
                        return d.quizes[i].grade}})
                    var newQArray=d.map(function(d){
                      if(date<15){
                        var i=date-1
                        return d.quizes[i].grade}
                      else if (date>15 && date<30) {
                        var i=date-2
                        return d.quizes[i].grade}
                      else if (date>30) {
                        var i=date-3
                        return d.quizes[i].grade}})
                    var sortQArray=qsort.sort(sortNumber)
                    var dayQM=d3.quantile(qsort,0.5)

                    // data note
                      d3.select("#dayQMtext")
                      .text("Quize Median:"+" "+dayQM)

                      d3.select("#dayHMtext")
                      .text("Homework Median: No Homework Today")

                    // draw on each studentsvg
                    for (i=0;i<23;i++){
                      var currentid="#lines"+(i+1)
                      var currentsvg=d3.select(currentid)
                      var dayqscore=newQArray[i]

                      // clipPath
                      var coverid="#cover"+(i+1)
                      var cover=d3.select(coverid).select("rect")
                      cover.attr('width', xScale(date))

                      // Quize part
                          // quize Median line
                          currentsvg.select('#qML')
                              .transition()
                              .duration(200)
                              .attr('y1', qyScale(dayQM))
                              .attr('y2', qyScale(dayQM))

                          // quize circle
                          currentsvg.select('#qSP')
                              .transition()
                              .duration(200)
                              .attr('cx', xScale(date))
                              .attr('cy', qyScale(dayqscore))
                          }}}
                        }})

            d3.select("#index").append("button")
            .attr('id', 'previous')
            .text("Previous Day")
            .attr('class', 'buttontext')
            .on('click',function(){
              if (date==1){date=date}
              else{
                date=date-1
                if(date==15 || date==30 || date==41){
                  // Date indication
                    d3.select("#datesvg").select("#datetext")
                    .text(function(){return "Day"+" "+date})

                  // data note
                    d3.select("#dayQMtext")
                    .text("Quize Median: No Quize Today")

                    d3.select("#dayHMtext")
                    .text("Homework Median: No Homework Today")}
                else{
                  //双数天 两个都有 向前
                  if (date%2==0) {
                    // Date indication
                      d3.select("#datesvg").select("#datetext")
                      .text(function(){return "Day"+" "+date})

                        // new Quize data
                        var qsort=d.map(function(d){
                          if(date<15){
                            var i=date-1
                            return d.quizes[i].grade}
                          else if (date>15 && date<30) {
                            var i=date-2
                            return d.quizes[i].grade}
                          else if (date>30) {
                            var i=date-3
                            return d.quizes[i].grade}})
                        var newQArray=d.map(function(d){
                          if(date<15){
                            var i=date-1
                            return d.quizes[i].grade}
                          else if (date>15 && date<30) {
                            var i=date-2
                            return d.quizes[i].grade}
                          else if (date>30) {
                            var i=date-3
                            return d.quizes[i].grade}})
                        var sortQArray=qsort.sort(sortNumber)
                        var dayQM=d3.quantile(qsort,0.5)

                        // new Homework data
                        var hsort=d.map(function(d){
                          if (date<30){
                            var i=(date-2)/2
                            return d.homework[i].grade
                          }
                          else {
                            var i=(date-4)/2
                            return d.homework[i].grade
                          }})
                        var newHArray=d.map(function(d){
                          if (date<30){
                            var i=(date-2)/2
                            return d.homework[i].grade
                          }
                          else {
                            var i=(date-4)/2
                            return d.homework[i].grade
                          }})
                        var sortHArray=hsort.sort(sortNumber)
                        var dayHM=d3.quantile(hsort,0.5)

                        // data note
                          d3.select("#dayQMtext")
                          .text("Quize Median:"+" "+dayQM)

                          d3.select("#dayHMtext")
                          .text("Homework Median:"+" "+dayHM)
                        // draw on each studentsvg
                        for (i=0;i<23;i++){
                          var currentid="#lines"+(i+1)
                          var currentsvg=d3.select(currentid)
                          var dayqscore=newQArray[i]
                          var dayhscore=newHArray[i]

                          // clipPath
                          var coverid="#cover"+(i+1)
                          var cover=d3.select(coverid).select("rect")
                          cover.attr('width', xScale(date))

                          // Quize part
                              // quize Median line
                              currentsvg.select('#qML')
                                  .transition()
                                  .duration(200)
                                  .attr('y1', qyScale(dayQM))
                                  .attr('y2', qyScale(dayQM))

                              // quize circle
                              currentsvg.select('#qSP')
                                  .transition()
                                  .duration(200)
                                  .attr('cx', xScale(date))
                                  .attr('cy', qyScale(dayqscore))

                          // Homework part
                              // Homework Median line
                              currentsvg.select('#hML')
                                  .transition()
                                  .duration(200)
                                  .attr('y1', hyScale(dayHM))
                                  .attr('y2', hyScale(dayHM))
                                  .attr('stroke-opacity', 0.5)
                              // Homework circle
                              currentsvg.select('#hSP')
                                  .transition()
                                  .duration(200)
                                  .attr('cx', xScale(date))
                                  .attr('cy', hyScale(dayhscore))
                                  .attr('fill-opacity', 1)}

                  }


                  //单数天 只有quiz 向前
                  else{
                    // Date indication
                      d3.select("#datesvg").select("#datetext")
                      .text(function(){return "Day"+" "+date})

                    // new Quize data
                    var qsort=d.map(function(d){
                      if(date<15){
                        var i=date-1
                        return d.quizes[i].grade}
                      else if (date>15 && date<30) {
                        var i=date-2
                        return d.quizes[i].grade}
                      else if (date>30) {
                        var i=date-3
                        return d.quizes[i].grade}})
                    var newQArray=d.map(function(d){
                      if(date<15){
                        var i=date-1
                        return d.quizes[i].grade}
                      else if (date>15 && date<30) {
                        var i=date-2
                        return d.quizes[i].grade}
                      else if (date>30) {
                        var i=date-3
                        return d.quizes[i].grade}})
                    var sortQArray=qsort.sort(sortNumber)
                    var dayQM=d3.quantile(qsort,0.5)

                    // data note
                      d3.select("#dayQMtext")
                      .text("Quize Median:"+" "+dayQM)

                      d3.select("#dayHMtext")
                      .text("Homework Median: No Homework Today")

                      // draw on each studentsvg
                      for (i=0;i<23;i++){
                        var currentid="#lines"+(i+1)
                        var currentsvg=d3.select(currentid)
                        var dayqscore=newQArray[i]

                        // clipPath
                        var coverid="#cover"+(i+1)
                        var cover=d3.select(coverid).select("rect")
                        cover.attr('width', xScale(date))

                        // Quize part
                            // quize Median line
                            currentsvg.select('#qML')
                                .transition()
                                .duration(200)
                                .attr('y1', qyScale(dayQM))
                                .attr('y2', qyScale(dayQM))

                            // quize circle
                            currentsvg.select('#qSP')
                                .transition()
                                .duration(200)
                                .attr('cx', xScale(date))
                                .attr('cy', qyScale(dayqscore))}

                  }



                }}})

            d3.select("#index").append("button")
            .attr('id', 'mid')
            .text("Day 20")
            .attr('class', 'buttontext')
            .on("click",function(){
              date=20
              // Date indication
                d3.select("#datesvg").select("#datetext")
                .text(function(){return "Day"+" "+date})

                  // new Quize data
                  var qsort=d.map(function(d){
                    var i=date-2
                    return d.quizes[i].grade})
                  var newQArray=d.map(function(d){
                    var i=date-2
                    return d.quizes[i].grade})
                  var sortQArray=qsort.sort(sortNumber)
                  var dayQM=d3.quantile(qsort,0.5)

                  // new Homework data
                  var hsort=d.map(function(d){
                    var i=(date-2)/2
                    return d.homework[i].grade})
                  var newHArray=d.map(function(d){
                    var i=(date-2)/2
                    return d.homework[i].grade})
                  var sortHArray=hsort.sort(sortNumber)
                  var dayHM=d3.quantile(hsort,0.5)

                  // data note
                    d3.select("#dayQMtext")
                    .text("Quize Median:"+" "+dayQM)

                    d3.select("#dayHMtext")
                    .text("Homework Median:"+" "+dayHM)
                  // draw on each studentsvg
                  for (i=0;i<23;i++){
                    var currentid="#lines"+(i+1)
                    var currentsvg=d3.select(currentid)
                    var dayqscore=newQArray[i]
                    var dayhscore=newHArray[i]

                    // clipPath
                    var coverid="#cover"+(i+1)
                    var cover=d3.select(coverid).select("rect")
                    cover.attr('width', xScale(date))

                    // Quize part
                        // quize Median line
                        currentsvg.select('#qML')
                            .transition()
                            .duration(200)
                            .attr('y1', qyScale(dayQM))
                            .attr('y2', qyScale(dayQM))

                        // quize circle
                        currentsvg.select('#qSP')
                            .transition()
                            .duration(200)
                            .attr('cx', xScale(date))
                            .attr('cy', qyScale(dayqscore))

                    // Homework part
                        // Homework Median line
                        currentsvg.select('#hML')
                            .transition()
                            .duration(200)
                            .attr('y1', hyScale(dayHM))
                            .attr('y2', hyScale(dayHM))
                            .attr('stroke-opacity', 0.5)
                        // Homework circle
                        currentsvg.select('#hSP')
                            .transition()
                            .duration(200)
                            .attr('cx', xScale(date))
                            .attr('cy', hyScale(dayhscore))
                            .attr('fill-opacity', 1)}})

            d3.select("#index").append("button")
            .attr('id', 'end')
            .text("Day 40")
            .attr('class', 'buttontext')
            .on("click",function(){
              date=40
              // Date indication
                d3.select("#datesvg").select("#datetext")
                .text(function(){return "Day"+" "+date})

                  // new Quize data
                  var qsort=d.map(function(d){
                      var i=date-3
                      return d.quizes[i].grade})
                  var newQArray=d.map(function(d){
                      var i=date-3
                      return d.quizes[i].grade})
                  var sortQArray=qsort.sort(sortNumber)
                  var dayQM=d3.quantile(qsort,0.5)

                  // new Homework data
                  var hsort=d.map(function(d){
                      var i=(date-4)/2
                      return d.homework[i].grade
                    })
                  var newHArray=d.map(function(d){
                    var i=(date-4)/2
                    return d.homework[i].grade
                    })
                  var sortHArray=hsort.sort(sortNumber)
                  var dayHM=d3.quantile(hsort,0.5)

                  // data note
                    d3.select("#dayQMtext")
                    .text("Quize Median:"+" "+dayQM)

                    d3.select("#dayHMtext")
                    .text("Homework Median:"+" "+dayHM)
                  // draw on each studentsvg
                  for (i=0;i<23;i++){
                    var currentid="#lines"+(i+1)
                    var currentsvg=d3.select(currentid)
                    var dayqscore=newQArray[i]
                    var dayhscore=newHArray[i]

                    // clipPath
                    var coverid="#cover"+(i+1)
                    var cover=d3.select(coverid).select("rect")
                    cover.attr('width', xScale(date))

                    // Quize part
                        // quize Median line
                        currentsvg.select('#qML')
                            .transition()
                            .duration(200)
                            .attr('y1', qyScale(dayQM))
                            .attr('y2', qyScale(dayQM))

                        // quize circle
                        currentsvg.select('#qSP')
                            .transition()
                            .duration(200)
                            .attr('cx', xScale(date))
                            .attr('cy', qyScale(dayqscore))

                    // Homework part
                        // Homework Median line
                        currentsvg.select('#hML')
                            .transition()
                            .duration(200)
                            .attr('y1', hyScale(dayHM))
                            .attr('y2', hyScale(dayHM))
                            .attr('stroke-opacity', 0.5)
                        // Homework circle
                        currentsvg.select('#hSP')
                            .transition()
                            .duration(200)
                            .attr('cx', xScale(date))
                            .attr('cy', hyScale(dayhscore))
                            .attr('fill-opacity', 1)}})

            d3.select("#index").append("button")
            .attr('id', 'reset')
            .text("Reset")
            .attr('class', 'buttontext')
            .on("click",function(){
              date=1
              // Date indication
                d3.select("#datesvg").select("#datetext")
                .text(function(){return "Day"+" "+date})

                  // new Quize data
                  var qsort=d.map(function(d){
                    var i=date-1
                    return d.quizes[i].grade})
                  var newQArray=d.map(function(d){
                    var i=date-1
                    return d.quizes[i].grade})
                  var sortQArray=qsort.sort(sortNumber)
                  var dayQM=d3.quantile(qsort,0.5)

                  // data note
                    d3.select("#dayQMtext")
                    .text("Quize Median:"+" "+dayQM)

                    d3.select("#dayHMtext")
                    .text("Homework Median: No Homework Today")
                  // draw on each studentsvg
                  for (i=0;i<23;i++){
                    var currentid="#lines"+(i+1)
                    var currentsvg=d3.select(currentid)
                    var dayqscore=newQArray[i]

                    // clipPath
                    var coverid="#cover"+(i+1)
                    var cover=d3.select(coverid).select("rect")
                    cover.attr('width', xScale(date))

                    // Quize part
                        // quize Median line
                        currentsvg.select('#qML')
                            .transition()
                            .duration(200)
                            .attr('y1', qyScale(dayQM))
                            .attr('y2', qyScale(dayQM))

                        // quize circle
                        currentsvg.select('#qSP')
                            .transition()
                            .duration(200)
                            .attr('cx', xScale(date))
                            .attr('cy', qyScale(dayqscore))

                    // Homework part
                    var a=d3.select("#lines"+(i+1))
                        // Homework Median line
                        a.select('#hML')
                            .attr('stroke-opacity', 0)

                        // Homework circle
                        a.select('#hSP')
                            .attr('fill-opacity', 0)
}})
              }



// student Page

    var studentpage=function(d){
      i=0

      var body=d3.select("#index")

      // get student name
      var picture=d[i].picture
      var a=picture.indexOf("-")
      var b=picture.substring(0,a)
      var first=b.charAt(0).toUpperCase()
      var c=b.substring(1)
      var name=first.concat(c)

      // get student own Grade

      var q=d[i].quizes.map(function(d){return d.grade})
      var qs=d3.sum(q)
      var qave=d3.mean(q).toFixed(2)
      var h=d[i].homework.map(function(d){return d.grade})
      var hs=d3.sum(h)
      var have=d3.mean(h).toFixed(2)
      var fa=d[i].final[0].grade
      var t1a=d[i].test[0].grade
      var t2a=d[i].test[1].grade
         // final grade
           var qb=(qs/380)*15
           var hb=(hs/950)*15
           var fb=(fa/100)*30
           var t1b=(t1a/100)*20
           var t2b=(t2a/100)*20
           var final=(qb+hb+fb+t1b+t2b).toFixed(2)

      // title
         // profile
          body.append("a").attr('id', 'goto').append("svg")
          .attr('id', 'profile')
          .attr('width', 500)
          .attr('height', 250)
          var profile=body.select("#profile")

          profile.append("svg:image")
              .attr('xlink:href', function(){return "https://beckysx.github.io/Project2/penguins/"+picture})
              .attr('x', 20)
              .attr('y', 0)
              .attr('width', 120)
              .attr('id', 'profilepicture'+i)
          profile.append("text")
              .attr('x', 170)
              .attr('y', 120)
              .text(name)
              .style('font-size', 35)
              .style('text-decoration', 'underline')
              .attr('class', 'title')

          body.append("a").attr('href', '#top')
          .append("button")
          .attr('id', 'backTop')
          .text('Back to Top')
          .attr('class', 'buttontext')

          d3.select("#index").append("button")
          .attr('id', 'nextStudent')
          .text('Next Student')
          .attr('class', 'buttontext')
          .on('click',function(){
            var currentID=parseInt(d3.select("#index").select("#profile").select("image").attr("id").replace(/[^0-9]/ig,""))
            var nextID=currentID+1
            studentpagechange(d,nextID)
          })

          body.append("button")
          .attr('id', 'nextStudent2')
          .text('Next Student')
          .attr('class', 'buttontext')
          .on('click',function(){
            var currentID=parseInt(d3.select("#index").select("#profile").select("image").attr("id").replace(/[^0-9]/ig,""))
            var nextID=currentID+1
            studentpagechange(d,nextID)
          })

          body.append("a").attr('href', '#top')
          .append("button")
          .attr('id', 'backTop2')
          .text('Back to Top')
          .attr('class', 'buttontext')

        // gradeinformation
        body.append("svg")
        .attr('id', 'ginfo')
        .attr('width', 900)
        .attr('height', 250)

        var ginfo=body.select("#ginfo")

        ginfo.append("text")
            .attr('x', 70)
            .attr('y', 60)
            .text("Grade Information")
            .style('font-size', 35)
            .style('text-decoration', 'underline')
            .attr('class', 'title')

        ginfo.append("text")
            .attr('x', 70)
            .attr('y', 120)
            .text("Final Grade: "+final)
            .attr('id', 'finaltext')
            .style('text-decoration', 'underline')
        ginfo.append("text")
            .attr('x', 70)
            .attr('y', 170)
            .text("Final Exam Grade: "+fa)
            .attr('id', 'fa')
            .attr('class', 'otherGrade')
        ginfo.append("text")
            .attr('x', 370)
            .attr('y', 170)
            .text("Test 1 Grade: "+t1a)
            .attr('id', 't1a')
            .attr('class', 'otherGrade')
        ginfo.append("text")
            .attr('x', 670)
            .attr('y', 170)
            .text("Test 2 Grade: "+t2a)
            .attr('id', 't2a')
            .attr('class', 'otherGrade')
        ginfo.append("text")
            .attr('x', 70)
            .attr('y', 220)
            .text("Quizes Average: "+qave)
            .attr('id', 'qave')
            .attr('class', 'otherGrade')
        ginfo.append("text")
            .attr('x', 370)
            .attr('y', 220)
            .text("Homework Average: "+have)
            .attr('id', 'have')
            .attr('class', 'otherGrade')

        //color legend
            body.append("svg")
            .attr('id', 'colorlegend2')
            .attr('width', 1000)
            .attr('height', 50)

            var colorlegend=body.select("#colorlegend2")

            colorlegend.append("g").attr('id', 'average').attr('transform', 'translate(' + 0 + ',' + 0 + ')')

            colorlegend.append("g").attr('id', 'median')
            .attr('transform', 'translate(' + 250 + ',' + 0 + ')')

            colorlegend.append("g").attr('id', 'otherstudents')
            .attr('transform', 'translate(' + 500 + ',' + 0 + ')')

            colorlegend.append("g").attr('id', 'cstudent')
            .attr('transform', 'translate(' + 750 + ',' + 0 + ')')

            var average=body.select("#average")
            var median=body.select("#median")
            var otherstudents=body.select("#otherstudents")
            var cstudent=body.select("#cstudent")

            average.append("line")
                .attr('x1',20 )
                .attr('y1', 25)
                .attr('x2', 70)
                .attr('y2', 25)
                .attr('stroke-width', 3)
                .style('stroke', '#EFA00B');
            average.append("text")
            .attr('x', 90)
            .attr('y', 30)
            .text("Class Average")

            median.append("line")
                .attr('x1',20 )
                .attr('y1', 25)
                .attr('x2', 70)
                .attr('y2', 25)
                .attr('stroke-width', 3)
                .style('stroke', '#83B692');
            median.append("text")
            .attr('x', 90)
            .attr('y', 30)
            .text("Class Median")

            otherstudents.append("rect")
                .attr('x', 20)
                .attr('y', 17)
                .attr('width', 15)
                .attr('height', 15)
                .style('fill', '#54576E');
            otherstudents.append("text")
            .attr('x', 50)
            .attr('y', 30)
            .text("Other Students")

            cstudent.append("rect")
                .attr('x', 20)
                .attr('y', 17)
                .attr('width', 15)
                .attr('height', 15)
                .style('fill', '#95B8D1');
            cstudent.append("text")
            .attr('x', 50)
            .attr('y', 30)
            .text("Current Students")

        // finalgraph part
        studentFinalGrade(d,i)
        // test1 graph
        test1Graph(d,i)
        // test2 graph
        test2Graph(d,i)
        // quizegraph
        quizeGraph(d,i)
        // homeworkgraph
        homeworkGraph(d,i)

      }
    var studentFinalGrade=function(d,i){
      var array=[]
      var alt=[]
      for (a=0;a<23;a++){
        var q=d[a].quizes.map(function(d){return d.grade})
        var qs=d3.sum(q)
        var qave=d3.mean(q).toFixed(2)
        var h=d[a].homework.map(function(d){return d.grade})
        var hs=d3.sum(h)
        var have=d3.mean(h).toFixed(2)
        var fa=d[a].final[0].grade
        var t1a=d[a].test[0].grade
        var t2a=d[a].test[1].grade
           // final grade
             var qb=(qs/380)*15
             var hb=(hs/950)*15
             var fb=(fa/100)*30
             var t1b=(t1a/100)*20
             var t2b=(t2a/100)*20
             var final=(qb+hb+fb+t1b+t2b).toFixed(2)
        array.push(final)
        alt.push(final)
      }
      var average=d3.mean(array).toFixed(2)
      var median=d3.quantile(alt.sort(sortNumber),0.5)

      var body=d3.select("#index")

      // Final grade graph
          var screen={height:500,width:1400}
          var margin= {top: 50, right: 100, bottom: 50, left: 100}
          var w= screen.width - margin.left - margin.right
          var h=screen.height - margin.top-margin.bottom;

          body.append("svg")
          .attr('id', 'finalgraph')
          .attr('height', screen.height)
          .attr('width', screen.width)

          var graph=body.select("#finalgraph")

          // graph title
          graph.append("text")
          .attr('x', 10)
          .attr('y', 30)
          .text('Class Final Grade Graph')
          .style('font-size', 25)
          .style('text-decoration', 'underline')
          .attr('class', 'title')

          graph.append("text")
          .attr('x', 350)
          .attr('y', 30)
          .text('Average: '+ average)

          graph.append("text")
          .attr('x', 500)
          .attr('y', 30)
          .text('Median: '+ median)


          // scale
          var yScale=d3.scaleLinear()
              .domain([0, 100])
              .range([h+margin.top,margin.top])
          var xScale=d3.scaleBand()
              .domain(d3.range(23))
              .rangeRound([margin.left,margin.left+w])
              .paddingInner(0.03);

          // axis
          var finalaxis=d3.axisLeft(yScale).tickSize(0)
          graph.append("g")
          .call(finalaxis)
          .attr('transform', 'translate(' + (margin.left-10) + ',' + 0+ ')')

          // Graph
              graph.selectAll("rect")
                  .data(array)
                  .enter()
                  .append('rect')
                  .attr('x',function(d,i){return xScale(i)})
                  .attr('y', function(d){return yScale(d)})
                  .attr('width', xScale.bandwidth())
                  .attr('height', function(d){
                    return h+margin.top-yScale(d)})
                  .attr('id', function(d,i){return 'finalrects'+i})
                  .style('fill', '#54576E');

              graph.select("#finalrects"+i).style('fill', '#95B8D1')

              // average lines
              graph.append("line")
                  .attr('x1',margin.left-10 )
                  .attr('y1', yScale(average))
                  .attr('x2',margin.left+w+14)
                  .attr('y2', yScale(average))
                  .attr('stroke-width', 3)
                  .style('stroke', '#EFA00B')
                  .attr('id', 'finalAveline');

              graph.append("line")
                  .attr('x1',margin.left-10 )
                  .attr('y1', yScale(median))
                  .attr('x2',margin.left+w+14)
                  .attr('y2', yScale(median))
                  .attr('stroke-width', 3)
                  .style('stroke', '#83B692')
                  .attr('id', 'finalMline');

              // profile
              for (i=0;i<23;i++){
                graph.append("svg:image")
                .attr('xlink:href', function(){return "https://beckysx.github.io/Project2/penguins/"+d[i].picture})
                .attr('x', xScale(i)+10)
                .attr('y', screen.height-margin.bottom+10)
                .attr('width',xScale.bandwidth()-20)
                .attr('height', xScale.bandwidth()-20)}}
    var test1Graph=function(d,i){
      // class points
      var data=getTest1Array(d)
      var average=d3.mean(data[0]).toFixed(2)
      var median=d3.quantile(data[1],0.5)

      var body=d3.select("#index")

      // Final grade graph
          var screen={height:400,width:700}
          var margin= {top: 50, right: 50, bottom: 50, left: 50}
          var w= screen.width - margin.left - margin.right
          var h=screen.height - margin.top-margin.bottom;

          body.append("svg")
          .attr('id', 'test1graph')
          .attr('height', screen.height)
          .attr('width', screen.width)

          var graph=body.select("#test1graph")

          // graph title
          graph.append("text")
          .attr('x', 10)
          .attr('y', 30)
          .text('Class Test 1 Grade Graph')
          .style('font-size', 20)
          .style('text-decoration', 'underline')
          .attr('class', 'title')

          graph.append("text")
          .attr('x', 300)
          .attr('y', 30)
          .text('Average: '+ average)

          graph.append("text")
          .attr('x', 450)
          .attr('y', 30)
          .text('Median: '+ median)

          // scale
          var yScale=d3.scaleLinear()
              .domain([0, 100])
              .range([h+margin.top,margin.top])
          var xScale=d3.scaleBand()
              .domain(d3.range(23))
              .rangeRound([margin.left,margin.left+w])
              .paddingInner(0.03);

          // axis
          var axis=d3.axisLeft(yScale).tickSize(0)
          graph.append("g")
          .call(axis)
          .attr('transform', 'translate(' + (margin.left-10) + ',' + 0+ ')')

          // Graph
              graph.selectAll("rect")
                  .data(data[0])
                  .enter()
                  .append('rect')
                  .attr('x',function(d,i){return xScale(i)})
                  .attr('y', function(d){return yScale(d)})
                  .attr('width', xScale.bandwidth())
                  .attr('height', function(d){
                    return h+margin.top-yScale(d)})
                  .attr('id', function(d,i){return 'test1rects'+i})
                  .style('fill', '#54576E');

              graph.select("#test1rects"+i).style('fill', '#95B8D1')

              // average lines
              graph.append("line")
                  .attr('x1',margin.left-10 )
                  .attr('y1', yScale(average))
                  .attr('x2',margin.left+w+14)
                  .attr('y2', yScale(average))
                  .attr('stroke-width', 3)
                  .style('stroke', '#EFA00B')

              graph.append("line")
                  .attr('x1',margin.left-10 )
                  .attr('y1', yScale(median))
                  .attr('x2',margin.left+w+14)
                  .attr('y2', yScale(median))
                  .attr('stroke-width', 3)
                  .style('stroke', '#83B692')
}
    var test2Graph=function(d,i){
      // class points
      var data=getTest2Array(d)
      var average=d3.mean(data[0]).toFixed(2)
      var median=d3.quantile(data[1],0.5)

      var body=d3.select("#index")

      // Final grade graph
          var screen={height:400,width:700}
          var margin= {top: 50, right: 50, bottom: 50, left: 50}
          var w= screen.width - margin.left - margin.right
          var h=screen.height - margin.top-margin.bottom;

          body.append("svg")
          .attr('id', 'test2graph')
          .attr('height', screen.height)
          .attr('width', screen.width)

          var graph=body.select("#test2graph")

          // graph title
          graph.append("text")
          .attr('x', 10)
          .attr('y', 30)
          .text('Class Test 2 Grade Graph')
          .style('font-size', 20)
          .style('text-decoration', 'underline')
          .attr('class', 'title')

          graph.append("text")
          .attr('x', 300)
          .attr('y', 30)
          .text('Average: '+ average)

          graph.append("text")
          .attr('x', 450)
          .attr('y', 30)
          .text('Median: '+ median)

          // scale
          var yScale=d3.scaleLinear()
              .domain([0, 100])
              .range([h+margin.top,margin.top])
          var xScale=d3.scaleBand()
              .domain(d3.range(23))
              .rangeRound([margin.left,margin.left+w])
              .paddingInner(0.03);

          // axis
          var axis=d3.axisLeft(yScale).tickSize(0)
          graph.append("g")
          .call(axis)
          .attr('transform', 'translate(' + (margin.left-10) + ',' + 0+ ')')

          // Graph
              graph.selectAll("rect")
                  .data(data[0])
                  .enter()
                  .append('rect')
                  .attr('x',function(d,i){return xScale(i)})
                  .attr('y', function(d){return yScale(d)})
                  .attr('width', xScale.bandwidth())
                  .attr('height', function(d){
                    return h+margin.top-yScale(d)})
                  .attr('id', function(d,i){return 'test2rects'+i})
                  .style('fill', '#54576E');

              graph.select("#test2rects"+i).style('fill', '#95B8D1')

              // average lines
              graph.append("line")
                  .attr('x1',margin.left-10 )
                  .attr('y1', yScale(average))
                  .attr('x2',margin.left+w+14)
                  .attr('y2', yScale(average))
                  .attr('stroke-width', 3)
                  .style('stroke', '#EFA00B')

              graph.append("line")
                  .attr('x1',margin.left-10 )
                  .attr('y1', yScale(median))
                  .attr('x2',margin.left+w+14)
                  .attr('y2', yScale(median))
                  .attr('stroke-width', 3)
                  .style('stroke', '#83B692')

    }
    var quizeGraph=function(d,i){
      var body=d3.select("#index")

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
      var data2=[]
      var dataset=d[i].quizes
      for (i=0;i<dataset.length;i++){
        var day=dataset[i].day
        var grade=dataset[i].grade
        var point={"x":xScale(day),"y":yScale(grade)}
        var point2={"x":day,"y":grade}
        data.push(point)
        data2.push(point2)
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
          .style('text-decoration', 'underline')
          .attr('class', 'title')


          // axis
          var axis=d3.axisLeft(yScale).tickSize(0)
          graph.append("g")
          .call(axis)
          .attr('transform', 'translate(' + (margin.left-10) + ',' + 0+ ')')

          // Graph

          // paths
          graph.append("path")
            .attr('d', drawPath(data))
            .style('stroke', '#54576E')
            .attr('stroke-width', 1.5)
            .attr('id', 'quizepath')
            .attr('class', 'path')

              graph.selectAll("circle")
                  .data(data)
                  .enter()
                  .append('circle')
                  .attr('cx',function(d,i){
                    return d.x})
                  .attr('cy',function(d){return d.y})
                  .attr('r',5)
                  .style('fill', '#54576E')
                  .on('mouseover',function(d,i){
                    d3.select(this)
                    .transition()
                    .attr('r', 10)
                    .style('fill', 'orange')

                    d3.select("#tooltip1").select("#date1")
                    .text(function(){
                      return data2[i].x
                    })
                    d3.select("#tooltip1").select("#score1")
                    .text(function(){
                      return data2[i].y
                    })

                  })
                  .on("mouseout",function(){
                    d3.select(this)
                    .transition()
                    .duration(300)
                    .attr('r', 5)
                    .style('fill', '#54576E')

                  });




    }
    var homeworkGraph=function(d,i){
      var body=d3.select("#index")

      var screen={height:400,width:700}
      var margin= {top: 50, right: 50, bottom: 50, left: 50}
      var w= screen.width - margin.left - margin.right
      var h=screen.height - margin.top-margin.bottom;

        // scale
        var yScale=d3.scaleLinear()
            .domain([0, 50])
            .range([h+margin.top,margin.top])
        var xScale=d3.scaleLinear()
            .domain([1,40])
            .range([margin.left,margin.left+w])

      // data
      var data=[]
      var data2=[]
      var dataset=d[i].homework
      for (i=0;i<dataset.length;i++){
        var day=dataset[i].day
        var grade=dataset[i].grade
        var point={"x":xScale(day),"y":yScale(grade)}
        var point2={"x":day,"y":grade}
        data.push(point)
        data2.push(point2)
      }

      var drawPath=d3.line()
        .x(function(d) { return d.x; })
        .y(function(d) { return d.y; })
        .curve(d3.curveCardinal)

          body.append("svg")
          .attr('id', 'homeworkgraph')
          .attr('height', screen.height)
          .attr('width', screen.width)

          var graph=body.select("#homeworkgraph")

          // graph title
          graph.append("text")
          .attr('x', 10)
          .attr('y', 30)
          .text('Homework Grade Graph')
          .style('font-size', 20)
          .style('text-decoration', 'underline')
          .attr('class', 'title')

          // axis
          var axis=d3.axisLeft(yScale).tickSize(0)
          graph.append("g")
          .call(axis)
          .attr('transform', 'translate(' + (margin.left-10) + ',' + 0+ ')')

          // Graph

          // paths
          graph.append("path")
            .attr('d', drawPath(data))
            .attr('id', 'homeworkpath')
            .style('stroke', '#54576E')
            .attr('stroke-width', 1.5)
            .attr('class', 'path')

              graph.selectAll("circle")
                  .data(data)
                  .enter()
                  .append('circle')
                  .attr('cx',function(d,i){
                    return d.x})
                  .attr('cy',function(d){return d.y})
                  .attr('r',5)
                  .style('fill', '#54576E')
                  .on('mouseover',function(d,i){
                    d3.select(this)
                    .transition()
                    .attr('r', 10)
                    .style('fill', 'orange')

                    d3.select("#tooltip2").select("#date2")
                    .text(function(){
                      return data2[i].x
                    })
                    d3.select("#tooltip2").select("#score2")
                    .text(function(){
                      return data2[i].y
                    })

                  })
                  .on("mouseout",function(){
                    d3.select(this)
                    .transition()
                    .duration(300)
                    .attr('r', 5)
                    .style('fill', '#54576E')
                  })


    }

    var homeworkGraphChange=function(d,i){
      var body=d3.select("#index")

      var screen={height:400,width:700}
      var margin= {top: 50, right: 50, bottom: 50, left: 50}
      var w= screen.width - margin.left - margin.right
      var h=screen.height - margin.top-margin.bottom;

        // scale
        var yScale=d3.scaleLinear()
            .domain([0, 50])
            .range([h+margin.top,margin.top])
        var xScale=d3.scaleLinear()
            .domain([1,40])
            .range([margin.left,margin.left+w])

      // data
      var data=[]
      var dataset=d[i].homework
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

          var graph=body.select("#homeworkgraph")

          // Graph
              graph.selectAll("circle")
                  .data(data)
                  .transition()
                  .duration(1300)
                  .attr('cx',function(d){
                    return d.x})
                  .attr('cy',function(d){return d.y})


              // paths
              graph.select("#homeworkpath")
              .transition()
              .duration(1300)
              .attr('d', drawPath(data))

    }
    var quizeGraphChange=function(d,i){
      var body=d3.select("#index")

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

          var graph=body.select("#quizegraph")

          // Graph
              graph.selectAll("circle")
                  .data(data)
                  .transition()
                  .duration(1300)
                  .attr('cx',function(d){
                    return d.x})
                  .attr('cy',function(d){return d.y})

              // paths
              graph.select("#quizepath")
              .transition()
              .duration(1300)
              .attr('d', drawPath(data))

    }


    var studentpagechange=function(d,i){
      // get student name
      var picture=d[i].picture
      var a=picture.indexOf("-")
      var b=picture.substring(0,a)
      var first=b.charAt(0).toUpperCase()
      var c=b.substring(1)
      var name=first.concat(c)

      // get student own Grade

      var q=d[i].quizes.map(function(d){return d.grade})
      var qs=d3.sum(q)
      var qave=d3.mean(q).toFixed(2)
      var h=d[i].homework.map(function(d){return d.grade})
      var hs=d3.sum(h)
      var have=d3.mean(h).toFixed(2)
      var fa=d[i].final[0].grade
      var t1a=d[i].test[0].grade
      var t2a=d[i].test[1].grade
         // final grade
           var qb=(qs/380)*15
           var hb=(hs/950)*15
           var fb=(fa/100)*30
           var t1b=(t1a/100)*20
           var t2b=(t2a/100)*20
           var final=(qb+hb+fb+t1b+t2b).toFixed(2)

     // title
        // profile
        var body=d3.select("#index")
        var profile=body.select("#profile")

         profile.select("image")
         .transition()
         .duration(300)
         .attr('xlink:href', function(){return "https://beckysx.github.io/Project2/penguins/"+picture})
         .attr('id', 'profilepicture'+i)

         profile.select("text")
         .transition()
         .duration(300)
         .text(name)

       // gradeinformation
           var ginfo=body.select("#ginfo")

           ginfo.select("#finaltext")
           .transition()
           .duration(300)
           .text("Final Grade: "+final)
           .style('text-decoration', 'underline')

           ginfo.select("#fa")
           .transition()
           .duration(300)
           .text("Final Exam Grade: "+fa)

           ginfo.select("#t1a")
           .transition()
           .duration(300)
           .text("Test 1 Grade: "+t1a)

           ginfo.select("#t2a")
           .transition()
           .duration(300)
           .text("Test 2 Grade: "+t2a)

           ginfo.select("#qave")
           .transition()
           .duration(300)
           .text("Quizes Average: "+qave)

           ginfo.select("#have")
           .transition()
           .duration(300)
           .text("Homework Average: "+have)


        // final graph change
            for(a=0;a<23;a++){
              var compare=body.select("#finalgraph")
              .select("#finalrects"+a).style('fill')
              if (compare=="rgb(149, 184, 209)") {
                d3.select("#finalgraph")
                .select("#finalrects"+a)
                .transition()
                .duration(300)
                .style('fill',"#54576E")
              }}
            body.select("#finalgraph")
            .select("#finalrects"+i)
            .transition()
            .duration(300)
            .style('fill', '#95B8D1')
        // test1 graph change
            for(a=0;a<23;a++){
              var compare=body.select("#test1graph")
              .select("#test1rects"+a).style('fill')
              if (compare=="rgb(149, 184, 209)") {
                body.select("#test1graph")
                .select("#test1rects"+a)
                .transition()
                .duration(300)
                .style('fill',"#54576E")
              }}
            body.select("#test1graph")
            .select("#test1rects"+i)
            .transition()
            .duration(300)
            .style('fill', '#95B8D1')
        // test2 graph change
            for(a=0;a<23;a++){
              var compare=body.select("#test2graph")
              .select("#test2rects"+a).style('fill')
              if (compare=="rgb(149, 184, 209)") {
                body.select("#test2graph")
                .select("#test2rects"+a)
                .transition()
                .duration(300)
                .style('fill',"#54576E")
              }}
            body.select("#test2graph")
            .select("#test2rects"+i)
            .transition()
            .duration(300)
            .style('fill', '#95B8D1')

        // quize graph change
            quizeGraphChange(d,i)
        // homework graph change
            homeworkGraphChange(d,i)
    }

    dataset.then(function(d){

      // index page
      drawFixedPart()
      drawMainChart(d)
      drawChangingPart(d)
    })
