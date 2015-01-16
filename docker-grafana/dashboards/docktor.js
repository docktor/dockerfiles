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
    rows: []
};

// Set a title
dashboard.title = 'Docktor';
dashboard.time = {
    from: "now-" + (ARGS.from || timspan),
    to: "now"
};

dashboard.editable = false;
dashboard.hideControls = true;
dashboard.refresh = "10s";

$(".nav").hide();

var rows = 1;
var groupName = 'argName';
var containerName = null;

if (!_.isUndefined(ARGS.rows)) {
    rows = parseInt(ARGS.rows, 10);
}

if (!_.isUndefined(ARGS.groupName)) {
    groupName = ARGS.groupName;
    dashboard.title = dashboard.title + " - " + groupName;
}

if (!_.isUndefined(ARGS.containerName)) {
    containerName = ARGS.containerName;
    if (containerName.indexOf('/') === 0) {
        containerName = containerName.substr(1, containerName.length);
    }

    dashboard.title = dashboard.title + " - " + containerName;
}

if (_.isUndefined(groupName)) {
    alert("Invalid argument groupName");
}

var influxDB = services.datasourceSrv.get('influxdb');

function getRowAll() {
    return getRow(groupName + " - All Services")
}

function getRow(title) {
    return {
        "title": title,
        "height": "250px",
        "editable": false,
        "collapse": false,
        "showTitle": true,
        "panels": []
    }
}

var contentPanelTitle = "<a target='_blank' href='/#/dashboard/script/docktor.js?groupName=" + groupName + "'>Monitoring all services</a><br><br>Or choose a service  : ";

function addlinkToPanel(groupName, title) {
    contentPanelTitle = contentPanelTitle + " - <a target='_blank' href='/#/dashboard/script/docktor.js?groupName=" + groupName + "&containerName=" + title + "'>" + title + "</a>";
}

function getPanelTitle() {
    return {
        "title": "Docktor Monitoring - Group " + groupName,
        "error": false,
        "span": 12,
        "editable": false,
        "type": "text",
        "mode": "html",
        "content": "",
        "style": {},
        "links": [],
        "height": "12px"
    }
}

function getPanelRowCpuAll() {
    return getPanelCpu(groupName + " - All Services - CPU in Percent", 12)
}

function getPanelCpu(title, spanSize) {
    return {
        "title": title,
        "error": false,
        "span": spanSize,
        "editable": false,
        "type": "graph",
        "datasource": null,
        "renderer": "flot",
        "x-axis": true,
        "y-axis": true,
        "y_formats": [
            "percent",
            "short"
        ],
        "grid": {
            "leftMax": null,
            "rightMax": null,
            "leftMin": null,
            "rightMin": null,
            "threshold1": 70,
            "threshold2": 90,
            "threshold1Color": "rgba(216, 106, 27, 0.27)",
            "threshold2Color": "rgba(236, 80, 80, 0.61)"
        },
        "lines": true,
        "fill": 0,
        "linewidth": 1,
        "points": true,
        "pointradius": 1,
        "bars": false,
        "stack": false,
        "percentage": false,
        "legend": {
            "show": true,
            "values": true,
            "min": true,
            "max": true,
            "current": true,
            "total": false,
            "avg": true,
            "alignAsTable": true,
            "rightSide": false,
            "sortDesc": true,
            "sort": "current"
        },
        "nullPointMode": "connected",
        "steppedLine": false,
        "tooltip": {
            "value_type": "cumulative",
            "shared": false
        },
        "targets": [ ],
        "aliasColors": {},
        "seriesOverrides": [],
        "links": []
    }
}

function getPanelRowFileSystemAll() {
    return getPanelFileSystem(groupName + " - All Services - FileSystem in Percent", 12)
}

function getPanelFileSystem(title, spanSize) {
    return {
        "title": title,
        "error": false,
        "span": spanSize,
        "editable": false,
        "type": "graph",
        "datasource": null,
        "renderer": "flot",
        "x-axis": true,
        "y-axis": true,
        "y_formats": [
            "percent",
            "short"
        ],
        "grid": {
            "leftMax": null,
            "rightMax": null,
            "leftMin": null,
            "rightMin": null,
            "threshold1": 70,
            "threshold2": 90,
            "threshold1Color": "rgba(216, 106, 27, 0.27)",
            "threshold2Color": "rgba(236, 80, 80, 0.61)"
        },
        "lines": true,
        "fill": 0,
        "linewidth": 1,
        "points": true,
        "pointradius": 1,
        "bars": false,
        "stack": false,
        "percentage": false,
        "legend": {
            "show": true,
            "values": true,
            "min": true,
            "max": true,
            "current": true,
            "total": false,
            "avg": true,
            "alignAsTable": true,
            "rightSide": false,
            "sortDesc": true,
            "sort": "current"
        },
        "nullPointMode": "connected",
        "steppedLine": false,
        "tooltip": {
            "value_type": "cumulative",
            "shared": false
        },
        "targets": [ ],
        "aliasColors": {},
        "seriesOverrides": [],
        "links": []
    }
}

function getPanelMemoryAll() {
    return getPanelMemory(groupName + " - All Services - Memory Usage in Mb", 12)
}

