
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


  function makeChart(docid,bdata,param_key)
  {
      //console.log(param_key);
  
      
      var ctx = document.getElementById(docid).getContext('2d');
  
      //resize canvas
  
      var param_vs_time = [];
              for(var i = 0; i < bdata.length; i++) {
                //for(var i = 0; i < 100; i++) {
              var thisco2 = parseInt(bdata[i].Northern);
              //console.log(thisco2);
                    timeutc_str = bdata[i].timestamp;
                    timeutc = parseInt(timeutc_str);
                    if (timeutc > 5000) {
                    //var timeutc = parseInt(bdata[i].timestamp);
                    //var timeutc = bdata[i].Date;
                    //console.log(timeutc);
                    //console.log(parseInt(timeutc));
                    var localtime = luxon.DateTime.fromSeconds(timeutc).toLocal().toString();
                    //var locatime = luxon.DateTime.DateTime.fromFormat(timeutc, 'MM/dd/yyyy')
                    param_vs_time.push({"t":localtime,"y":thisco2})
                    }
              }
      
      console.log(param_vs_time);
  
      var chart = new Chart(ctx, {
          type: 'line',
          data: {
          datasets: [{
          label: param_key,
          lineTension: 0,
          bezierCurve: false,
          fill: false,
          spanGaps: true,
          backgroundColor: 'rgb(255, 99, 132)',
          borderColor: 'rgb(255, 99, 132)',
          data: param_vs_time
          }]
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
            ticks: {
                beginAtZero: true,
                steps: 10,
                stepValue: 5,
                max: 1000
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
      makeChart('chart',jsonfile,"Northern")


  })

