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

// average
var getAverage=function(array){
  var sum=array.reduce(function(pre, curr){
    return pre+curr
  })
  var length=array.length
  return Math.round(sum/length)
}
// Median
var getMedian=function(array){
  var length=array.length
  var half=Math.ceil(length/2)

  if (length%2==0){
    var median=(array[half]+array[half-1])/2
  }
  else {
    var median=array[half-1]

  }
  return Math.round(median)

}



// index

// timeline

var drawTimeline= function(){
  var screen={width:500,height:320};
  var margin = {top: 50, right: 30, bottom: 30, left: 70};
  var w = screen.width - margin.left - margin.right;
  var h = screen.height - margin.top - margin.bottom;


  var svg=d3.select(".index").append("svg")
            .attr('id', 'timelinesvg')
            .attr('width', screen.width)
            .attr('height', screen.height)

  var line=d3.select("#timelinesvg")
      .append('line')
      .attr('x1', )
      .attr('y1', )
      .attr('x2', )
      .attr('y2', )
      .style('stroke', '#111');



}






  dataset.then(function(d){
    var finalArray=getFinalArray(d)
    var finalAverage=getAverage(finalArray)
    var finalMedian=getMedian(finalArray)
    var hwArray=getHwArray(d)
    var hwAverage=getAverage(hwArray)
    var hwMedian=getMedian(hwArray)
    var test1Array=getTest1Array(d)
    var test1Average=getAverage(test1Array)
    var test1Median=getMedian(test1Array)
    var test2Array=getTest2Array(d)
    var test2Average=getAverage(test2Array)
    var test2Median=getMedian(test2Array)
    var quizeArray=getQuizeArray(d)
    var quizeAverage=getAverage(quizeArray)
    var quizeMedian=getMedian(quizeArray)

    drawTimeline()
  })
