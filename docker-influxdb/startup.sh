#!/bin/bash

CONFIG_FILE="/opt/influxdbconfig/config.toml"

# Dynamically change the value of 'max-open-shards' to what 'ulimit -n' returns
sed -i "s/^max-open-shards.*/max-open-shards = $(ulimit -n)/" ${CONFIG_FILE}

/usr/bin/supervisord -c /etc/supervisor/supervisord.conf