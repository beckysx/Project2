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
var getPersonalHwArray=function(d,array){
  for(var i=0;i<d.length;i++){
    var grade=parseInt(d[i].grade)
    array.push(grade)
  }
}
var getHwArray=function(d){
  var array=[]
  for(var i=0;i<d.length;i++){
    var data=d[i].homework
    var personData=getPersonalHwArray(data,array)
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
var getPersonalQuizeArray=function(d,array){
  for(var i=0;i<d.length;i++){
    var grade=parseInt(d[i].grade)
    array.push(grade)
  }
}
var getQuizeArray=function(d){
  var array=[]
  for(var i=0;i<d.length;i++){
    var data=d[i].quizes
    var personData=getPersonalQuizeArray(data,array)
  }
  array.sort(sortNumber)
  return array
}


// index Page

// timeline

var drawTimeline= function(){
  var screen={width:1400,height:320};
  var margin = {top: 50, right: 30, bottom: 30, left: 30};
  var w = screen.width - margin.left - margin.right;
  var h = screen.height - margin.top - margin.bottom;


  var svg=d3.select(".index").append("svg")
            .attr('id', 'timelinesvg')
            .attr('width', screen.width)
            .attr('height', screen.height)

  var line=d3.select("#timelinesvg")
      .append('line')
      .attr('x1', margin.right-5)
      .attr('y1', margin.top)
      .attr('x2', margin.right+w)
      .attr('y2',margin.top )
      .attr('stroke-width', 3)
      .style('stroke', '#111');

  var exam=[15,30,41]
  var quize=d3.range(42)
  delete quize[15]
  delete quize[30]
  delete quize[41]



  var scale=d3.scaleLinear()
      .domain([1,40])
      .range([30, w]);

  var examcircle=d3.select("#timelinesvg").selectAll('circle')
      .data(exam)
      .enter()
      .append('circle')
      .attr('cx', function(d){
        return scale(d)
      })
      .attr('cy', margin.top)
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
      .attr('y1', margin.top-15)
      .attr('x2', function(d){
        return scale(d)
      })
      .attr('y2', margin.top-1)
      .style('stroke', '#499FB7')
      .attr('stroke-width', 5)
      .attr('id',function(d){
        return "day"+d
      });

  var hw=d3.range(2,40,2)
  delete hw[14]
  console.log(hw)
  var hwLine=d3.select("#timelinesvg").append("g").attr('id', 'hwLine')
  hwLine.selectAll("line")
      .data(hw)
      .enter().append('line')
      .attr('x1', function(d){
        return scale(d)
      })
      .attr('y1', margin.top+1)
      .attr('x2', function(d){
        return scale(d)
      })
      .attr('y2', margin.top+15)
      .style('stroke', '#8F995E')
      .attr('stroke-width', 5)
      .attr('id',function(d){
        return "day"+d
      });







}






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

    drawTimeline()
  })
