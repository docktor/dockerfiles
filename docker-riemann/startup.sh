#!/bin/bash

if [ "$(ls /opt/riemann/riemann/etc/)" ]; then
    echo "=> /opt/riemann/riemann/etc/ have already some configuration"
else
    echo "=> cp /opt/riemann/riemann/etc-origin/* /opt/riemann/riemann/etc/"
    cp /opt/riemann/riemann/etc-origin/* /opt/riemann/riemann/etc/
fi

if [ "x${RIEMANN_DASH_CONFIG_PORT}" = "x" ]; then
    echo "=> No RIEMANN_DASH_CONFIG_PORT is specified (env RIEMANN_DASH_CONFIG_PORT) - exit"
    exit 1;
fi
if [ "x${RIEMANN_INFLUXDB_HOST}" = "x" ]; then
    echo "=> No RIEMANN_INFLUXDB_HOST is specified (env RIEMANN_INFLUXDB_HOST) - exit"
    exit 1;
fi
if [ "x${RIEMANN_INFLUXDB_PORT}" = "x" ]; then
    echo "=> No RIEMANN_INFLUXDB_PORT is specified (env RIEMANN_INFLUXDB_PORT) - exit"
    exit 1;
fi
if [ "x${RIEMANN_INFLUXDB_HOST}" = "x" ]; then
    echo "=> No RIEMANN_INFLUXDB_HOST is specified (env RIEMANN_INFLUXDB_HOST) - exit"
    exit 1;
fi
if [ "x${RIEMANN_INFLUXDB_USERNAME}" = "x" ]; then
    echo "=> No RIEMANN_INFLUXDB_USERNAME is specified (env RIEMANN_INFLUXDB_USERNAME) - exit"
    exit 1;
fi
if [ "x${RIEMANN_INFLUXDB_PASSWORD}" = "x" ]; then
    echo "=> No RIEMANN_INFLUXDB_PASSWORD is specified (env RIEMANN_INFLUXDB_PASSWORD) - exit"
    exit 1;
fi
if [ "x${RIEMANN_INFLUXDB_DB}" = "x" ]; then
    echo "=> No RIEMANN_INFLUXDB_DB is specified (env RIEMANN_INFLUXDB_DB) - exit"
    exit 1;
fi
if [ "x${RIEMANN_DASH_WS_PORT}" = "x" ]; then
    echo "=> No RIEMANN_DASH_WS_PORT is specified (env RIEMANN_DASH_WS_PORT) - exit"
    exit 1;
fi
if [ "x${RIEMANN_HOST}" = "x" ]; then
    echo "=> No RIEMANN_HOST is specified (env RIEMANN_HOST) - exit"
    exit 1;
fi

sed -i -e "s/RIEMANN_DASH_CONFIG_PORT/${RIEMANN_DASH_CONFIG_PORT}/" /opt/riemann/riemann/etc/riemann-dash-config.rb
sed -i -e "s/RIEMANN_INFLUXDB_HOST/${RIEMANN_INFLUXDB_HOST}/" /opt/riemann/riemann/etc/riemann.config
sed -i -e "s/RIEMANN_INFLUXDB_PORT/${RIEMANN_INFLUXDB_PORT}/" /opt/riemann/riemann/etc/riemann.config
sed -i -e "s/RIEMANN_INFLUXDB_USERNAME/${RIEMANN_INFLUXDB_USERNAME}/" /opt/riemann/riemann/etc/riemann.config
sed -i -e "s/RIEMANN_INFLUXDB_PASSWORD/${RIEMANN_INFLUXDB_PASSWORD}/" /opt/riemann/riemann/etc/riemann.config
sed -i -e "s/RIEMANN_INFLUXDB_DB/${RIEMANN_INFLUXDB_DB}/" /opt/riemann/riemann/etc/riemann.config
sed -i -e "s/RIEMANN_DASH_WS_PORT/${RIEMANN_DASH_WS_PORT}/" /opt/riemann/riemann/etc/dash-config.json
sed -i -e "s/RIEMANN_HOST/${RIEMANN_HOST}/" /opt/riemann/riemann/etc/dash-config.json

/usr/bin/supervisord -c /etc/supervisor/supervisord.conf