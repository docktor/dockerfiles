define(['settings'],
function (Settings) {
  return new Settings({
    datasources: {
      'docktor-influxdb': {
        default: true,
        grafanaDB: false,
        type: 'influxdb',
        url: "_INFLUXDB_PROTOCOL_://_INFLUXDB_ADDR_:_INFLUXDB_PORT_/db/_INFLUXDB_DB_NAME_",
        username: "_INFLUXDB_USER_",
        password: "_INFLUXDB_PASS_",
      },
      'docktor-grafana': {
        grafanaDB: true,
        type: 'influxdb',
        url: "_INFLUXDB_PROTOCOL_://_INFLUXDB_ADDR_:_INFLUXDB_PORT_/db/grafana",
        username: "_INFLUXDB_USER_",
        password: "_INFLUXDB_PASS_",
      }
    },
    default_route: '/dashboard/file/default.json',
    timezoneOffset: null,
    grafana_index: "grafana-dash",
    unsaved_changes_warning: true,
    panel_names: ['text','graphite'],
    admin: {
      password: '123'
    }
  });
});
