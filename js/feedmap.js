


function setActiveIcon(marker) {
    marker.setIcon(divIconActive);
  };


function makeMap(docid,map_url,feeds,colors)
{
    //console.log(feeds);
    console.log("map colors:",colors);


    var map = L.map(docid, {
        minZoom: 1,
        maxZoom: 4,
        center: [0, 0],
        zoom: 3,
        crs: L.CRS.Simple
      });

      var w = 1000,
      h = 600;
      var url = map_url;

      //var url = "/images/a2floor.png";

      var southWest = map.unproject([0, h], map.getMaxZoom()-1);
          var northEast = map.unproject([w, 0], map.getMaxZoom()-1);
          var bounds = new L.LatLngBounds(southWest, northEast);
      
          // add the image overlay, 
          // so that it covers the entire map
          L.imageOverlay(url, bounds).addTo(map);
      
          // tell leaflet that the map is exactly as big as the image
          map.setMaxBounds(bounds);
      
       console.log('got here');

       var locationLayer = new L.FeatureGroup();
       var markerTemp = L.marker();
     
       //var markerData = [];
       for(var i = 0; i < feeds.length; i++) {
           var feed_shortkey = feeds[i].feed_pubkey.substring(0,4);
           var x = feeds[i].coords.x;
           var y = feeds[i].coords.y;
           var coords = feeds[i].coords;
           var shortkey = feeds[i].name;
           console.log(shortkey);

           var htmlString = "<div style='background-color:white;' class='marker-pin'></div><i class='material-icons' style='color:"+colors[i]+"'><b>\""+shortkey.toString()+"\"</b></i>";
           //markerData.push({"feed_shortkey":feed_shortkey,"coords":[x,y]});

           var icon = L.divIcon({
            className: 'custom-div-icon',
            html: htmlString,
            iconSize: [10, 42],
            iconAnchor: [15, 42]
            });

            console.log(x,y);

            var marker = L.marker([x,y], {
                //icon: divIcon,
                icon: icon,
                id: i
              });

            marker.addTo(map);
           
        }   

}
    
    
    function makeChart(docid,bdata,param_key)
{
    //console.log(param_key);

    
    var ctx = document.getElementById(docid).getContext('2d');

    //resize canvas

    var param_vs_time = [];
            for(var i = 0; i < bdata.length; i++) {
            var thisco2 = bdata[i].parameters[param_key];
            var timeutc = bdata[i].timestamp;
            var localtime = luxon.DateTime.fromISO(timeutc).toLocal().toString();
            param_vs_time.push({"t":localtime,"y":thisco2})
            }
    
    console.log(param_vs_time);

    var chart = new Chart(ctx, {
        type: 'line',
        data: {
        datasets: [{
        label: param_key,
        lineTension: 0,
        bezierCurve: false,
        fill: true,
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
        },
        zone: "America/NewYork"
        }
        });
}

function makeChartOverlay(docid,bayoudata,param_key,colors)
{
    console.log("chart colors:",colors);

    //console.log(param_key);
    console.log(bayoudata.length);

    var bdata=bayoudata[0];

    var ctx = document.getElementById(docid).getContext('2d');

    //resize canvas
    var datasets =[];
    //var colors = ['red','green','blue','purple','yellow'];
    var feedcount=0;

    bayoudata.forEach(feed =>
    {
        console.log(feed.feed_pubkey);
        var feed_data = feed.data;
        console.log(feed_data);

        var param_vs_time = [];
        for(var i = 0; i < feed_data.length; i++) {
            //var thisco2 = feed_data[i].parameters[param_key];
            var thisco2 = feed_data[i][param_key];
            var timeutc = feed_data[i].created;
            var localtime = luxon.DateTime.fromISO(timeutc).toLocal().toString();
            param_vs_time.push({"t":localtime,"y":thisco2});
        }
        var feed_pubkey = feed.feed_pubkey;
        //var feed_shortname = "\""+feed_pubkey.substr(0,2)+"\"";
        var feed_shortname = feed.feed_name;
        //var chartcolor = colors[feedcount];
        var chartcolor = feed.color;
        console.log(chartcolor);
        var dataset = {
            "data":param_vs_time,
            //"label":feed.feed_pubkey,
            "label":feed_shortname,
            "borderColor": chartcolor,
            "fill":true,
            "lineTension":0
        }
        datasets.push(
            dataset
        );
        feedcount++;
    });    

    var chart = new Chart(ctx, {
        type: 'line',
        data: {
        datasets: datasets
        },
        // Configuration options go here
        options: {
            legend: {
                labels: {
                    fontStyle: 'bold', //You can also style these values differently
                }
            },
            title: {
                display: true,
                text: 'CO2 (PPM*)'
            },
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
        },
        zone: "America/NewYork"
        }
        });
}