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
    var grade=parseInt(d[i].grade)
    array.push(grade)
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
  for(var i=0;i<d.length;i++){
    var grade=parseInt(d[i].test[0].grade)
    array.push(grade)
  }
  array.sort(sortNumber)
  return array

}
// get test 2 grade array 23
var getTest2Array=function(d){
  var array=[]
  for(var i=0;i<d.length;i++){
    var grade=parseInt(d[i].test[1].grade)
    array.push(grade)
  }
  array.sort(sortNumber)
  return array

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
      var drawFirstPart=function(){
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
          .attr('x', 0)
          .attr('y', 0)
          .attr('width', 400)
          .attr('class', 'piechartImage')

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
                  .style('stroke', '#700353')
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
                  .attr('fill', '#FFCA1E')

              d3.select("#hSPlegend").append('text')
                  .attr('x', 70)
                  .attr('y', 140)
                  .text('Homework Score Point')

          // Student situation
          var screen={width:1400/3,height:120};
          var margin = {top: 4, right: 10, bottom: 4, left: 70};
          var w = screen.width - margin.left - margin.right;
          var h = screen.height - margin.top - margin.bottom;

            var allstudentsvg=d3.select("#index").append("svg")
            .attr('id', 'allstudentsvg')
            .attr('width', 1400)
            .attr('height', 1000)

            // group1
            for(i=0;i<3;i++){
              allstudentsvg.append("g")
              .attr('class', 'group1')
              .attr('transform', function(){
                return 'translate(' + (i*screen.width) + ',' + 30+ ')'
              })
              .append("svg")
              .attr('class', 'studentsvg')
              .attr('id', function(){return "student"+(i+1)})
            }
            //group2
            for(i=0;i<3;i++){
              allstudentsvg.append("g")
              .attr('class', 'group2')
              .attr('transform', function(){
                return 'translate(' + (i*screen.width) + ',' + (screen.height+30) + ')'
              })
              .append("svg")
              .attr('class', 'studentsvg')
              .attr('id', function(){return "student"+(i+4)})
            }
            //group3
            for(i=0;i<3;i++){
              allstudentsvg.append("g")
              .attr('class', 'group3')
              .attr('transform', function(){
                return 'translate(' + (i*screen.width) + ',' + (2*screen.height+30) + ')'
              })
              .append("svg")
              .attr('class', 'studentsvg')
              .attr('id', function(){return "student"+(i+7)})
            }
            //group4
            for(i=0;i<3;i++){
              allstudentsvg.append("g")
              .attr('class', 'group4')
              .attr('transform', function(){
                return 'translate(' + (i*screen.width) + ',' + (3*screen.height+30) + ')'
              })
              .append("svg")
              .attr('class', 'studentsvg')
              .attr('id', function(){return "student"+(i+10)})
            }
            //group5
            for(i=0;i<3;i++){
              allstudentsvg.append("g")
              .attr('class', 'group5')
              .attr('transform', function(){
                return 'translate(' + (i*screen.width) + ',' + (4*screen.height+30) + ')'
              })
              .append("svg")
              .attr('class', 'studentsvg')
              .attr('id', function(){return "student"+(i+13)})
            }
            //group6
            for(i=0;i<3;i++){
              allstudentsvg.append("g")
              .attr('class', 'group6')
              .attr('transform', function(){
                return 'translate(' + (i*screen.width) + ',' + (5*screen.height+30) + ')'
              })
              .append("svg")
              .attr('class', 'studentsvg')
              .attr('id', function(){return "student"+(i+16)})
            }
            //group7
            for(i=0;i<3;i++){
              allstudentsvg.append("g")
              .attr('class', 'group7')
              .attr('transform', function(){
                return 'translate(' + (i*screen.width) + ',' + (6*screen.height+30) + ')'
              })
              .append("svg")
              .attr('class', 'studentsvg')
              .attr('id', function(){return "student"+(i+19)})
            }
            //group8
            for(i=0;i<2;i++){
              allstudentsvg.append("g")
              .attr('class', 'group8')
              .attr('transform', function(){
                return 'translate(' + (i*screen.width) + ',' + (7*screen.height+30) + ')'
              })
              .append("svg")
              .attr('class', 'studentsvg')
              .attr('id', function(){return "student"+(i+22)})
            }


            d3.selectAll(".studentsvg").attr('width', screen.width)
            .attr('height', screen.height)

      }

  // Click button will change this part
      var drawChangingPart=function(d){

        var date=1

        var screen={width:1400/3,height:120};
        var margin = {top: 4, right: 10, bottom: 4, left: 70};
        var w = screen.width - margin.left - margin.right;
        var h = screen.height - margin.top - margin.bottom;

        // Date indication
          var datesvg=d3.select("#index").append("svg")
          .attr('id', 'datesvg')
          .attr('width', 400)
          .attr('height', 300)

          datesvg.append("text")
          .attr('x', '200')
          .attr('y', '200')
          .attr('text-anchor', 'middle')
          .text(function(){return "Day"+" "+date})
          .attr('id', 'datetext')

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
          var sortQArray=newQArray.sort(sortNumber)
          var dayQM=d3.quantile(sortQArray,0.5)

          // path
            // path function
            var drawPath=d3.line()
              .x(function(d) { return d.x; })
              .y(function(d) { return d.y; })
              .curve(d3.curveBasis)



          // data note
            var dataNote=d3.select("#index").append("svg")
            .attr('id', 'dataNote')
            .attr('width', 450)
            .attr('height', 140)

            dataNote.append("text")
            .attr('x', '20')
            .attr('y', '40')
            .attr('text-anchor', 'left')
            .text(function(){
              if(date==15||date==30||date==41){
                return "Quize Median: No Quize Today"
              }
              else{
                return "Quize Median:"+" "+dayQM
              }
            })
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
            var currentid="#student"+(i+1)
            var currentsvg=d3.select(currentid)
            var dayqscore=newQArray[i]
            // Quize part
                // quize Median line
                currentsvg.append('line')
                    .attr('x1', margin.left)
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
                    .attr('r', 4)
                    .style('fill', '#D87A5B')
                    .attr('id', 'qSP');

            // Homework part
                // Homework Median line
                currentsvg.append('line')
                    .attr('x1', margin.left)
                    .attr('y1', 0)
                    .attr('x2', margin.left+w)
                    .attr('y2', 0)
                    .style('stroke', '#700353')
                    .attr('stroke-width', 2)
                    .attr('stroke-opacity', 0)
                    .attr('id', 'hML');
                // Homework circle
                currentsvg.append('circle')
                    .attr('cx', 0)
                    .attr('cy', 0)
                    .attr('r', 4)
                    .style('fill', '#FFCA1E')
                    .attr('fill-opacity', 0)
                    .attr('id', 'hSP');

                  }

          // change button

            d3.select("#index").append("button")
            .attr('id', 'nextbutton')
            .text("Next Day")
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
                    var sortQArray=newQArray.sort(sortNumber)
                    var dayQM=d3.quantile(sortQArray,0.5)

                    // new Homework data
                    var newHArray=d.map(function(d){
                      if (date<30){
                        var i=(date-2)/2
                        return d.homework[i].grade
                      }
                      else {
                        var i=(date-4)/2
                        return d.homework[i].grade
                      }})
                    var sortHArray=newHArray.sort(sortNumber)
                    var dayHM=d3.quantile(sortHArray,0.5)

                    // data note
                      d3.select("#dayQMtext")
                      .text("Quize Median:"+" "+dayQM)

                      d3.select("#dayHMtext")
                      .text("Homework Median:"+" "+dayHM)

                    // draw on each studentsvg
                    for (i=0;i<23;i++){
                      var currentid="#student"+(i+1)
                      var currentsvg=d3.select(currentid)
                      var dayqscore=newQArray[i]
                      var dayhscore=newHArray[i]

                     // points dataset
                     var pcxq=parseInt(currentsvg.select('#qSP').attr('cx'))
                     var pcyq=parseInt(currentsvg.select('#qSP').attr('cy'))
                     var pcxh=parseInt(currentsvg.select('#hSP').attr('cx'))
                     var pcyh=parseInt(currentsvg.select('#hSP').attr('cy'))
                     console.log(d3.select("#student1").select('#hSP').attr('cy'))

                      var qpoints=[{"x":pcxq,"y":pcyq},{"x":xScale(date),"y":qyScale(dayqscore)}]
                      var hpoints=[{"x":pcxh,"y":pcyh},{"x":xScale(date),"y":hyScale(dayhscore)}]

                      // Quize part
                          // quize Median line
                          currentsvg.select('#qML')
                              .transition()
                              .duration(500)
                              .attr('y1', qyScale(dayQM))
                              .attr('y2', qyScale(dayQM))

                          // quize circle
                          currentsvg.select('#qSP')
                              .transition()
                              .duration(500)
                              .attr('cx', xScale(date))
                              .attr('cy', qyScale(dayqscore))

                          // quize line
                          currentsvg.append("path")
                            .attr('d', drawPath(qpoints))
                            .style('stroke', '#D87A5B')
                            .attr('stroke-width', 1)

                      // Homework part
                          // Homework Median line
                          currentsvg.select('#hML')
                              .transition()
                              .duration(500)
                              .attr('y1', hyScale(dayHM))
                              .attr('y2', hyScale(dayHM))
                              .attr('stroke-opacity', 0.5)
                          // Homework circle
                          currentsvg.select('#hSP')
                              .transition()
                              .duration(500)
                              .attr('cx', xScale(date))
                              .attr('cy', hyScale(dayhscore))
                              .attr('fill-opacity', 1)
                          // homework line
                          if(date>3){
                                currentsvg.append("path")
                                .attr('d', drawPath(hpoints))
                                .style('stroke', '#D87A5B')
                                .attr('stroke-width', 1)}}
                          }
                  //单数天 只有quiz 向后
                  else{
                    // Date indication
                      d3.select("#datesvg").select("#datetext")
                      .text(function(){return "Day"+" "+date})

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
                        return d.quizes[i].grade}})
                    var sortQArray=newQArray.sort(sortNumber)
                    var dayQM=d3.quantile(sortQArray,0.5)

                    // data note
                      d3.select("#dayQMtext")
                      .text("Quize Median:"+" "+dayQM)

                      d3.select("#dayHMtext")
                      .text("Homework Median: No Homework Today")

                    // draw on each studentsvg
                    for (i=0;i<23;i++){
                      var currentid="#student"+(i+1)
                      var currentsvg=d3.select(currentid)
                      var dayqscore=newQArray[i]

                      // points dataset
                      var pcxq=parseInt(currentsvg.select('#qSP').attr('cx'))
                      var pcyq=parseInt(currentsvg.select('#qSP').attr('cy'))
                      var qpoints=[{"x":pcxq,"y":pcyq},{"x":xScale(date),"y":qyScale(dayqscore)}]

                      // Quize part
                          // quize Median line
                          currentsvg.select('#qML')
                              .transition()
                              .duration(500)
                              .attr('x1', margin.left)
                              .attr('y1', qyScale(dayQM))
                              .attr('x2', margin.left+w)
                              .attr('y2', qyScale(dayQM))

                          // quize circle
                          currentsvg.select('#qSP')
                              .transition()
                              .duration(500)
                              .attr('cx', xScale(date))
                              .attr('cy', qyScale(dayqscore))

                          // quize line
                          currentsvg.append("path")
                            .attr('d', drawPath(qpoints))
                            .style('stroke', '#D87A5B')
                            .attr('stroke-width', 1)
                          }}}
                        }})

            d3.select("#index").append("button")
            .attr('id', 'previousbutton')
            .text("Previous Day")
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
                        var sortQArray=newQArray.sort(sortNumber)
                        var dayQM=d3.quantile(sortQArray,0.5)

                        // new Homework data
                        var newHArray=d.map(function(d){
                          if (date<30){
                            var i=(date-2)/2
                            return d.homework[i].grade
                          }
                          else {
                            var i=(date-4)/2
                            return d.homework[i].grade
                          }})
                        var sortHArray=newHArray.sort(sortNumber)
                        var dayHM=d3.quantile(sortHArray,0.5)

                        // data note
                          d3.select("#dayQMtext")
                          .text("Quize Median:"+" "+dayQM)

                          d3.select("#dayHMtext")
                          .text("Homework Median:"+" "+dayHM)
                        // draw on each studentsvg
                        for (i=0;i<23;i++){
                          var currentid="#student"+(i+1)
                          var currentsvg=d3.select(currentid)
                          var dayqscore=newQArray[i]
                          var dayhscore=newHArray[i]

                          // Quize part
                              // quize Median line
                              currentsvg.select('#qML')
                                  .transition()
                                  .duration(500)
                                  .attr('y1', qyScale(dayQM))
                                  .attr('y2', qyScale(dayQM))

                              // quize circle
                              currentsvg.select('#qSP')
                                  .transition()
                                  .duration(500)
                                  .attr('cx', xScale(date))
                                  .attr('cy', qyScale(dayqscore))

                          // Homework part
                              // Homework Median line
                              currentsvg.select('#hML')
                                  .transition()
                                  .duration(500)
                                  .attr('y1', hyScale(dayHM))
                                  .attr('y2', hyScale(dayHM))
                                  .attr('stroke-opacity', 0.5)
                              // Homework circle
                              currentsvg.select('#hSP')
                                  .transition()
                                  .duration(500)
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
                    var sortQArray=newQArray.sort(sortNumber)
                    var dayQM=d3.quantile(sortQArray,0.5)

                    // data note
                      d3.select("#dayQMtext")
                      .text("Quize Median:"+" "+dayQM)

                      d3.select("#dayHMtext")
                      .text("Homework Median: No Homework Today")

                      // draw on each studentsvg
                      for (i=0;i<23;i++){
                        var currentid="#student"+(i+1)
                        var currentsvg=d3.select(currentid)
                        var dayqscore=newQArray[i]
                        var dayhscore=newHArray[i]

                        // Quize part
                            // quize Median line
                            currentsvg.select('#qML')
                                .transition()
                                .duration(500)
                                .attr('y1', qyScale(dayQM))
                                .attr('y2', qyScale(dayQM))

                            // quize circle
                            currentsvg.select('#qSP')
                                .transition()
                                .duration(500)
                                .attr('cx', xScale(date))
                                .attr('cy', qyScale(dayqscore))}

                  }



                }}})}



  dataset.then(function(d){

    var finalArray=getFinalArray(d)
    var finalAverage=Math.round(d3.mean(finalArray))
    var finalMedian=d3.quantile(finalArray,0.5)
    var hwArray=getHwArray(d)
    var hwAverage=Math.round(d3.mean(hwArray))
    var hwMedian=d3.quantile(hwArray,0.5)
    var test1Array=getTest1Array(d)
    var test1Average=Math.round(d3.mean(test1Array))
    var test1Median=d3.quantile(test1Array,0.5)
    var test2Array=getTest2Array(d)
    var test2Average=Math.round(d3.mean(test2Array))
    var test2Median=d3.quantile(test2Array,0.5)
    var quizeArray=getQuizeArray(d)
    var quizeAverage=Math.round(d3.mean(quizeArray))
    var quizeMedian=d3.quantile(quizeArray,0.5)

    drawFirstPart()
    drawChangingPart(d)
  })
