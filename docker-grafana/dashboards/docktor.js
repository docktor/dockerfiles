/* global _ */

/*
 * DOCKTOR GRAFANA BOARD
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
var groupName = 'argName';
var containerName = null;

if(!_.isUndefined(ARGS.rows)) {
  rows = parseInt(ARGS.rows, 10);
}

if(!_.isUndefined(ARGS.groupName)) {
  groupName = ARGS.groupName;
  dashboard.title = dashboard.title + " - " + groupName;
}

if(!_.isUndefined(ARGS.containerName)) {
  containerName = ARGS.containerName;
  if (containerName.indexOf('/') === 0) {
    containerName = containerName.substr(1,containerName.length);
  }

  dashboard.title = dashboard.title + " - " + containerName;
}

if(_.isUndefined(groupName)) {
  alert("Invalid argument groupName");
} 

var datasource = services.datasourceSrv.default;
var influxDB = services.datasourceSrv.get('influxdb');

function addDashboard(title, serieName, leftYAxisLabel) {
  dashboard.rows.push({
    title: 'Chart',
    height: '300px',
    panels: [
      {
        title: title,
        type: 'graph',
        span: 12,
        fill: 1,
        linewidth: 2,
        targets: [
          {
             "target": "",
              "function": "mean",
              "column": "value",
              "series": serieName,
              "query": "select mean(value) from \"" + serieName + "\" where $timeFilter group by time($interval) order asc"
          }
        ],
        "leftYAxisLabel": leftYAxisLabel
      }
    ]
  });
};

$.ajax({
  method: 'GET',
  url: influxDB.urls[0] + '/series?p=root&q=list+series+%2F' + groupName + '%2F&u=root'
})
.done(function(result) {
  _(result[0].points).forEach(function(value) {
    var serieName = value[1];
    if (!containerName || serieName.indexOf('containerName') > 0) {
      if (serieName.indexOf("Memory.UsageMB") > 0) {
        addDashboard("Live Memory Usage in MB", serieName, 'MB')
      } else if (serieName.indexOf("Cpu.Usage.TotalPercent") > 0) {
        addDashboard('LiveCPU Usage in Percent', serieName, '%')
      }
    }
  });
});

return dashboard;