function getPanelMemory(title, spanSize) {
    return {
        "title": title,
        "error": false,
        "span": spanSize,
        "editable": false,
        "type": "graph",
        "datasource": null,
        "renderer": "flot",
        "x-axis": true,
        "y-axis": true,
        "y_formats": [
            "none",
            "none"
        ],
        "grid": {
            "leftMax": null,
            "rightMax": null,
            "leftMin": null,
            "rightMin": null,
            "threshold1": 2000,
            "threshold2": 4000,
            "threshold1Color": "rgba(216, 106, 27, 0.27)",
            "threshold2Color": "rgba(236, 80, 80, 0.61)",
            "thresholdLine": false
        },
        "lines": true,
        "fill": 0,
        "linewidth": 1,
        "points": true,
        "pointradius": 1,
        "bars": false,
        "stack": false,
        "percentage": false,
        "legend": {
            "show": true,
            "values": true,
            "min": true,
            "max": true,
            "current": true,
            "total": false,
            "avg": true,
            "alignAsTable": true,
            "rightSide": false,
            "sortDesc": true,
            "sort": "current"
        },
        "nullPointMode": "connected",
        "steppedLine": false,
        "tooltip": {
            "value_type": "cumulative",
            "shared": false
        },
        "targets": [],
        "aliasColors": {},
        "seriesOverrides": [],
        "links": [],
        "leftYAxisLabel": "Usage in Mb"
    }
}

function getTarget(serieName) {
    return {
        "function": "mean",
        "column": "value",
        "series": serieName,
        "query": "select mean(value) from \"" + serieName + "\" where $timeFilter group by time($interval) order asc"
    }
}

$.ajax({
    method: 'GET',
    url: influxDB.urls[0] + '/series?p=root&q=list+series+%2F' + groupName + '%2F&u=root'
}).done(function (result) {

    var rowAll = getRowAll();
    var panelCpuAll = getPanelRowCpuAll();
    var panelMemoryAll = getPanelMemoryAll();
    var panelFileSystemAll = getPanelRowFileSystemAll();

    var panelCpuLive = null;
    var panelCpuStats = null;
    var panelMemoryLive = null;
    var panelMemoryStats = null;
    var panelFileSystemLive = null;
    var panelFileSystemStats = null;

    var panelTitle = getPanelTitle();
    var containersTitles = [];

    _(result[0].points).forEach(function (value) {
        var serieName = value[1];
        var containerTitle = serieName.substring(serieName.indexOf(' ') + 1, serieName.length);

        if (!_.contains(containersTitles, containerTitle) && serieName.indexOf("Usage") > 0) {
            containersTitles.push(containerTitle);
        }

        if (!containerName || serieName.indexOf(containerName) > 0) {
            if (containerName === null) {
                if (serieName.substring(0, 5) === 'stats') {
                    if (serieName.indexOf("Memory.UsageMB") > 0) {
                        panelMemoryAll.targets.push(getTarget(serieName))
                    } else if (serieName.indexOf("Cpu.Usage.TotalPercent") > 0) {
                        panelCpuAll.targets.push(getTarget(serieName))
                    } else if (serieName.indexOf("Filesystem.UsagePercent") > 0) {
                        panelFileSystemAll.targets.push(getTarget(serieName))
                    }
                }
            } else {
                if (serieName.substring(0, 5) !== 'stats') {
                    if (serieName.indexOf("Memory.UsageMB") > 0) {
                        panelMemoryLive = getPanelMemory('Memory Live in MB', 6);
                        panelMemoryLive.targets.push(getTarget(serieName));
                    } else if (serieName.indexOf("Cpu.Usage.TotalPercent") > 0) {
                        panelCpuLive = getPanelCpu('CPU Live in %', 6);
                        panelCpuLive.targets.push(getTarget(serieName));
                    } else if (serieName.indexOf("Filesystem.UsagePercent") > 0){
                        panelFileSystemLive = getPanelFileSystem('Filesystem Live in %',6);
                        panelFileSystemLive.targets.push(getTarget(serieName));
                    }
                } else {
                    if (serieName.indexOf("Memory.UsageMB") > 0) {
                        panelMemoryStats = getPanelMemory('Memory Stats in MB (10m)', 6);
                        panelMemoryStats.targets.push(getTarget(serieName));
                    } else if (serieName.indexOf("Cpu.Usage.TotalPercent") > 0) {
                        panelCpuStats = getPanelCpu('CPU Stats in % (10m)', 6);
                        panelCpuStats.targets.push(getTarget(serieName));
                    } else if (serieName.indexOf("Filesystem.UsagePercent") > 0) {
                        panelFileSystemStats = getPanelFileSystem('Filesystem Stats in % (10m)', 6);
                        panelFileSystemStats.targets.push(getTarget(serieName));
                    } 
                }
            }
        }
    });

    _(containersTitles).forEach(function (title) {
        addlinkToPanel(groupName, title);
    });

    panelTitle.content = contentPanelTitle;
    if (containerName === null) {
        rowAll.panels.push(panelTitle);
        rowAll.panels.push(panelMemoryAll);
        rowAll.panels.push(panelCpuAll);
        rowAll.panels.push(panelFileSystemAll);
        dashboard.rows.push(rowAll);
    } else {
        var row = getRow(groupName + ' ' + containerName);
        row.panels.push(panelTitle);
        if (panelCpuLive !== null) row.panels.push(panelCpuLive);
        if (panelCpuStats !== null) row.panels.push(panelCpuStats);
        if (panelMemoryLive !== null) row.panels.push(panelMemoryLive);
        if (panelMemoryStats !== null) row.panels.push(panelMemoryStats);
        if (panelFileSystemLive !== null) row.panels.push(panelFileSystemLive);
        if (panelFileSystemStats !== null) row.panels.push(panelFileSystemStats);
        dashboard.rows.push(row);
    }
});

return dashboard;
