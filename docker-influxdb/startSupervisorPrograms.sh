#!/bin/bash

echo 'starting influxdb...'
supervisorctl start influxdb
echo 'starting createdb...'
supervisorctl start createdb
echo 'end starting.'
