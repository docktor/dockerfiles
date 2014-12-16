# goryCadvisor
goryCadvisor is a bridge between Riemann and cAdvisor. See https://github.com/docktor/goryCadvisor for more information.

# Docker run

Example :
```
docker run \
    -e RIEMANN_ADDRESS=192.168.59.104:5555 \
    -e CADVISOR_ADDRESS=192.168.59.104:8080 \
    -e INTERVAL=5s \
    docktor/gorycadvisor:latest
```

Other parameters : 

You can force `host` parameter in Riemann Event, with `-riemann_host_event` parameter.
This is could be usefull if you run goryCadvisor inside a Docker Container.

Parameter `riemann_ttl_event` (default to 20) is used to set TTL of each event sent to Riemann.
