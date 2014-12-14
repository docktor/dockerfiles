# Docker run

Example :
```
docker run -d \
    -e RIEMANN_DASH_CONFIG_PORT=4567 \
    -e RIEMANN_DASH_WS_PORT=5556 \
    -e RIEMANN_HOST=192.168.59.104 \
    -e RIEMANN_INFLUXDB_HOST=192.168.59.104 \
    -e RIEMANN_INFLUXDB_PORT=8086 \
    -e RIEMANN_INFLUXDB_USERNAME=root \
    -e RIEMANN_INFLUXDB_PASSWORD=root \
    -e RIEMANN_INFLUXDB_DB=riemann \
    -p 4567:4567 \
    -p 5555:5555/tcp \
    -p 5555:5555/udp \
    -p 5556:5556 \
    docktor/riemann:latest
```

You can add `-v <pathOnYouHost>:/opt/riemann/riemann/etc` for Riemann Configuration and Riemann Dash Configuratio.

Go to http://<ipOfYourContainer>:4567 to view Riemann Dash Console.