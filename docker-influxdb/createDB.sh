#!/bin/sh


curl 'http://localhost:8086/db?u=root&p=root' | grep riemann

if [ $? -eq 1 ]; then
	echo 'create DB riemann'

	curl -X POST "http://localhost:8086/cluster/database_configs/riemann?u=root&p=root" -d '{
  "spaces": [
    {
      "name": "default",
      "retentionPolicy": "1d",
      "shardDuration": "1h",
      "regex": "/.*/",
      "replicationFactor": 1,
      "split": 1
    },
    {
      "name": "stats",
      "retentionPolicy": "inf",
      "shardDuration": "7d",
      "regex": "/.*stats.*/",
      "replicationFactor": 1,
      "split": 1
    }
  ],
  "continuousQueries": [
    "select mean(value) as value from /^[^s][^t][^a][^t][^s].*Cpu.Usage.TotalPercent.*/ group by time(10m) into stats.10m.:series_name",
    "select mean(value) as value from /^[^s][^t][^a][^t][^s].*Memory.UsageMB.*/ group by time(10m) into stats.10m.:series_name"
  ]
} '

else
	echo 'DB riemann already exist'
fi


curl 'http://localhost:8086/db?u=root&p=root' | grep grafana

if [ $? -eq 1 ]; then
	echo 'create DB grafana'
	curl -X POST 'http://localhost:8086/db?u=root&p=root' -d '{"name":"grafana"}'
else
	echo 'DB riemann grafana exist'
fi