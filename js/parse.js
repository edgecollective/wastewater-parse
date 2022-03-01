
function csvJSON(csv){

    var lines=csv.split("\n");
  
    var result = [];
  
    var headers=lines[0].split(",");
  
    for(var i=1;i<lines.length;i++){
  
        var obj = {};
        var currentline=lines[i].split(",");
  
        for(var j=0;j<headers.length;j++){
            obj[headers[j]] = currentline[j];
        }
  
        result.push(obj);
  
    }
    
    //return result; //JavaScript object
    return result;
    //return JSON.stringify(result); //JSON
  }


  function makeChart(docid,bdata,chart_style,min_timestamp,max_y)
  {
      //console.log(param_key);
  
      
      var ctx = document.getElementById(docid).getContext('2d');
  
      //resize canvas
 
      var north_vs_time = [];
      var south_vs_time = [];
      //var param_vs_time = [];
              for(var i = 0; i < bdata.length; i++) {
                //for(var i = 0; i < 100; i++) {
              var north = parseInt(bdata[i].Northern);
              var south = parseInt(bdata[i].Southern);

              //console.log(thisco2);
                    timeutc_str = bdata[i].timestamp;
                    timeutc = parseInt(timeutc_str);
                    if (timeutc > min_timestamp) {
                    //var timeutc = parseInt(bdata[i].timestamp);
                    //var timeutc = bdata[i].Date;
                    //console.log(timeutc);
                    //console.log(parseInt(timeutc));
                    var localtime = luxon.DateTime.fromSeconds(timeutc).toLocal().toString();
                    //var locatime = luxon.DateTime.DateTime.fromFormat(timeutc, 'MM/dd/yyyy')
                    //param_vs_time.push({"t":localtime,"y":thisco2})
                    north_vs_time.push({"t":localtime,"y":north});
                    south_vs_time.push({"t":localtime,"y":south});
                    }
              }
      
      //console.log(param_vs_time);
  
      var chart = new Chart(ctx, {
          type: chart_style,
          data: {
          datasets: [{
          label: "Northern",
          lineTension: 0,
          bezierCurve: false,
          fill: false,
          spanGaps: true,
          backgroundColor: 'rgb(255, 99, 132)',
          borderColor: 'rgb(255, 99, 132)',
          data: north_vs_time
          },
          {
            label: "Southern",
            lineTension: 0,
            bezierCurve: false,
            fill: false,
            spanGaps: true,
            backgroundColor: 'rgb(0, 99, 132)',
            borderColor: 'rgb(0, 99, 132)',
            data: south_vs_time
            }
        ]
          },
          // Configuration options go here
          options: {
          scales: {
          xAxes: [{
          type: 'time',
          distribution: 'linear',
          ticks: {
          major: {
          enabled: true, // <-- This is the key line
          fontStyle: 'bold', //You can also style these values differently
          fontSize: 14, //You can also style these values differently
          },
          },
          }],
          yAxes: [{
            display: true,
            scaleLabel: {
                display: true,
                labelString: 'copies/mL'
              },
            ticks: {
                beginAtZero: true,
                steps: 10,
                stepValue: 5,
                max: max_y
            }
        }]
          },
          zone: "America/NewYork"
          }
          });
  }




fetch('waste.csv')
  .then(response => response.text())
  .then(text => {

      //console.log(text)
      jsonfile = csvJSON(text);
      console.log(jsonfile);

      /*for(var i = 0; i < 10; i++) {
          console.log(jsonfile[i]);
      }*/
      var max_y = 15000;
      var min_timestamp = 18000;
      var chart_style = 'line';
      makeChart('chart',jsonfile,chart_style,min_timestamp,max_y);
      max_y = 1000;

      
      var tail = 3600*24*1000; // 300 days worth of seconds
      var time_now = Date.now()/1000;
      //var threshold = time_now - tail;
      min_timestamp = time_now - tail;
      makeChart('chart_zoom_1',jsonfile,chart_style,min_timestamp,max_y);

      max_y = 500
      var tail = 3600*24*30; // 30 days worth of seconds
      var time_now = Date.now()/1000;
      //var threshold = time_now - tail;
      min_timestamp = time_now - tail;
      makeChart('chart_zoom_2',jsonfile,chart_style,min_timestamp,max_y);

      //var timestamp_now = luxon.DateTime.now().seconds.toLocal().toString();
  })

