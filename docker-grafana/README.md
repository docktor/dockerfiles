# Docker run

Example :
```
docker run -d \
	-e INFLUXDB_PROTOCOL=http \
    -e INFLUXDB_HOST=192.168.59.104 \
    -e INFLUXDB_PORT=8086 \
    -e INFLUXDB_NAME=riemann \
    -e INFLUXDB_USER=root \
    -e INFLUXDB_PASS=root \
    -e HTTP_USER=admin \
    -e HTTP_PASS=admin \
    -p 8090:80 \
    docktor/grafana:latest
```

Go to http://<ipOfYourContainer>:8090 to view Grafana