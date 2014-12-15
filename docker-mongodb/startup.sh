#!/bin/bash

mkdir -p /data/db
mkdir -p /opt/backups

/usr/bin/supervisord -c /etc/supervisor/supervisord.conf
