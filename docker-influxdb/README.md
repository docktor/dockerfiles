# Docker run

```
docker run -d \
    -p 8086:8086 \
   	-p 8083:8083 \
    docktor/influxdb:latest
```

You can add `-v <pathOnYouHost>:/data` for influxDB data.

Go to http://<ipOfYourContainer>:8083/ to view admin page.