/* global _ */

/*
 * Complex scripted dashboard
 * This script generates a dashboard object that Grafana can load. It also takes a number of user
 * supplied URL parameters (int ARGS variable)
 *
 * Return a dashboard object, or a function
 *
 * For async scripts, return a function, this function must take a single callback function as argument,
 * call this callback function with the dashboard object (look at scripted_async.js for an example)
 */



// accessable variables in this scope
var window, document, ARGS, $, jQuery, moment, kbn, services;

// Setup some variables
var dashboard, timspan;

// All url parameters are available via the ARGS object
var ARGS;

// Set a default timespan if one isn't specified
timspan = '1d';

// Intialize a skeleton with nothing but a rows array and service object
dashboard = {
  rows : [],
};

// Set a title
dashboard.title = 'Docktor';
dashboard.time = {
  from: "now-" + (ARGS.from || timspan),
  to: "now"
};

dashboard.editable = true;
dashboard.hideControls = true;

$(".nav").hide();

var rows = 1;
var daemonName = 'argName';
var containerName = 'argName';

if(!_.isUndefined(ARGS.rows)) {
  rows = parseInt(ARGS.rows, 10);
}

if(!_.isUndefined(ARGS.daemonName)) {
  daemonName = ARGS.daemonName;
  dashboard.title = dashboard.title + " - " + daemonName;
}

if(!_.isUndefined(ARGS.containerName)) {
  containerName = ARGS.containerName;
  dashboard.title = dashboard.title + " - " + containerName;
}

if(_.isUndefined(daemonName) || _.isUndefined(containerName)) {
  alert("Invalid argument containerName and daemonName");
} 


// default datasource
var datasource = services.datasourceSrv.default;
// get datasource used for saving dashboards
var influxDB = services.datasourceSrv.get('influxdb');
console.log(influxDB);


 $.ajax({
    method: 'GET',
    url: 'http://192.168.50.4:8086/db/riemann/series?p=root&q=list+series+%2FCPOU%2F&u=root'
  })
  .done(function(result) {
    console.log("RESULT");
    console.log(result);

  });

//http://192.168.50.4:8086/db/riemann/series?p=root&q=list+series&time_precision=s&u=root


  dashboard.rows.push({
    title: 'Chart',
    height: '300px',
    panels: [
      {
        title: 'LiveCPU Usage in Percent',
        type: 'graph',
        span: 12,
        fill: 1,
        linewidth: 2,
        targets: [
          {
             "target": "",
              "function": "mean",
              "column": "value",
              "series": daemonName + ".Cpu.Usage.TotalPercent " + containerName,
              "query": "select mean(value) from \"" + daemonName + ".Cpu.Usage.TotalPercent " + containerName + "\" where $timeFilter group by time($interval) order asc"
          }
        ],
        "leftYAxisLabel": "%"
      }
    ]
  });

  dashboard.rows.push({
    title: 'Chart',
    height: '300px',
    panels: [
      {
        title: 'Live Memory Usage in MB',
        type: 'graph',
        span: 12,
        fill: 1,
        linewidth: 2,
        targets: [
          {
             "target": "",
              "function": "mean",
              "column": "value",
              "series": daemonName + ".Memory.UsageMB " + containerName,
              "query": "select mean(value) from \"" + daemonName + ".Memory.UsageMB " + containerName + "\" where $timeFilter group by time($interval) order asc"
          }
        ],
        "leftYAxisLabel": "MB"
      }
    ]
  });


return dashboard;
