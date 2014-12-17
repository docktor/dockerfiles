#!/bin/bash

set -m

if [ "x${INFLUXDB_HOST}" = "x" ]; then
    echo "=> No address of InfluxDB is specified (env INFLUXDB_HOST) - exit"
    exit 1;
fi

if [ "x${INFLUXDB_PORT}" = "x" ]; then
    echo "=> No PORT of InfluxDB is specified (env INFLUXDB_PORT) - exit"
    exit 1;
fi

if [ "x${INFLUXDB_PROTOCOL}" = "x" ]; then
    echo "=> No PROTOCOL of InfluxDB is specified (env INFLUXDB_PROTOCOL) - exit"
    exit 1;
fi

if [ "x${INFLUXDB_NAME}" = "x" ]; then
    echo "=> No DBNAME of InfluxDB is specified (env INFLUXDB_NAME) - exit"
    exit 1;
fi

if [ "x${INFLUXDB_USER}" = "x" ]; then
    echo "=> No USER of InfluxDB is specified (env INFLUXDB_USER) - exit"
    exit 1;
fi

if [ "x${INFLUXDB_PASS}" = "x" ]; then
    echo "=> No PASSWORD of InfluxDB is specified (env INFLUXDB_PASS) - exit"
    exit 1;
fi

if [ "x${HTTP_USER}" = "x" ]; then
    echo "=> No HTTP USER is specified (env INFLUXDB_PASS) - exit"
    exit 1;
fi

if [ "x${HTTP_PASS}" = "x" ]; then
    echo "=> No HTTP PASSWORD is specified (env HTTP_PASS) - exit"
    exit 1;
fi

echo "=> Configuring InfluxDB"
sed -i -e "s/_INFLUXDB_PROTOCOL_/${INFLUXDB_PROTOCOL}/g" \
    -e "s/_INFLUXDB_ADDR_/${INFLUXDB_HOST}/g" \
    -e "s/_INFLUXDB_PORT_/${INFLUXDB_PORT}/g" \
    -e "s/_INFLUXDB_DB_NAME_/${INFLUXDB_NAME}/g" \
    -e "s/_INFLUXDB_USER_/${INFLUXDB_USER}/g" \
    -e "s/_INFLUXDB_PASS_/${INFLUXDB_PASS}/g" /opt/app/config.js

echo "=> InfluxDB has been configured as follows:"
echo "   InfluxDB ADDRESS:  ${INFLUXDB_HOST}"
echo "   InfluxDB PORT:     ${INFLUXDB_PORT}"
echo "   InfluxDB DB NAME:  ${INFLUXDB_NAME}"
echo "   InfluxDB USERNAME: ${INFLUXDB_USER}"
echo "   InfluxDB PASSWORD: ${INFLUXDB_PASS}"

echo "=> Setting basic auth for ${HTTP_USER} user with ${HTTP_PASS} password"
echo ${HTTP_PASS} | htpasswd -i -c /opt/app/.htpasswd  ${HTTP_USER}
echo "=> Done!"


if [ "$(ls /opt/app/app/dashboards)" ]; then
    echo "=> /opt/app/app/dashboards have already some dashboards"
else
    echo "=> cp /opt/app/app/dashboards-origin/* /opt/app/app/dashboards/"
    cp /opt/app/app/dashboards-origin/* /opt/app/app/dashboards/
fi

/usr/bin/supervisord -c /etc/supervisor/supervisord.conf